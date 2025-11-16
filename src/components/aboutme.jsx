'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AboutSection() {
  const canvasRef = useRef(null);

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

    const particleCount = 150;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 25;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xF5D5E0,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const ringGeometry = new THREE.TorusGeometry(3.5, 0.03, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xA668C4,
      transparent: true,
      opacity: 0.25
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 4;
    scene.add(ring);

    const clock = new THREE.Clock();
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      particles.rotation.y = time * 0.04;
      particles.rotation.x = time * 0.02;
      ring.rotation.z = time * 0.15;

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
    <div style={{ 
      position: 'relative', 
      minHeight: '100vh', 
      padding: 'clamp(60px, 8vw, 100px) clamp(15px, 3vw, 50px)',
      overflow: 'hidden', 
      background: '#210635',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Background Gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #6667AB 0%, #420D4B 50%, #7B337E 100%)',
        zIndex: 0
      }} />

      {/* Three.js Canvas */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        opacity: 0.35
      }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Floating Orbs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: 'clamp(200px, 30vw, 300px)',
        height: 'clamp(200px, 30vw, 300px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(166, 104, 196, 0.3), transparent)',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '15%',
        width: 'clamp(250px, 35vw, 400px)',
        height: 'clamp(250px, 35vw, 400px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245, 213, 224, 0.25), transparent)',
        filter: 'blur(80px)',
        animation: 'float 10s ease-in-out infinite reverse',
        zIndex: 1
      }} />

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '1300px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center'
        }}>
          {/* Left - Content */}
          <div style={{
            position: 'relative',
            animation: 'slideInLeft 1s ease-out',
            maxWidth: '100%'
          }}>
            {/* Main Title */}
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: '800',
              color: 'white',
              marginBottom: '15px',
              letterSpacing: '-0.02em',
              lineHeight: '1.2',
            }}>
              About Me
            </h2>

            {/* Animated Underline */}
            <div style={{
              width: 'clamp(70px, 10vw, 100px)',
              height: '4px',
              background: 'linear-gradient(90deg, #A668C4, #F5D5E0, #A668C4)',
              borderRadius: '10px',
              marginBottom: '30px',
              backgroundSize: '200% 100%',
              animation: 'shimmerLine 3s ease-in-out infinite',
              boxShadow: '0 2px 15px rgba(166, 104, 196, 0.6)'
            }} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
              gap: 'clamp(30px, 5vw, 60px)',
              alignItems: 'start'
            }}>
              {/* Content Paragraph */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(245, 213, 224, 0.2)',
                borderRadius: '20px',
                padding: 'clamp(24px, 3.5vw, 35px)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'rgba(166, 104, 196, 0.4)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(166, 104, 196, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(245, 213, 224, 0.2)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
              }}>
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '5px',
                  background: 'linear-gradient(180deg, #A668C4, #F5D5E0)',
                  boxShadow: '0 0 20px rgba(166, 104, 196, 0.8)'
                }} />
                
                <p style={{
                  fontSize: 'clamp(14px, 2vw, 17px)',
                  lineHeight: '1.8',
                  color: 'rgba(255, 255, 255, 0.95)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  margin: 0,
                  marginBottom: '16px'
                }}>
                  I'm a passionate <strong style={{ color: '#F5D5E0', fontWeight: '700' }}>Full Stack Developer</strong> with over 2 years of hands-on experience in building scalable, high-performance web applications. Currently pursuing my <strong style={{ color: '#A668C4', fontWeight: '700' }}>Master of Computer Applications (MCA)</strong> at Gujarat Technological University while working at <strong style={{ color: '#F5D5E0', fontWeight: '700' }}>StellarMind.ai</strong>.
                </p>

                <p style={{
                  fontSize: 'clamp(14px, 2vw, 17px)',
                  lineHeight: '1.8',
                  color: 'rgba(255, 255, 255, 0.95)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  margin: 0,
                  marginBottom: '16px'
                }}>
                  My journey started as a <strong style={{ color: '#A668C4', fontWeight: '700' }}>Frontend Developer Intern</strong> in June 2024, and I've grown into a full-stack role, leading development for platforms like <strong style={{ color: '#F5D5E0', fontWeight: '700' }}>BizCivitas</strong>. I specialize in <strong style={{ color: '#F5D5E0', fontWeight: '700' }}>React.js, Next.js, Node.js, Express.js, MongoDB, and AWS</strong>, creating end-to-end solutions with clean code and robust architecture.
                </p>

                <p style={{
                  fontSize: 'clamp(14px, 2vw, 17px)',
                  lineHeight: '1.8',
                  color: 'rgba(255, 255, 255, 0.95)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  margin: 0
                }}>
                  From implementing secure authentication systems to deploying scalable backends on <strong style={{ color: '#A668C4', fontWeight: '700' }}>AWS</strong> and frontends on <strong style={{ color: '#A668C4', fontWeight: '700' }}>Vercel</strong>, I thrive in agile environments and love collaborating with cross-functional teams to bring innovative ideas to life. I'm always eager to learn new technologies and take on challenging projects that make a real impact.
                </p>
              </div>

              {/* Right - Image Placeholder with Rotating Icons */}
              <div style={{
                position: 'relative',
                height: 'clamp(350px, 50vh, 500px)',
                animation: 'slideInRight 1s ease-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Main Circle Container */}
                <div style={{
                  position: 'relative',
                  width: 'clamp(280px, 35vw, 400px)',
                  height: 'clamp(280px, 35vw, 400px)',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(166, 104, 196, 0.2), rgba(245, 213, 224, 0.15))',
                  backdropFilter: 'blur(30px)',
                  border: '3px solid rgba(245, 213, 224, 0.3)',
                  boxShadow: '0 20px 60px rgba(166, 104, 196, 0.4), inset 0 0 80px rgba(245, 213, 224, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'float 6s ease-in-out infinite',
                  transition: 'all 0.5s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 25px 80px rgba(166, 104, 196, 0.6), inset 0 0 100px rgba(245, 213, 224, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(166, 104, 196, 0.4), inset 0 0 80px rgba(245, 213, 224, 0.1)';
                }}>
                  <div style={{ textAlign: 'center', padding: 'clamp(20px, 4vw, 30px)' }}>
                    <div style={{
                      fontSize: 'clamp(50px, 8vw, 70px)',
                      marginBottom: '15px',
                      animation: 'bounce 2s ease-in-out infinite'
                    }}>
                      📸
                    </div>
                    <h3 style={{
                      fontSize: 'clamp(18px, 2.5vw, 24px)',
                      fontWeight: '700',
                      color: '#F5D5E0',
                      marginBottom: '10px',
                      textShadow: '0 4px 12px rgba(245, 213, 224, 0.5)'
                    }}>
                      Your Image Here
                    </h3>
                    <p style={{
                      fontSize: 'clamp(12px, 1.6vw, 14px)',
                      color: 'rgba(255, 255, 255, 0.75)',
                      lineHeight: '1.6',
                      maxWidth: '220px',
                      margin: '0 auto'
                    }}>
                      Add your profile picture or creative visual
                    </p>
                  </div>

                  {/* Circular Rotating Icons */}
                  {[
                    { emoji: '💻', delay: '0s' },
                    { emoji: '⚡', delay: '-2.66s' },
                    { emoji: '🚀', delay: '-5.33s' }
                  ].map((item, idx) => (
                    <div key={idx} style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '100%',
                      height: '100%',
                      animation: `rotateCircle 8s linear infinite`,
                      animationDelay: item.delay,
                      pointerEvents: 'none'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '0%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 'clamp(60px, 7vw, 80px)',
                        height: 'clamp(60px, 7vw, 80px)',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(166, 104, 196, 0.3), rgba(245, 213, 224, 0.3))',
                        backdropFilter: 'blur(10px)',
                        border: '2px solid rgba(245, 213, 224, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'clamp(24px, 3.5vw, 32px)',
                        boxShadow: '0 8px 24px rgba(166, 104, 196, 0.4)',
                        animation: `counterRotate 8s linear infinite`
                      }}>
                        {item.emoji}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-80px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(80px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes shimmerLine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes rotateCircle {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes counterRotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }

        @media (min-width: 900px) {
          .content-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}