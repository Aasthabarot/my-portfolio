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
        opacity: 0.6,
        emissive: color,
        emissiveIntensity: 0.3,
        wireframe: false
      });
      return new THREE.Mesh(geometry, material);
    };

    // Create multiple rings
    const ring1 = createRing(4, 0x00d4d4, 0.05);
    ring1.rotation.x = Math.PI / 4;
    gridGroup.add(ring1);

    const ring2 = createRing(3, 0x00e5e5, 0.04);
    ring2.rotation.y = Math.PI / 3;
    gridGroup.add(ring2);

    const ring3 = createRing(5, 0x80ffff, 0.06);
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
      color: 0x00d4d4,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
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
      color: 0x00d4d4,
      transparent: true,
      opacity: 0.2
    });

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    gridGroup.add(lines);

    // Create central glowing sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0x00ffff,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.8
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    gridGroup.add(sphere);

    // Add wireframe overlay to sphere
    const wireframeGeometry = new THREE.SphereGeometry(1.1, 16, 16);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d4d4,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    gridGroup.add(wireframe);

    scene.add(gridGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x80ffff, 1, 100);
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
    <Box position="relative" minH="100vh" bg="white" overflow="hidden">
      {/* Three.js Canvas Background */}
      <Box
        position="absolute"
        top="0"
        right="0"
        w={{ base: '100%', md: '55%' }}
        h="100vh"
        zIndex="0"
        opacity={{ base: 0.4, md: 0.7 }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Box>

      {/* Gradient Overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bgGradient="linear(to-br, cyan.50, transparent, blue.50)"
        opacity="0.3"
        zIndex="0"
        pointerEvents="none"
      />

      {/* Main Content */}
      <Container
        maxW="container.xl"
        h="100vh"
        display="flex"
        alignItems="center"
        position="relative"
        zIndex="1"
      >
        <VStack
          align="flex-start"
          spacing={6}
          maxW={{ base: '100%', md: '600px' }}
          pl={{ base: 4, md: 8 }}
        >
          {/* Label with line */}
          <HStack>
            <Box w="40px" h="1px" bgGradient="linear(to-r, cyan.400, transparent)" />
            <Text
              fontSize={{ base: 'xs', md: 'sm' }}
              letterSpacing="0.25em"
              color="gray.500"
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
            color="gray.900"
          >
            Full Stack Developer
            <br />
            
          </Heading>

          {/* Divider */}
          <Box w="100px" h="3px" bgGradient="linear(to-r, cyan.400, blue.400)" />

          {/* Description */}
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="gray.600"
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
              bgGradient="linear(to-r, cyan.500, cyan.400)"
              color="white"
              px={8}
              py={6}
              borderRadius="full"
              fontWeight="600"
              _hover={{
                bgGradient: "linear(to-r, cyan.600, cyan.500)",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 30px rgba(0, 212, 212, 0.4)"
              }}
              transition="all 0.3s"
            >
              View Projects
            </Button>
            <Button
              size="lg"
              bg="white"
              color="gray.800"
              px={8}
              py={6}
              borderRadius="full"
              fontWeight="600"
              border="2px solid"
              borderColor="gray.200"
              _hover={{
                borderColor: "cyan.400",
                color: "cyan.500",
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
        zIndex="1"
        animation="bounce 2s infinite"
      >
        <Box
          w="24px"
          h="40px"
          border="2px solid"
          borderColor="gray.300"
          borderRadius="20px"
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          pt="8px"
        >
          <Box
            w="3px"
            h="8px"
            bg="cyan.400"
            borderRadius="2px"
            animation="scrollWheel 1.5s infinite"
          />
        </Box>
        <Text fontSize="xs" letterSpacing="0.2em" color="gray.400" fontWeight="600">
          SCROLL
        </Text>
      </VStack>

      {/* Decorative floating dots */}
      <Box
        position="absolute"
        top="20%"
        left="-100%"
        w="100px"
        h="8px"
        bg="cyan.400"
        borderRadius="full"
        opacity="0.4"
        animation="float 3s ease-in-out infinite"
        zIndex="1"
      />
      <Box
        position="absolute"
        top="60%"
        left="-100%"
        w="6px"
        h="6px"
        bg="cyan.300"
        borderRadius="full"
        opacity="0.4"
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
      `}</style>
    </Box>
  );
}