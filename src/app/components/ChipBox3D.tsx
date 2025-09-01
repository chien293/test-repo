'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useTexture } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

// Component cho từng chip riêng lẻ sử dụng texture
function Chip({ position, texturePath, rotation }: { 
  position: [number, number, number]; 
  texturePath: string; 
  rotation?: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(texturePath);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Thêm chuyển động nhẹ cho chip
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation || [0, 0, 0]}>
      <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
      <meshStandardMaterial map={texture} metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

// Component cho hộp đựng chip sử dụng texture
function ChipBox() {
  const boxRef = useRef<THREE.Group>(null);
  const [isShaking, setIsShaking] = useState(false);
  
  // Load các texture
  const boxBackTexture = useTexture('/chip-box/box-back.png');
  const boxFrontTexture = useTexture('/chip-box/box-front.png');
  const boxCoverTexture = useTexture('/chip-box/box-cover.png');
  const boxInsideTexture = useTexture('/chip-box/box-inside.png');
  
  useFrame((state) => {
    if (boxRef.current && isShaking) {
      // Hiệu ứng lắc hộp
      const time = state.clock.getElapsedTime();
      boxRef.current.rotation.x = Math.sin(time * 10) * 0.1;
      boxRef.current.rotation.z = Math.cos(time * 8) * 0.1;
    }
  });

  const handleShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 2000);
  };

  return (
    <group ref={boxRef}>
      {/* Mặt sau của hộp */}
      <mesh position={[0, 0, -1]} rotation={[0, 0, 0]}>
        <planeGeometry args={[2, 1]} />
        <meshStandardMaterial map={boxBackTexture} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Mặt trước của hộp */}
      <mesh position={[0, 0, 1]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2, 1]} />
        <meshStandardMaterial map={boxFrontTexture} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Mặt trái của hộp */}
      <mesh position={[-1, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2, 1]} />
        <meshStandardMaterial map={boxBackTexture} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Mặt phải của hộp */}
      <mesh position={[1, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[2, 1]} />
        <meshStandardMaterial map={boxBackTexture} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Mặt dưới của hộp */}
      <mesh position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial map={boxInsideTexture} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Nắp hộp */}
      <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.1, 2.1]} />
        <meshStandardMaterial map={boxCoverTexture} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Chips bên trong sử dụng texture thực */}
      <Chip position={[-0.5, 0, -0.5]} texturePath="/chip-box/red.png" />
      <Chip position={[0.5, 0, -0.5]} texturePath="/chip-box/white.png" />
      <Chip position={[-0.5, 0, 0.5]} texturePath="/chip-box/white.png" />
      <Chip position={[0.5, 0, 0.5]} texturePath="/chip-box/red.png" />
      
      {/* Button để lắc */}
      <mesh position={[0, 1.2, 0]} onClick={handleShake}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Component chính
export default function ChipBox3D() {
  return (
    <div className="w-full h-[600px] bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* Environment */}
        <Environment preset="sunset" />
        
        {/* Chip Box */}
        <ChipBox />
        
        {/* Controls */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
        />
      </Canvas>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 p-2 rounded">
        <p>🖱️ Click và kéo để xoay</p>
        <p>🔍 Scroll để zoom</p>
        <p>🎲 Click vào nút vàng để lắc</p>
      </div>
    </div>
  );
} 