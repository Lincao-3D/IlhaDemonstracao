import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useInView } from "react-intersection-observer";

type Timer = ReturnType<typeof setTimeout>;

export default function Section7({ isMobile }: { isMobile: boolean }) {
  // Desktop states
  const [isHovered, setIsHovered] = useState(false);
  const [activateBgMotion, setActivateBgMotion] = useState(false);
  const timeoutRef = useRef<Timer | null>(null);
  const hasTriggeredRef = useRef(false);

  // Controls for mobile overlay fade animation
  const controls = useAnimation();

  // Intersection Observer with threshold and triggerOnce
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  // Function to trigger desktop animation with delay
  const triggerAnimation = useCallback((delay: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActivateBgMotion(true), delay);
  }, []);

  // Effect to reset timers, states, and animation controls when isMobile changes
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setIsHovered(false);
    setActivateBgMotion(false);

    if (isMobile) {
      controls.set({ opacity: 1 }); // overlay fully visible initially on mobile
    } else {
      controls.set({ opacity: 0 }); // hide overlay immediately on desktop
    }

    hasTriggeredRef.current = false; // allow retrigger when mode changes
  }, [isMobile, controls]);

  // Effect for desktop: trigger animation once when section enters viewport and not mobile
  useEffect(() => {
    if (!isMobile && inView && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      triggerAnimation(400);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [inView, isMobile, triggerAnimation]);

  // Effect for mobile: fade out the overlay when inView with optional delay
  useEffect(() => {
    if (isMobile && inView) {
      // Make sure overlay is opaque initially, then fade out after delay
      controls.set({ opacity: 1 });
      controls.start({
        opacity: 0,
        transition: { delay: 4, duration: 1.5, ease: "easeInOut" },
      });
    }

    if (!isMobile) {
      // On desktop, hide overlay immediately (redundant but safe)
      controls.set({ opacity: 0 });
    }
  }, [inView, isMobile, controls]);

  // Desktop hover handlers trigger animation
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
      triggerAnimation(400);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
      setActivateBgMotion(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  };

  // Determine if desktop marquee animation should run
  const showMotion = !isMobile && (activateBgMotion || isHovered);

  return (
    <section
      ref={ref}
      className={`relative h-[380px] flex items-center justify-center text-white bg-[#111] overflow-hidden  ${isMobile ? "w-screen" : "w-auto"} `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mobile: Continuous CSS marquee animation hidden behind overlay */}
      {isMobile ? (
  <div className="marquee-container absolute inset-0 overflow-hidden" style={{ height: 683 }}>
  <motion.img
    src="/img/bg6.webp"
    alt="background scroll 1"
    className="absolute left-0 w-[1024] h-[683px] object-cover"
    animate={{ y: ["0px", "-683px"] }}
    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
    draggable={false}
  />
  <motion.img
    src="/img/bg6.webp"
    alt="background scroll 2"
    className="absolute left-0 top-[683px] w-[1024] h-[683px] object-cover"
    animate={{ y: ["0px", "-683px"] }}
    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
    draggable={false}
  />
</div>



) : (
        /* Desktop: Framer Motion animated background controlled by state */
        <motion.div
          className="absolute inset-0 w-full h-full bg-cover"
          style={{ backgroundImage: `url('/img/bg6.webp')` }}
          initial={{ backgroundPosition: "0% 0%", opacity: 0 }}
          animate={{
            backgroundPosition: showMotion ? "0% 100%" : "0% 0%",
            opacity: showMotion ? 0.8 : 0,
          }}
          transition={{
            backgroundPosition: {
              duration: 5.7,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            },
            opacity: { duration: 1.5, ease: "easeInOut" },
          }}
        >
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: showMotion ? 0.3 : 0 }}
          />
        </motion.div>
      )}

      {/* Mobile black overlay fading out on scroll into view */}
      {isMobile && (
        <motion.div
          className="absolute inset-0 bg-black z-10 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={controls}
        />
      )}

      {/* Content with zoomable image */}
      <div
        className="relative z-20 bg-black/50 p-6 rounded-lg text-center max-w-[600px]"
        style={{ fontFamily: "Agraham" }}
      >
        <p>Clique na imagem para ampliar</p>
        <Zoom>
          <img
            src="/img/section6.webp"
            alt="Mapa do empreendimento"
            className="mt-4 mx-auto rounded-lg shadow-lg max-w-full h-auto object-contain cursor-zoom-in"
            draggable={false}
          />
        </Zoom>
        <p
          className="mt-1 text-sm italic opacity-80"
          style={{ fontFamily: "Agraham" }}
        >
          Clique para ampliar
        </p>
      </div>

      {/* Lateral images with Framer Motion animation */}
      <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-end space-y-2 z-20 right-3 pointer-events-none">
        <motion.img
          src="/img/section6a.webp"
          alt="imagem lateral a"
          initial={{ x: 200, opacity: 0, scale: 0.5 }}
          whileInView={{ x: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 1.1 }}
          className="w-[300px] h-auto object-contain"
          draggable={false}
        />
        <motion.img
          src="/img/section6b.webp"
          alt="imagem lateral b"
          initial={{ x: 200, opacity: 0, scale: 0.5 }}
          whileInView={{ x: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="w-[300px] h-auto object-contain"
          draggable={false}
        />
      </div>
    </section>
  );
}
