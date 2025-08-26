import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, CheckCircle, Mail, Phone } from 'lucide-react';
import { SiWhatsapp, SiLinkedin } from 'react-icons/si';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const serviceId = 'service_uua907i';
      const templateId = 'template_mv27t0a';
      const publicKey = 'fjGE4vK07d95SEJ3U';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      } as Record<string, unknown>;

      await emailjs.send(serviceId, templateId, templateParams, { publicKey });

      setIsSubmitted(true);
      setIsSubmitting(false);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    } catch (err) {
      console.error('EmailJS send failed', err);
      setSubmitError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-neon-green/10 rounded-full mb-6 border-2 border-neon-green"
            >
              <CheckCircle size={48} className="text-neon-green" />
            </motion.div>
            
            <h3 className="text-2xl font-bold text-neon-green mb-4">Message Sent!</h3>
            <p className="text-muted-foreground">
              Thank you for reaching out. I'll get back to you soon!
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Let's <span className="text-neon-green">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate on your next XR project? Let's discuss your ideas
          </p>
        </motion.div>

                          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 h-full">
           {/* Contact Info - Left Column */}
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="h-full flex flex-col"
           >
                           <div className="mb-6">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-neon-green text-center">Get in Touch</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed text-justify">
                  Passionate about creating innovative XR solutions and immersive game experiences, and collaborating with talented teams worldwide. If you're looking to build cutting-edge AR/VR applications or engaging games, I'd be glad to connect.
                </p>
              </div>

                           {/* Contact Cards - Equal width and height */}
              <div className="flex flex-col gap-3 flex-1">
                {/* Call Button */}
                <motion.a
                  href="tel:+919787656274"
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="contact-card flex items-center gap-4 p-6 bg-[#111] rounded-lg border border-neon-green/20 hover:border-neon-green/50 hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all duration-300 cursor-pointer w-full h-20"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-neon-green/10 rounded-lg border border-neon-green/30 flex-shrink-0">
                    <Phone size={20} className="text-neon-green" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">Call</p>
                    <p className="text-gray-400 text-sm">+91 97876 56274</p>
                  </div>
                </motion.a>

                {/* WhatsApp Button */}
                <motion.a
                  href="https://wa.me/919787656274"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="contact-card flex items-center gap-4 p-6 bg-[#111] rounded-lg border border-neon-green/20 hover:border-neon-green/50 hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all duration-300 cursor-pointer w-full h-20"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-neon-green/10 rounded-lg border border-neon-green/30 flex-shrink-0">
                    <SiWhatsapp size={20} className="text-neon-green" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">WhatsApp</p>
                    <p className="text-gray-400 text-sm">Chat with me instantly</p>
                  </div>
                </motion.a>

                {/* LinkedIn Button */}
                <motion.a
                  href="https://www.linkedin.com/in/samadsuhail08/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="contact-card flex items-center gap-4 p-6 bg-[#111] rounded-lg border border-neon-green/20 hover:border-neon-green/50 hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all duration-300 cursor-pointer w-full h-20"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-neon-green/10 rounded-lg border border-neon-green/30 flex-shrink-0">
                    <SiLinkedin size={20} className="text-neon-green" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">LinkedIn</p>
                    <p className="text-gray-400 text-sm">samadsuhail08</p>
                  </div>
                </motion.a>

                {/* Email Card */}
                <motion.a
                  href="mailto:suhail.samad08@gmail.com"
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="contact-card flex items-center gap-4 p-6 bg-[#111] rounded-lg border border-neon-green/20 hover:border-neon-green/50 hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all duration-300 cursor-pointer w-full h-20"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-neon-green/10 rounded-lg border border-neon-green/30 flex-shrink-0">
                    <Mail size={20} className="text-neon-green" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">Email</p>
                    <p className="text-gray-400 text-sm">suhail.samad08@gmail.com</p>
                  </div>
                </motion.a>
              </div>
           </motion.div>

           {/* Contact Form - Right Column */}
           <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="h-full flex flex-col"
           >
             <div className="mb-4">
               <h3 className="text-3xl md:text-4xl font-bold text-neon-green text-center">Send a Message</h3>
             </div>
             <form onSubmit={handleSubmit} className="space-y-6 w-full flex-1">
              {submitError && (
                <div className="text-red-400 text-sm" role="alert" aria-live="polite">{submitError}</div>
              )}
               <div className="grid md:grid-cols-2 gap-6">
                 <motion.div
                   whileFocus={{ scale: 1.02 }}
                   className="space-y-2"
                 >
                   <label className="text-sm font-semibold text-white">Name</label>
                   <input
                     type="text"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     required
                     className="w-full px-4 py-3 bg-[#111] border border-neon-green/20 rounded-lg focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/20 transition-all duration-300 text-white placeholder-gray-400"
                     placeholder="Your name"
                   />
                 </motion.div>

                 <motion.div
                   whileFocus={{ scale: 1.02 }}
                   className="space-y-2"
                 >
                   <label className="text-sm font-semibold text-white">Email</label>
                   <input
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     required
                     className="w-full px-4 py-3 bg-[#111] border border-neon-green/20 rounded-lg focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/20 transition-all duration-300 text-white placeholder-gray-400"
                     placeholder="your.email@example.com"
                   />
                 </motion.div>
               </div>

               <motion.div
                 whileFocus={{ scale: 1.02 }}
                 className="space-y-2"
               >
                 <label className="text-sm font-semibold text-white">Subject</label>
                 <input
                   type="text"
                   name="subject"
                   value={formData.subject}
                   onChange={handleChange}
                   required
                   className="w-full px-4 py-3 bg-[#111] border border-neon-green/20 rounded-lg focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/20 transition-all duration-300 text-white placeholder-gray-400"
                   placeholder="Project collaboration"
                 />
               </motion.div>

               <motion.div
                 whileFocus={{ scale: 1.02 }}
                 className="space-y-2"
               >
                 <label className="text-sm font-semibold text-white">Message</label>
                 <textarea
                   name="message"
                   value={formData.message}
                   onChange={handleChange}
                   required
                   rows={6}
                   className="w-full px-4 py-3 bg-[#111] border border-neon-green/20 rounded-lg focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/20 transition-all duration-300 text-white placeholder-gray-400 resize-none"
                   placeholder="Tell me about your project..."
                 />
               </motion.div>

               <motion.button
                 type="submit"
                 disabled={isSubmitting}
                 whileHover={{ 
                   scale: 1.02, 
                   boxShadow: "0 0 30px rgba(57, 255, 20, 0.6)" 
                 }}
                 whileTap={{ scale: 0.98 }}
                 className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-neon-green text-black font-semibold rounded-lg hover:bg-neon-green/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
               >
                 {isSubmitting ? (
                   <motion.div
                     animate={{ rotate: 360 }}
                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                     className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                   />
                 ) : (
                   <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                 )}
                 {isSubmitting ? 'Sending...' : 'Send Message'}
               </motion.button>
             </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};