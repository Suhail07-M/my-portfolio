import { motion } from 'framer-motion';
import { ExternalLink, Github, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  links: {
    github?: string;
    live?: string;
    store?: string;
  };
}

const projects: Project[] = [
  {
    id: 'meiphor',
    title: 'Meiphor',
    description: 'Advanced XR application with immersive user interfaces and real-time interactions',
    image: '🎮',
    technologies: ['Unity', 'C#', 'XR Toolkit', 'AR Foundation'],
    links: {
      github: '#',
      store: '#'
    }
  },
  {
    id: 'ar-commerce',
    title: 'AR Commerce Platform',
    description: 'Revolutionary shopping experience using augmented reality technology',
    image: '🛍️',
    technologies: ['Unity', 'ARCore', 'WebGL', 'Firebase'],
    links: {
      github: '#',
      live: '#'
    }
  },
  {
    id: 'vr-training',
    title: 'VR Training Simulator',
    description: 'Enterprise VR solution for immersive employee training programs',
    image: '🎯',
    technologies: ['Unity', 'OpenXR', 'Oculus SDK', 'Photon'],
    links: {
      github: '#',
      live: '#'
    }
  },
  {
    id: 'web-portfolio',
    title: 'Interactive Portfolio',
    description: 'Modern portfolio website with advanced animations and 3D elements',
    image: '🌐',
    technologies: ['React', 'Three.js', 'GSAP', 'TypeScript'],
    links: {
      github: '#',
      live: '#'
    }
  }
];

export const Projects = () => {
  const navigate = useNavigate();

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Featured <span className="text-neon-green">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing innovative XR experiences and modern web applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -10 }}
              className="group relative cursor-pointer"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="bg-card rounded-xl p-8 border border-neon-green/20 hover:border-neon-green/50 transition-all duration-500 h-full backdrop-blur-sm">
                {/* Neon glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                
                <div className="relative z-10">
                  {/* Project Icon/Image */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="text-6xl mb-6 text-center group-hover:drop-shadow-[0_0_20px_rgba(57,255,20,0.7)] transition-all duration-300"
                  >
                    {project.image}
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-neon-green transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-neon-green/10 text-neon-green border border-neon-green/30 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-4">
                    {project.links.github && (
                      <motion.a
                        href={project.links.github}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-transparent border border-neon-green/50 text-neon-green rounded-lg hover:bg-neon-green/10 transition-all duration-300"
                      >
                        <Github size={16} />
                        <span className="text-sm">Code</span>
                      </motion.a>
                    )}
                    
                    {project.links.live && (
                      <motion.a
                        href={project.links.live}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-neon-green text-background rounded-lg hover:bg-neon-green/90 transition-all duration-300 font-medium"
                      >
                        <ExternalLink size={16} />
                        <span className="text-sm">Live</span>
                      </motion.a>
                    )}
                    
                    {project.links.store && (
                      <motion.a
                        href={project.links.store}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-transparent border border-neon-green/50 text-neon-green rounded-lg hover:bg-neon-green/10 transition-all duration-300"
                      >
                        <Smartphone size={16} />
                        <span className="text-sm">Store</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-neon-green text-neon-green font-semibold rounded-lg hover:bg-neon-green/10 transition-all duration-300 neon-glow"
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};