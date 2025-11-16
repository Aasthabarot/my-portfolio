'use client';

import {
  Box,
  Button,
  CloseButton,
  IconButton,
  VStack,
  Portal,
  Flex,
  Drawer,
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState, useEffect } from 'react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionOffsets = navItems.map((item) => {
        const el = document.querySelector(item.href);
        return el ? el.offsetTop : 0;
      });

      const current = sectionOffsets.findIndex(
        (offset, i) =>
          scrollY >= offset - 100 &&
          (i === sectionOffsets.length - 1 || scrollY < sectionOffsets[i + 1] - 100)
      );

      setActiveIndex(current !== -1 ? current : 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ href, label, onClick, index }) => {
    const isActive = activeIndex === index;
    const isClicked = clickedIndex === index;

    return (
      <Box
        as="a"
        href={href}
        onClick={() => {
          onClick?.();
          setActiveIndex(index);
          setClickedIndex(index);
          setTimeout(() => setClickedIndex(null), 600);
        }}
        position="relative"
        px={4}
        py={2}
        fontWeight="semibold"
        color={isActive ? '#F5D5E0' : 'rgba(245, 213, 224, 0.7)'}
        transition="all 0.3s ease"
        cursor="pointer"
        _hover={{
          color: '#F5D5E0',
          transform: 'translateY(-2px)',
        }}
      >
        {/* Hover Glow Background */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%) scale(0)"
          width="3rem"
          height="3rem"
          background="radial-gradient(circle, rgba(166, 104, 196, 0.3), transparent 70%)"
          borderRadius="50%"
          opacity="0"
          transition="all 0.3s ease-in-out"
          zIndex="-1"
          sx={{
            'a:hover > &': {
              transform: 'translate(-50%, -50%) scale(1)',
              opacity: 1,
            }
          }}
        />

        {/* Animated Dot on Hover */}
        <Box
          position="absolute"
          top="-8px"
          left="50%"
          transform="translateX(-50%)"
          width="6px"
          height="6px"
          bg="#F5D5E0"
          borderRadius="full"
          opacity="0"
          boxShadow="0 0 10px #F5D5E0"
          transition="opacity 0.3s ease"
          animation="dotBounce 0.6s ease-in-out infinite"
          sx={{
            'a:hover > &': {
              opacity: 1,
            }
          }}
        />

        {/* Click Ripple Effect */}
        {isClicked && (
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="40px"
            height="40px"
            border="2px solid"
            borderColor="#F5D5E0"
            borderRadius="50%"
            animation="rippleEffect 0.6s ease-out"
            pointerEvents="none"
          />
        )}

        {/* Active Indicator Underline */}
        {isActive && (
          <Box
            position="absolute"
            bottom="-2px"
            left="50%"
            transform="translateX(-50%)"
            width="60%"
            height="2px"
            bg="#F5D5E0"
            borderRadius="full"
            boxShadow="0 0 8px #F5D5E0"
          />
        )}

        {label}
      </Box>
    );
  };

  return (
    <>
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dotBounce {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-8px) translateX(-50%);
          }
        }

        @keyframes rippleEffect {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }

        @keyframes decorativeBounce {
          0%, 100% {
            transform: translateY(-50%);
          }
          50% {
            transform: translateY(-60%);
          }
        }
      `}</style>

      <Box
        as="header"
        position="fixed"
        top="0"
        w="100%"
        zIndex="1000"
        bgGradient="linear(135deg, #6667AB 0%, #420D4B 50%, #7B337E 100%)"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
        px={6}
        py={4}
        backdropFilter="blur(10px)"
        animation="slideDown 0.6s ease-out, glowPulse 3s ease-in-out infinite"
      >
        <Flex justify="space-between" align="center">
          {/* Desktop Navigation */}
          <Flex 
            display={{ base: 'none', md: 'flex' }} 
            gap={6} 
            mx="auto"
          >
            {navItems.map((item, index) => (
              <Box
                key={item.href}
                sx={{
                  animation: `slideDown 0.6s ease-out ${index * 0.1}s backwards`
                }}
              >
                <NavLink {...item} index={index} />
              </Box>
            ))}
          </Flex>

          {/* Mobile Drawer */}
          <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
            <Drawer.Trigger asChild>
              <IconButton
                aria-label="Open Menu"
                icon={<GiHamburgerMenu />}
                display={{ base: 'flex', md: 'none' }}
                variant="outline"
                borderColor="#F5D5E0"
                color="#F5D5E0"
                _hover={{ 
                  bg: 'rgba(245, 213, 224, 0.15)',
                  transform: 'rotate(90deg)',
                }}
                transition="all 0.3s ease"
              />
            </Drawer.Trigger>

            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content 
                  bgGradient="linear(135deg, #6667AB 0%, #420D4B 50%, #7B337E 100%)"
                  boxShadow="0 0 40px rgba(166, 104, 196, 0.3)"
                >
                  <Drawer.Header display="flex" justifyContent="flex-end" alignItems="center">
                    <Drawer.CloseTrigger asChild>
                      <CloseButton 
                        size="sm" 
                        color="#F5D5E0"
                        _hover={{
                          bg: 'rgba(245, 213, 224, 0.15)',
                          transform: 'rotate(90deg)',
                        }}
                        transition="all 0.3s ease"
                      />
                    </Drawer.CloseTrigger>
                  </Drawer.Header>

                  <Drawer.Body>
                    <VStack align="start" spacing={6} mt={6}>
                      {navItems.map((item, index) => (
                        <Box
                          key={item.href}
                          w="100%"
                          sx={{
                            animation: `slideDown 0.5s ease-out ${index * 0.1}s backwards`
                          }}
                        >
                          <NavLink
                            {...item}
                            index={index}
                            onClick={() => setIsOpen(false)}
                          />
                        </Box>
                      ))}
                    </VStack>
                  </Drawer.Body>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
        </Flex>

        {/* Decorative Animated Dots */}
        <Box
          position="absolute"
          top="50%"
          left="20px"
          transform="translateY(-50%)"
          width="4px"
          height="4px"
          bg="rgba(245, 213, 224, 0.4)"
          borderRadius="full"
          animation="decorativeBounce 2s ease-in-out infinite"
        />
        <Box
          position="absolute"
          top="50%"
          right="20px"
          transform="translateY(-50%)"
          width="4px"
          height="4px"
          bg="rgba(245, 213, 224, 0.4)"
          borderRadius="full"
          sx={{
            animation: 'decorativeBounce 2s ease-in-out infinite 0.5s'
          }}
        />
      </Box>
    </>
  );
};

export default Header;