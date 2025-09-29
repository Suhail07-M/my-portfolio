import { motion } from 'framer-motion';
import { ExternalLink, Github, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Projects.css';

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
    description: 'An Augmented Reality Educational App for Students',
    image: 'https://i.postimg.cc/x8rRWFM4/logosm.png',
    technologies: ['Unity', 'C#', 'Vuforia SDK', 'QR Code Scanner', 'WebView Integration'],
    links: {
      github: '#',
      store: '#'
    }
  },
  {
    id: 'space-reality',
    title: 'Space Reality',
    description: 'AR educational app for space technology concepts',
    image: 'https://i.postimg.cc/k4kqt5wx/SPACE-REALITY-3-Copy.png',
    technologies: ['Unity', 'C#', 'Addressable', 'Version Control', 'Performance Optimization'],
    links: {
      github: '#',
      live: '#'
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

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Row 1: First three cards normal grid items */}
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -10 }}
              className="group relative cursor-pointer project-card"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="bg-card rounded-xl p-8 border border-neon-green/20 hover:border-neon-green/50 transition-all duration-500 h-full backdrop-blur-sm">
                <div className="absolute inset-0 rounded-xl bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="relative h-[88px]">
                    <motion.div
                      initial={project.id === 'meiphor' ? { y: -21 } : undefined}
                      animate={project.id === 'meiphor' ? { y: -21 } : undefined}
                      whileHover={project.id === 'meiphor' ? { scale: 1.1, rotate: 5, y: -25 } : { scale: 1.1, rotate: 5 }}
                      className={`absolute inset-x-0 top-0 flex justify-center group-hover:drop-shadow-[0_0_20px_rgba(57,255,20,0.7)] transition-all duration-300 ${project.id === 'meiphor' ? 'origin-top' : ''}`}
                    >
                      {project.image.startsWith('http') ? (
                        <img
                          src={project.image}
                          alt={`${project.title} logo`}
                          className={`${project.id === 'meiphor' ? 'h-[104px] w-[104px]' : 'h-16 w-16'} object-contain`}
                        />
                      ) : (
                        <span className={`${project.id === 'meiphor' ? 'text-9xl' : 'text-6xl'} leading-none`}>{project.image}</span>
                      )}
                    </motion.div>
                  </div>
                  <h3 className="text-[28px] font-bold mb-4 text-foreground group-hover:text-neon-green transition-colors duration-300 -mt-2 text-center">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3 text-justify -mt-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-neon-green/10 text-neon-green border border-neon-green/30 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-6 mt-auto justify-center">
                    {project.id === 'meiphor' && project.links.store && (
                      <motion.a
                        href="https://play.google.com/store/apps/details?id=com.METAPREP.Meiphor&hl=en_IN"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-neon-green text-background rounded-lg hover:bg-neon-green/90 transition-all duration-300 font-medium"
                      >
                        <img src="https://i.postimg.cc/MpvbWN7z/play-store.png" alt="Play Store" className="h-4 w-4" />
                        <span className="text-sm">Play Store</span>
                      </motion.a>
                    )}
                    {project.id === 'meiphor' && (
                      <motion.a
                        href="https://apps.apple.com/in/app/meiphor/id6503905399"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-neon-green text-background rounded-lg hover:bg-neon-green/90 transition-all duration-300 font-medium"
                      >
                        <img src="https://i.postimg.cc/0N39TM8b/app-store.png" alt="App Store" className="h-4 w-4" />
                        <span className="text-sm">App Store</span>
                      </motion.a>
                    )}
                    {project.id !== 'meiphor' && project.links.github && (
                      <motion.a
                        href={project.links.github}
                        onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-neon-green text-background rounded-lg hover:bg-neon-green/90 transition-all duration-300 font-medium"
                      >
                        <ExternalLink size={16} />
                        <span className="text-sm">Live</span>
                      </motion.a>
                    )}
                    {project.id !== 'meiphor' && project.links.store && (
                      <motion.a
                        href={project.links.store}
                        onClick={(e) => e.stopPropagation()}
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

          {/* For tablet/mobile: render 4th and 5th as normal grid items, hide on lg */}
          {projects.slice(3, 5).map((project, idx) => (
            <motion.div
              key={`${project.id}-md`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (3 + idx) * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -10 }}
              className="group relative cursor-pointer project-card lg:hidden"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="bg-card rounded-xl p-8 border border-neon-green/20 hover:border-neon-green/50 transition-all duration-500 h-full backdrop-blur-sm">
                <div className="absolute inset-0 rounded-xl bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="relative h-[88px]">
                    <motion.div
                      initial={project.id === 'meiphor' ? { y: -21 } : undefined}
                      animate={project.id === 'meiphor' ? { y: -21 } : undefined}
                      whileHover={project.id === 'meiphor' ? { scale: 1.1, rotate: 5, y: -25 } : { scale: 1.1, rotate: 5 }}
                      className={`absolute inset-x-0 top-0 flex justify-center group-hover:drop-shadow-[0_0_20px_rgba(57,255,20,0.7)] transition-all duration-300 ${project.id === 'meiphor' ? 'origin-top' : ''}`}
                    >
                      {project.image.startsWith('http') ? (
                        <img
                          src={project.image}
                          alt={`${project.title} logo`}
                          className={`${project.id === 'meiphor' ? 'h-[104px] w-[104px]' : 'h-16 w-16'} object-contain`}
                        />
                      ) : (
                        <span className={`${project.id === 'meiphor' ? 'text-9xl' : 'text-6xl'} leading-none`}>{project.image}</span>
                      )}
                    </motion.div>
                  </div>
                  <h3 className="text-[28px] font-bold mb-4 text-foreground group-hover:text-neon-green transition-colors duration-300 -mt-2 text-center">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3 text-justify -mt-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-neon-green/10 text-neon-green border border-neon-green/30 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-6 mt-auto justify-center">
                    {project.id === 'meiphor' && project.links.store && (
                      <motion.a
                        href={project.links.store}
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-neon-green text-background rounded-lg hover:bg-neon-green/90 transition-all duration-300 font-medium"
                      >
                        <img src="https://i.postimg.cc/MpvbWN7z/play-store.png" alt="Play Store" className="h-4 w-4" />
                        <span className="text-sm">Play Store</span>
                      </motion.a>
                    )}
                    {project.id === 'meiphor' && (
                      <motion.a
                        href="https://apps.apple.com/in/app/meiphor/id6503905399"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-neon-green text-background rounded-lg hover:bg-neon-green/90 transition-all duration-300 font-medium"
                      >
                        <img src="https://i.postimg.cc/0N39TM8b/app-store.png" alt="App Store" className="h-4 w-4" />
                        <span className="text-sm">App Store</span>
                      </motion.a>
                    )}
                    {project.id !== 'meiphor' && project.links.github && (
                      <motion.a
                        href={project.links.github}
                        onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-neon-green text-background rounded-lg hover:bg-neon-green/90 transition-all duration-300 font-medium"
                      >
                        <ExternalLink size={16} />
                        <span className="text-sm">Live</span>
                      </motion.a>
                    )}
                    {project.id !== 'meiphor' && project.links.store && (
                      <motion.a
                        href={project.links.store}
                        onClick={(e) => e.stopPropagation()}
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

          {/* Desktop: wrap last two cards centered in a flex row spanning all 3 columns */}
          <div className="hidden lg:flex lg:col-span-3 justify-center gap-8 projects-last-row">
            {projects.slice(3, 5).map((project, idx) => (
              <motion.div
                key={`${project.id}-lg`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (3 + idx) * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -10 }}
                className="group relative cursor-pointer project-card"
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="bg-card rounded-xl p-8 border border-neon-green/20 hover:border-neon-green/50 transition-all duration-500 h-full backdrop-blur-sm">
                  <div className="absolute inset-0 rounded-xl bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  <div className="relative z-10">
                    <div className="relative h-[88px]">
                      <motion.div
                        initial={project.id === 'meiphor' ? { y: -21 } : undefined}
                        animate={project.id === 'meiphor' ? { y: -21 } : undefined}
                        whileHover={project.id === 'meiphor' ? { scale: 1.1, rotate: 5, y: -25 } : { scale: 1.1, rotate: 5 }}
                        className={`absolute inset-x-0 top-0 flex justify-center group-hover:drop-shadow-[0_0_20px_rgba(57,255,20,0.7)] transition-all duration-300 ${project.id === 'meiphor' ? 'origin-top' : ''}`}
                      >
                        {project.image.startsWith('http') ? (
                          <img
                            src={project.image}
                            alt={`${project.title} logo`}
                            className={`${project.id === 'meiphor' ? 'h-[104px] w-[104px]' : 'h-16 w-16'} object-contain`}
                          />
                        ) : (
                          <span className={`${project.id === 'meiphor' ? 'text-9xl' : 'text-6xl'} leading-none`}>{project.image}</span>
                        )}
                      </motion.div>
                    </div>
                    <h3 className="text-[28px] font-bold mb-4 text-foreground group-hover:text-neon-green transition-colors duration-300 -mt-2 text-center">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 line-clamp-3 text-justify -mt-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-neon-green/10 text-neon-green border border-neon-green/30 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-6 mt-auto justify-center">
                      {project.id === 'meiphor' && project.links.store && (
                        <motion.a
                          href="https://play.google.com/store/apps/details?id=com.METAPREP.Meiphor&hl=en_IN"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-neon-green text-background rounded-lg hover:bg-neon-green/90 transition-all duration-300 font-medium"
                        >
                          <img src="https://i.postimg.cc/MpvbWN7z/play-store.png" alt="Play Store" className="h-4 w-4" />
                          <span className="text-sm">Play Store</span>
                        </motion.a>
                      )}
                      {project.id === 'meiphor' && (
                        <motion.a
                          href="https://apps.apple.com/in/app/meiphor/id6503905399"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-neon-green text-background rounded-lg hover:bg-neon-green/90 transition-all duration-300 font-medium"
                        >
                          <img src="https://i.postimg.cc/0N39TM8b/app-store.png" alt="App Store" className="h-4 w-4" />
                          <span className="text-sm">App Store</span>
                        </motion.a>
                      )}
                      {project.id !== 'meiphor' && project.links.github && (
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
                      {project.id !== 'meiphor' && project.links.store && (
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