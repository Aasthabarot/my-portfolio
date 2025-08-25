'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Flex,
  Image,
} from '@chakra-ui/react';

const HeroSection = () => {
  return (
    <Box
      id="home"
      as="section"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={[4, 8, 16]}
      py={12}
      bgGradient="linear(to-br, #2B1055, #7597DE)" // Updated gradient
      position="relative"
      overflow="hidden"
    >
      <Flex
        direction={['column', 'column', 'row']}
        align="center"
        justify="space-between"
        zIndex={1}
        w="full"
        maxW="1200px"
      >
        {/* Left Side: Uploaded Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          style={{ width: '100%', maxWidth: '500px' }}
        >
          <Image
            src="/Coder.gif"
            alt="Developer GIF"
            borderRadius="xl"
            w="100%"
            h="auto"
            draggable={false}
           
          />
        </motion.div>

        {/* Right Side: Intro */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ flex: 1 }}
        >
          <VStack
            spacing={6}
            align={['center', 'center', 'flex-start']}
            textAlign={['center', 'center', 'left']}
            color="#F0E6FF"
            mt={[10, 10, 0]}
          >
            <Heading
              fontSize={['3xl', '4xl', '5xl']}
              fontWeight="bold"
              lineHeight="1.2"
              color="#F3D1FF"
              textShadow="0 0 12px #F3D1FF66"
            >
              AASTHA BAROT
            </Heading>

            <Heading
              fontSize={['xl', '2xl', '3xl']}
              fontWeight="semibold"
              color="#B2F1FF"
              textShadow="0 0 5px #B2F1FF33"
            >
              Full Stack Developer • UI/UX Curious • Code Whisperer
            </Heading>

            <Text
              fontSize={['md', 'lg', 'xl']}
              color="#D3E4FF"
              maxW="600px"
              fontWeight="medium"
            >
              Passionate about building intuitive UIs and scalable backends using React, Next.js, Node.js, and Firebase. MCA student & lifelong learner, turning logic into elegant digital experiences.
            </Text>

            <Flex gap={4} flexWrap="wrap">
              <Button
                bg="#D47AFF"
                color="#2B1055"
                _hover={{ bg: '#c258ff' }}
                size="lg"
                px={8}
                rounded="full"
                fontWeight="bold"
                boxShadow="0 0 20px #D47AFF99"
              >
                View Projects
              </Button>
              <Button
                variant="outline"
                color="#B2F1FF"
                borderColor="#B2F1FF"
                _hover={{ bg: 'rgba(178,241,255,0.1)', color: '#B2F1FF' }}
                size="lg"
                px={8}
                rounded="full"
                fontWeight="bold"
              >
                Contact Me
              </Button>
            </Flex>
          </VStack>
        </motion.div>
      </Flex>
    </Box>
  );
};

export default HeroSection;
