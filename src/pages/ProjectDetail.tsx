import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Smartphone } from 'lucide-react';
import { useEffect, useState, useCallback, useRef } from 'react';
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
        heading: 'Architecture Overview',
        video: '/videos/meiphor-architecture.mp4',
        points: [
          'Modular Unity project structure with feature-based assemblies',
          'Addressables for remote content delivery and versioning',
          'MVVM-style UI flows, decoupled services, and event-driven messaging',
          'Native plugins isolated behind clean interfaces for testability'
        ]
      },
      {
        heading: 'Performance Optimization',
        video: '/videos/meiphor-performance.mp4',
        points: [
          'GPU/CPU profiling to remove bottlenecks and GC spikes',
          'Texture atlasing, mesh batching, and draw-call reduction',
          'Adaptive quality settings based on device capabilities',
          'Asynchronous loading pipelines to keep UI responsive'
        ]
      },
      {
        heading: 'Challenges and Solutions',
        video: '/videos/meiphor-challenges.mp4',
        points: [
          'WebView state sync conflicts solved using a robust message protocol',
          'AR session resets handled with graceful recovery UX',
          'Network variability mitigated via caching and retry/backoff',
          'Memory footprint reduced with on-demand asset streaming'
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
                  className="text-6xl text-center flex items-center justify-center min-h-[240px]"
                  style={{ marginBottom: 8 }}
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
            {/* Heading stays in normal flow */}
            <motion.div
              id="explore-features-nav"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative z-10 py-2"
            >
              <div className="container mx-auto px-6">
                <h3 className="text-lg font-semibold text-center mb-2 text-foreground">
                  Explore Features
                </h3>
              </div>
            </motion.div>

            {/* Sentinel sits right above the pill links; sticky triggers when links hit top */}
            <div ref={sentinelRef}></div>

            {/* Links bar that becomes sticky (JS-controlled fixed for reliability) */}
            <div
              ref={navRef}
              className={`${isSticky ? 'fixed top-0 left-0 right-0 bg-black/70 backdrop-blur-sm border-b border-neon-green/20 shadow-[0_4px_16px_rgba(0,0,0,0.35)] z-40' : 'relative z-10 mb-3'} py-2`}
              style={{ transition: 'background-color 200ms ease, box-shadow 200ms ease, backdrop-filter 200ms ease' }}
            >
              <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-center gap-3">
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
            <div style={{ height: isSticky ? `${navHeight + GAP_BELOW}px` : `${GAP_BELOW}px` }}></div>
          </>
        )}

        {/* Project Sections */}
        <div className="container mx-auto px-1 relative z-10">
                 {project.sections.map((section, index) => (
                   <div key={index}>
                     {/* Section Divider Line - Only show between sections */}
                     {index > 0 && (
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
                       <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
                         {section.heading}
                       </h2>

                     {/* Video */}
                     <div className="mb-8 rounded-xl overflow-hidden border border-neon-green/10 max-w-4xl mx-auto relative particle-bg">
                       <div className="relative w-full" style={{ aspectRatio: '2400/1080' }}>
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

              {/* Description Points */}
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