import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Resume', href: '/resume' },
  { name: 'Contact', href: '/contact' },
];

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-neon-green/20"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-neon-green"
          >
            Suhail M
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.name.toLowerCase())}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-all duration-300",
                  "hover:text-neon-green hover:shadow-lg hover:shadow-neon-green/30",
                  "border border-transparent hover:border-neon-green/50 rounded-lg",
                  activeSection === item.name.toLowerCase()
                    ? "text-neon-green border-neon-green/50"
                    : "text-foreground/80"
                )}
              >
                {item.name}
                {activeSection === item.name.toLowerCase() && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 border border-neon-green rounded-lg neon-glow"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 border border-neon-green/50 rounded-lg hover:bg-neon-green/10"
          >
            <div className="w-6 h-6 relative">
              <span className="absolute top-1 left-0 w-full h-0.5 bg-neon-green"></span>
              <span className="absolute top-3 left-0 w-full h-0.5 bg-neon-green"></span>
              <span className="absolute top-5 left-0 w-full h-0.5 bg-neon-green"></span>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};