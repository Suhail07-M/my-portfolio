import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Resume } from '@/components/Resume';
import { Workshops } from '@/components/Workshops';
import { Contact } from '@/components/Contact';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // GSAP ScrollTrigger animations
    gsap.fromTo(
      ".fade-in-section",
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".fade-in-section",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Parallax effect for sections
    gsap.utils.toArray(".parallax").forEach((element: any) => {
      gsap.fromTo(
        element,
        { y: -50 },
        {
          y: 50,
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      
      <main>
        <Hero />
        
        <div className="fade-in-section parallax">
          <Skills />
        </div>
        
        <div className="fade-in-section parallax">
          <Projects />
        </div>
        
        <div className="fade-in-section parallax">
          <Resume />
        </div>
        
        <div className="fade-in-section parallax">
          <Workshops />
        </div>
        
        <div className="fade-in-section parallax">
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neon-green/20 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            &copy; 2024 Suhail M. Built with passion for XR development.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
