import { motion } from 'framer-motion';

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
  return (
    <section id="workshops" className="py-20 relative">
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
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Knowledge sharing through workshops and training sessions on XR development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workshops.map((workshop, index) => (
            <motion.div
              key={workshop.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(57, 255, 20, 0.2)"
              }}
              className="group cursor-pointer"
            >
              <div className="bg-card rounded-xl overflow-hidden border border-neon-green/20 hover:border-neon-green/50 transition-all duration-500 h-full">
                {/* Image/Icon Section */}
                <div className="relative h-48 bg-gradient-to-br from-neon-green/10 to-neon-blue/10 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className="text-6xl group-hover:drop-shadow-[0_0_20px_rgba(57,255,20,0.7)]"
                  >
                    {workshop.image}
                  </motion.div>
                  
                  {/* Overlay glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-neon-green mb-2">
                    <span>{workshop.date}</span>
                    <span>•</span>
                    <span className="text-muted-foreground">{workshop.location}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-neon-green transition-colors duration-300">
                    {workshop.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {workshop.description}
                  </p>
                </div>

                {/* Hover glow border */}
                <div className="absolute inset-0 rounded-xl border border-neon-green/0 group-hover:border-neon-green/30 transition-all duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-xl bg-neon-green/0 group-hover:bg-neon-green/5 transition-all duration-500"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-neon-green text-neon-green font-semibold rounded-lg hover:bg-neon-green/10 transition-all duration-300 neon-glow"
          >
            View All Workshops
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};