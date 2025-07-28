import React, { forwardRef, Suspense, lazy, useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { useInView } from 'react-intersection-observer';
import type { MotionValue } from "framer-motion";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Parallax } from "react-scroll-parallax";
import Section7 from "./components/Section7";
import Section8 from "./components/Section8";
import { AnimatedModel } from './components/AnimatedModel';
import R3FErrorBoundary from './components/R3FErrorBoundary';
// import UnderMap from "./components/UnderMap";
const LazyUnderMap = lazy(() => import("./components/UnderMap"));
// --- Lazy section 8 implementation, substituting ScrollY.tsx//import { lazy } from "react";//const LazySection8 = lazy(() => import("./components/Section8"));// import Case8AnimatedContent from './components/Case8AnimatedContent'
interface SectionProps {
  id: number;
  label: string;
  bg?: string;
  color?: string;
  isVideo?: boolean;
  y?: MotionValue<number>;
  scale?: MotionValue<number>;
  inViewSection2?: boolean;
  isMobile: boolean;

  flipRef?: React.Ref<HTMLDivElement>;
  inViewFlip?: boolean;
}
// --- lazy implementation for case 8
const UnderMapWithCallback: React.FC<{ onLoad: () => void }> = ({ onLoad }) => {
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return <LazyUnderMap />;
};

// --- Main Section Component ---
const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  {
    id,
    label,
    bg,
    color,
    isVideo,
    y,
    scale,
    inViewSection2,
    isMobile,
    flipRef,
    inViewFlip,
  },
  ref
) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1000);
    return () => clearTimeout(timer);
  }, []);
   // State to track if UnderMap is loaded
  const [underMapLoaded, setUnderMapLoaded] = useState(false);
  const [refTitleLeft, inViewTitleLeft] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [refParaLeft, inViewParaLeft] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [refParaRight, inViewParaRight] = useInView({ triggerOnce: true, threshold: 0.5 });

  const renderContent = () => {
    switch (id) {
      case 1:
        return (
          <motion.section ref={ref as React.Ref<HTMLElement>} className="relative w-full h-screen flex items-center justify-center text-white bg-cover bg-center overflow-hidden z-0" style={{ backgroundImage: bg ? `url(${bg})` : undefined, y }}>
            <motion.div className="absolute inset-0 bg-black z-10 pointer-events-none" animate={{ opacity: visible ? 0.8 : 0 }} initial={{ opacity: 0.8 }} transition={{ duration: 1, ease: "easeOut" }} />
            <motion.div className="flex flex-col items-center overflow-visible relative z-20">
              <motion.img src="/img/section1.webp" alt={label} width={isMobile ? 123 : 324} height={isMobile ? 38 : 99} className="rounded-2xl shadow-lg mb-4" style={{ border: "none", objectFit: "contain", pointerEvents: "none", userSelect: "none", scale }} draggable={false} />
            </motion.div>
          </motion.section>
        );
      case 2:
       return (
    <motion.section
      ref={ref as React.Ref<HTMLElement>}
      className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden"
      style={{ backgroundColor: color }}
      initial={{ scale: isMobile ? 1.75 : 1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 4.8, ease: "easeOut" }}
    >
      {bg && (
        <motion.img
          src={bg}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none overflow-hidden"
          initial={{ scale: isMobile ? 3.4 : 1,
                      y: isMobile ? 0 : 0
           }}
          animate={{ scale: 1, y: isMobile ? 8 : 0 }}
          transition={{ duration: 4.8, ease: "easeOut" }}
        />
      )}
      <motion.h2
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: inViewSection2 ? 0 : -100, opacity: inViewSection2 ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`absolute z-12 font-bold text-[#010911] leading-tight ${
          isMobile
            ? "right-10 top-6 text-lg max-w-[80%]"
            : "right-16 top-10 text-4xl max-w-[40%]"
        }`}
        style={{ textShadow: "1px 1px 2px white", fontFamily: '"Jost", sans-serif' }}
      >
        SOFISTICAÇÃO E TRANQUILIDADE: O CENÁRIO IDEAL PARA SUA FAMÍLIA
      </motion.h2>
      <div className="relative w-full h-full px-[5vw] box-border">
        {/* MOBILE PARAGRAPH HANDLING - THIS IS WHERE THE NEW CODE GOES */}
        <motion.div
          initial={{
            x: isMobile ? -120 : -100,
            y: isMobile ? -80 : 0,
            opacity: 0,
          }}
          animate={{
            x: inViewSection2 ? 0 : isMobile ? -120 : -100,
            y: inViewSection2 ? 0 : isMobile ? -80 : 0,
            opacity: inViewSection2 ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className={`absolute flex flex-col z-11 ${
            isMobile
              ? "top-[300px]  gap-7 text-center inset-x-0 px-4"
              : "top-1/2 left-[5vw] -translate-y-1/2 max-w-[26%] gap-9"
          }${isMobile ? "px-4" : "px-7"}`}
          
        >
          <p
            className={`
              mt-4 bg-white/75 rounded-lg shadow-lg text-[#222] font-normal tracking-wide leading-relaxed w-full
              ${isMobile ? "text-xs py-1.5" : "text-base px-7 py-5"}
            `}
            style={{ fontFamily: '"Encode Sans Condensed", sans-serif', borderRadius: 10 }}
          >
            Venha morar em um condomínio com clube privado, piscinas para todas as
            idades, solarium e áreas de relaxamento. O ambiente perfeito para aproveitar
            dias ensolarados e fins de tarde tranquilos, sem sair de casa.
            <br />
            <br />
            Relaxe em piscinas elegantes rodeadas por paisagismo assinado, aproveite
            espaços de descanso e lazer em ambientes planejados para criar memórias em
            família e garantir a diversão de todos. No Ilha Pura, cada área é pensada
            para proporcionar bem-estar pleno.
          </p>
        </motion.div>

        <motion.img
          src="/img/section2.webp"
          alt={label}
          initial={{ x: 100, opacity: 0.1 }}
          animate={{ x: inViewSection2 ? 0 : 100, opacity: inViewSection2 ? 1 : 0.1 }}
          transition={{ duration: 0.6 }}
          className="absolute top-1/2 right-[5vw] -translate-y-1/2 w-[880px] h-[586px] rounded-xl shadow-2xl object-contain z-10"
        />
      </div>
    </motion.section>
  );
      case 3: // Formerly 8
        return <Section8 isMobile={isMobile} />;
      case 4: // Formerly 3
        return (
            <section className="relative h-screen flex items-center justify-center" style={{ backgroundColor: "#000" }}>
                <img src={bg || "/img/bg3.webp"} alt="Background" className="absolute inset-0 w-full h-full object-cover z-0" draggable={false} />
                <div className={`relative z-10 flex w-full h-full p-4 md:p-16 ${isMobile ? 'flex-col items-center' : 'items-center'}`}>
                    <div className={`w-full ${isMobile ? 'text-center' : 'md:w-1/2'}`}>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#010911] leading-tight mb-5" style={{ textShadow: "1px 1px 2px white", fontFamily: '"Jost", sans-serif' }}>MAIS DO QUE UM ENDEREÇO, UM NOVO JEITO DE VIVER</h2>
                        {!isMobile && <p className="text-base md:text-lg text-white/90 bg-black/50 rounded-lg p-6 shadow-lg max-w-md" style={{fontFamily: '"Encode Sans Condensed", sans-serif',
                  color: "#222",
                  fontSize: "0.9rem",
                  fontWeight: 400,
                  letterSpacing: ".01em",
                  lineHeight: 1.6,
                  background: "rgba(255,255,255,0.75)",
                  borderRadius: 10,
                  padding: "1.15rem 1.7rem 1.15rem 1.15rem",
                  boxShadow: "0 2px 14px rgba(0,0,0,0.08)",
                  width: "100%",}}>No Ilha Pura, o lazer vai além da piscina: são espaços gourmet, quadras esportivas, áreas verdes e ambientes de descanso cuidadosamente planejados, que transformam cada dia em um convite para a descontração e o relaxamento.</p>}
                    </div>
                    <div className={`w-full h-1/2 md:h-full ${isMobile ? 'mt-4' : 'md:w-1/2'}`}>
                        <R3FErrorBoundary>
                            <Canvas gl={{ alpha: true }} camera={{ position: [-6, 0, 8], fov: 65 }} style={{ background: "transparent" }} className="absolute inset-0 z-8">
                                <ambientLight intensity={1.5} />
                                <hemisphereLight color={0xffffff} groundColor={0x444444} intensity={1} />
                                <Suspense fallback={<Html center><div className="text-white">Um empreendimento...</div></Html>}>
                                    <AnimatedModel path="/models/obj1.glb" scale={isMobile ? 0.9 : 0.5} motionConfig={{ rotY: [-2.3, 3.2], rotX: isMobile ? [0.2, -0.1] : [0, 0], rotZ: isMobile ? [-0.38, 0.2] : [0, 0], posX: isMobile ? [0,0] : [4.2, 0], posY: isMobile ? [-1, -1.5] : [0.2, -0.9], posZ: [3.2, 2.8] }} isMobile={isMobile} /> 
                                </Suspense>
                            </Canvas>
                        </R3FErrorBoundary>
                    </div>
                     {isMobile && <p
    className="text-base sm:text-lg text-white/90 bg-black/50 rounded-lg p-4 shadow-lg mt-4 max-w-md"
    style={{
      fontFamily: '"Encode Sans Condensed", sans-serif',
      color: "#222",
      //fontSize: "1rem", // base size for mobile [-0.68, 1.23] rotZ
      //fontWeight: 400,
      //letterSpacing: ".01em",
      //lineHeight: 1.6,
      background: "rgba(255,255,255,0.75)",
      borderRadius: 10,
      padding: "1.15rem 1.7rem 1.15rem 1.15rem",
      boxShadow: "0 2px 14px rgba(0,0,0,0.08)",
      width: "100%",
    }}
  >
    No Ilha Pura, o lazer vai além da piscina: são espaços gourmet, quadras esportivas, áreas verdes e ambientes de descanso cuidadosamente planejados, que transformam cada dia em um convite para a descontração e o relaxamento.
  </p>}
                </div>
            </section>
        );
      case 5: // Formerly 4
        return (
          <section className="relative h-screen flex items-center justify-center text-white" style={{ backgroundColor: color, backgroundImage: bg ? `url(${bg})` : undefined }}>
            <div className="absolute top-1/4 left-[5%] z-20 w-[250px]">
              <motion.h2
    ref={refTitleLeft}
    initial={{ x: -150, opacity: 0 }}
    animate={inViewTitleLeft ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="text-xl sm:text-2xl md:text-3xl font-bold text-white"
    style={{
      fontFamily: '"Jost", sans-serif',
      textShadow: "2px 2px 3px rgba(0,0,0,0.9)",
    }}
  >
    Viva perto do melhor que a cidade tem a oferecer!
  </motion.h2>
            </div>
            <Parallax speed={-5}>
              <div className="w-[min(860px,90vw)] shadow-2xl rounded-xl overflow-hidden aspect-video">
                {isVideo && <iframe src="https://www.youtube.com/embed/fYNkHesLABs" title="Apresentação do empreendimento" width="100%" height="100%" allowFullScreen loading="lazy" className="border-none block" />}
              </div>
            </Parallax>
          </section>
        );
      case 6: // Formerly 5
        return (
            <motion.section
    ref={ref}
    className={`relative w-full h-screen overflow-hidden flex ${
      isMobile ? "flex-col items-center justify-center space-y-6" : "items-center justify-center flex-row"
    }`}
    style={{ y }}
  >
    <img
      src={bg ?? "/img/bg5.webp"}
      alt="Background 5"
      className="absolute inset-0 w-full h-full object-cover"
    />

    <div
      className={`absolute inset-0 z-10 pointer-events-none flex w-full h-full ${
        isMobile ? "flex-col items-center justify-between py-8" : "flex-row justify-center items-center"
      }`}
      style={{ paddingLeft: isMobile ? undefined : undefined /* keep default */, paddingRight: isMobile ? undefined : undefined }}
    >
      {/* Left 3D model */}
      <div className={`${isMobile ? "w-[60%] h-[50%]" : "w-1/2 h-full"}`}>
        <Canvas
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [0, 0, 8], fov: 60 }}
          className="w-full h-full"
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.5} />
          <hemisphereLight color={0xffffff} groundColor={0x444444} intensity={1} />
          <Suspense fallback={<Html center><div className="text-white">Loading…</div></Html>}>
            <AnimatedModel
              path="/models/obj3.glb"
              scale={isMobile ? 0.9 * 0.5 /* 90% of desktop scale 0.5 */ : 0.5}
            />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minAzimuthAngle={-Math.PI / 6}
            maxAzimuthAngle={Math.PI / 6}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {/* Right 3D model */}
      <div className={`${isMobile ? "w-[60%] h-[50%]" : "w-1/2 h-full"}`}>
        <Canvas
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [0, 0, 35], fov: 20 }}
          className="w-full h-full"
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.5} />
          <hemisphereLight color={0xffffff} groundColor={0x444444} intensity={1} />
          <Suspense fallback={<Html center><div className="text-white">Loading…</div></Html>}>
            <AnimatedModel
              path="/models/obj2.glb"
              scale={isMobile ? 0.9 * 0.5 /* 90% of desktop scale 0.5 */ : 0.5}
              motionConfig={{
                posX: [-5.0, -3.5], posY: [-7, -4.6],
                rotY: [0.4, 0.05],
              }}
            />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minAzimuthAngle={-Math.PI / 6}
            maxAzimuthAngle={Math.PI / 6}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
    </div>

    {/* Text paragraphs */}
    <motion.p
  ref={refParaLeft}
  initial={{ x: isMobile ? 0 : -30, opacity: 0 }}
  animate={inViewParaLeft ? { x: 0, opacity: 1 } : { x: isMobile ? 0 : -30, opacity: 0 }}
  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
  className={`absolute z-20 pointer-events-auto text-center bg-white/40 rounded-lg shadow-lg ${
    isMobile ? "relative mx-auto" : "top-[180px] left-1/4 -translate-x-1/4 w-[400px]"
  }`}
  style={{
    fontFamily: "'Encode Sans Condensed', 'Atkinson Hyperlegible Next', Arial, sans-serif",
    color: "#222",
    fontWeight: 400,
    fontSize: isMobile ? 13 : 16,           // px font size mobile/desktop
    lineHeight: isMobile ? "20px" : "24px", // px line height
    letterSpacing: ".01em",
    padding: isMobile ? "12px 20px" : "16px 24px",
    maxWidth: isMobile ? "90%" : undefined,
  }}
>
  Com localização privilegiada, você estará rodeado por shoppings modernos, restaurantes renomados e uma rede completa de serviços e facilidades.
</motion.p>

<motion.p
  ref={refParaRight}
  initial={{ x: isMobile ? 0 : 50, opacity: 0 }}
  animate={inViewParaRight ? { x: 0, opacity: 1 } : { x: isMobile ? 0 : 50, opacity: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className={`absolute z-20 pointer-events-auto text-center bg-white/40 rounded-lg shadow-lg ${
    isMobile ? "relative mx-auto" : "bottom-[40px] left-3/4 -translate-x-3/4 w-[400px]"
  }`}
  style={{
    fontFamily: "'Encode Sans Condensed', 'Atkinson Hyperlegible Next', Arial, sans-serif",
    color: "#222",
    fontWeight: 400,
    fontSize: isMobile ? 14 : 17,
    lineHeight: isMobile ? "22px" : "26px",
    letterSpacing: ".01em",
    padding: isMobile ? "12px 20px" : "16px 24px",
    maxWidth: isMobile ? "90%" : undefined,
    marginBottom: isMobile ? "8px" : undefined,
  }}
>
  Viva a apenas 32 km do Corcovado e de toda a energia única da cidade maravilhosa. Ilha Pura garante rápido acesso aos pontos mais importantes do Rio, do lazer às compras, das praias ao polo empresarial.
</motion.p>


    {/* Invisible label span if needed */}
    <span
      className="absolute inset-0 z-20 flex items-center justify-center text-white text-4xl font-bold pointer-events-none"
      style={{ display: "none" }}
    >
      {label}
    </span>
  </motion.section>
        );
      case 7:
      return <Section7 isMobile={isMobile} />; // Former Section 6
case 8:
      return (
        <section
          className="relative w-full min-h-screen bg-white flex flex-col justify-end z-0"
          style={{ overflowX: "hidden" }}
        >
          {/* Map iframe */}
          <div className="relative w-full flex justify-center pt-12 z-10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.1111635168404!2d-43.41437902468736!3d-22.982939379201575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bdc7391dcdeef%3A0x58293002a6b1815c!2sIlha%20Pura!5e0!3m2!1spt-BR!2sbr!4v1752861834296!5m2!1spt-BR!2sbr"
              width={800}
              height={290}
              style={{ borderRadius: 12, border: "none", maxWidth: "90%" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ilha Pura Location Map"
            />
          </div>

          {/* Lazy loaded UnderMap; notify when loaded */}
            <Suspense fallback={<div className="mt-4 text-center text-gray-500">Um empreendimento...</div>}>
              <UnderMapWithCallback onLoad={() => setUnderMapLoaded(true)} />
            </Suspense>


          {underMapLoaded && (
              <div className="relative p-4 text-center text-gray-800">
                {/* Flipping image container */}
          <div
            ref={flipRef}
            className="bg7-flip-container relative w-full flex-grow flex flex-col items-center justify-end z-20"
          >
            <div
              className={`bg7-inner relative w-full flex justify-center`}
              style={{
                maxWidth: "637px",
                height: "280px",
                opacity: inViewFlip ? 1 : 0,
                animationPlayState: inViewFlip ? "running" : "paused",
              }}
            >
              <img
                src={"/img/bg7.webp"}
                alt="Background 7"
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
            </div>

            <motion.div
              className="absolute bottom-4 right-4 md:bottom-10 md:right-10 flex flex-row gap-6 z-30"
              initial="hidden"
              animate={inViewFlip ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              <motion.div
                variants={{
                  hidden: { y: 100, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.8, ease: "easeOut" },
                  },
                }}
                className="flex flex-col items-center text-right text-black"
              >
                <p className="text-xs font-[Arial_Narrow] mb-1">Um empreendimento:</p>
                <img
                  src="/img/section8a.webp"
                  alt="Logo empreendimento"
                  className="w-32 drop-shadow-xl/50"
                  draggable={false}
                />
              </motion.div>

              <motion.div
                variants={{
                  hidden: { y: 100, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
                  },
                }}
                className="flex flex-col items-center text-right text-black"
              >
                <p className="text-xs font-[Arial_Narrow] mb-1">Desenvolvimento urbano:</p>
                <img
                  src="/img/section8b.webp"
                  alt="Logo desenvolvimento urbano"
                  className="w-32 drop-shadow-xl/50"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </div>
                <p hidden>UnderMap content loaded. Animations can start!</p>
              </div>
            )}

          
        </section>
      );



      default:
        return null;
    }
  };

  return renderContent();
});

export default Section;
