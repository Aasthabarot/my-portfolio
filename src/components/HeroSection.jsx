'use client'

import { useState, useEffect, useRef } from 'react';
import { Box, Container, Heading, Text, VStack, Button, HStack } from '@chakra-ui/react';
import * as THREE from 'three';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create a technical grid/network structure
    const gridGroup = new THREE.Group();

    // Create rotating rings (technical look)
    const createRing = (radius, color, thickness) => {
      const geometry = new THREE.TorusGeometry(radius, thickness, 16, 100);
      const material = new THREE.MeshPhongMaterial({ 
        color: color,
        transparent: true,
        opacity: 0.4,
        emissive: color,
        emissiveIntensity: 0.2,
        wireframe: false
      });
      return new THREE.Mesh(geometry, material);
    };

    // Create multiple rings with purple/pink theme
    const ring1 = createRing(4, 0xA668C4, 0.05);
    ring1.rotation.x = Math.PI / 4;
    gridGroup.add(ring1);

    const ring2 = createRing(3, 0xF5D5E0, 0.04);
    ring2.rotation.y = Math.PI / 3;
    gridGroup.add(ring2);

    const ring3 = createRing(5, 0x7B337E, 0.06);
    ring3.rotation.z = Math.PI / 6;
    gridGroup.add(ring3);

    // Create particle network
    const particleCount = 100;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      
      positions[i] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i + 2] = radius * Math.cos(theta);
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xF5D5E0,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    gridGroup.add(particles);

    // Create connecting lines
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    
    for (let i = 0; i < 50; i++) {
      const start = i * 3;
      const end = ((i + 1) % particleCount) * 3;
      
      if (Math.random() > 0.7) {
        linePositions.push(
          positions[start], positions[start + 1], positions[start + 2],
          positions[end], positions[end + 1], positions[end + 2]
        );
      }
    }

    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xA668C4,
      transparent: true,
      opacity: 0.15
    });

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    gridGroup.add(lines);

    // Create central glowing sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0xA668C4,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.7
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    gridGroup.add(sphere);

    // Add wireframe overlay to sphere
    const wireframeGeometry = new THREE.SphereGeometry(1.1, 16, 16);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xF5D5E0,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    gridGroup.add(wireframe);

    scene.add(gridGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xA668C4, 1, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xF5D5E0, 1, 100);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    const clock = new THREE.Clock();
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Rotate rings in different directions
      ring1.rotation.z += 0.005;
      ring2.rotation.x += 0.003;
      ring3.rotation.y += 0.004;

      // Rotate entire group slowly
      gridGroup.rotation.y = time * 0.1;
      gridGroup.rotation.x = Math.sin(time * 0.2) * 0.2;

      // Pulse the central sphere
      const scale = 1 + Math.sin(time * 2) * 0.1;
      sphere.scale.set(scale, scale, scale);
      wireframe.scale.set(scale * 1.1, scale * 1.1, scale * 1.1);

      // Mouse interaction
      gridGroup.rotation.y += mousePosition.x * 0.1;
      gridGroup.rotation.x += mousePosition.y * 0.1;

      // Animate particles
      particles.rotation.y = time * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, [mousePosition]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Box position="relative" minH="100vh" bg="#210635" overflow="hidden">
      {/* Main Purple Gradient Background */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bgGradient="linear(135deg, #6667AB 0%, #420D4B 50%, #7B337E 100%)"
        zIndex="0"
      />

      {/* Decorative Background Circles */}
      <Box
        position="absolute"
        top="10%"
        right="5%"
        w="400px"
        h="400px"
        borderRadius="full"
        bg="rgba(166, 104, 196, 0.15)"
        filter="blur(60px)"
        zIndex="1"
      />
      <Box
        position="absolute"
        bottom="15%"
        right="15%"
        w="300px"
        h="300px"
        borderRadius="full"
        bg="rgba(123, 51, 126, 0.2)"
        filter="blur(50px)"
        zIndex="1"
      />
      <Box
        position="absolute"
        top="30%"
        right="25%"
        w="250px"
        h="250px"
        borderRadius="full"
        bg="rgba(102, 103, 171, 0.12)"
        filter="blur(40px)"
        zIndex="1"
      />

      {/* Wave Border Decorations */}
      <Box
        position="absolute"
        top="20%"
        right="10%"
        w="200px"
        h="200px"
        border="2px solid"
        borderColor="rgba(245, 213, 224, 0.2)"
        borderRadius="50% 40% 60% 50%"
        zIndex="1"
        animation="morphWave 8s ease-in-out infinite"
      />
      <Box
        position="absolute"
        bottom="25%"
        right="30%"
        w="150px"
        h="150px"
        border="2px solid"
        borderColor="rgba(166, 104, 196, 0.15)"
        borderRadius="60% 50% 40% 60%"
        zIndex="1"
        animation="morphWave 10s ease-in-out infinite reverse"
      />

      {/* Three.js Canvas Background */}
      <Box
        position="absolute"
        top="0"
        right="0"
        w={{ base: '100%', md: '55%' }}
        h="100vh"
        zIndex="2"
        opacity="0.4"
      >
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Box>

      {/* Main Content */}
      <Container
        maxW="container.xl"
        h="100vh"
        display="flex"
        alignItems="center"
        position="relative"
        zIndex="3"
        px={{ base: 6, md: 12 }}
      >
        <VStack
          align="flex-start"
          spacing={6}
          maxW={{ base: '100%', md: '600px' }}
        >
          {/* Label with line */}
          <HStack>
            <Box w="40px" h="1px" bgGradient="linear(to-r, #F5D5E0, transparent)" />
            <Text
              fontSize={{ base: 'xs', md: 'sm' }}
              letterSpacing="0.25em"
              color="#F5D5E0"
              fontWeight="600"
              textTransform="uppercase"
            >
              AASTHA BAROT
            </Text>
          </HStack>

          {/* Main Heading */}
          <Heading
            fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
            fontWeight="800"
            lineHeight="1.1"
            color="white"
          >
            Full Stack Developer
            <br />
            
          </Heading>

          {/* Divider */}
          <Box w="100px" h="3px" bgGradient="linear(to-r, #7B337E, #A668C4)" />

          {/* Description */}
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="#F5D5E0"
            maxW="500px"
            lineHeight="1.8"
          >
            Crafting elegant digital experiences through innovative design
            and cutting-edge technology.
          </Text>

          {/* Buttons */}
          <HStack spacing={4} flexWrap="wrap" pt={4}>
            <Button
              size="lg"
              bg="rgba(214, 139, 179, 0.1)"
              color="white"
              px={8}
              py={6}
              borderRadius="full"
              fontWeight="600"
              _hover={{
                bgGradient: "linear(to-r, #A668C4, #7B337E)",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 30px rgba(166, 104, 196, 0.4)"
              }}
              transition="all 0.3s"
            >
              View Projects
            </Button>
            <Button
              size="lg"
              bg="rgba(255, 255, 255, 0.1)"
              color="white"
              px={8}
              py={6}
              borderRadius="full"
              fontWeight="600"
              border="2px solid"
              borderColor="rgba(245, 213, 224, 0.3)"
              backdropFilter="blur(10px)"
              _hover={{
                borderColor: "#F5D5E0",
                bg: "rgba(255, 255, 255, 0.15)",
                transform: "translateY(-2px)"
              }}
              transition="all 0.3s"
            >
              Get in Touch
            </Button>
          </HStack>
        </VStack>
      </Container>

      {/* Scroll Indicator */}
      <VStack
        position="absolute"
        bottom="8"
        left="50%"
        transform="translateX(-50%)"
        spacing={2}
        zIndex="3"
        animation="bounce 2s infinite"
      >
        <Box
          w="24px"
          h="40px"
          border="2px solid"
          borderColor="rgba(245, 213, 224, 0.5)"
          borderRadius="20px"
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          pt="8px"
        >
          <Box
            w="3px"
            h="8px"
            bg="#F5D5E0"
            borderRadius="2px"
            animation="scrollWheel 1.5s infinite"
          />
        </Box>
        <Text fontSize="xs" letterSpacing="0.2em" color="rgba(245, 213, 224, 0.7)" fontWeight="600">
          SCROLL
        </Text>
      </VStack>

      {/* Decorative floating dots */}
      <Box
        position="absolute"
        top="20%"
        left="5%"
        w="100px"
        h="8px"
        bg="rgba(166, 104, 196, 0.4)"
        borderRadius="full"
        opacity="0.6"
        animation="float 3s ease-in-out infinite"
        zIndex="1"
      />
      <Box
        position="absolute"
        top="60%"
        left="8%"
        w="6px"
        h="6px"
        bg="rgba(245, 213, 224, 0.5)"
        borderRadius="full"
        opacity="0.6"
        animation="float 3s ease-in-out infinite 1s"
        zIndex="1"
      />

      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
        @keyframes scrollWheel {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes morphWave {
          0%, 100% { 
            border-radius: 50% 40% 60% 50%;
            transform: rotate(0deg) scale(1);
          }
          50% { 
            border-radius: 40% 60% 50% 40%;
            transform: rotate(180deg) scale(1.05);
          }
        }
      `}</style>
    </Box>
  );
}