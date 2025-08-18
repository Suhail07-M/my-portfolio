import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Smartphone } from 'lucide-react';
import { Navigation } from '@/components/Navigation';

interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  technologies: string[];
  links: {
    github?: string;
    live?: string;
    store?: string;
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
    technologies: ['Unity', 'C#', 'XR Toolkit', 'AR Foundation'],
    links: {
      github: '#',
      store: '#'
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
  
  const project = slug ? projectsData[slug] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-neon-green text-background rounded-lg hover:bg-neon-green/90 transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <div className="container mx-auto px-6 py-12">
          <motion.button
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-neon-green hover:text-neon-green/80 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </motion.button>

          {/* Project Title and Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground">
              {project.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {project.tagline}
            </p>

            {/* Tech Stack */}
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

            {/* External Links */}
            <div className="flex justify-center gap-4">
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
              
              {project.links.store && (
                <motion.a
                  href={project.links.store}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-transparent border border-neon-green/50 text-neon-green rounded-lg hover:bg-neon-green/10 transition-all duration-300"
                >
                  <Smartphone size={20} />
                  App Store
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Project Sections */}
        <div className="container mx-auto px-6">
          {project.sections.map((section, index) => (
            <motion.div
              key={index}
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
              <div className="max-w-4xl mx-auto">
                <ul className="space-y-4">
                  {section.points.map((point, pointIndex) => (
                    <motion.li
                      key={pointIndex}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: pointIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="w-2 h-2 bg-neon-green rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-lg">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Spacer */}
        <div className="h-20"></div>
      </main>
    </div>
  );
};