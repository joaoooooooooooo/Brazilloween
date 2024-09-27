import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export function Model(props) {
  const { nodes, materials } = useGLTF('/Boitata  2.glb');

  // References for the vine meshes and the tree canopy
  const vineRef1 = useRef();
  const vineRef2 = useRef();
  const canopyRef = useRef(); // New reference for the canopy

  // Use frame loop to update vertex positions over time
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Apply subtle movement effect to first vine
    if (vineRef1.current) {
      vineRef1.current.geometry.attributes.position.needsUpdate = true; // Update the geometry
      const positions = vineRef1.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(positions[i + 1] * 2 + time) * 0.005; // X displacement (reduced)
        positions[i + 2] += Math.sin(positions[i + 1] * 2 + time) * 0.005; // Z displacement (reduced)
      }
    }

    // Apply subtle movement effect to second vine
    if (vineRef2.current) {
      vineRef2.current.geometry.attributes.position.needsUpdate = true; // Update the geometry
      const positions = vineRef2.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(positions[i + 1] * 2 + time) * 0.0005; // X displacement (reduced)
        positions[i + 2] += Math.sin(positions[i + 1] * 2 + time) * 0.0005; // Z displacement (reduced)
      }
    }

    // Apply subtle movement effect to the tree canopy
    if (canopyRef.current) {
      canopyRef.current.geometry.attributes.position.needsUpdate = true; // Update the geometry
      const positions = canopyRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(positions[i + 1] * 1.5 + time) * 0.001; // X displacement (subtle for canopy)
        positions[i + 2] += Math.sin(positions[i + 1] * 1.5 + time) * 0.001; // Z displacement (subtle for canopy)
      }
    }
  });

  return (
    <group {...props} dispose={null}>
      {/* Base of the model */}
      <mesh
        geometry={nodes.Base.geometry}
        material={materials.chao}
        position={[-5.088, 0.761, 14.566]}
        rotation={[0, -0.641, 0]}
        scale={[7.316, 4.78, 7.316]}
      />

      {/* Vines (with subtle movement effect) */}
      <mesh
        ref={vineRef1} // First vine mesh with displacement
        geometry={nodes.Mesh.geometry}
        material={materials['Material.002']}
      />
      <mesh
        ref={vineRef2} // Second vine mesh with displacement
        geometry={nodes.Mesh_1.geometry}
        material={materials['Material.002']}
      />

      {/* Tree Canopy (with subtle movement effect) */}
      <mesh
        ref={canopyRef} // Apply displacement to the canopy
        geometry={nodes.Copa_Árvores.geometry}
        material={materials['Nova flor.004']}
        position={[3.343, 15.87, -0.614]}
        rotation={[-0.331, 1.019, 0.229]}
        scale={0.894}
      />

      {/* Other static parts of the model */}
      <mesh
        geometry={nodes.Troncos_Secundários.geometry}
        material={materials['Material.001']}
        position={[1.32, -5.034, -6.603]}
        scale={[12.726, 6.436, 5.821]}
      />
      <mesh
        geometry={nodes.Troncos_Primários.geometry}
        material={materials['Tree Log Material.001']}
        position={[5.51, 1.648, 2.918]}
        rotation={[-3.089, -0.847, -2.941]}
        scale={[38.007, 37.521, 37.521]}
      />
      <mesh
        geometry={nodes.Grass.geometry}
        material={materials.bf_grass}
        position={[-7.062, 1.483, 2.614]}
        rotation={[Math.PI, -1.04, Math.PI]}
        scale={[34.356, 21.454, 34.356]}
      />
        <mesh
        geometry={nodes.Svg_Boitat.geometry}
        material={materials.Material}
        position={[-11.251, 20.707, -1.326]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={47.573}
      />
    </group>
  );
}

useGLTF.preload('/Boitata 2.glb');
