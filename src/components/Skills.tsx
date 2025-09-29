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

// Core Development Skills - Updated spacing v2.0
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
    name: 'Mobile VR',
    icon: GiVrHeadset, // custom SVG rendered in JSX below
    description: 'Optimized VR experiences for mobile and standalone headsets'
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
  {
    name: 'AI Integration',
    icon: SiOpenai,
    description: 'Intelligent NPCs & conversational systems'
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
    <section id="skills" className="py-24 relative skills-section">
      <div className="container mx-auto px-6">
        {/* Main Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-6xl md:text-8xl font-bold mb-8">
            <span className="text-[#39FF14]">Skills</span> & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Specialized in XR development with deep expertise in Unity and modern technologies
          </p>
        </motion.div>

        {/* 2-1-2 Layout Container */}
        <div className="space-y-8 md:space-y-12">
          {/* First Row: Two topic cards side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Core Development Topic Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-[#111] rounded-xl p-8 border border-neon-green/20 hover:border-neon-green/50 transition-all duration-500 backdrop-blur-sm"
            >
              <motion.h3
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#39FF14]"
              >
                Core Development
              </motion.h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 core-dev-grid-offset">
                 {coreDevSkills.map((skill, index) => (
                   <motion.div
                     key={skill.name}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: index * 0.1 }}
                     viewport={{ once: true }}
                     whileHover={{ scale: 1.02 }}
                     className="group relative"
                   >
                     <div className="text-center w-full h-60 bg-[#0a0a0a] rounded-lg border border-neon-green/20 p-3 md:p-4 flex flex-col skill-card-optimized">
                       {/* Icon section with fixed height */}
                       <div className="h-12 flex items-center justify-center mb-1 icon-spacing-core">
                         <motion.div
                           whileHover={{ scale: 1.1, rotate: 5 }}
                           className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0a0a0a] border-2 border-neon-green group-hover:border-neon-green/80 transition-all duration-300"
                           style={{ aspectRatio: '1/1' }}
                         >
                           {skill.name === 'Unity 3D' ? (
                             <FaUnity className="w-6 h-6 text-neon-green" aria-label="Unity 3D" style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.3))' }} />
                           ) : (
                             <skill.icon 
                               className="w-6 h-6 text-neon-green" 
                               aria-label={skill.name}
                               style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.3))' }}
                             />
                           )}
                         </motion.div>
                       </div>

                       {/* Title section with fixed height and center alignment */}
                       <div className={`h-14 md:h-16 flex items-center justify-center mb-2 md:mb-3 ${skill.name === 'Script Machine' ? 'script-machine-title' : ''}`}>
                         <h4 className="text-sm font-bold text-white group-hover:text-neon-green transition-colors duration-300 leading-tight text-center">
                           {skill.name}
                         </h4>
                       </div>

                       {/* Description section with consistent bottom alignment */}
                       <div className={`flex-1 flex items-end justify-center ${skill.name === 'Script Machine' ? 'script-machine-description' : ''} ${skill.name === 'Unreal Engine' ? 'unreal-engine-description' : ''} ${skill.name === 'Testing & Debugging' ? 'testing-debugging-description' : ''}`}>
                         <p className="text-[#aaa] text-xs leading-tight text-center px-1">
                           {skill.description}
                         </p>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </motion.div>

            {/* XR Development Topic Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[#111] rounded-xl p-8 border border-neon-green/20 hover:border-neon-green/50 transition-all duration-500 backdrop-blur-sm"
            >
              <motion.h3
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#39FF14]"
              >
                XR Development
              </motion.h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 xr-dev-grid-offset">
                 {xrDevSkills.map((skill, index) => (
                   <motion.div
                     key={skill.name}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: index * 0.1 }}
                     viewport={{ once: true }}
                     whileHover={{ scale: 1.02 }}
                     className="group relative"
                   >
                     <div className="text-center w-full h-60 bg-[#0a0a0a] rounded-lg border border-neon-green/20 p-3 md:p-4 flex flex-col skill-card-optimized">
                       {/* Icon section with fixed height */}
                       <div className="h-12 flex items-center justify-center mb-1 icon-spacing">
                         <motion.div
                           whileHover={{ scale: 1.1, rotate: 5 }}
                           className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0a0a0a] border-2 border-neon-green group-hover:border-neon-green/80 transition-all duration-300"
                           style={{ aspectRatio: '1/1' }}
                         >
                           {skill.name === 'Blender & Maya' ? (
                             <SiBlender className="w-6 h-6 text-neon-green" aria-label="Blender & Maya" style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.3))' }} />
                           ) : skill.name === 'Mobile VR' ? (
                             <svg
                               viewBox="0 0 112 60"
                               className="block mx-auto w-6 h-6"
                               role="img"
                               aria-label="Mobile VR"
                             >
                               <defs>
                                 <mask id="mvreyemask">
                                   <rect x="0" y="0" width="112" height="60" fill="#fff" />
                                   <circle cx="34" cy="30" r="8" fill="#000" />
                                   <circle cx="78" cy="30" r="8" fill="#000" />
                                 </mask>
                               </defs>
                               {/* Bright green fill with eye cutouts */}
                               <path
                                 d="M 0 20 Q 0 0 20 0 L 92 0 Q 112 0 112 20 L 112 40 Q 112 60 92 60 L 75 60 Q 70 60 68 55 Q 62 45 56 45 Q 50 45 44 55 Q 42 60 37 60 L 20 60 Q 0 60 0 40 Z"
                                 fill="#39FF14"
                                 fillOpacity={0.85}
                                 mask="url(#mvreyemask)"
                               />
                               {/* Outline */}
                               <path
                                 d="M 0 20 Q 0 0 20 0 L 92 0 Q 112 0 112 20 L 112 40 Q 112 60 92 60 L 75 60 Q 70 60 68 55 Q 62 45 56 45 Q 50 45 44 55 Q 42 60 37 60 L 20 60 Q 0 60 0 40 Z"
                                 fill="none"
                                 stroke="#39FF14"
                                 strokeWidth={3}
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                               />
                             </svg>
                           ) : (
                             <skill.icon 
                               className="w-6 h-6 text-neon-green" 
                               aria-label={skill.name}
                               style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.3))' }}
                             />
                           )}
                         </motion.div>
                       </div>

                       {/* Title section with fixed height and center alignment */}
                       <div className={`h-16 flex items-center justify-center mb-3 ${skill.name === 'Mobile VR' ? 'mobile-vr-title' : ''} ${skill.name === 'Vuforia SDK' || skill.name === 'Oculus SDK' || skill.name === 'AR Foundation' || skill.name === 'XR Interaction Systems' ? 'vuforia-title' : ''}`}>
                         <h4 className="text-sm font-bold text-white group-hover:text-neon-green transition-colors duration-300 leading-tight text-center">
                           {skill.name}
                         </h4>
                       </div>

                       {/* Description section with consistent bottom alignment */}
                       <div className={`flex-1 flex items-end justify-center ${skill.name === 'XR Interaction Systems' ? 'xr-interaction-description' : ''} ${skill.name === 'AR Foundation' ? 'ar-foundation-description' : ''} ${skill.name === 'Oculus SDK' ? 'oculus-sdk-description' : ''} ${skill.name === 'Vuforia SDK' ? 'vuforia-sdk-description' : ''}`}>
                         <p className="text-[#aaa] text-xs leading-tight text-center px-1">
                           {skill.description}
                         </p>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </motion.div>
          </div>

          {/* Second Row: One full-width topic card */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#111] rounded-xl p-8 border border-neon-green/20 hover:border-neon-green/50 transition-all duration-500 backdrop-blur-sm max-w-4xl w-full"
            >
              <motion.h3
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#39FF14]"
              >
                Game Development
              </motion.h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 game-dev-grid-4">
                 {gameDevSkills.map((skill, index) => (
                   <motion.div
                     key={skill.name}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: index * 0.1 }}
                     viewport={{ once: true }}
                     whileHover={{ scale: 1.02 }}
                     className="group relative"
                   >
                     <div className="text-center w-full h-48 md:h-52 bg-[#0a0a0a] rounded-lg border border-neon-green/20 p-3 md:p-4 flex flex-col">
                       {/* Icon section with fixed height */}
                       <div className="h-16 flex items-center justify-center mb-3 icon-spacing-mobile">
                         <motion.div
                           whileHover={{ scale: 1.1, rotate: 5 }}
                           className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0a0a0a] border-2 border-neon-green group-hover:border-neon-green/80 transition-all duration-300"
                           style={{ aspectRatio: '1/1' }}
                         >
                           {skill.name === 'Blender & Maya' ? (
                             <SiBlender className="w-6 h-6 text-neon-green" aria-label="Blender & Maya" style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.3))' }} />
                           ) : (
                             <skill.icon 
                               className="w-6 h-6 text-neon-green" 
                               aria-label={skill.name}
                               style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.3))' }}
                             />
                           )}
                         </motion.div>
                       </div>

                       {/* Title section with fixed height and center alignment */}
                       <div className={`h-16 md:h-16 flex items-center justify-center mb-3 ${skill.name === 'Multiplayer Networking' ? 'multiplayer-title' : ''}`}>
                         <h4 className="text-sm font-bold text-white group-hover:text-neon-green transition-colors duration-300 leading-tight">
                           {skill.name}
                         </h4>
                       </div>

                       {/* Description section with fixed baseline */}
                       <div className="flex-1 flex items-start justify-center">
                         <p className="text-[#aaa] text-xs leading-tight text-center px-1">
                           {skill.description}
                         </p>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </motion.div>
          </div>

          {/* Third Row: Two topic cards side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Design & 3D Content Creation Topic Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-[#111] rounded-xl p-8 border border-neon-green/20 hover:border-neon-green/50 transition-all duration-500 backdrop-blur-sm"
            >
              <motion.h3
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#39FF14]"
              >
                Design & 3D Content Creation
              </motion.h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 design-grid-offset">
                 {designSkills.map((skill, index) => (
                   <motion.div
                     key={skill.name}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: index * 0.1 }}
                     viewport={{ once: true }}
                     whileHover={{ scale: 1.02 }}
                     className="group relative"
                   >
                     <div className="text-center w-full h-60 bg-[#0a0a0a] rounded-lg border border-neon-green/20 p-3 md:p-4 flex flex-col skill-card-optimized">
                       {/* Icon section with fixed height */}
                       <div className="h-16 flex items-center justify-center mb-3">
                         <motion.div
                           whileHover={{ scale: 1.1, rotate: 5 }}
                           className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0a0a0a] border-2 border-neon-green group-hover:border-neon-green/80 transition-all duration-300"
                           style={{ aspectRatio: '1/1' }}
                         >
                           {skill.name === 'Blender & Maya' ? (
                             <SiBlender className="w-6 h-6 text-neon-green" aria-label="Blender & Maya" style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.3))' }} />
                           ) : (
                             <skill.icon 
                               className="w-6 h-6 text-neon-green" 
                               aria-label={skill.name}
                               style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.3))' }}
                             />
                           )}
                         </motion.div>
                       </div>

                       {/* Title section with fixed height and center alignment */}
                       <div className={`h-16 flex items-center justify-center mb-3 ${skill.name === 'Spatial Design' ? 'spatial-title' : ''} ${skill.name === 'Animation Creation & Control' ? 'animation-title' : ''} ${skill.name === 'Prototyping' ? 'prototyping-title' : ''}`}>
                         <h4 className="text-sm font-bold text-white group-hover:text-neon-green transition-colors duration-300 leading-tight">
                           {skill.name}
                         </h4>
                       </div>

                       {/* Description section with fixed baseline */}
                       <div className={`flex-1 flex items-start justify-center ${skill.name === 'Spatial Design' ? 'spatial-description' : ''} ${skill.name === 'Animation Creation & Control' ? 'animation-description' : ''}`}>
                         <p className="text-[#aaa] text-xs leading-tight text-center px-1">
                           {skill.description}
                         </p>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </motion.div>

            {/* Integration & Tools Topic Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-[#111] rounded-xl p-8 border border-neon-green/20 hover:border-neon-green/50 transition-all duration-500 backdrop-blur-sm"
            >
              <motion.h3
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#39FF14]"
              >
                Integration & Tools
              </motion.h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 integration-grid-offset">
                 {integrationSkills.map((skill, index) => (
                   <motion.div
                     key={skill.name}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: index * 0.1 }}
                     viewport={{ once: true }}
                     whileHover={{ scale: 1.02 }}
                     className="group relative"
                   >
                     <div className="text-center w-full h-60 bg-[#0a0a0a] rounded-lg border border-neon-green/20 p-3 md:p-4 flex flex-col skill-card-optimized">
                       {/* Icon section with fixed height */}
                       <div className="h-16 flex items-center justify-center mb-3">
                         <motion.div
                           whileHover={{ scale: 1.1, rotate: 5 }}
                           className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0a0a0a] border-2 border-neon-green group-hover:border-neon-green/80 transition-all duration-300"
                           style={{ aspectRatio: '1/1' }}
                         >
                           {skill.name === 'Blender & Maya' ? (
                             <SiBlender className="w-6 h-6 text-neon-green" aria-label="Blender & Maya" style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.3))' }} />
                           ) : (
                             <skill.icon 
                               className="w-6 h-6 text-neon-green" 
                               aria-label={skill.name}
                               style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.3))' }}
                             />
                           )}
                         </motion.div>
                       </div>

                       {/* Title section with fixed height and center alignment */}
                       <div className={`h-16 flex items-center justify-center mb-3 ${skill.name === 'Version Control' ? 'version-title' : ''} ${skill.name === 'Project Management' ? 'project-title' : ''} ${skill.name === 'Addressable Asset System' ? 'addressable-title' : ''} ${skill.name === 'Cross-platform Deployment' ? 'deployment-title' : ''}`}>
                         <h4 className="text-sm font-bold text-white group-hover:text-neon-green transition-colors duration-300 leading-tight">
                           {skill.name}
                         </h4>
                       </div>

                       {/* Description section with fixed baseline */}
                       <div className={`flex-1 flex items-start justify-center ${skill.name === 'Addressable Asset System' ? 'addressable-description' : ''}`}>
                         <p className="text-[#aaa] text-xs leading-tight text-center px-1">
                           {skill.description}
                         </p>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

