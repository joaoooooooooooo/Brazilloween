import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sparkles } from '@react-three/drei';
import { EffectComposer, Noise } from '@react-three/postprocessing';
import { Model } from './Model';
import * as THREE from 'three';
import { SVGFrame } from './SVGFrame';

export default function App() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 10], fov: 10 }}
      style={{ width: '100vw', height: '100vh' }}
      gl={{
        outputEncoding: THREE.LinearEncoding,
        toneMapping: THREE.NoToneMapping,
      }}
    >
      <color attach="background" args={['black']} />
      <fog attach="fog" args={['black', 10, 515]} />
      
      {/* Adjusted Sparkles Position */}
      <Sparkles count={20} scale={[20, 10, 10]} size={23.5} speed={3} position={[0, 8, 0]} />
      
      {/* Controls */}
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        enableDamping
        dampingFactor={0.1}
        target={[0, 0, 0]}
      />

      {/* 3D Model */}
      <Suspense fallback={null}>
        <Model />
      </Suspense>

      {/* Insert the SVG Frame */}
   

      {/* Post-processing Effects */}
      <EffectComposer>
        <Noise opacity={0} />
      </EffectComposer>
    </Canvas>
  );
}
