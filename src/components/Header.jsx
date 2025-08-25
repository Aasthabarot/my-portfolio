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

  return (
    <Box
      as="a"
      href={href}
      onClick={() => {
        onClick?.();
        setActiveIndex(index);
      }}
      position="relative"
      px={4}
      py={2}
      fontWeight="semibold"
      color={isActive ? '#00FFFF' : '#C0E8FF'}
      transition="all 0.3s ease"
      cursor="pointer"
      _hover={{
        color: '#00FFFF',
      }}
      _before={{
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) scale(0)',
        width: '2.8rem',
        height: '2.8rem',
        background: 'radial-gradient(circle, rgba(0,255,255,0.25), transparent 70%)',
        borderRadius: '50%',
        opacity: 0,
        transition: 'all 0.3s ease-in-out',
        zIndex: -1,
      }}
      _hoverBefore={{
        transform: 'translate(-50%, -50%) scale(1)',
        opacity: 1,
      }}
    >
      {label}
    </Box>
  );
};


  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      w="100%"
      zIndex="1000"
      bgGradient="linear(to-r, #000428, #004e92)"
      boxShadow="sm"
      px={6}
      py={4}
    >
      <Flex justify="space-between" align="center">
        {/* Desktop Navigation */}
        <Flex display={{ base: 'none', md: 'flex' }} gap={6} mx="auto">
          {navItems.map((item, index) => (
            <NavLink key={item.href} {...item} index={index} />
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
              borderColor="#00FFFF"
              color="#00FFFF"
              _hover={{ bg: 'rgba(0,255,255,0.1)' }}
            />
          </Drawer.Trigger>

          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content bgGradient="linear(to-r, #000428, #004e92)">
                <Drawer.Header display="flex" justifyContent="flex-end" alignItems="center">
                  <Drawer.CloseTrigger asChild>
                    <CloseButton size="sm" color="#00FFFF" />
                  </Drawer.CloseTrigger>
                </Drawer.Header>

                <Drawer.Body>
                  <VStack align="start" spacing={6} mt={6}>
                    {navItems.map((item, index) => (
                      <NavLink
                        key={item.href}
                        {...item}
                        index={index}
                        onClick={() => setIsOpen(false)}
                      />
                    ))}
                  </VStack>
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Flex>
    </Box>
  );
};

export default Header;
