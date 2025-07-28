// AnimatedModel.tsx — Cleaned and Corrected
import { useRef } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

interface AnimatedModelProps {
  path: string;
  scale?: number;
  motionConfig?: {
    rotY?: [number, number];
    rotX?: [number, number];
    rotZ?: [number, number];
    posX?: [number, number];
    posY?: [number, number];
    posZ?: [number, number];
  };
  isMobile?: boolean;
}

export default function AnimatedModel({ path, scale = 1, motionConfig, isMobile }: AnimatedModelProps) {
  const { scene } = useGLTF(path);
  const modelRef = useRef<THREE.Group>(null);
  const { scrollYProgress } = useScroll();

  const {
    rotY = [0.6, 0],
    rotX = [-0.4, 0],
    posX = [4.2, 0.5],
    posY = [1.5, 0],
    posZ = [3.2, 1.1],
  } = motionConfig ?? {};

  const rY = useTransform(scrollYProgress, [0, 1], rotY);
  const rX = useTransform(scrollYProgress, [0, 1], rotX);
  const xV = useTransform(scrollYProgress, [0, 1], posX);
  const yV = useTransform(scrollYProgress, [0, 1], posY);
  const zV = useTransform(scrollYProgress, [0, 1], posZ);

  useFrame(() => {
    if (!modelRef.current) return;
    modelRef.current.rotation.set(rX.get(), rY.get(), 0);
    modelRef.current.position.set(xV.get(), yV.get(), zV.get());
  });

  return (
    <>
      <primitive object={scene} ref={modelRef} scale={isMobile ? scale * 0.5 : scale} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minAzimuthAngle={-Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}
