import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const UnderMap: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px 50px 0px",
  });

  useEffect(() => {
    if (inView) {
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      const desiredScrollTop = window.scrollY + 500;
      const newScrollTop = Math.min(desiredScrollTop, maxScrollTop);

      // Instant scroll (~0.01s effectively immediate)
      window.scrollTo({ top: newScrollTop, behavior: "auto" });
    }
  }, [inView]);

  return (
    <div ref={ref} style={{ marginTop: 8, minHeight: 10, minWidth: 10 }}>
      {inView && (
        <img
          src="/img/transp.webp"
          alt="Transparent decorative"
          width={10}
          height={10}
          style={{ display: "block" }}
          draggable={false}
        />
      )}
    </div>
  );
};

export default UnderMap;
