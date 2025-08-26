import { motion } from 'framer-motion';
import { FaUnity } from 'react-icons/fa';
import { SiSharp, SiUnity, SiUnrealengine, SiOculus, SiFigma, SiBlender, SiAutodeskmaya, SiOpenai, SiAndroid, SiApple, SiWebgl, SiGit } from 'react-icons/si';
import { BiBug, BiCube, BiPackage } from 'react-icons/bi';
import { MdSensors, MdAnimation, MdOutlineWeb, MdDeviceHub, MdViewInAr, MdTimeline } from 'react-icons/md';
import { GiGamepad, GiHand, GiVrHeadset, GiPerson, GiSwordman, GiMuscleUp } from 'react-icons/gi';
import { PiNetworkBold } from 'react-icons/pi';
import { TbGauge } from 'react-icons/tb';
import { HiOutlineBeaker } from 'react-icons/hi';
import { RiTaskLine } from 'react-icons/ri';

const coreDevSkills = [
  {
    name: 'Unity 3D',
    icon: FaUnity,
    description: 'Advanced application development & cross-platform solutions'
  },
  {
    name: 'C# Programming',
    icon: SiSharp,
    description: 'Object-oriented architecture & performance optimization'
  },
  {
    name: 'Script Machine',
    icon: MdDeviceHub,
    description: 'Visual scripting for rapid prototyping'
  },
  {
    name: 'Unreal Engine',
    icon: SiUnrealengine,
    description: 'Blueprint scripting & level design'
  },
  {
    name: 'Testing & Debugging',
    icon: BiBug,
    description: 'Unit testing, performance profiling & bug resolution'
  },
];

const xrDevSkills = [
  {
    name: 'Vuforia SDK',
    icon: MdViewInAr,
    description: 'Advanced marker-based & markerless AR tracking'
  },
  {
    name: 'Oculus SDK',
    icon: SiOculus,
    description: 'Native VR development for Meta Quest platforms'
  },
  {
    name: 'AR Foundation',
    icon: SiUnity,
    description: 'Cross-platform AR solutions'
  },
  {
    name: 'XR Interaction Systems',
    icon: GiVrHeadset,
    description: 'Physics-based interactions & spatial UI'
  },
];

const gameDevSkills = [
  {
    name: '2D/3D Game Development',
    icon: GiGamepad,
    description: 'Complete game lifecycle management'
  },
  {
    name: 'Multiplayer Networking',
    icon: PiNetworkBold,
    description: 'Real-time multiplayer systems'
  },
  {
    name: 'Performance Optimization',
    icon: TbGauge,
    description: 'Memory management & rendering efficiency'
  },
];

const designSkills = [
  {
    name: 'UI/UX Design',
    icon: SiFigma,
    description: 'Figma to Unity pipeline for interactive interfaces'
  },
  {
    name: 'Blender & Maya',
    icon: 'combined' as any,
    description: '3D modeling, texturing & format conversion'
  },
  {
    name: 'Animation Creation & Control',
    icon: GiSwordman,
    description: 'Timeline, Cinemachine, custom controllers'
  },
  {
    name: 'Spatial Design',
    icon: BiCube,
    description: '3D interaction patterns & ergonomics'
  },
  {
    name: 'Prototyping',
    icon: HiOutlineBeaker,
    description: 'Rapid concept validation & user testing'
  },
];

const integrationSkills = [
  {
    name: 'AI Integration',
    icon: SiOpenai,
    description: 'Intelligent NPCs & conversational systems'
  },
  {
    name: 'Web Integration',
    icon: MdOutlineWeb,
    description: 'Unity WebView, authentication systems & browser connectivity'
  },
  {
    name: 'Addressable Asset System',
    icon: BiPackage,
    description: 'Dynamic loading & memory optimization'
  },
  {
    name: 'Cross-platform Deployment',
    icon: SiAndroid,
    description: 'Android, iOS, Windows, WebGL'
  },
  {
    name: 'Version Control',
    icon: SiGit,
    description: 'Git, Plastic SCM for collaborative development'
  },
  {
    name: 'Project Management',
    icon: RiTaskLine,
    description: 'Agile methodologies & team coordination'
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Main Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-6xl md:text-8xl font-bold mb-8">
            <span className="text-[#39FF14]">Skills</span> & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Specialized in XR development with deep expertise in Unity and modern technologies
          </p>
        </motion.div>

        {/* Core Development Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12 text-left text-[#39FF14]"
          >
            Core Development
          </motion.h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {coreDevSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative"
              >
                <div className="bg-[#111] rounded-xl p-8 border border-neon-green/20 hover:border-neon-green/50 transition-all duration-500 h-full backdrop-blur-sm">
                  {/* Neon glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  
                  <div className="relative z-10 text-center">
                    {/* Skill Icon */}
                                         <motion.div
                       whileHover={{ scale: 1.2, rotate: 5 }}
                       className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-neon-green/10 border border-neon-green/30 group-hover:bg-neon-green/20 transition-all duration-300"
                     >
                                               {skill.name === 'Blender & Maya' ? (
                          <SiBlender className="w-9 h-9 text-neon-green" aria-label="Blender & Maya" style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.25))' }} />
                        ) : (
                          <skill.icon 
                            className="w-9 h-9 text-neon-green" 
                            aria-label={skill.name === 'Script Machine' ? 'Script Machine (node graph icon)' : skill.name}
                            style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.25))' }}
                          />
                        )}
                     </motion.div>

                     <h4 className="text-xl font-bold mb-4 text-white group-hover:text-neon-green transition-colors duration-300">
                       {skill.name}
                     </h4>

                     <p className="text-[#aaa] text-sm leading-relaxed px-3 text-justify-last-center">
                       {skill.description}
                     </p>
                   </div>
                 </div>
               </motion.div>
             ))}
           </div>
         </motion.div>

         {/* XR Development Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12 text-left text-[#39FF14]"
          >
            XR Development
          </motion.h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {xrDevSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative"
              >
                <div className="bg-[#111] rounded-xl p-8 border border-neon-green/20 hover:border-neon-green/50 transition-all duration-500 h-full backdrop-blur-sm">
                  {/* Neon glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  
                  <div className="relative z-10 text-center">
                    {/* Skill Icon */}
                                         <motion.div
                       whileHover={{ scale: 1.2, rotate: 5 }}
                       className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-neon-green/10 border border-neon-green/30 group-hover:bg-neon-green/20 transition-all duration-300"
                     >
                       {skill.name === 'Blender & Maya' ? (
                         <SiBlender className="w-9 h-9 text-neon-green" aria-label="Blender & Maya" style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.25))' }} />
                       ) : (
                         <skill.icon 
                           className="w-9 h-9 text-neon-green" 
                           aria-label={skill.name}
                           style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.25))' }}
                         />
                       )}
                     </motion.div>

                     <h4 className="text-xl font-bold mb-4 text-white group-hover:text-neon-green transition-colors duration-300">
                       {skill.name}
                     </h4>

                     <p className="text-[#aaa] text-sm leading-relaxed px-3 text-justify-last-center">
                       {skill.description}
                     </p>
                   </div>
                 </div>
               </motion.div>
             ))}
           </div>
         </motion.div>

         {/* Game Development Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12 text-left text-[#39FF14]"
          >
            Game Development
          </motion.h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {gameDevSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative"
              >
                <div className="bg-[#111] rounded-xl p-8 border border-neon-green/20 hover:border-neon-green/50 transition-all duration-500 h-full backdrop-blur-sm">
                  {/* Neon glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  
                  <div className="relative z-10 text-center">
                    {/* Skill Icon */}
                                         <motion.div
                       whileHover={{ scale: 1.2, rotate: 5 }}
                       className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-neon-green/10 border border-neon-green/30 group-hover:bg-neon-green/20 transition-all duration-300"
                     >
                       {skill.name === 'Blender & Maya' ? (
                         <SiBlender className="w-9 h-9 text-neon-green" aria-label="Blender & Maya" style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.25))' }} />
                       ) : (
                         <skill.icon 
                           className="w-9 h-9 text-neon-green" 
                           aria-label={skill.name}
                           style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.25))' }}
                         />
                       )}
                     </motion.div>

                     <h4 className="text-xl font-bold mb-4 text-white group-hover:text-neon-green transition-colors duration-300">
                       {skill.name}
                     </h4>

                     <p className="text-[#aaa] text-sm leading-relaxed px-3 text-justify-last-center">
                       {skill.description}
                     </p>
                   </div>
                 </div>
               </motion.div>
             ))}
           </div>
         </motion.div>

         {/* Design & 3D Content Creation Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12 text-left text-[#39FF14]"
          >
            Design & 3D Content Creation
          </motion.h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {designSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative"
              >
                <div className="bg-[#111] rounded-xl p-8 border border-neon-green/20 hover:border-neon-green/50 transition-all duration-500 h-full backdrop-blur-sm">
                  {/* Neon glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  
                  <div className="relative z-10 text-center">
                    {/* Skill Icon */}
                                         <motion.div
                       whileHover={{ scale: 1.2, rotate: 5 }}
                       className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-neon-green/10 border border-neon-green/30 group-hover:bg-neon-green/20 transition-all duration-300"
                     >
                       {skill.name === 'Blender & Maya' ? (
                         <SiBlender className="w-9 h-9 text-neon-green" aria-label="Blender & Maya" style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.25))' }} />
                       ) : (
                         <skill.icon 
                           className="w-9 h-9 text-neon-green" 
                           aria-label={skill.name}
                           style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.25))' }}
                         />
                       )}
                     </motion.div>

                     <h4 className="text-xl font-bold mb-4 text-white group-hover:text-neon-green transition-colors duration-300">
                       {skill.name}
                     </h4>

                     <p className="text-[#aaa] text-sm leading-relaxed px-3 text-justify-last-center">
                       {skill.description}
                     </p>
                   </div>
                 </div>
               </motion.div>
             ))}
           </div>
         </motion.div>

         {/* Integration & Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12 text-left text-[#39FF14]"
          >
            Integration & Tools
          </motion.h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {integrationSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative"
            >
                <div className="bg-[#111] rounded-xl p-8 border border-neon-green/20 hover:border-neon-green/50 transition-all duration-500 h-full backdrop-blur-sm">
                {/* Neon glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                
                  <div className="relative z-10 text-center">
                  {/* Skill Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                       className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-neon-green/10 border border-neon-green/30 group-hover:bg-neon-green/20 transition-all duration-300"
                     >
                       {skill.name === 'Blender & Maya' ? (
                         <SiBlender className="w-9 h-9 text-neon-green" aria-label="Blender & Maya" style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.25))' }} />
                       ) : (
                         <skill.icon 
                           className="w-9 h-9 text-neon-green" 
                           aria-label={skill.name}
                           style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.25))' }}
                         />
                       )}
                  </motion.div>

                     <h4 className="text-xl font-bold mb-4 text-white group-hover:text-neon-green transition-colors duration-300">
                    {skill.name}
                     </h4>

                     <p className="text-[#aaa] text-sm leading-relaxed px-3 text-justify-last-center">
                    {skill.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
         </motion.div>
      </div>
    </section>
  );
};