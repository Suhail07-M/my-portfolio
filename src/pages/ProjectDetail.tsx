import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Smartphone } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { ParticleBackground } from '@/components/ParticleBackground';

interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  technologies: string[];
  links: {
    github?: string;
    live?: string;
    store?: string;
    playStore?: string;
    appStore?: string;
  };
  sections: {
    heading: string;
    video: string;
    points: string[];
  }[];
}

const projectsData: Record<string, ProjectData> = {
  meiphor: {
    id: 'meiphor',
    title: 'Meiphor',
    tagline: 'Advanced XR application with immersive user interfaces and real-time interactions',
    technologies: ['Unity', 'C#', 'Vuforia SDK', 'Addressable', 'WebView Integration', 'Cross-Platform Development', 'QR Code Scanner', 'Performance Optimization', 'Version Control'],
    links: {
      github: '#',
      store: '#',
      playStore: 'https://play.google.com/store/apps/details?id=com.METAPREP.Meiphor',
      appStore: 'https://apps.apple.com/in/app/meiphor/id6503905399'
    },
    sections: [
      {
        heading: 'WebView OTP Verification',
        video: '/videos/video1.mp4',
        points: [
          'Seamless integration of WebView for OTP verification process',
          'Real-time communication between Unity and web components',
          'Enhanced security with multi-factor authentication',
          'Optimized performance for mobile platforms'
        ]
      },
      {
        heading: 'AR Object Placement',
        video: '/videos/video2.mp4',
        points: [
          'Advanced plane detection and tracking algorithms',
          'Real-time lighting estimation for realistic rendering',
          'Gesture-based object manipulation and scaling',
          'Cross-platform compatibility for iOS and Android'
        ]
      }
    ]
  },
  'space-reality': {
    id: 'space-reality',
    title: 'Space Reality',
    tagline: 'AR learning app exploring rockets, satellites, orbits and more',
    technologies: ['Unity', 'C#', 'Addressable', 'Version Control', 'Performance Optimization'],
    links: {
      github: '#',
      live: '#',
      playStore: 'https://play.google.com/store/apps/details?id=com.Space_Zone.SpaceReality_SpaceZoneIndia&hl=en_IN',
      appStore: 'https://apps.apple.com/mr/app/spacereality/id6466695147'
    },
    sections: [
      {
        heading: 'Augmented Reality Space Exploration',
        video: '/videos/video1.mp4',
        points: [
          'Interactive AR models of rockets, satellites, and planetary systems',
          'Educational content designed for students and enthusiasts',
          'Optimized performance across a wide range of Android and iOS devices',
          'Seamless content updates using Addressables',
        ]
      }
    ]
  },
  'ar-commerce': {
    id: 'ar-commerce',
    title: 'AR Commerce Platform',
    tagline: 'Revolutionary shopping experience using augmented reality technology',
    technologies: ['Unity', 'ARCore', 'WebGL', 'Firebase'],
    links: {
      github: '#',
      live: '#'
    },
    sections: [
      {
        heading: 'Product Visualization',
        video: '/videos/video3.mp4',
        points: [
          '3D product models with photorealistic rendering',
          'Interactive product customization in real-time',
          'Size and scale comparison in user environment',
          'Cloud-based asset streaming for optimal performance'
        ]
      }
    ]
  },
  'vr-training': {
    id: 'vr-training',
    title: 'VR Training Simulator',
    tagline: 'Enterprise VR solution for immersive employee training programs',
    technologies: ['Unity', 'OpenXR', 'Oculus SDK', 'Photon'],
    links: {
      github: '#',
      live: '#'
    },
    sections: [
      {
        heading: 'Simulation Environment',
        video: '/videos/video4.mp4',
        points: [
          'Physics-based interactions with realistic feedback',
          'Multi-user collaborative training sessions',
          'Progress tracking and analytics dashboard',
          'Customizable scenarios for different industries'
        ]
      }
    ]
  },
  'web-portfolio': {
    id: 'web-portfolio',
    title: 'Interactive Portfolio',
    tagline: 'Modern portfolio website with advanced animations and 3D elements',
    technologies: ['React', 'Three.js', 'GSAP', 'TypeScript'],
    links: {
      github: '#',
      live: '#'
    },
    sections: [
      {
        heading: 'Animation System',
        video: '/videos/video5.mp4',
        points: [
          'Smooth scroll-triggered animations with GSAP',
          'Interactive 3D elements using Three.js',
          'Responsive design with Framer Motion',
          'Optimized performance across all devices'
        ]
      }
    ]
  }
};

export const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('');
  
  const project = slug ? projectsData[slug] : null;

  // Smooth scroll to section function
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      if (!project) return;
      
      const sections = project.sections.map((_, index) => `section-${index}`);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-neon-green text-background rounded-lg hover:bg-neon-green/90 transition-all duration-300"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Interactive Particle Background */}
      <ParticleBackground />
      
      <main className="pt-4 relative z-10">
        {/* Sticky Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-black/80 backdrop-blur-sm border border-neon-green/30 rounded-lg px-4 py-2 text-neon-green hover:text-neon-green/80 hover:bg-black/90 hover:border-neon-green/50 transition-all duration-200 ease-in-out shadow-lg"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </motion.button>

        {/* Project Title and Info */}
        <div className="container mx-auto px-1 py-2 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6"
          >
            {/* Project Logo - Same as Home Page */}
            {project.id === 'meiphor' ? (
              <div className="flex flex-col items-center mb-6">
                <motion.div
                  className="text-6xl text-center flex items-center justify-center min-h-[240px]"
                  style={{marginBottom: '8px !important'}}
                >
                  <img 
                    key="meiphor-logo-detail"
                    src="https://i.postimg.cc/ZqB3Smx4/logosm.png" 
                    alt="Meiphor Logo"
                    className="w-60 h-60 mx-auto object-contain"
                  />
                </motion.div>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-full mx-auto px-1 text-justify font-medium leading-relaxed tracking-normal" style={{fontFamily: 'Tahoma, sans-serif', wordSpacing: '0.3em'}}>
                  Led end-to-end development of Meiphor AR application from concept to deployment. Architected Unity-based systems, managed UI/3D modeling teams, and implemented various technical solutions for performance optimization and user experience enhancement. Delivered cross-platform AR application for Android and iOS mobile platforms.
                </p>
              </div>
            ) : (
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground">
                {project.title}
              </h1>
            )}
            
            {project.id !== 'meiphor' && (
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-full mx-auto px-1 text-justify font-medium leading-relaxed tracking-normal" style={{fontFamily: 'Tahoma, sans-serif', wordSpacing: '0.3em'}}>
                {project.tagline}
              </p>
            )}

            {/* Tech Stack */}
            {project.id === 'meiphor' ? (
              <div className="flex flex-col items-center gap-3 mb-8">
                {/* First Line - 6 tags */}
                <div className="flex flex-wrap justify-center gap-3">
                  {['Unity', 'C#', 'Vuforia SDK', 'Addressable', 'WebView Integration', 'Cross-Platform Development'].map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 text-sm font-medium bg-neon-green/10 text-neon-green border border-neon-green/30 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {/* Second Line - 3 tags */}
                <div className="flex flex-wrap justify-center gap-3">
                  {['QR Code Scanner', 'Performance Optimization', 'Version Control'].map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 text-sm font-medium bg-neon-green/10 text-neon-green border border-neon-green/30 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-sm font-medium bg-neon-green/10 text-neon-green border border-neon-green/30 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* External Links */}
            <div className="flex justify-center gap-4">
              {project.links.live && (
                <motion.a
                  href={project.links.live}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-neon-green text-background rounded-lg hover:bg-neon-green/90 transition-all duration-300 font-medium"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </motion.a>
              )}
              
              {project.links.playStore && (
                <motion.button
                  onClick={() => window.open(project.links.playStore, '_blank')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-transparent border border-neon-green/50 text-neon-green rounded-lg hover:bg-neon-green/10 transition-all duration-300"
                >
                  <img src="https://i.postimg.cc/MpvbWN7z/play-store.png" alt="Play Store" className="w-5 h-5" />
                  Play Store
                </motion.button>
              )}

              {project.links.appStore && (
                <motion.button
                  onClick={() => window.open(project.links.appStore, '_blank')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-transparent border border-neon-green/50 text-neon-green rounded-lg hover:bg-neon-green/10 transition-all duration-300"
                >
                  <img src="https://i.postimg.cc/0N39TM8b/app-store.png" alt="App Store" className="w-5 h-5" />
                  App Store
                </motion.button>
              )}

              {project.links.github && (
                <motion.a
                  href={project.links.github}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-transparent border border-neon-green/50 text-neon-green rounded-lg hover:bg-neon-green/10 transition-all duration-300"
                >
                  <Github size={20} />
                  GitHub
                </motion.a>
              )}
            </div>

          </motion.div>
        </div>

        {/* Navigation Sections - Only for Meiphor */}
        {project.id === 'meiphor' && project.sections.length > 0 && (
          <>
            <motion.div
              id="explore-features-nav"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative z-10 py-4"
            >
            <div className="container mx-auto px-6">
              <h3 className="text-lg font-semibold text-center mb-4 text-foreground">
                Explore Features
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {project.sections.map((section, index) => (
                  <motion.button
                    key={index}
                    onClick={() => scrollToSection(`section-${index}`)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                      activeSection === `section-${index}`
                        ? 'bg-neon-green text-background'
                        : 'bg-neon-green/10 text-neon-green border border-neon-green/30 hover:bg-neon-green/20'
                    }`}
                  >
                    {section.heading}
                  </motion.button>
                ))}
              </div>
            </div>
            </motion.div>
            
            {/* Placeholder element to maintain space when navigation becomes fixed */}
          </>
        )}

        {/* Project Sections */}
        <div className="container mx-auto px-1 relative z-10">
          {project.sections.map((section, index) => (
            <motion.div
              key={index}
              id={`section-${index}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              {/* Section Heading */}
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
                {section.heading}
              </h2>

              {/* Video */}
              <div className="mb-8 rounded-xl overflow-hidden border border-neon-green/20">
                <video
                  src={section.video}
                  controls
                  poster="/placeholder.svg"
                  className="w-full h-auto"
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Description Points */}
              <div className="max-w-full mx-auto px-2">
                <ul className="space-y-4">
                  {section.points.map((point, pointIndex) => (
                    <motion.li
                      key={pointIndex}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: pointIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-muted-foreground text-justify"
                    >
                      <span className="w-2 h-2 bg-neon-green rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-base text-justify font-medium leading-relaxed tracking-normal" style={{fontFamily: 'Tahoma, sans-serif', wordSpacing: '0.3em'}}>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Spacer */}
        <div className="h-20 relative z-10"></div>
      </main>
    </div>
  );
};