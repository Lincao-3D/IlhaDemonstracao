import { useState, useRef, useEffect, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

type Timer = ReturnType<typeof setTimeout>;

export default function Section8({ isMobile }: { isMobile: boolean }) {
  const [isHovering, setIsHovering] = useState(false);
  const [showMarquee, setShowMarquee] = useState(false);
  const timeoutRef = useRef<Timer | null>(null);
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  const startMarqueeTimer = useCallback((delay: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowMarquee(true), delay);
  }, []);

  useEffect(() => {
    if (isMobile && inView) startMarqueeTimer(3800);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isMobile, inView, startMarqueeTimer]);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovering(true);
      startMarqueeTimer(1500);
    }
  };
  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovering(false);
      setShowMarquee(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, when: "beforeChildren" } },
  };

  const HeadingTag = isMobile ? "h1" : "h3";

  return (
    <section
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden flex justify-center items-center px-2"
      style={{
        // original 280px + 145px extra for mobile
        height: isMobile ? "425px" : "350px",
        maxWidth: isMobile ? "320px" : "100%",
        margin: "0 auto",
      }}
    >
      {/* backdrop */}
      <div
        className={`absolute inset-0 transition-all duration-150 ease-linear ${
          isHovering || (isMobile && inView)
            ? "bg-gradient-to-b from-sky-100 to-sky-300 opacity-80"
            : "bg-gradient-to-b from-blue-900 to-blue-800"
        }`}
      />

      {/* marquee text */}
      {showMarquee && (
        <div
          className="absolute inset-x-0 flex items-center justify-center overflow-hidden pointer-events-none"
          style={{ bottom: isMobile ? "2px" : "0", top: isMobile ? undefined : "0" }}
        >
          <motion.h2
            className="whitespace-nowrap font-extrabold text-gray-800 opacity-20"
            style={{
              fontFamily: "'Atkinson Hyperlegible Next', sans-serif",
              fontSize: isMobile ? "3rem" : "6rem",
              willChange: "transform",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              x: { repeat: Infinity, repeatType: "loop", duration: 3, ease: "linear" },
            }}
          >
            NÃO PERCA MAIS TEMPO
          </motion.h2>
        </div>
      )}

      {/* content card */}
      <motion.div
        className="relative z-10 bg-white/90 backdrop-blur rounded-2xl shadow-lg flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        style={{
          width: isMobile ? "280px" : "360px",
          height: isMobile ? "300px" : "100%",
          padding: isMobile ? "1rem" : "1.5rem",
          transform: isMobile ? "scale(0.9)" : "scale(0.8)",
          transformOrigin: "top center",
        }}
      >
        <motion.p
          variants={itemVariants}
          className={`text-center text-gray-700 font-medium ${
            isMobile ? "text-xs mb-2" : "text-sm mb-3"
          }`}
          style={{ fontFamily: '"Jost", sans-serif' }}
        >
          Conquiste seu espaço em um bairro planejado, conectado à natureza e ao futuro.
        </motion.p>

        <motion.div variants={itemVariants} className="mb-3">
          <HeadingTag
            className="text-center text-[#529918] font-bold"
            style={{
              fontFamily: "Agraham",
              fontSize: isMobile ? 16 : 20,
            }}
          >
            Agende sua visita
          </HeadingTag>
        </motion.div>

        <form className="w-full flex flex-col items-center space-y-2">
          <motion.input
            variants={itemVariants}
            id="nome"
            name="nome"
            type="text"
            placeholder="Nome Completo*"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded text-center text-sm"
            style={{ fontFamily: "--atkinson" }}
          />

          <motion.input
            variants={itemVariants}
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com*"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded text-center text-sm"
            style={{ fontFamily: "--atkinson" }}
          />

          <motion.input
            variants={itemVariants}
            id="whatsapp"
            name="whatsapp"
            type="tel"
            placeholder="WhatsApp (DDD)*"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded text-center text-sm"
            style={{ fontFamily: "--atkinson" }}
          />

          <motion.button
            type="submit"
            variants={itemVariants}
            className="w-full py-2 bg-green-600 text-white text-base font-semibold rounded hover:bg-green-700 transition"
            style={{ fontFamily: "--atkinson" }}
          >
            Comece Já!
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
