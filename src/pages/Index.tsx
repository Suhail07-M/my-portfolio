import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Resume } from '@/components/Resume';
import { Workshops } from '@/components/Workshops';
import { Contact } from '@/components/Contact';

const Index = () => (
    <div className="min-h-screen bg-background overflow-x-hidden">
    <Navigation />
    
    <main>
      <Hero />
      <Skills />
      <Projects />
      <Workshops />
      <Resume />
      <Contact />
    </main>

    <footer className="border-t border-neon-green/20 py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="text-muted-foreground">
          &copy; 2024 Suhail M. Built with passion for XR development.
        </p>
      </div>
    </footer>
  </div>
);

export default Index;
