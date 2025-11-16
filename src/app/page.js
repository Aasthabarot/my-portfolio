'use client';

import HeroSection from '../components/HeroSection';
import ContactForm from '../components/contactform';
import SkillsSection from '../components/Skill';
import ExperienceSection from '@/components/Experience';
import AboutSection from '@/components/aboutme';
import { Box } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box minH="100vh">
      <HeroSection />
       <SkillsSection/>
       <AboutSection/>
       <ExperienceSection/>
      <ContactForm />
     
    </Box>
  );
}