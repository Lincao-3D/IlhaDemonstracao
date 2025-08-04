// src/App.tsx
import React, { Suspense, useRef } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { useScroll, useTransform, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "./hooks/useMediaQuery";
import Section from "./Sections";
import Section7 from "./components/Section7";

const LazyUnderMap = React.lazy(() => import("./components/UnderMap"));

export default function App() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Section 1 scroll and ref
  const refSection1 = useRef<HTMLElement | null>(null);
  const [refSection2, inViewSection2] = useInView({ threshold: 0.2 });
    const [refFlipContainer, inViewFlip] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { scrollYProgress: scrollY1 } = useScroll({
    target: refSection1,
    offset: ["start end", "end start"],
  });
  const hiddenHeightPx = 150;
  const y1 = useTransform(scrollY1, [0, 1], [0, -hiddenHeightPx]);
  const scale1 = useTransform(scrollY1, [0, 1], [1, isMobile ? 1.69 : 1.33]);

  // Section 5 scroll and ref
  const refSection5 = useRef<HTMLElement | null>(null);
  const hiddenHeightPxSections5and6 = 120;
  const { scrollYProgress: scrollY5 } = useScroll({
    target: refSection5,
    offset: ["start end", "end start"],
  });
  const y5 = useTransform(scrollY5, [0, 1], [0, -hiddenHeightPxSections5and6]);

  const sections = [
    { id: 1, label: "Seção 1", bg: "/img/bg1.webp" },
    { id: 2, label: "Seção 2", color: "#005099" },
    { id: 3, label: "Seção 3", bg: "/img/bg8.webp", color: "#777" },
    { id: 4, label: "Seção 4", bg: "/img/bg3.webp", color: "#333" },
    { id: 5, label: "Seção 5", isVideo: true, color: "#0b2b2e" },
    { id: 6, label: "Seção 6", bg: "/img/bg5.webp" },
    { id: 7, label: "Seção 7", bg: "/img/bg6.webp", color: "#111" },
    { id: 8, label: "Seção 8", bg: "/img/bg7.webp", color: "#777" },
  ];

  return (
    <ParallaxProvider>
      <main>
        {sections.map((sec) => {
          if (sec.id === 1) {
            return (
              <Section
                key={sec.id}
                {...sec}
                ref={refSection1}
                y={y1}
                scale={scale1}
                isMobile={isMobile}
              />
            );
          }

          if (sec.id === 2) {
            return (
              <motion.div
                key={`${sec.id}-wrapper`}
                style={{ marginTop: `-${hiddenHeightPx}px`, position: "relative", zIndex: 1 }}
              >
                <Section
                  {...sec}
                  ref={refSection2}
                  inViewSection2={inViewSection2}
                  isMobile={isMobile}
                />
              </motion.div>
            );
          }

          if (sec.id === 6) {
            return (
              <Section
                key={sec.id}
                {...sec}
                ref={refSection5}
                y={y5}
                isMobile={isMobile}
              />
            );
          }

          if (sec.id === 7) {
            return (
              <motion.div
                key={`${sec.id}-wrapper`}
                style={{ marginTop: `-${hiddenHeightPxSections5and6}px`, position: "relative", zIndex: 1 }}
              >
                <Section7 isMobile={isMobile} />
              </motion.div>
            );
          }

          if (sec.id === 8) {
            return (
              <React.Fragment key={sec.id}>
                <Suspense
                  fallback={
                    <section className="relative w-full min-h-screen bg-white flex flex-col justify-end">
                      {/* Fallback Map iframe */}
                      <div className="relative w-full flex justify-center pt-12">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.1111635168404!2d-43.41437902468736!3d-22.982939379201575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bdc7391dcdeef%3A0x58293002a6b1815c!2sIlha%20Pura!5e0!3m2!1spt-BR!2sbr!4v1752861834296!5m2!1spt-BR!2sbr"
                          width={800}
                          height={290}
                          style={{ borderRadius: 12, border: "none", maxWidth: "90%" }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Condomínio-Exemp. Location Map"
                        />
                      </div>
                      {/* Placeholder for UnderMap fallback */}
                      <div className="mt-8">Um empreendimento...</div>
                    </section>
                  }
                >
                  <Section {...sec} 
                  isMobile={isMobile} 
                  flipRef={refFlipContainer}
                  inViewFlip={inViewFlip}/>
                </Suspense>

                <Suspense fallback={<div>Desenvolvimento urbano...</div>}>
                  <LazyUnderMap />
                </Suspense>
              </React.Fragment>
            );
          }

          // Default render for other sections
          return <Section key={sec.id} {...sec} isMobile={isMobile} />;
        })}
      </main>
    </ParallaxProvider>
  );
}
