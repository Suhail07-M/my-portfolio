import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Smartphone, ChevronRight } from 'lucide-react';
import { useEffect, useState, useCallback, useRef } from 'react';
import { ParticleBackground } from '@/components/ParticleBackground';

// UpcomingFlashCardsCarousel Component
const UpcomingFlashCardsCarousel = ({ images }: { images: string[] }) => {
  const validImages = Array.isArray(images) ? images.filter(Boolean) : [];
  const length = validImages.length;

  // Slot sizing and spacing
  const SLOT_WIDTH = 380; // px (slightly smaller)
  const SLOT_HEIGHT = 200; // px (slightly smaller)
  const GAP_PX = 24; // px
  const STEP = SLOT_WIDTH + GAP_PX; // slide step in px

  // Triple list for seamless infinite sliding
  const extended = length > 0 ? [...validImages, ...validImages, ...validImages] : [];
  const base = length; // middle copy start index
  const [index, setIndex] = useState(Math.max(0, base - 1)); // left visible; center is index + 1
  const [useTransition, setUseTransition] = useState(true);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const canNavigate = length >= 2;

  const nextImage = () => {
    if (!canNavigate) return;
    setUseTransition(true);
    setIndex((i) => i + 1);
  };

  const prevImage = () => {
    if (!canNavigate) return;
    setUseTransition(true);
    setIndex((i) => i - 1);
  };

  // Snap back into the middle copy after transition to avoid reaching ends
  useEffect(() => {
    if (length === 0) return;
    const handleEnd = () => {
      setUseTransition(false);
      setIndex((i) => {
        if (i >= base + length) return i - length; // moved too far right
        if (i < base - 1) return i + length; // moved too far left
        return i;
      });
    };
    const el = trackRef.current;
    if (el) el.addEventListener('transitionend', handleEnd, { once: true });
    const t = window.setTimeout(handleEnd, 750); // fallback in case transitionend doesn't fire
    return () => window.clearTimeout(t);
  }, [index, length, base]);

  const translateX = -(index * STEP);

  return (
    <div className="relative w-full flex items-center justify-center">
      {/* Viewport showing exactly 3 cards with extra space for text above */}
      <div className="overflow-visible" style={{ width: `${SLOT_WIDTH * 3 + GAP_PX * 2}px`, paddingTop: '60px' }}>
        {/* Track */}
        <div
          ref={trackRef}
          className="flex items-end"
          style={{
            gap: `${GAP_PX}px`,
            transform: `translateX(${translateX}px) translateY(-60px)`,
            transition: useTransition ? 'transform 600ms ease-in-out' : 'none',
          }}
        >
          {extended.map((src, i) => {
            const isCenter = i === index + 1; // middle visible slot
            const imageNumber = (i % length) + 1; // Get the actual image number (1-11)
            return (
              <div key={`img-${i}-${src}`} className="flex-shrink-0" style={{ width: `${SLOT_WIDTH}px`, height: `${SLOT_HEIGHT}px` }}>
                <div
                  className="relative w-full h-full"
                  style={{
                    transformOrigin: 'bottom center',
                    transform: `scale(${isCenter ? 1.2 : 0.8})`,
                    transition: useTransition ? 'transform 600ms ease-in-out' : 'none',
                    zIndex: isCenter ? 10 : 5,
                  }}
                >
                  <img
                    src={src}
                    alt={`Upcoming AR Flash Cards ${imageNumber}`}
                    className={`object-cover rounded-[22px] border-[4px] ${isCenter ? 'border-neon-green/70 shadow-[0_8px_32px_rgba(57,255,20,0.2)]' : 'border-neon-green/50 shadow-[0_6px_24px_rgba(57,255,20,0.15)]'}`}
                    style={{ width: '100%', height: '100%' }}
                    draggable={false}
                    loading="lazy"
                  />
                  {/* Text overlay that moves and scales with the image */}
                  <div
                    className="absolute -top-12 left-0 right-0 p-2"
                    style={{
                      transformOrigin: 'top center',
                      transform: `scale(${isCenter ? 1.2 : 0.8})`,
                      transition: useTransition ? 'transform 600ms ease-in-out' : 'none',
                    }}
                  >
                    <p className={`font-medium text-center ${isCenter ? 'text-neon-green text-lg' : 'text-white text-base'}`} style={{ transition: useTransition ? 'font-size 600ms ease-in-out, color 600ms ease-in-out' : 'none' }}>
                      Flash Card {imageNumber}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls Layer (absolute, independent) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between">
        <div className="pointer-events-auto -ml-3">
          <motion.button
            onClick={prevImage}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-neon-green/50 bg-black/70 hover:bg-neon-green/10 hover:border-neon-green text-neon-green hover:text-neon-green transition-all duration-300 shadow-[0_4px_16px_rgba(57,255,20,0.2)] hover:shadow-[0_6px_24px_rgba(57,255,20,0.3)]"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6 rotate-180" />
          </motion.button>
        </div>
        <div className="pointer-events-auto -mr-3">
          <motion.button
            onClick={nextImage}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-neon-green/50 bg-black/70 hover:bg-neon-green/10 hover:border-neon-green text-neon-green hover:text-neon-green transition-all duration-300 shadow-[0_4px_16px_rgba(57,255,20,0.2)] hover:shadow-[0_6px_24px_rgba(57,255,20,0.3)]"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

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
    video?: string;
    images?: string[];
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
        video: 'https://www.youtube.com/embed/AzLoUYCWog4',
        points: [
          'Developed OTP login system inside Unity using WebView + Firebase Authentication',
          'Implemented auto-login session check (skips login if already authenticated)',
          'Built a secure message bridge between Unity & WebView using postMessage',
          'Optimized rendering performance to avoid input lag during keyboard events',
          'Ensured smooth scene reload after successful login verification'
        ]
      },
      {
        heading: 'QR Authentication',
        video: 'https://www.youtube.com/embed/cA6uWEXnTxU',
        points: [
          'Implemented QR code scanning feature for instant book activation',
          'Developed dual input system - manual serial key entry and automated QR scanning with auto-fill',
          'Built secure validation that prevents activation with already-used serial keys or invalid codes',
          'Integrated real-time dashboard synchronization to reflect activated content immediately',
          'Optimized camera permission handling and QR detection for seamless user experience'
        ]
      },
      {
        heading: 'AR Addressables',
        video: 'https://www.youtube.com/embed/6xHxkLO5Hxo',
        points: [
          'Dynamic AR content loading using Unity Addressables',
          'Efficient remote asset management for large AR apps',
          'Optimized memory usage with on-demand downloads',
          'Demonstration of real-time asset loading in the Meiphor app',
          'Shows size variation before & after content downloads',
          'Practical example of mobile-ready content streaming'
        ]
      },
      {
        heading: 'Performance Optimization',
        video: 'https://www.youtube.com/embed/vdHgoGkBKK4',
        points: [
          'Reduced app size by 70% using smart asset management',
          'Implemented dynamic content loading for faster downloads',
          'Optimized textures and 3D models without compromising visual quality',
          'Achieved smooth performance on both high-end and low-end devices',
          'Eliminated lag and frame drops through efficient resource management',
          'Strategic content grouping for quicker load times'
        ]
      },
      {
        heading: 'AR Interactive Book',
        video: 'https://www.youtube.com/embed/Pkn-sTJVLP0',
        points: [
          'Brought storybooks to life with animated 3D characters and sound effects.',
          'Interactive AR elements that respond to touch and movement.',
          'Smooth tracking for multiple pages using image targets.',
          'Lightweight scene loading for better performance on mobile.',
          'Engaging learning experience through visual interaction.'
        ]
      },
      {
        heading: 'AR Flash Cards',
        video: 'https://www.youtube.com/embed/QLo7qZKXs_c',
        points: [
          'Real-time AR visualization of human anatomy.',
          'Dual-side flashcards showing both organ model and body placement.',
          '"Our Universe" section with interactive AR experiences.',
          'Smart flashcard combination — e.g., Earth & Moon interact dynamically.',
          'Mini-game setup in Unity — lander, door & rover control system.',
          'Smooth transitions and optimized performance for mobile devices'
        ]
      },
      {
        heading: 'Upcoming AR Flash Cards',
        images: [
          'https://i.postimg.cc/W1sfr9RR/1.jpg',
          'https://i.postimg.cc/0NMGJmyS/2.jpg',
          'https://i.postimg.cc/FzZ0QVT1/3.jpg',
          'https://i.postimg.cc/Z50p13pB/4.jpg',
          'https://i.postimg.cc/KjJ3WvYR/5.jpg',
          'https://i.postimg.cc/8zFfyGg5/6.jpg',
          'https://i.postimg.cc/pTBm9XzB/7.jpg',
          'https://i.postimg.cc/TY1Kwxwn/8.jpg',
          'https://i.postimg.cc/pTPTtb4Q/9.jpg',
          'https://i.postimg.cc/tCsgbzvj/10.jpg',
          'https://i.postimg.cc/gJcYTyLw/11.jpg'
        ],
        points: [
          'Aquatic Animals',
          'Insects',
          'Community Office',
          'Places of Worship',
          'Traffic Rules',
          'Birds',
          'Farm Animals',
          'Wild Animals',
          'Parts of body',
          'Parts of Plants',
          'People Who Help Us',
          'Countries Around the World',
          'Landforms',
          'Monuments',
          'Reptiles',
          'Etc.'
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
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [navHeight, setNavHeight] = useState<number>(0);
  const navRef = useRef<HTMLDivElement | null>(null);
  const navTopRef = useRef<number>(0);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<HTMLIFrameElement[]>([]);
  const STICKY_HEIGHT = 56; // compact height when sticky (px)
  const GAP_BELOW = 64; // extra space between nav links and first section (px)
  
  
  const project = slug ? projectsData[slug] : null;

  // Prevent scroll handler jitter during programmatic smooth scrolls
  const isAutoScrolling = useRef(false);
  const scrollRafId = useRef<number | null>(null);
  const sectionOffsetsRef = useRef<number[]>([]);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<'up' | 'down' | null>(null);
  const activeUpdateTimeout = useRef<NodeJS.Timeout | null>(null);

  // Smooth scroll using native scrollMarginTop for precision
  const scrollToSection = useCallback((sectionId: string) => {
    console.log(`scrollToSection called with: ${sectionId}`);
    const element = document.getElementById(sectionId);
    if (!element) {
      console.log(`Element not found: ${sectionId}`);
      return;
    }
    const constantOffset = STICKY_HEIGHT + GAP_BELOW;
    const targetTop = element.getBoundingClientRect().top + window.scrollY - constantOffset;
    console.log(`Scrolling to: ${targetTop}, constantOffset: ${constantOffset}`);
    isAutoScrolling.current = true;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    
    // Immediately set active section to prevent highlighting delay
    setActiveSection(sectionId);
    
    // Reset guard after scroll settles
    window.setTimeout(() => {
      isAutoScrolling.current = false;
      console.log('Auto scrolling guard reset');
    }, 600);
  }, []);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Track active section & sticky nav
  useEffect(() => {
    const handleScroll = () => {
      if (!project) return;
      
      // Handle sticky nav
      if (project.id === 'meiphor' && navRef.current) {
        const scrollY = window.scrollY || window.pageYOffset;
        const navTopViewport = navRef.current.getBoundingClientRect().top;
        
        if (!isSticky) {
          if (navTopViewport <= 0) {
            setIsSticky(true);
          }
        } else {
          if (scrollY < navTopRef.current) {
            setIsSticky(false);
          }
        }
      }
      
      // Pause videos when scrolling
      videoRefs.current.forEach((videoRef) => {
        if (videoRef) {
          const rect = videoRef.getBoundingClientRect();
          const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
          
          if (!isInViewport) {
            // Pause video when it's not in viewport
            try {
              videoRef.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            } catch (e) {
              // Silently handle cross-origin issues
            }
          }
        }
      });
      
      // Active section detection - only when nav is sticky
      if (isSticky) {
        const sections = project.sections.map((_, index) => `section-${index}`);
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Same logic as main home page: element should be in viewport center area
            return rect.top <= 150 && rect.bottom >= 150;
          }
          return false;
        });
        if (current) setActiveSection(current);
      } else {
        // Clear all highlights when nav is not sticky
        setActiveSection('');
      }
    };

    const measure = () => {
      if (project?.id === 'meiphor' && navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        navTopRef.current = rect.top + window.scrollY;
        setNavHeight(navRef.current.offsetHeight || rect.height);
      }
    };

    measure();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', measure);
    };
  }, [project, isSticky]);

  

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
      {/* Local utility to hide scrollbars across browsers */}
      <style>{`
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
      {/* Interactive Particle Background */}
      <ParticleBackground />
      
      <main className="pt-4 relative z-10">
        {/* Sticky Back Button */}
               <motion.button
                 initial={{ opacity: 0, x: -50 }}
                 animate={{ opacity: 1, x: 0 }}
                 onClick={() => {
                   // Navigate back to home page using browser history
                   navigate(-1);
                 }}
                 title="Return to main page"
                 className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-gradient-to-r from-black/90 to-neon-green/20 backdrop-blur-sm border border-neon-green/50 rounded-lg px-4 py-2 text-neon-green hover:text-neon-green/80 hover:bg-gradient-to-r hover:from-neon-green/20 hover:to-black/90 hover:border-neon-green hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all duration-200 ease-in-out shadow-lg"
               >
                 <ArrowLeft size={20} />
                 Back
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
                  className="text-6xl text-center flex items-center justify-center min-h-[240px] gap-6"
                  style={{ marginBottom: 8 }}
                >
                  <img 
                    key="meiphor-logo-detail"
                    src="https://i.postimg.cc/ZqB3Smx4/logosm.png" 
                    alt="Meiphor Logo"
                    className="w-48 h-48 object-contain"
                  />
                  <h1 className="text-4xl font-bold text-foreground tracking-wider mt-4">
                    <span className="text-6xl">M</span>EIPHOR
                  </h1>
                </motion.div>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-full mx-auto px-1 text-justify font-medium leading-relaxed tracking-normal" style={{fontFamily: 'Tahoma, sans-serif', wordSpacing: '0.3em'}}>
                  Led end-to-end development of Meiphor AR application from concept to deployment. Architected Unity-based systems, managed UI/3D modeling teams, and implemented various technical solutions for performance optimization and user experience enhancement. Delivered cross-platform AR application for Android and iOS mobile platforms.
                </p>
                
                {/* Download Buttons */}
                <div className="flex flex-wrap justify-center gap-8 mb-8">
                  {project.links.playStore && (
                    <motion.button
                      onClick={() => window.open(project.links.playStore, '_blank')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-neon-green text-background rounded-lg hover:bg-neon-green/90 transition-all duration-300 font-medium"
                    >
                      <img src="https://i.postimg.cc/MpvbWN7z/play-store.png" alt="Play Store" className="h-6 w-6" />
                      <span className="text-base">Play Store</span>
                    </motion.button>
                  )}

                  {project.links.appStore && (
                    <motion.button
                      onClick={() => window.open(project.links.appStore, '_blank')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-neon-green text-background rounded-lg hover:bg-neon-green/90 transition-all duration-300 font-medium"
                    >
                      <img src="https://i.postimg.cc/0N39TM8b/app-store.png" alt="App Store" className="h-6 w-6" />
                      <span className="text-base">App Store</span>
                    </motion.button>
                  )}
                </div>
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
                <h3 className="text-3xl font-semibold text-center mb-2 text-foreground">
                  Tech Stack
                </h3>
                {/* First Line - 6 tags */}
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-3">
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
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-3">
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
              
              {/* Buttons moved to below description */}

              {/* GitHub button removed */}
            </div>

          </motion.div>
        </div>

        {/* Navigation Sections - Only for Meiphor */}
        {project.id === 'meiphor' && project.sections.length > 0 && (
          <>
            {/* Heading stays in normal flow */}
            <motion.div
              id="explore-features-nav"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative z-10 py-2 mt-6"
            >
              <div className="container mx-auto px-6">
                <h3 className="text-3xl font-semibold text-center mb-2 text-foreground">
                  Explore Features
                </h3>
              </div>
            </motion.div>

            {/* Sentinel sits right above the pill links; sticky triggers when links hit top */}
            <div ref={sentinelRef}></div>

            {/* Links bar that becomes sticky (JS-controlled fixed for reliability) */}
            <div
              ref={navRef}
              className={`${isSticky ? 'fixed top-0 left-0 right-0 bg-black/70 backdrop-blur-sm border-b border-neon-green/20 shadow-[0_4px_16px_rgba(0,0,0,0.35)] z-40' : 'relative z-10 mb-3'} ${isSticky ? 'py-6' : 'py-2'}`}
              style={{ transition: 'background-color 200ms ease, box-shadow 200ms ease, backdrop-filter 200ms ease, padding 300ms ease' }}
            >
              <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-3">
                  {project.sections.map((section, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        console.log(`Clicked section ${index}: ${section.heading}`);
                        scrollToSection(`section-${index}`);
                      }}
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
            </div>

            {/* Spacer to avoid layout shift + keep a small gap to first section */}
            <div style={{ height: isSticky ? `${navHeight + 1}px` : `1px` }}></div>
          </>
        )}

        {/* Project Sections */}
        <div className="container mx-auto px-1 relative z-10">
                 {project.sections.map((section, index) => (
                   <div key={index}>
                    {/* Section Divider Line - Show above every section including the first */}
                    {(
                      <div className="flex items-center justify-center my-12">
                        <div className="h-px bg-gradient-to-r from-transparent via-neon-green/50 to-transparent w-full"></div>
                      </div>
                    )}
                     
                     <motion.div
                       id={`section-${index}`}
                       initial={{ opacity: 0, y: 0 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.3, delay: 0 }}
                       viewport={{ once: true }}
                       className="mb-20"
                       style={{ scrollMarginTop: (navHeight || STICKY_HEIGHT) + GAP_BELOW }}
                     >
                       {/* Section Heading */}
                       <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
                         {section.heading}
                       </h2>
                        {section.heading === 'Upcoming AR Flash Cards' && (
                          <p className="text-base md:text-lg text-muted-foreground mb-32 max-w-3xl mx-auto text-center">
                            We're continuously expanding our AR Flash Cards library with new educational categories — most of which are in the final stage of development and will be rolled out in upcoming updates.
                          </p>
                        )}

                     {/* Conditional rendering for Video or Images */}
                    {section.video ? (
                      /* Video */
                      <div className="mb-8 rounded-xl overflow-hidden border border-neon-green/10 max-w-[720px] mx-auto relative particle-bg">
                        <div className="relative w-full" style={{ aspectRatio: '1280/720' }}>
                           <iframe
                             ref={(el) => {
                               if (el) {
                                 videoRefs.current[index] = el;
                               }
                             }}
                             src={`${section.video}?rel=0&modestbranding=1&showinfo=0&controls=1&disablekb=0&fs=1&cc_load_policy=0&iv_load_policy=3&autohide=0&playsinline=1&loop=0&mute=0&autoplay=0&start=0&end=0&enablejsapi=1&origin=${window.location.origin}`}
                             title={section.heading}
                             className="absolute top-0 left-0 w-full h-full rounded-xl bg-black"
                             frameBorder="0"
                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                             allowFullScreen
                             sandbox="allow-scripts allow-same-origin allow-presentation"
                           ></iframe>
                         </div>
                       </div>
                    ) : section.images ? (
                      /* Image Carousel - Only for Upcoming AR Flash Cards */
                      <div className="mb-8">
                        {section.heading === 'Upcoming AR Flash Cards' ? (
                          <UpcomingFlashCardsCarousel images={section.images} />
                        ) : (
                          /* Regular Image Gallery for other sections */
                          <div className="flex items-center gap-6 py-2 overflow-x-auto no-scrollbar">
                            {section.images.map((src, imgIndex) => (
                              <motion.div
                                key={src}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: imgIndex * 0.05 }}
                                className="relative group flex-shrink-0"
                              >
                                <div className="relative">
                                  <img
                                    src={src}
                                    alt={`${section.heading} ${imgIndex + 1}`}
                                    className="h-44 md:h-48 lg:h-52 w-[280px] md:w-[320px] lg:w-[360px] object-cover rounded-[22px] md:rounded-[28px] border-[3px] md:border-[4px] border-neon-green/50 hover:border-neon-green/70 hover:scale-105 transition-all duration-500"
                                    loading="lazy"
                                    draggable={false}
                                  />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : null}

              {/* Description Points */}
              {section.heading === 'Upcoming AR Flash Cards' ? (
                <div className="mt-16">
                  <h4 className="text-[1.6rem] md:text-[1.9rem] font-semibold text-center mb-4 text-foreground" style={{ wordSpacing: '0.15em' }}>New Flashcard Categories</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2 md:px-8">
                    {section.points.map((point, pointIndex) => (
                      <motion.div
                        key={pointIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: pointIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <span className="w-2 h-2 bg-neon-green rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-base font-medium leading-relaxed tracking-normal" style={{fontFamily: 'Tahoma, sans-serif', wordSpacing: '0.3em'}}>{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8 md:ml-16">
                  {section.points.map((point, pointIndex) => (
                    <motion.div
                      key={pointIndex}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: pointIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-muted-foreground text-justify"
                    >
                      <span className="w-2 h-2 bg-neon-green rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-base text-justify font-medium leading-relaxed tracking-normal" style={{fontFamily: 'Tahoma, sans-serif', wordSpacing: '0.3em'}}>{point}</span>
                    </motion.div>
                  ))}
                </div>
              )}
                     </motion.div>
                   </div>
                 ))}
        </div>

        {/* Footer Spacer */}
        <div className="h-20 relative z-10"></div>
      </main>
    </div>
  );
};