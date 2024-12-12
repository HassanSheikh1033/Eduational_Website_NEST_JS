import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import Loader from "./Loader";


const Book = ({ isMobile }) => {
  const book = useGLTF("./book/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={12.2} groundColor='blue' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.2}
        penumbra={1}
        intensity={1.5}
        color='purple'
        shadow-mapSize={1024}
      />
      <pointLight intensity={2.5} color='orange' />
      <primitive
        object={book.scene}
        scale={isMobile ? 15.1 : 7.4}
        position={isMobile ? [0, -6, -2.2] : [0, -2, 0.5]}
        rotation={[0, 0, 0]} // slight 5-degree adjustment if needed

      />
    </mesh>
  );
};

const BooksCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1000px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls
          autoRotate 
          autoRotateSpeed={5}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Book isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BooksCanvas;



