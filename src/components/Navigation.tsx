import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'skills', 'projects', 'resume', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileMenuOpen]);
  const navLinks = [{
    name: 'Home',
    href: 'home'
  }, {
    name: 'Skills',
    href: 'skills'
  }, {
    name: 'Projects',
    href: 'projects'
  }, {
    name: 'Resume',
    href: 'resume'
  }, {
    name: 'Contact',
    href: 'contact'
  }];
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
      // Close mobile menu after navigation
      setIsMobileMenuOpen(false);
    }
  };
  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: 0
  }} className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-neon-green/20' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div whileHover={{
          scale: 1.05
        }} className="text-2xl font-bold cursor-pointer" onClick={() => scrollToSection('home')}>
            <span className="text-foreground"></span>
            <span className="text-neon-green px-0">PORTFOLIO</span>
          </motion.div>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex space-x-8">
            {navLinks.map(link => <motion.button key={link.name} onClick={() => scrollToSection(link.href)} whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.95
          }} className={`transition-colors duration-300 font-medium relative group ${activeSection === link.href ? 'text-neon-green' : 'text-muted-foreground hover:text-neon-green'}`}>
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-neon-green transition-all duration-300 ${activeSection === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </motion.button>)}
          </div>

          {/* Mobile Navigation Links - Right Side Dropdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ 
              opacity: isMobileMenuOpen ? 1 : 0, 
              scale: isMobileMenuOpen ? 1 : 0.95,
              y: isMobileMenuOpen ? 0 : -10 
            }}
            transition={{ duration: 0.2 }}
            className={`lg:hidden absolute top-full right-0 mt-2 w-48 bg-background/95 backdrop-blur-md border border-neon-green/20 rounded-lg shadow-lg ${
              isMobileMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <div className="py-2">
              {navLinks.map(link => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left px-4 py-3 transition-colors duration-200 font-medium ${
                    activeSection === link.href ? 'text-neon-green bg-neon-green/10' : 'text-muted-foreground hover:text-neon-green hover:bg-neon-green/5'
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-neon-green"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.nav>;
};