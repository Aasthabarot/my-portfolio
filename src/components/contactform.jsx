'use client';

import { useState } from 'react';
import { Mail, User, Send, Phone, MapPin } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setShowToast(true);
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px', overflow: 'hidden', background: '#210635' }}>
      {/* Main Purple Gradient Background - Exact Match */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #6667AB 0%, #420D4B 50%, #7B337E 100%)',
        zIndex: 0
      }} />

      {/* Decorative Background Circles - Exact Match */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'rgba(166, 104, 196, 0.15)',
        filter: 'blur(60px)',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '15%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'rgba(123, 51, 126, 0.2)',
        filter: 'blur(50px)',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '25%',
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: 'rgba(102, 103, 171, 0.12)',
        filter: 'blur(40px)',
        zIndex: 1
      }} />

      {/* Wave Border Decorations - Exact Match */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '200px',
        height: '200px',
        border: '2px solid rgba(245, 213, 224, 0.2)',
        borderRadius: '50% 40% 60% 50%',
        zIndex: 1,
        animation: 'morphWave 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '30%',
        width: '150px',
        height: '150px',
        border: '2px solid rgba(166, 104, 196, 0.15)',
        borderRadius: '60% 50% 40% 60%',
        zIndex: 1,
        animation: 'morphWave 10s ease-in-out infinite reverse'
      }} />

      {/* Decorative floating elements - Exact Match */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '5%',
        width: '100px',
        height: '8px',
        background: 'rgba(166, 104, 196, 0.4)',
        borderRadius: '9999px',
        opacity: 0.6,
        animation: 'float 3s ease-in-out infinite',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        left: '8%',
        width: '6px',
        height: '6px',
        background: 'rgba(245, 213, 224, 0.5)',
        borderRadius: '50%',
        opacity: 0.6,
        animation: 'float 3s ease-in-out infinite 1s',
        zIndex: 1
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {/* Header Section */}
          <div style={{ textAlign: 'center', animation: 'fadeInUp 0.8s ease-out' }}>
            {/* Label with line */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, #F5D5E0, transparent)' }} />
              <div style={{
                fontSize: '12px',
                letterSpacing: '0.25em',
                color: '#F5D5E0',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>
                GET IN TOUCH
              </div>
            </div>

            <h1 style={{
 fontSize: 'clamp(32px, 5vw, 48px)',
               fontWeight: '800',
              color: 'white',
              letterSpacing: 'tight',
              lineHeight: '1.1',
              marginBottom: '24px'
            }}>
              Let's Create Something
              <br />
              <span style={{ 
                background: 'linear-gradient(to right, #F5D5E0, #A668C4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Amazing Together</span>
            </h1>

            {/* Divider */}
            <div style={{
              width: '100px',
              height: '3px',
              background: 'linear-gradient(to right, #7B337E, #A668C4)',
              margin: '0 auto 24px'
            }} />

            <p style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.125rem)',
              color: '#F5D5E0',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.8',
              padding: '0 20px'
            }}>
              Have a project in mind or just want to say hello? Drop me a message
              and I'll get back to you as soon as possible!
            </p>
          </div>

          {/* Contact Details and Form Container */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            alignItems: 'start'
          }}>
            {/* Left Column - Contact Details */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              animation: 'slideInLeft 0.8s ease-out 0.2s backwards'
            }}>
              {/* Contact Info Card 1 */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(245, 213, 224, 0.2)',
                borderRadius: '16px',
                padding: '24px',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(5px)';
                e.currentTarget.style.borderColor = '#F5D5E0';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(166, 104, 196, 0.3)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.borderColor = 'rgba(245, 213, 224, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(245, 213, 224, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Mail style={{ width: '24px', height: '24px', color: '#F5D5E0' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: 'rgba(245, 213, 224, 0.7)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</p>
                    <p style={{ fontSize: '14px', color: 'white', fontWeight: '600', wordBreak: 'break-word' }}>
                      barotaastha38@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info Card 2 */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(245, 213, 224, 0.2)',
                borderRadius: '16px',
                padding: '24px',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(5px)';
                e.currentTarget.style.borderColor = '#F5D5E0';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(166, 104, 196, 0.3)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.borderColor = 'rgba(245, 213, 224, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(245, 213, 224, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MapPin style={{ width: '24px', height: '24px', color: '#F5D5E0' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: 'rgba(245, 213, 224, 0.7)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Location</p>
                    <p style={{ fontSize: '14px', color: 'white', fontWeight: '600' }}>
                      Ahmedabad, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info Card 3 */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(245, 213, 224, 0.2)',
                borderRadius: '16px',
                padding: '24px',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(5px)';
                e.currentTarget.style.borderColor = '#F5D5E0';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(166, 104, 196, 0.3)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.borderColor = 'rgba(245, 213, 224, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(245, 213, 224, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Phone style={{ width: '24px', height: '24px', color: '#F5D5E0' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: 'rgba(245, 213, 224, 0.7)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phone</p>
                    <p style={{ fontSize: '14px', color: 'white', fontWeight: '600' }}>
                      +91 9104578558
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(245, 213, 224, 0.2)',
              borderRadius: '24px',
              padding: 'clamp(24px, 4vw, 48px)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              animation: 'fadeInUp 0.8s ease-out 0.4s backwards'
            }}>
              <div style={{
                content: '""',
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(90deg, transparent, rgba(245, 213, 224, 0.1), transparent)',
                animation: 'shimmer 3s infinite',
                pointerEvents: 'none'
              }} />
              
              <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Name Field */}
                  <div>
                    <label style={{
                      display: 'block',
                      color: 'rgba(245, 213, 224, 0.9)',
                      fontWeight: '600',
                      marginBottom: '8px',
                      fontSize: '14px'
                    }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(245, 213, 224, 0.3)',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '15px',
                        transition: 'all 0.3s',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#F5D5E0';
                        e.target.style.boxShadow = '0 0 0 1px #F5D5E0';
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(245, 213, 224, 0.3)';
                        e.target.style.boxShadow = 'none';
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                      }}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label style={{
                      display: 'block',
                      color: 'rgba(245, 213, 224, 0.9)',
                      fontWeight: '600',
                      marginBottom: '8px',
                      fontSize: '14px'
                    }}>
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(245, 213, 224, 0.3)',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '15px',
                        transition: 'all 0.3s',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#F5D5E0';
                        e.target.style.boxShadow = '0 0 0 1px #F5D5E0';
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(245, 213, 224, 0.3)';
                        e.target.style.boxShadow = 'none';
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                      }}
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label style={{
                      display: 'block',
                      color: 'rgba(245, 213, 224, 0.9)',
                      fontWeight: '600',
                      marginBottom: '8px',
                      fontSize: '14px'
                    }}>
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      required
                      rows={5}
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(245, 213, 224, 0.3)',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '15px',
                        transition: 'all 0.3s',
                        outline: 'none',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#F5D5E0';
                        e.target.style.boxShadow = '0 0 0 1px #F5D5E0';
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(245, 213, 224, 0.3)';
                        e.target.style.boxShadow = 'none';
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '16px 32px',
                      background: 'rgba(214, 139, 179, 0.1)',
                      border: '2px solid rgba(245, 213, 224, 0.3)',
                      borderRadius: '9999px',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '600',
                      transition: 'all 0.3s',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.7 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.target.style.background = 'linear-gradient(to right, #A668C4, #7B337E)';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 10px 30px rgba(166, 104, 196, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.target.style.background = 'rgba(214, 139, 179, 0.1)';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          border: '2px solid white',
                          borderTopColor: 'transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }} />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send style={{ width: '18px', height: '18px' }} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: 'linear-gradient(135deg, #A668C4, #7B337E)',
          color: 'white',
          padding: '20px 32px',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(166, 104, 196, 0.4)',
          zIndex: 1000,
          animation: 'slideInRight 0.3s ease-out',
          border: '1px solid rgba(245, 213, 224, 0.3)',
          maxWidth: '90vw'
        }}>
          <p style={{ fontWeight: '600', marginBottom: '4px', fontSize: '16px' }}>Message sent successfully!</p>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>I'll get back to you soon.</p>
        </div>
      )}

      <style jsx>{`
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
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input::placeholder,
        textarea::placeholder {
          color: rgba(245, 213, 224, 0.4);
        }
        
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}