// SVGFrame.jsx
import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { SVGLoader } from 'three-stdlib';
import * as THREE from 'three';

export function SVGFrame(props) {
  const { paths } = useLoader(SVGLoader, '/Frame.svg');

  const shapes = useMemo(() => {
    const allShapes = [];
    paths.forEach((path) => {
      const shapes = SVGLoader.createShapes(path);
      shapes.forEach((shape) => {
        allShapes.push({ shape, color: path.color });
      });
    });
    return allShapes;
  }, [paths]);

  return (
    <group {...props} scale={[0.03, -0.03, 0.03]} position={[-24, 37, -10]}>
      {shapes.map((item, index) => (
        <mesh key={index} castShadow receiveShadow>
          <meshPhongMaterial color={item.color} side={THREE.DoubleSide} />
          <shapeGeometry args={[item.shape]} />
        </mesh>
      ))}
    </group>
  );
}
