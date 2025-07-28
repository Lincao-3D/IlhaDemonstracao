// Section3Canvas.jsx
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import AnimatedModel from "./AnimatedModel"; // your existing model component
import R3FErrorBoundary from "./R3FErrorBoundary"; // your error boundary component

export default function Section3Canvas() {
  return (
    <R3FErrorBoundary>
      <Canvas
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl, scene }) => {
            // Clear color with alpha 0 for full transparency 
            gl.setClearColor(0x000000, 0);
            // Disable default scene background to let transparency show
            scene.background = null;
        }}
        style={{ background: "transparent" }}
        className="absolute inset-0 z-0"
        >
        <ambientLight intensity={0.7} />
        <Suspense
            fallback={
            <Html center>
                <div className="text-white">Carregando modelo…</div>
            </Html>
            }
        >
            <AnimatedModel
            path="/models/obj1.glb"
            scale={0.26}
            motionConfig={{
                rotY: [-0.8, 1],
                rotX: [-0.1, 0],
                rotZ: [-0.2, 0],
                posX: [4.2, 0.5],
                posY: [-1.5, 1],
                posZ: [3.2, 2.8],
            }}
            />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>

    </R3FErrorBoundary>
  );
}
