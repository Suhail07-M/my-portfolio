import { motion } from 'framer-motion';
import { Download, FileText, Award, Briefcase } from 'lucide-react';

export const Resume = () => {
  const handleDownload = () => {
    // In a real app, this would download the actual resume file
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Suhail_M_Resume.pdf';
    link.click();
  };

  return (
    <section id="resume" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-neon-green">Resume</span> & Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Download my resume to learn more about my professional experience and achievements
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Resume Download Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-8 border border-neon-green/20 mb-12 text-center relative overflow-hidden"
          >
            {/* Animated background glow */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-neon-green/10 via-neon-blue/10 to-neon-green/10 blur-xl"
            />
            
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-24 h-24 bg-neon-green/10 rounded-full mb-6 border-2 border-neon-green/30"
              >
                <FileText size={40} className="text-neon-green" />
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Download Resume
              </h3>
              
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Get a comprehensive overview of my skills, experience, and achievements in XR development
              </p>
              
              <motion.button
                onClick={handleDownload}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 40px rgba(57, 255, 20, 0.8)",
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-neon-green text-background font-semibold rounded-lg hover:bg-neon-green/90 transition-all duration-300 group"
              >
                <Download size={20} className="group-hover:animate-bounce" />
                Download Resume (PDF)
              </motion.button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-card rounded-xl p-6 border border-neon-green/20 text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-neon-green/10 rounded-full mb-4 border border-neon-green/30 group-hover:border-neon-green/60 transition-colors duration-300"
              >
                <Briefcase size={24} className="text-neon-green" />
              </motion.div>
              <h4 className="text-xl font-bold text-neon-green mb-2">5+</h4>
              <p className="text-muted-foreground">Years Experience</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-card rounded-xl p-6 border border-neon-green/20 text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-neon-green/10 rounded-full mb-4 border border-neon-green/30 group-hover:border-neon-green/60 transition-colors duration-300"
              >
                <Award size={24} className="text-neon-green" />
              </motion.div>
              <h4 className="text-xl font-bold text-neon-green mb-2">15+</h4>
              <p className="text-muted-foreground">Projects Completed</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-card rounded-xl p-6 border border-neon-green/20 text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-neon-green/10 rounded-full mb-4 border border-neon-green/30 group-hover:border-neon-green/60 transition-colors duration-300"
              >
                <span className="text-neon-green font-bold text-xl">XR</span>
              </motion.div>
              <h4 className="text-xl font-bold text-neon-green mb-2">Expert</h4>
              <p className="text-muted-foreground">XR Specialist</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};