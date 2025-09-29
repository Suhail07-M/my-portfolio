import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Workshop {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
}

const workshops: Workshop[] = [
  {
    id: '1',
    title: 'XR Development Masterclass',
    description: 'Comprehensive workshop on building immersive XR experiences with Unity',
    image: '🥽',
    date: 'Dec 2023',
    location: 'Tech Conference Hall'
  },
  {
    id: '2',
    title: 'AR for Enterprise',
    description: 'Training session on implementing AR solutions for business applications',
    image: '📱',
    date: 'Nov 2023',
    location: 'Corporate Training Center'
  },
  {
    id: '3',
    title: 'Unity Performance Optimization',
    description: 'Advanced techniques for optimizing Unity applications for mobile and VR',
    image: '⚡',
    date: 'Oct 2023',
    location: 'Developer Meetup'
  },
  {
    id: '4',
    title: 'WebXR Development',
    description: 'Building web-based XR experiences with modern browser technologies',
    image: '🌐',
    date: 'Sep 2023',
    location: 'Online Workshop'
  }
];

export const Workshops = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftStartRef = useRef<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragMovedRef = useRef<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const hasPointerCaptureRef = useRef<boolean>(false);
  const scrollByAmount = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    // Only act on primary button
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    dragMovedRef.current = false;
    hasPointerCaptureRef.current = false;
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
      if (!hasPointerCaptureRef.current) {
        scrollRef.current.setPointerCapture?.(e.pointerId);
        hasPointerCaptureRef.current = true;
      }
    }
    // Direct assignment for immediate response while dragging
    scrollRef.current.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const endDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    setIsDragging(false);
    if (e && scrollRef.current) {
      if (hasPointerCaptureRef.current) {
        scrollRef.current.releasePointerCapture?.(e.pointerId);
      }
    }
    hasPointerCaptureRef.current = false;
    // Reset movement tracker shortly after end to allow next click
    dragMovedRef.current = false;
  };

  // Body scroll lock and ESC close for modal
  useEffect(() => {
    if (!isModalOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);


  const galleryImages: string[] = [
    'https://i.postimg.cc/rp3GgHsJ/01.jpg',
    'https://i.postimg.cc/qBjqT3cb/02.jpg',
    'https://i.postimg.cc/02jQ2ycJ/03.jpg',
    'https://i.postimg.cc/zDtzM15k/04.jpg',
    'https://i.postimg.cc/hPXDR3tD/05.jpg',
    'https://i.postimg.cc/7hfkDfwv/06.jpg',
    'https://i.postimg.cc/Rhyz04Z4/07.jpg',
    'https://i.postimg.cc/y8FzVq43/08.jpg',
    'https://i.postimg.cc/yNsCxfsc/09.jpg',
    'https://i.postimg.cc/90vvhbLY/10.jpg'
  ];
  return (
    <section id="workshops" className="py-20 relative">
      {/* Local utility to hide scrollbars across browsers */}
      <style>{`
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-neon-green">Workshops</span> & Training
          </h2>
          <div className="text-[1.18rem] mx-auto text-center lg:text-justify leading-relaxed font-normal text-[#bbb] md:text-[#c7c7c7]" style={{ fontFamily: 'Tahoma, Verdana, Segoe UI, sans-serif' }}>
            <p className="mx-auto lg:tracking-normal" style={{ wordSpacing: '0.18em' }}>
              Conducted comprehensive technical training programs across <strong>20+ educational institutions</strong>, successfully guiding <strong>2000+ students</strong> in game development and emerging technologies. Expertise in <strong>Unity 3D</strong>, <strong>C# programming</strong>, <strong>AR/VR</strong> implementation, interactive media design, and performance optimization. Developed hands-on workshops and industry-aligned projects that bridge classroom theory with practical development skills.
            </p>
          </div>
        </motion.div>

        {/* Horizontal Image Gallery */}
        <div className="relative">
          {/* Arrows (desktop) */}
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollByAmount(-600)}
            className="hidden md:flex items-center justify-center absolute -left-16 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border border-neon-green/30 bg-card/70 hover:bg-card text-neon-green/80 hover:text-neon-green shadow-[0_0_20px_rgba(57,255,20,0.15)] transition-all duration-300 text-base"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollByAmount(600)}
            className="hidden md:flex items-center justify-center absolute -right-16 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border border-neon-green/30 bg-card/70 hover:bg-card text-neon-green/80 hover:text-neon-green shadow-[0_0_20px_rgba(57,255,20,0.15)] transition-all duration-300 text-base"
          >
            ›
          </button>

          <div
            ref={scrollRef}
            className={`mx-auto overflow-x-auto overflow-y-hidden no-scrollbar select-none md:cursor-grab ${isDragging ? 'md:cursor-grabbing' : 'scroll-smooth'}`}
            style={{ touchAction: 'pan-x' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
          >
            <div className="flex items-center gap-6 py-2 w-max pl-4 md:pl-6">
              {galleryImages.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative group"
                >
                  <div className="relative">
                    <img
                      src={src}
                      alt={`Workshop ${i + 1}`}
                      className="h-44 md:h-48 lg:h-52 w-[280px] md:w-[320px] lg:w-[360px] object-cover rounded-[22px] md:rounded-[28px] border-[3px] md:border-[4px] border-neon-green/50 hover:border-neon-green/70 hover:scale-105 transition-all duration-500"
                      loading="lazy"
                      draggable={false}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Image clicked');
                        if (dragMovedRef.current) {
                          console.log('Click ignored due to drag');
                          return;
                        }
                        setModalSrc(src);
                        setIsModalOpen(true);
                      }}
                      onMouseUp={(e) => {
                        // Fallback for browsers where click may be swallowed after drag
                        if (!dragMovedRef.current && !isModalOpen) {
                          console.log('Image mouseup - opening modal');
                          setModalSrc(src);
                          setIsModalOpen(true);
                        }
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="absolute inset-0 bg-black/80"
                onClick={() => setIsModalOpen(false)}
              />
              <motion.div
                className="relative z-[61] max-w-[95vw] max-h-[90vh] p-0"
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  aria-label="Close"
                  className="absolute top-5 right-5 h-12 w-12 rounded-full bg-black/70 border-2 border-green-400/50 text-green-400 hover:bg-black/90 hover:border-green-400 hover:scale-110 transition-all duration-200 ease-in-out z-[62] shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] cursor-pointer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '700',
                    lineHeight: '1',
                    fontFamily: 'monospace',
                    padding: '0',
                    margin: '0'
                  }}
                  onClick={() => setIsModalOpen(false)}
                >
                  <span style={{ 
                    transform: 'translateY(-1px)',
                    display: 'block'
                  }}>
                    ×
                  </span>
                </button>
                {modalSrc && (
                  <img
                    src={modalSrc}
                    alt="Workshop full view"
                    className="max-w-[95vw] max-h-[90vh] object-contain rounded-[18px]"
                    draggable={false}
                  />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};