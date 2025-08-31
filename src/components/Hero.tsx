import { motion } from 'framer-motion';
import { ParticleBackground } from './ParticleBackground';
import profileImage from '@/assets/profile.jpg';

// Common animation variants for optimization
const fadeInUp = (delay: number) => ({
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8, delay }
});

const slideIn = (direction: 'left' | 'right', delay: number) => ({
  initial: { x: direction === 'left' ? -100 : 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 1, delay, ease: "easeOut" as const }
});

export const Hero = () => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent pt-20 md:pt-0">
    <ParticleBackground />

    <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      {/* Hero Text - Left Side */}
      <motion.div
        {...slideIn('left', 0)}
        className="text-center md:text-left"
      >
        <motion.h1
          {...fadeInUp(0.4)}
          className="text-6xl md:text-8xl font-bold mb-6"
        >
          <span className="text-foreground">Suhail </span>
          <span className="text-neon-green">M</span>
        </motion.h1>
        
        <motion.p
          {...fadeInUp(0.6)}
          className="text-[#39FF14] font-semibold tracking-[0.5px] leading-[1.33] text-[clamp(14px,2.2vw,18px)] sm:text-[clamp(16px,1.6vw,22px)] mb-4 lg:mb-6"
          style={{ textShadow: '0 0 12px rgba(57,255,20,0.25)' }}
        >
          XR Developer <span className="mx-2">|</span> Unity Specialist
        </motion.p>

        <motion.p
          {...fadeInUp(0.7)}
          className="text-base md:text-lg text-[#B9C0CB]/[0.85] mb-8 max-w-2xl leading-relaxed text-justify"
        >
          3+ years of experience building and leading development of immersive AR/VR apps and interactive games for cross‑platform deployment. Skilled in Unity and XR frameworks, with a strong focus on performance and user experience.
        </motion.p>

        <motion.div
          {...fadeInUp(0.8)}
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(57, 255, 20, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-neon-green text-background font-semibold rounded-lg hover:bg-neon-green/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(57,255,20,0.6)]"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(57, 255, 20, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-neon-green text-neon-green font-semibold rounded-lg hover:bg-neon-green/10 transition-all duration-300 neon-glow hover:shadow-[0_0_30px_rgba(57,255,20,0.4)]"
            onClick={() => document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Download Resume
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Profile Image - Right Side */}
      <motion.div
        {...slideIn('right', 0.2)}
        className="flex justify-center md:justify-end"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-neon-green/30 scale-110"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-neon-green/50 scale-105"
          />
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={profileImage}
            alt="Suhail M - XR Developer"
            className="w-96 h-96 rounded-full object-cover border-4 border-neon-green neon-glow relative z-10"
          />
        </div>
      </motion.div>
    </div>
  </section>
);



  