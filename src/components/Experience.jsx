'use client';

import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Briefcase, Calendar, MapPin, ArrowRight, Code, Rocket, Users, Star } from 'lucide-react';

export default function ExperienceSection() {
  const canvasRef = useRef(null);
  const [selectedExp, setSelectedExp] = useState(0);

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'StellarMind.ai',
      location: 'Ahmedabad, Gujarat, India',
      period: 'May 2024 – Present',
      duration: '7 months',
      type: 'Full-Time',
      icon: Rocket,
      color: '#A668C4',
      gradient: 'linear-gradient(135deg, #A668C4 0%, #7B337E 100%)',
      highlights: [
        'Designed, developed, and maintained modern full-stack web applications using React.js, Next.js, Node.js, Express.js, Firebase, and MongoDB',
        'Led both frontend and backend for multiple internal projects, integrating secure authentication, admin dashboards, and modular API services',
        'Built responsive interfaces using Chakra UI, Material UI, and Tailwind CSS to ensure accessibility and performance optimization',
        'Implemented robust backend features including email automation with Nodemailer and cloud-hosted APIs on AWS',
        'Managed deployments across Vercel and Hostinger for frontend and backend projects',
        'Collaborated closely in agile sprints, performing code reviews, debugging sessions, and version control through GitHub and GitLab'
      ],
      skills: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'AWS']
    },
    {
      title: 'Part-Time Trainee',
      company: 'Liveblack Digital Agency',
      location: 'Ahmedabad, Gujarat, India',
      period: 'Mar 2023 – Dec 2023',
      duration: '10 months',
      type: 'Part-Time',
      icon: Users,
      color: '#F5D5E0',
      gradient: 'linear-gradient(135deg, #F5D5E0 0%, #A668C4 100%)',
      highlights: [
        'Assisted in developing client-facing websites using HTML, CSS, and Bootstrap',
        'Designed and customized WordPress themes for small business clients',
        'Enhanced responsiveness and visual consistency across devices'
      ],
      skills: ['HTML', 'CSS', 'Bootstrap', 'WordPress', 'Responsive Design']
    }
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

    // Particles
    const particleCount = 150;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30;
      positions[i + 1] = (Math.random() - 0.5) * 25;
      positions[i + 2] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xF5D5E0,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Geometric shapes
    const shapes = [];
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.TorusGeometry(1.5 + i * 0.5, 0.02, 16, 100);
      const material = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xA668C4 : 0xF5D5E0,
        transparent: true,
        opacity: 0.15
      });
      const shape = new THREE.Mesh(geometry, material);
      shape.rotation.x = Math.random() * Math.PI;
      shape.rotation.y = Math.random() * Math.PI;
      shapes.push(shape);
      scene.add(shape);
    }

    const clock = new THREE.Clock();
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      particles.rotation.y = time * 0.02;
      particles.rotation.x = time * 0.01;
      
      shapes.forEach((shape, index) => {
        shape.rotation.z = time * (0.1 + index * 0.05);
        shape.rotation.x += 0.001;
      });

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
    <div className="experience-container">
      {/* Background */}
      <div className="gradient-bg" />
      
      {/* Three.js Canvas */}
      <div className="canvas-container">
        <canvas ref={canvasRef} />
      </div>

      {/* Floating orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Content */}
      <div className="content-wrapper">
        {/* Section Header */}
        <div className="section-header">
          <div className="label-container">
            <div className="line" />
            <span className="label">CAREER PATH</span>
            <div className="line" />
          </div>
          
          <h1 className="main-title">
            Professional
            <span className="gradient-text"> Experience</span>
          </h1>
          
          <div className="title-underline" />
          
          <p className="subtitle">
            Building scalable solutions and delivering impactful results
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="experience-grid">
          {/* Left Side - Company Selector */}
          <div className="company-list">
            {experiences.map((exp, index) => {
              const IconComponent = exp.icon;
              const isSelected = selectedExp === index;
              
              return (
                <div
                  key={index}
                  className={`company-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedExp(index)}
                  style={{
                    borderColor: isSelected ? exp.color : 'rgba(245, 213, 224, 0.2)',
                    background: isSelected ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <div 
                    className="company-icon"
                    style={{
                      background: `${exp.color}20`,
                      borderColor: `${exp.color}50`
                    }}
                  >
                    <IconComponent 
                      style={{ 
                        width: '24px', 
                        height: '24px', 
                        color: exp.color 
                      }} 
                    />
                  </div>
                  
                  <div className="company-info">
                    <h3 className="company-name">{exp.company}</h3>
                    <p className="company-role">{exp.title}</p>
                    <div className="company-meta">
                      <span className="duration">{exp.duration}</span>
                      <span className="type-badge" style={{ 
                        background: `${exp.color}25`,
                        color: exp.color,
                        borderColor: `${exp.color}40`
                      }}>
                        {exp.type}
                      </span>
                    </div>
                  </div>
                  
                  <ArrowRight 
                    className={`arrow-icon ${isSelected ? 'visible' : ''}`}
                    style={{ color: exp.color }}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Side - Experience Details */}
          <div className="experience-details">
            {experiences.map((exp, index) => {
              const isVisible = selectedExp === index;
              
              return (
                <div
                  key={index}
                  className={`detail-card ${isVisible ? 'visible' : ''}`}
                  style={{
                    borderColor: exp.color + '40'
                  }}
                >
                  {/* Top gradient bar */}
                  <div 
                    className="top-bar"
                    style={{ background: exp.gradient }}
                  />

                  {/* Header */}
                  <div className="detail-header">
                    <div>
                      <h2 className="detail-title">{exp.title}</h2>
                      <h3 className="detail-company" style={{ color: exp.color }}>
                        {exp.company}
                      </h3>
                    </div>
                    
                    <div className="header-badge" style={{
                      background: exp.gradient
                    }}>
                      <Star style={{ width: '18px', height: '18px' }} />
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="detail-meta">
                    <div className="meta-item">
                      <Calendar style={{ width: '16px', height: '16px', color: exp.color }} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="meta-item">
                      <MapPin style={{ width: '16px', height: '16px', color: exp.color }} />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="highlights-section">
                    <h4 className="section-title">Key Responsibilities</h4>
                    <ul className="highlights-list">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="highlight-item">
                          <div 
                            className="bullet"
                            style={{ background: exp.color }}
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div className="skills-section">
                    <h4 className="section-title">Technologies & Skills</h4>
                    <div className="skills-grid">
                      {exp.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className="skill-tag"
                          style={{
                            background: `${exp.color}15`,
                            borderColor: `${exp.color}40`,
                            color: exp.color
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .experience-container {
          position: relative;
          min-height: 100vh;
          padding: 80px 0;
          overflow: hidden;
        }

        .gradient-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #210635 0%, #420D4B 50%, #6667AB 100%);
          z-index: 0;
        }

        .canvas-container {
          position: absolute;
          inset: 0;
          opacity: 0.25;
          z-index: 1;
        }

        .canvas-container canvas {
          width: 100%;
          height: 100%;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 1;
          animation: float 15s ease-in-out infinite;
        }

        .orb-1 {
          top: 10%;
          right: 10%;
          width: 400px;
          height: 400px;
          background: rgba(166, 104, 196, 0.15);
        }

        .orb-2 {
          bottom: 20%;
          left: 5%;
          width: 350px;
          height: 350px;
          background: rgba(245, 213, 224, 0.1);
          animation-delay: -5s;
        }

        .orb-3 {
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          background: rgba(123, 51, 126, 0.12);
          animation-delay: -10s;
        }

        .content-wrapper {
          position: relative;
          z-index: 10;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Section Header */
        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .label-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .line {
          width: 50px;
          height: 2px;
          background: linear-gradient(to right, transparent, #F5D5E0, transparent);
        }

        .label {
          font-size: 13px;
          letter-spacing: 0.3em;
          color: #F5D5E0;
          font-weight: 700;
        }

        .main-title {
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 900;
          color: white;
          margin: 0 0 20px 0;
          line-height: 1.1;
        }

        .gradient-text {
          background: linear-gradient(135deg, #F5D5E0 0%, #A668C4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .title-underline {
          width: 120px;
          height: 4px;
          background: linear-gradient(90deg, #7B337E, #A668C4);
          margin: 0 auto 24px;
          border-radius: 2px;
        }

        .subtitle {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          color: rgba(245, 213, 224, 0.8);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* Experience Grid */
        .experience-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 40px;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .experience-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        /* Company List */
        .company-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: sticky;
          top: 100px;
        }

        @media (max-width: 1024px) {
          .company-list {
            position: static;
            flex-direction: row;
            overflow-x: auto;
          }
        }

        .company-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(245, 213, 224, 0.2);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 1024px) {
          .company-item {
            min-width: 300px;
          }
        }

        .company-item:hover {
          transform: translateX(8px);
          background: rgba(255, 255, 255, 0.08);
        }

        .company-item.selected {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(12px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .company-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: currentColor;
          opacity: 0;
          transition: opacity 0.4s;
        }

        .company-item.selected::before {
          opacity: 1;
        }

        .company-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid;
          flex-shrink: 0;
        }

        .company-info {
          flex: 1;
          min-width: 0;
        }

        .company-name {
          font-size: 16px;
          font-weight: 700;
          color: white;
          margin: 0 0 4px 0;
        }

        .company-role {
          font-size: 14px;
          color: rgba(245, 213, 224, 0.7);
          margin: 0 0 8px 0;
        }

        .company-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .duration {
          font-size: 12px;
          color: rgba(245, 213, 224, 0.6);
        }

        .type-badge {
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          border: 1px solid;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .arrow-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.4s;
        }

        .arrow-icon.visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* Experience Details */
        .experience-details {
          position: relative;
          min-height: 600px;
        }

        .detail-card {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 2px solid;
          border-radius: 24px;
          padding: 40px;
          opacity: 0;
          transform: translateY(30px);
          pointer-events: none;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: auto;
        }

        @media (max-width: 768px) {
          .detail-card {
            padding: 24px;
          }
        }

        .detail-card.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
          position: relative;
        }

        .top-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          border-radius: 24px 24px 0 0;
        }

        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 24px;
          gap: 16px;
        }

        .detail-title {
          font-size: clamp(1.75rem, 4vw, 2.25rem);
          font-weight: 800;
          color: white;
          margin: 0 0 8px 0;
        }

        .detail-company {
          font-size: clamp(1.25rem, 3vw, 1.5rem);
          font-weight: 600;
          margin: 0;
        }

        .header-badge {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .detail-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(245, 213, 224, 0.15);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          color: rgba(245, 213, 224, 0.8);
        }

        .highlights-section {
          margin-bottom: 32px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: #F5D5E0;
          margin: 0 0 16px 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .highlights-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .highlight-item {
          display: flex;
          gap: 12px;
          font-size: 15px;
          color: rgba(245, 213, 224, 0.85);
          line-height: 1.7;
        }

        .bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-top: 8px;
          flex-shrink: 0;
        }

        .skills-section {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(245, 213, 224, 0.15);
        }

        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .skill-tag {
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          border: 1px solid;
          transition: all 0.3s;
        }

        .skill-tag:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(30px, -30px);
          }
          66% {
            transform: translate(-20px, 20px);
          }
        }
      `}</style>
    </div>
  );
}