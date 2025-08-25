'use client';

import HeroSection from '../components/HeroSection';
import { Box } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box
      minH="100vh"

  bgGradient="to-br"
  gradientFrom="blue.900"
  gradientTo="blue.700"
px={4}
      py={0}
    >
      <HeroSection />
    </Box>
  );
}
