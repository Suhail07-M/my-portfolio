import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Skill {
  name: string;
  level: number;
  icon: string;
}

const skills: Skill[] = [
  { name: 'Unity 3D', level: 95, icon: '🎮' },
  { name: 'C# Programming', level: 90, icon: '💻' },
  { name: 'XR Development', level: 88, icon: '🥽' },
  { name: 'JavaScript', level: 85, icon: '🌐' },
  { name: 'React.js', level: 82, icon: '⚛️' },
  { name: 'Blender', level: 78, icon: '🎨' },
  { name: 'AR Foundation', level: 85, icon: '📱' },
  { name: 'OpenXR', level: 80, icon: '🔮' },
];

export const Skills = () => {
  const [counters, setCounters] = useState<number[]>(new Array(skills.length).fill(0));

  useEffect(() => {
    const timers = skills.map((skill, index) => {
      return setTimeout(() => {
        const duration = 2000;
        const steps = 60;
        const increment = skill.level / steps;
        let current = 0;

        const counter = setInterval(() => {
          current += increment;
          if (current >= skill.level) {
            current = skill.level;
            clearInterval(counter);
          }
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = Math.round(current);
            return newCounters;
          });
        }, duration / steps);
      }, index * 200);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-card rounded-xl p-6 border border-neon-green/20 hover:border-neon-green/50 transition-all duration-300 group"
            >
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl mb-4 group-hover:drop-shadow-[0_0_15px_rgba(57,255,20,0.7)]"
                >
                  {skill.icon}
                </motion.div>
                
                <h3 className="text-lg font-semibold mb-4 text-foreground group-hover:text-neon-green transition-colors duration-300">
                  {skill.name}
                </h3>
                
                <div className="relative">
                  <div className="w-full bg-muted rounded-full h-3 mb-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-neon-green to-neon-blue rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-blue opacity-70 blur-sm"></div>
                    </motion.div>
                  </div>
                  
                  <motion.div
                    className="text-neon-green font-bold text-xl"
                    key={counters[index]}
                  >
                    {counters[index]}%
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};