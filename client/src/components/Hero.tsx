import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import heroBg from "@assets/generated_images/abstract_dark_technology_background_with_glowing_nodes_and_data_streams..png";
import Globe from "@/components/Globe";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Mouse tracking logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 50, damping: 10 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 10 });

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    const xPos = clientX - left;
    const yPos = clientY - top;
    x.set(xPos);
    y.set(yPos);
  }

  const rotateX = useTransform(mouseY, [0, 800], [10, -10]);
  const rotateY = useTransform(mouseX, [0, 1600], [-10, 10]);

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-[10%]"
      onMouseMove={handleMouseMove}
      ref={ref}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 z-10" />
        <img 
          src={heroBg} 
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([newX, newY]) => `radial-gradient(600px circle at ${newX}px ${newY}px, rgba(124, 58, 237, 0.1), transparent 40%)`
          ),
        }}
      />

      <div className="container mx-auto px-4 z-20 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono">
              Available for hire
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-sans tracking-tight">
              Rasul <span className="text-primary">Panari</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-400 mb-8 font-mono h-[60px]">
              I am a{" "}
              <span className="text-white">
                <Typewriter
                  words={['Web Architect', 'Full Stack Developer', 'Tech Enthusiast']}
                  loop={0}
                  cursor
                  cursorStyle='_'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-lg mb-8 leading-relaxed">
              Building scalable, high-performance web applications with modern technologies. 
              Specializing in CRM systems and complex architectural solutions at Abacco Technology.
            </p>
            
            <div className="flex gap-4">
              <a href="#projects" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-medium transition-all flex items-center gap-2">
                View Work <ArrowDown className="w-4 h-4" />
              </a>
              <a href="#contact" className="border border-white/20 hover:border-primary/50 hover:bg-primary/5 text-white px-8 py-3 rounded-md font-medium transition-all">
                Contact Me
              </a>
            </div>

            <div className="mt-12 flex gap-6">
              <SocialLink icon={<Github />} href="#" />
              <SocialLink icon={<Linkedin />} href="#" />
              <SocialLink icon={<Mail />} href="mailto:panarirasul@gmail.com" />
            </div>
          </motion.div>

          {/* Interactive Globe */}
          <motion.div
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="hidden md:flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              <Globe
                scale={9}
                speed={1.5}
                direction="right"
                dragSpeed={4}
                smoothing={7}
                detail={6}
                initialLatitude={12.9716}
                initialLongitude={77.5946}
                dots={{ color: "#A855F7", size: 3, density: 6, allDots: false }}
                fill="dots"
                fillColor="#A855F7"
                oceanColor="rgba(124, 58, 237, 0.06)"
                showOutline
                outlineColor="rgba(168, 85, 247, 0.5)"
                outlineWidth={1.5}
                showGrid
                graticuleColor="rgba(124, 58, 237, 0.15)"
                stopOnHover
                markerConfig={{
                  markers: [{ lat: 12.9716, lng: 77.5946 }],
                  color: "#ffffff",
                  size: 55,
                }}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </motion.div>

        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-gray-500"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary hover:bg-primary/10 transition-all"
    >
      {icon}
    </a>
  );
}