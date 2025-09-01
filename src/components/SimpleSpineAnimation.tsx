'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function SpineModel() {
  const { scene } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const loadSpine = async () => {
      try {
        // Tạo một mesh đơn giản để test
        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.MeshBasicMaterial({ 
          color: 0x00ff00,
          side: THREE.DoubleSide 
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, 0);
        
        scene.add(mesh);
        
        console.log('Spine model loaded successfully');
        
      } catch (error) {
        console.error('Error loading Spine animation:', error);
      }
    };

    loadSpine();
  }, [scene]);

  return null;
}

export default function SimpleSpineAnimation() {
  return (
    <div className="w-full h-96 border border-gray-300 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: '#f0f0f0' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <SpineModel />
        
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>
      
      <div className="p-4 text-center text-gray-600">
        <p>Spine Animation Component</p>
        <p className="text-sm">Kiểm tra console để xem log</p>
      </div>
    </div>
  );
} 