import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Menu, X } from 'lucide-react';
import { useEffect, useState, useCallback, useRef } from 'react';
import { ParticleBackground } from '@/components/ParticleBackground';

// UpcomingFlashCardsCarousel Component - Mobile uses Workshop method, Desktop uses original
const UpcomingFlashCardsCarousel = ({ images }: { images: string[] }) => {
  const validImages = Array.isArray(images) ? images.filter(Boolean) : [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftStartRef = useRef<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragMovedRef = useRef<boolean>(false);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    dragMovedRef.current = false;
    const rect = scrollRef.current.getBoundingClientRect();
    startXRef.current = e.clientX - rect.left;
    scrollLeftStartRef.current = scrollRef.current.scrollLeft;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    const rect = scrollRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 5) {
      dragMovedRef.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const endDrag = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    dragMovedRef.current = false;
  };

  return (
    <div className="relative">
      {/* Mobile: Workshop-style horizontal scroll carousel */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          className={`overflow-x-auto overflow-y-hidden no-scrollbar select-none cursor-grab ${isDragging ? 'cursor-grabbing' : 'scroll-smooth'}`}
          style={{ touchAction: 'pan-x' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
        >
          <div className="flex items-center gap-4 py-2 w-max pl-4">
            {validImages.map((src, i) => {
              const animalNames = [
                "Aquatic Animal",
                "Community Office",
                "Places of Worship",
                "Birds",
                "Farm Animals",
                "Wild Animals",
                "Reptiles",
                "Monuments",
                "Parts of Plants",
                "Countries Around the World",
                "People Who Help Us"
              ];
              
              const animalName = animalNames[i] || `Animal ${i + 1}`;
              
              return (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative group flex-shrink-0"
                >
                  <div className="relative">
                    <div className="text-center mb-2">
                      <p className="text-sm font-medium text-neon-green">
                        {animalName}
                      </p>
                    </div>
                    <img
                      src={src}
                      alt={`Upcoming AR Flash Cards ${i + 1}`}
                      className="h-32 w-[200px] object-cover rounded-[16px] border-[2px] border-neon-green/50 hover:border-neon-green/70 hover:scale-105 transition-all duration-500"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop: Original 3D carousel with titles */}
      <div className="hidden md:block">
        <DesktopCarousel images={validImages} />
      </div>
    </div>
  );
};

// Desktop Carousel Component
const DesktopCarousel = ({ images }: { images: string[] }) => {
  const length = images.length;
  const SLOT_WIDTH = 380;
  const SLOT_HEIGHT = 200;
  const GAP_PX = 72;
  const STEP = SLOT_WIDTH + GAP_PX;

  const extended = length > 0 ? [...images, ...images, ...images] : [];
  const base = length;
  const [index, setIndex] = useState(Math.max(0, base - 1));
  const [useTransition, setUseTransition] = useState(true);
  const [transitionSpeed, setTransitionSpeed] = useState(600);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clickCountRef = useRef(0);

  const canNavigate = length >= 2;

  const nextImage = () => {
    if (!canNavigate) return;
    clickCountRef.current += 1;
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    if (clickCountRef.current >= 3) {
      setTransitionSpeed(200);
    } else {
      setTransitionSpeed(600);
    }
    setUseTransition(true);
    setIndex((i) => i + 1);
    clickTimeoutRef.current = setTimeout(() => {
      clickCountRef.current = 0;
      setTransitionSpeed(600);
    }, 500);
  };

  const prevImage = () => {
    if (!canNavigate) return;
    clickCountRef.current += 1;
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    if (clickCountRef.current >= 3) {
      setTransitionSpeed(200);
    } else {
      setTransitionSpeed(600);
    }
    setUseTransition(true);
    setIndex((i) => i - 1);
    clickTimeoutRef.current = setTimeout(() => {
      clickCountRef.current = 0;
      setTransitionSpeed(600);
    }, 500);
  };

  useEffect(() => {
    if (length === 0) return;
    const handleEnd = () => {
      setUseTransition(false);
      setIndex((i) => {
        if (i >= base + length) return i - length;
        if (i < base - 1) return i + length;
        return i;
      });
    };
    const el = trackRef.current;
    if (el) el.addEventListener('transitionend', handleEnd, { once: true });
    const t = window.setTimeout(handleEnd, 750);
    return () => window.clearTimeout(t);
  }, [index, length, base]);

  const translateX = -(index * STEP);

  const animalNames = [
    "Aquatic Animal",
    "Community Office",
    "Places of Worship",
    "Birds",
    "Farm Animals",
    "Wild Animals",
    "Reptiles",
    "Monuments",
    "Parts of Plants",
    "Countries Around the World",
    "People Who Help Us"
  ];

  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="overflow-visible" style={{ width: `${SLOT_WIDTH * 3 + GAP_PX * 2}px`, paddingTop: '60px' }}>
        <div
          ref={trackRef}
          className="flex items-end"
          style={{
            gap: `${GAP_PX}px`,
            transform: `translateX(${translateX}px) translateY(-60px)`,
            transition: useTransition ? `transform ${transitionSpeed}ms ease-in-out` : 'none',
          }}
        >
          {extended.map((src, i) => {
            const isCenter = i === index + 1;
            const imageNumber = (i % length) + 1;
            const isVisible = i >= index && i <= index + 2;
            const animalName = animalNames[imageNumber - 1] || `Animal ${imageNumber}`;
            return (
              <div key={`img-${i}-${src}`} className="flex-shrink-0" style={{ width: `${SLOT_WIDTH}px`, height: `${SLOT_HEIGHT}px` }}>
                <div
                  className="relative w-full h-full"
                  style={{
                    transformOrigin: 'bottom center',
                    transform: `scale(${isCenter ? 1.2 : 0.8})`,
                    transition: useTransition ? `transform ${transitionSpeed}ms ease-in-out, opacity ${transitionSpeed}ms ease-in-out` : 'none',
                    zIndex: isCenter ? 10 : 5,
                    opacity: isVisible ? 1 : 0,
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
                  <div
                    className="absolute -top-12 left-0 right-0 p-2"
                    style={{
                      transformOrigin: 'top center',
                      transform: `scale(${isCenter ? 1.2 : 0.8})`,
                      transition: useTransition ? `transform ${transitionSpeed}ms ease-in-out` : 'none',
                    }}
                  >
                    <p className={`font-medium text-center ${isCenter ? 'text-neon-green text-lg' : 'text-white text-base'}`} style={{ transition: useTransition ? `font-size ${transitionSpeed}ms ease-in-out, color ${transitionSpeed}ms ease-in-out` : 'none' }}>
                      {animalName}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-between z-10">
        <div className="pointer-events-auto -ml-3 z-20">
          <motion.button
            onClick={prevImage}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-neon-green/70 bg-black/80 hover:bg-neon-green/20 hover:border-neon-green text-neon-green hover:text-neon-green transition-all duration-300 shadow-[0_4px_16px_rgba(57,255,20,0.3)] hover:shadow-[0_6px_24px_rgba(57,255,20,0.4)]"
          >
            <ChevronRight className="h-6 w-6 rotate-180" />
          </motion.button>
        </div>
        <div className="pointer-events-auto -mr-3 z-20">
          <motion.button
            onClick={nextImage}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-neon-green/70 bg-black/80 hover:bg-neon-green/20 hover:border-neon-green text-neon-green hover:text-neon-green transition-all duration-300 shadow-[0_4px_16px_rgba(57,255,20,0.3)] hover:shadow-[0_6px_24px_rgba(57,255,20,0.4)]"
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const meiphorData = {
  id: 'meiphor',
  title: 'Meiphor',
  tagline: 'Advanced XR application with immersive user interfaces and real-time interactions',
  technologies: ['Unity', 'C#', 'Vuforia SDK', 'Addressable', 'WebView Integration', 'Cross-Platform Development', 'QR Code Scanner', 'Performance Optimization', 'Version Control'],
  links: {
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
        'Landforms',
        'Monuments',
        'Reptiles',
        'Countries Around the World',
        'Etc.'
      ]
    }
  ]
};

export const MeiphorDetail = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('');
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [navHeight, setNavHeight] = useState<number>(0);
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState<boolean>(false);
  const [isMobileNavSticky, setIsMobileNavSticky] = useState<boolean>(false);
  const [isVideoPanelOpen, setIsVideoPanelOpen] = useState<boolean>(false);
  const [panelVideoSrc, setPanelVideoSrc] = useState<string>('');
  const [panelWatchUrl, setPanelWatchUrl] = useState<string>('');
  const videoProgressByIdRef = useRef<Record<string, number>>({});
  const currentVideoIdRef = useRef<string | null>(null);
  const panelIframeRef = useRef<HTMLIFrameElement | null>(null);
  const scrollLockYRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const navTopRef = useRef<number>(0);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<HTMLIFrameElement[]>([]);
  const STICKY_HEIGHT = 56;
  const GAP_BELOW = 64;

  const parseYouTubeUrl = useCallback((videoUrl: string) => {
    const embedIndex = videoUrl.indexOf('/embed/');
    if (embedIndex === -1) return { id: null, watchUrl: videoUrl };
    
    const after = videoUrl.substring(embedIndex + 7);
    const id = after.split(/[?&#]/)[0];
    const watchUrl = id ? `https://www.youtube.com/watch?v=${id}` : videoUrl;
    return { id, watchUrl };
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    
    const constantOffset = STICKY_HEIGHT + GAP_BELOW;
    const targetTop = element.getBoundingClientRect().top + window.scrollY - constantOffset;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    setActiveSection(sectionId);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!(isVideoPanelOpen && isMobile)) return;
    
    scrollLockYRef.current = window.scrollY || window.pageYOffset || 0;
    const originalBodyStyle = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };
    const originalHtmlOverscroll = (document.documentElement as HTMLElement).style.overscrollBehavior;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollLockYRef.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    (document.documentElement as HTMLElement).style.overscrollBehavior = 'contain';

    return () => {
      const topStr = document.body.style.top || '0px';
      const lockedOffset = Math.abs(parseInt(topStr.replace('px', ''), 10)) || scrollLockYRef.current || 0;

      const htmlEl = document.documentElement as HTMLElement;
      const originalScrollBehavior = htmlEl.style.scrollBehavior;
      htmlEl.style.scrollBehavior = 'auto';

      document.body.style.position = originalBodyStyle.position;
      document.body.style.top = originalBodyStyle.top;
      document.body.style.left = originalBodyStyle.left;
      document.body.style.right = originalBodyStyle.right;
      document.body.style.width = originalBodyStyle.width;
      document.body.style.overflow = originalBodyStyle.overflow;
      htmlEl.style.overscrollBehavior = originalHtmlOverscroll;

      window.scrollTo(0, lockedOffset);

      setTimeout(() => {
        htmlEl.style.scrollBehavior = originalScrollBehavior;
      }, 0);
    };
  }, [isVideoPanelOpen, isMobile]);

  useEffect(() => {
    if (!isVideoPanelOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVideoPanelOpen(false);
        setPanelVideoSrc('');
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isVideoPanelOpen]);

  useEffect(() => {
    if (!(isVideoPanelOpen && isMobile)) return;
    
    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as Element;
      const videoContainer = target.closest('[data-video-container]');
      
      if (videoContainer) {
        e.preventDefault();
      } else {
        setIsVideoPanelOpen(false);
        setPanelVideoSrc('');
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as Element;
      const videoContainer = target.closest('[data-video-container]');
      
      if (videoContainer) {
        e.preventDefault();
      } else {
        setIsVideoPanelOpen(false);
        setPanelVideoSrc('');
      }
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('touchmove', handleTouchMove as EventListener);
      window.removeEventListener('wheel', handleWheel as EventListener);
    };
  }, [isVideoPanelOpen, isMobile]);

  useEffect(() => {
    if (!isVideoPanelOpen || !panelIframeRef.current) return;

    const interval = window.setInterval(() => {
      try {
        panelIframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening' }), '*');
        panelIframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'getCurrentTime', args: [] }), '*');
      } catch {}
    }, 2000);

    const handler = (event: MessageEvent) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (!data) return;

        if (typeof data.info === 'number') {
          const url = panelIframeRef.current?.getAttribute('src') || '';
          const idx = url.indexOf('/embed/');
          if (idx !== -1) {
            const after = url.substring(idx + 7);
            const id = after.split(/[?&#]/)[0];
            if (id) {
              videoProgressByIdRef.current[id] = data.info;
              currentVideoIdRef.current = id;
            }
          }
        }
      } catch {}
    };

    window.addEventListener('message', handler);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('message', handler);
    };
  }, [isVideoPanelOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current && window.innerWidth >= 768) {
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

      if (window.innerWidth < 768) {
        const exploreFeaturesElement = document.getElementById('explore-features-nav');
        if (exploreFeaturesElement) {
          const rect = exploreFeaturesElement.getBoundingClientRect();
          if (rect.top <= 0) {
            setIsMobileNavSticky(true);
          } else {
            setIsMobileNavSticky(false);
          }
        }
      }

      const exploreFeaturesElement = document.getElementById('explore-features-nav');
      if (exploreFeaturesElement) {
        const exploreRect = exploreFeaturesElement.getBoundingClientRect();
        if (exploreRect.top > 0) {
          setActiveSection('');
        } else {
          const sections = meiphorData.sections.map((_, index) => `section-${index}`);
          const current = sections.find(section => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 200 && rect.bottom >= 200;
            }
            return false;
          });
          if (current) setActiveSection(current);
        }
      }
      
      videoRefs.current.forEach((videoRef) => {
        if (videoRef) {
          const rect = videoRef.getBoundingClientRect();
          const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
          
          if (!isInViewport) {
            try {
              videoRef.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            } catch (e) {}
          }
        }
      });
    };

    const measure = () => {
      if (navRef.current) {
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
  }, [isSticky]);

  useEffect(() => {
    if (!isSectionMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-section-menu]')) {
        setIsSectionMenuOpen(false);
      }
    };

    const handleScroll = () => setIsSectionMenuOpen(false);
    
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSectionMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isSectionMenuOpen]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden" style={{ backgroundColor: '#000000' }}>
      <style>{`
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        body { background-color: #000000 !important; }
        html { background-color: #000000 !important; }
      `}</style>
      <ParticleBackground />
      
      <main className="pt-4 relative z-10">
        {/* Mobile Video Panel Overlay */}
        {isMobile && isVideoPanelOpen && (
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm overscroll-contain"
            onClick={() => {
              setIsVideoPanelOpen(false);
              setPanelVideoSrc('');
            }}
          >
            <div
              className="relative w-[92%] max-w-[720px] shadow-xl overscroll-contain flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              data-video-container
              style={{ touchAction: 'none' }}
            >
              <div className="text-center mb-4 -mt-32">
                <h3 className="text-2xl font-semibold text-white">
                  {meiphorData.sections.find(section => section.video === panelVideoSrc.split('?')[0])?.heading || 'Video'}
                </h3>
              </div>
              <div className="relative w-full rounded-xl border border-neon-green/20 overscroll-contain mt-16" style={{ aspectRatio: '1280/720' }}>
                <iframe
                  src={panelVideoSrc}
                  title="Video"
                  className="absolute top-0 left-0 w-full h-full rounded-xl bg-black touch-none"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-presentation"
                  ref={panelIframeRef}
                ></iframe>
              </div>
              <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 select-none" style={{ touchAction: 'manipulation' }}>
                <a
                  href={panelWatchUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-neon-green text-background font-medium hover:bg-neon-green/90 transition-colors text-lg"
                >
                  Play on YouTube
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Sticky Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          title="Return to main page"
          className="fixed top-3 left-6 z-[60] flex items-center gap-2 bg-gradient-to-r from-black/90 to-neon-green/20 backdrop-blur-sm border border-neon-green/50 rounded-lg px-4 py-2 text-neon-green hover:text-neon-green/80 hover:bg-gradient-to-r hover:from-neon-green/20 hover:to-black/90 hover:border-neon-green hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all duration-200 ease-in-out shadow-lg"
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
            className="text-center mb-4"
          >
            <div className="flex flex-col items-center mb-4">
              <motion.div
                className="text-6xl text-center flex flex-col md:flex-row items-center justify-center min-h-[240px] gap-6 -mt-8 md:mt-0"
                style={{ marginBottom: 8 }}
              >
                <img 
                  key="meiphor-logo-detail"
                  src="https://i.postimg.cc/ZqB3Smx4/logosm.png" 
                  alt="Meiphor Logo"
                  className="w-48 h-48 object-contain"
                />
                <h1 className="hidden md:block text-4xl font-bold text-foreground tracking-wider mt-4">
                  <span className="text-6xl">M</span>EIPHOR
                </h1>
              </motion.div>
              <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-full mx-auto px-1 text-justify font-medium leading-relaxed tracking-normal -mt-8 md:mt-0" style={{fontFamily: 'Tahoma, sans-serif', wordSpacing: '0.3em', textIndent: '2.25em'}}>
              Initiated and led the end-to-end development of Meiphor, an AR-based learning application, right from its inception after joining HackGeniX Tech Private Limited. Spearheaded core research, architecture design, and full-cycle implementation, managing UI/UX and 3D modeling teams to ensure technical scalability, optimized performance, and an engaging user experience. Delivered a stable, cross-platform AR solution for Android and iOS, setting the foundation for future AR-based educational products within the company.
              </p>
              
              {/* Download Buttons */}
              <div className="flex flex-wrap justify-center gap-6 mb-6">
                <motion.button
                  onClick={() => window.open(meiphorData.links.playStore, '_blank')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-neon-green text-background rounded-lg hover:bg-neon-green/90 transition-all duration-300 font-medium"
                >
                  <img src="https://i.postimg.cc/MpvbWN7z/play-store.png" alt="Play Store" className="h-6 w-6" />
                  <span className="text-base">Play Store</span>
                </motion.button>

                <motion.button
                  onClick={() => window.open(meiphorData.links.appStore, '_blank')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-neon-green text-background rounded-lg hover:bg-neon-green/90 transition-all duration-300 font-medium"
                >
                  <img src="https://i.postimg.cc/0N39TM8b/app-store.png" alt="App Store" className="h-6 w-6" />
                  <span className="text-base">App Store</span>
                </motion.button>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-col items-center gap-3 mb-6">
              <h3 className="text-3xl font-semibold text-center mb-2 text-foreground">
                Tech Stack
              </h3>
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-3">
                {['Unity', 'C#', 'Vuforia SDK', 'Addressable', 'WebView Integration', 'Cross-Platform Development'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-sm font-medium bg-neon-green/10 text-neon-green border border-neon-green/30 rounded-full text-justify"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-3">
                {['QR Code Scanner', 'Performance Optimization', 'Version Control'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-sm font-medium bg-neon-green/10 text-neon-green border border-neon-green/30 rounded-full text-justify"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Sections */}
        <>
          <motion.div
            id="explore-features-nav"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10 py-2 mt-6"
          >
            <div className="container mx-auto px-6">
              <h3 className="text-3xl font-semibold text-center text-foreground">
                Explore Features
              </h3>
            </div>
          </motion.div>

          <div ref={sentinelRef}></div>

          {isMobileNavSticky && isSectionMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40 md:hidden"
              onClick={() => setIsSectionMenuOpen(false)}
            />
          )}

          {isMobileNavSticky && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-neon-green/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-50 md:hidden"
            >
              <div className="w-full py-2">
                <div className="flex items-center justify-end">
                  <div className="relative" data-section-menu>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsSectionMenuOpen(!isSectionMenuOpen)}
                      className="text-neon-green p-3 mr-0"
                    >
                      {isSectionMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </motion.button>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ 
                        opacity: isSectionMenuOpen ? 1 : 0, 
                        scale: isSectionMenuOpen ? 1 : 0.95,
                        y: isSectionMenuOpen ? 0 : -10 
                      }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full right-0 mt-2 w-64 bg-background/95 backdrop-blur-md border border-neon-green/20 rounded-lg shadow-lg ${
                        isSectionMenuOpen ? 'block' : 'hidden'
                      }`}
                    >
                      <div className="py-2">
                        {meiphorData.sections.map((section, index) => (
                          <motion.button
                            key={index}
                            onClick={() => {
                              scrollToSection(`section-${index}`);
                              setIsSectionMenuOpen(false);
                            }}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full text-left px-4 py-3 transition-colors duration-200 font-medium ${
                              activeSection === `section-${index}` 
                                ? 'text-neon-green bg-neon-green/10' 
                                : 'text-muted-foreground hover:text-neon-green hover:bg-neon-green/5'
                            }`}
                          >
                            {section.heading}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div
            ref={navRef}
            className={`${isSticky && window.innerWidth >= 768 ? 'fixed top-0 left-0 right-0 bg-black/70 backdrop-blur-sm border-b border-neon-green/20 shadow-[0_4px_16px_rgba(0,0,0,0.35)] z-40 hidden md:block' : 'relative z-10 mb-3'} ${isSticky && window.innerWidth >= 768 ? 'py-6' : 'py-2'}`}
            style={{ transition: 'background-color 200ms ease, box-shadow 200ms ease, backdrop-filter 200ms ease, padding 300ms ease' }}
          >
            <div className="container mx-auto px-6">
              <div className="hidden md:flex flex-wrap justify-center gap-x-4 gap-y-3">
                {meiphorData.sections.map((section, index) => (
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

              <div className="md:hidden flex flex-wrap justify-center gap-x-4 gap-y-3">
                {meiphorData.sections.map((section, index) => (
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
          </div>

          <div style={{ height: isSticky ? `${navHeight + 1}px` : `1px` }}></div>
        </>

        {/* Project Sections */}
        <div className="container mx-auto px-1 relative z-10">
          {meiphorData.sections.map((section, index) => (
            <div key={index}>
              <div className="flex items-center justify-center my-8">
                <div className="h-px bg-gradient-to-r from-transparent via-neon-green/50 to-transparent w-full"></div>
              </div>
              
              <motion.div
                id={`section-${index}`}
                initial={{ opacity: 0, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0 }}
                viewport={{ once: true }}
                className={index === meiphorData.sections.length - 1 ? "mb-4" : "mb-16"}
                style={{ scrollMarginTop: 0 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-foreground">
                  {section.heading}
                </h2>
                {section.heading === 'Upcoming AR Flash Cards' && (
                  <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-24 max-w-3xl mx-auto text-center">
                    We're continuously expanding our AR Flash Cards library with new educational categories — most of which are in the final stage of development and will be rolled out in upcoming updates.
                  </p>
                )}

                {section.video ? (
                  <div className="mb-6 rounded-xl overflow-hidden border border-neon-green/10 max-w-[720px] mx-auto relative particle-bg">
                    <div className="relative w-full" style={{ aspectRatio: '1280/720' }}>
                      {isMobile ? (
                        (() => {
                          const { id } = parseYouTubeUrl(section.video!);
                          const thumbUrl = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '/placeholder.svg';
                          return (
                            <>
                              <img
                                src={thumbUrl}
                                alt={section.heading}
                                className="absolute top-0 left-0 w-full h-full rounded-xl object-cover select-none"
                                loading="lazy"
                                draggable={false}
                              />
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/75 border-2 border-neon-green">
                                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="text-neon-green" style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.3))' }}>
                                    <polygon points="8,5 8,19 19,12" fill="currentColor" />
                                  </svg>
                                </div>
                              </div>
                            </>
                          );
                        })()
                      ) : (
                        <iframe
                          ref={(el) => {
                            if (el) {
                              videoRefs.current[index] = el;
                            }
                          }}
                          src={`${section.video}?rel=0&modestbranding=1&showinfo=0&controls=1&playsinline=1&mute=0&autoplay=0&origin=${window.location.origin}&enablejsapi=1`}
                          title={section.heading}
                          className="absolute top-0 left-0 w-full h-full rounded-xl bg-black"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          sandbox="allow-scripts allow-same-origin allow-presentation"
                        ></iframe>
                      )}
                      {isMobile && (
                        <button
                          type="button"
                          aria-label="Play video"
                          onClick={() => {
                            const { id, watchUrl } = parseYouTubeUrl(section.video!);
                            let startParam = '';
                            
                            if (id) {
                              currentVideoIdRef.current = id;
                              const saved = videoProgressByIdRef.current[id];
                              if (typeof saved === 'number' && saved > 0) {
                                startParam = `&start=${Math.floor(saved)}`;
                              }
                            }
                            
                            const autoplayUrl = `${section.video}?autoplay=1&playsinline=1&rel=0&modestbranding=1&controls=1&origin=${window.location.origin}&enablejsapi=1${startParam}`;
                            setPanelVideoSrc(autoplayUrl);
                            setPanelWatchUrl(watchUrl);
                            setIsVideoPanelOpen(true);
                          }}
                          className="absolute inset-0 bg-black/0"
                        />
                      )}
                    </div>
                  </div>
                ) : section.images ? (
                  <div className="mb-6">
                    {section.heading === 'Upcoming AR Flash Cards' ? (
                      <UpcomingFlashCardsCarousel images={section.images} />
                    ) : (
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

                {section.heading === 'Upcoming AR Flash Cards' ? (
                  <div className="mt-16">
                    <h4 className="text-[1.6rem] md:text-[1.9rem] font-semibold text-center mb-4 text-foreground" style={{ wordSpacing: '0.15em' }}>New Flashcard Categories</h4>
                    <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-4 px-2 md:px-8">
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
                
                {section.heading === 'Upcoming AR Flash Cards' && (
                  <>
                    <p className="mt-16 mb-12 text-base md:text-lg text-muted-foreground text-center max-w-3xl mx-auto">
                      These AR flashcards mark just the beginning — every update brings a new way for children to learn through immersive visuals
                    </p>
                    <div className="flex items-center justify-center mt-6 mb-1">
                      <div className="h-px bg-gradient-to-r from-transparent via-neon-green/50 to-transparent w-full"></div>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Project Credit Section */}
        <motion.div 
          className="relative z-10 pb-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-center text-sm md:text-base font-light tracking-wide"
            style={{ 
              fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              color: '#39ff14',
              textShadow: '0 0 20px rgba(57, 255, 20, 0.3)',
              letterSpacing: '0.05em'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Developed at HackGeniX Tech Private Limited<br />
            Lead: Suhail M.
          </motion.p>
        </motion.div>

        <div className="h-2 relative z-10"></div>
      </main>
    </div>
  );
};






