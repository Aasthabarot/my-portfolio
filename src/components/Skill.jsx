'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SkillsSection() {
  const canvasRef = useRef(null);

  const frontendSkills = [
    { name: 'React.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB' },
    { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: '#000000' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#F7DF1E' },
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178C6' },
    { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#06B6D4' },
    { name: 'Bootstrap', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', color: '#7952B3' },
    { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: '#E34F26' },
    { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#1572B6' },
    { name: 'Material UI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg', color: '#007FFF' },
    { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: '#F24E1E' },
  ];

  const backendSkills = [
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933' },
    { name: 'Express.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', color: '#000000' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47A248' },
    { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', color: '#FFCA28' },
    { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', color: '#FF9900' },
    { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: '#181717' },
    { name: 'GitLab', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg', color: '#FC6D26' },
    { name: 'WordPress', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg', color: '#21759B' },
    { name: 'Vercel', logo: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png', color: '#000000' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#F05032' },
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Minimal particle system
    const particleCount = 80;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xF5D5E0,
      size: 0.05,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Single minimal ring
    const ringGeometry = new THREE.TorusGeometry(3, 0.02, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xA668C4,
      transparent: true,
      opacity: 0.15
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    const clock = new THREE.Clock();
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      particles.rotation.y = time * 0.02;
      ring.rotation.z = time * 0.1;

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
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '50vh', paddingTop: '60px', paddingBottom: '60px', overflow: 'hidden', background: '#210635' }}>
      {/* Main Purple Gradient Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #6667AB 0%, #420D4B 50%, #7B337E 100%)',
        zIndex: 0
      }} />

      {/* Minimal Three.js Canvas Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        opacity: 0.25
      }}>
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {/* Minimal decorative circles */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '8%',
        width: 'clamp(200px, 20vw, 300px)',
        height: 'clamp(200px, 20vw, 300px)',
        borderRadius: '50%',
        background: 'rgba(166, 104, 196, 0.08)',
        filter: 'blur(50px)',
        zIndex: 1,
        animation: 'floatSlow 12s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '8%',
        width: 'clamp(250px, 22vw, 350px)',
        height: 'clamp(250px, 22vw, 350px)',
        borderRadius: '50%',
        background: 'rgba(245, 213, 224, 0.06)',
        filter: 'blur(60px)',
        zIndex: 1,
        animation: 'floatSlow 15s ease-in-out infinite reverse'
      }} />

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Skills Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(35px, 5vw, 55px)' }}>
          {/* Frontend Skills Row */}
          <div style={{ 
            position: 'relative',
            overflow: 'hidden',
            padding: 'clamp(18px, 3.5vw, 28px) 0',
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: 'clamp(16px, 2.5vw, 24px)',
            border: '1px solid rgba(245, 213, 224, 0.12)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)'
          }}>
            <div style={{
              display: 'flex',
              animation: 'scrollLeft 45s linear infinite',
              width: 'fit-content',
              gap: 'clamp(12px, 2.5vw, 18px)'
            }}>
              {[...frontendSkills, ...frontendSkills, ...frontendSkills, ...frontendSkills].map((skill, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      minWidth: 'clamp(150px, 19vw, 190px)',
                      height: 'clamp(90px, 13vw, 120px)',
                      background: 'rgba(255, 255, 255, 0.06)',
                      backdropFilter: 'blur(12px)',
                      border: '1.5px solid rgba(245, 213, 224, 0.2)',
                      borderRadius: 'clamp(14px, 2.5vw, 20px)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 'clamp(10px, 2vw, 14px)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                      e.currentTarget.style.borderColor = '#F5D5E0';
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(166, 104, 196, 0.4)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      const img = e.currentTarget.querySelector('img');
                      if (img) {
                        img.style.transform = 'scale(1.15) rotate(5deg)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.borderColor = 'rgba(245, 213, 224, 0.2)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                      const img = e.currentTarget.querySelector('img');
                      if (img) {
                        img.style.transform = 'scale(1) rotate(0deg)';
                      }
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'linear-gradient(45deg, transparent, rgba(245, 213, 224, 0.05), transparent)',
                      animation: 'shimmer 5s infinite',
                      pointerEvents: 'none'
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: `linear-gradient(to right, transparent, ${skill.color}60, transparent)`,
                      opacity: 0.8
                    }} />
                    <div style={{
                      width: 'clamp(40px, 7vw, 56px)',
                      height: 'clamp(40px, 7vw, 56px)',
                      borderRadius: '14px',
                      background: `${skill.color}10`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1.5px solid ${skill.color}25`,
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: `radial-gradient(circle at center, ${skill.color}15, transparent)`,
                        animation: 'pulse 3s ease-in-out infinite'
                      }} />
                      <img 
                        src={skill.logo} 
                        alt={skill.name}
                        style={{ 
                          width: 'clamp(24px, 4.5vw, 34px)', 
                          height: 'clamp(24px, 4.5vw, 34px)',
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          animation: 'floatIcon 3s ease-in-out infinite',
                          position: 'relative',
                          zIndex: 2
                        }} 
                      />
                    </div>
                    <span style={{
                      fontSize: 'clamp(12px, 2vw, 15px)',
                      fontWeight: '700',
                      color: 'white',
                      textAlign: 'center',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      letterSpacing: '0.01em',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Backend Skills Row */}
          <div style={{ 
            position: 'relative',
            overflow: 'hidden',
            padding: 'clamp(18px, 3.5vw, 28px) 0',
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: 'clamp(16px, 2.5vw, 24px)',
            border: '1px solid rgba(245, 213, 224, 0.12)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)'
          }}>
            <div style={{
              display: 'flex',
              animation: 'scrollRight 45s linear infinite',
              width: 'fit-content',
              gap: 'clamp(12px, 2.5vw, 18px)'
            }}>
              {[...backendSkills, ...backendSkills, ...backendSkills, ...backendSkills].map((skill, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      minWidth: 'clamp(150px, 19vw, 190px)',
                      height: 'clamp(90px, 13vw, 120px)',
                      background: 'rgba(255, 255, 255, 0.06)',
                      backdropFilter: 'blur(12px)',
                      border: '1.5px solid rgba(245, 213, 224, 0.2)',
                      borderRadius: 'clamp(14px, 2.5vw, 20px)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 'clamp(10px, 2vw, 14px)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                      e.currentTarget.style.borderColor = '#F5D5E0';
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(166, 104, 196, 0.4)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      const img = e.currentTarget.querySelector('img');
                      if (img) {
                        img.style.transform = 'scale(1.15) rotate(-5deg)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.borderColor = 'rgba(245, 213, 224, 0.2)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                      const img = e.currentTarget.querySelector('img');
                      if (img) {
                        img.style.transform = 'scale(1) rotate(0deg)';
                      }
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'linear-gradient(45deg, transparent, rgba(245, 213, 224, 0.05), transparent)',
                      animation: 'shimmer 5s infinite',
                      pointerEvents: 'none'
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: `linear-gradient(to right, transparent, ${skill.color}60, transparent)`,
                      opacity: 0.8
                    }} />
                    <div style={{
                      width: 'clamp(40px, 7vw, 56px)',
                      height: 'clamp(40px, 7vw, 56px)',
                      borderRadius: '14px',
                      background: `${skill.color}10`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1.5px solid ${skill.color}25`,
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: `radial-gradient(circle at center, ${skill.color}15, transparent)`,
                        animation: 'pulse 3s ease-in-out infinite'
                      }} />
                      <img 
                        src={skill.logo} 
                        alt={skill.name}
                        style={{ 
                          width: 'clamp(24px, 4.5vw, 34px)', 
                          height: 'clamp(24px, 4.5vw, 34px)',
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          animation: 'floatIcon 3s ease-in-out infinite',
                          position: 'relative',
                          zIndex: 2
                        }} 
                      />
                    </div>
                    <span style={{
                      fontSize: 'clamp(12px, 2vw, 15px)',
                      fontWeight: '700',
                      color: 'white',
                      textAlign: 'center',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      letterSpacing: '0.01em',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        @keyframes scrollRight {
          0% {
            transform: translateX(-25%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}