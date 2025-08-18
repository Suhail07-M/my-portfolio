import { motion } from 'framer-motion';
import { Monitor, Smartphone, Globe, Zap, Code, Gamepad2, Layers, Database } from 'lucide-react';

const skills = [
  {
    name: 'Unity 3D',
    icon: Monitor,
    description: 'Advanced XR development'
  },
  {
    name: 'C# Programming',
    icon: Code,
    description: 'Object-oriented expertise'
  },
  {
    name: 'AR/VR Development',
    icon: Smartphone,
    description: 'Immersive experiences'
  },
  {
    name: 'Web Development',
    icon: Globe,
    description: 'Modern web technologies'
  },
  {
    name: 'Game Development',
    icon: Gamepad2,
    description: 'Interactive gaming'
  },
  {
    name: 'UI/UX Design',
    icon: Layers,
    description: 'User-centered design'
  },
  {
    name: 'Performance Optimization',
    icon: Zap,
    description: 'Efficient solutions'
  },
  {
    name: 'Database Management',
    icon: Database,
    description: 'Data architecture'
  },
];

export const Skills = () => {

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-neon-green">Skills</span> & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Specialized in XR development with deep expertise in Unity and modern web technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative"
            >
              <div className="bg-card rounded-xl p-6 border border-neon-green/20 hover:border-neon-green/50 transition-all duration-500 h-full backdrop-blur-sm text-center">
                {/* Neon glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                
                <div className="relative z-10">
                  {/* Skill Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-neon-green/10 border border-neon-green/30 group-hover:bg-neon-green/20 transition-all duration-300"
                  >
                    <skill.icon className="w-8 h-8 text-neon-green" />
                  </motion.div>

                  <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-neon-green transition-colors duration-300">
                    {skill.name}
                  </h3>

                  <p className="text-muted-foreground text-sm">
                    {skill.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};