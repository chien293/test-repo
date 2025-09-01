'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Text, useTexture } from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';

// Component cho chip với physics đơn giản sử dụng texture
function PhysicsChip({ 
  position, 
  texturePath, 
  velocity = [0, 0, 0],
  isShaking = false 
}: { 
  position: [number, number, number]; 
  texturePath: string; 
  velocity?: [number, number, number];
  isShaking?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [currentPosition, setCurrentPosition] = useState(position);
  const [currentVelocity, setCurrentVelocity] = useState(velocity);
  const texture = useTexture(texturePath);
  
  useFrame((state) => {
    if (meshRef.current && isShaking) {
      const time = state.clock.getElapsedTime();
      
      // Physics đơn giản cho chip
      const newVelocity: [number, number, number] = [
        currentVelocity[0] + (Math.random() - 0.5) * 0.1,
        currentVelocity[1] + (Math.random() - 0.5) * 0.1,
        currentVelocity[2] + (Math.random() - 0.5) * 0.1
      ];
      
      // Giới hạn vận tốc
      const maxVelocity = 0.5;
      const clampedVelocity: [number, number, number] = [
        Math.max(-maxVelocity, Math.min(maxVelocity, newVelocity[0])),
        Math.max(-maxVelocity, Math.min(maxVelocity, newVelocity[1])),
        Math.max(-maxVelocity, Math.min(maxVelocity, newVelocity[2]))
      ];
      
      // Cập nhật vị trí
      const newPosition: [number, number, number] = [
        currentPosition[0] + clampedVelocity[0],
        currentPosition[1] + clampedVelocity[1],
        currentPosition[2] + clampedVelocity[2]
      ];
      
      // Giới hạn vị trí trong hộp
      const boxSize = 1.5;
      const clampedPosition: [number, number, number] = [
        Math.max(-boxSize, Math.min(boxSize, newPosition[0])),
        Math.max(-0.3, Math.min(0.3, newPosition[1])),
        Math.max(-boxSize, Math.min(boxSize, newPosition[2]))
      ];
      
      // Ma sát
      const friction = 0.98;
      const dampedVelocity: [number, number, number] = [
        clampedVelocity[0] * friction,
        clampedVelocity[1] * friction,
        clampedVelocity[2] * friction
      ];
      
      setCurrentPosition(clampedPosition);
      setCurrentVelocity(dampedVelocity);
      
      meshRef.current.position.set(...clampedPosition);
      
      // Xoay chip theo hướng di chuyển
      if (Math.abs(clampedVelocity[0]) > 0.01 || Math.abs(clampedVelocity[2]) > 0.01) {
        meshRef.current.rotation.x += clampedVelocity[2] * 0.1;
        meshRef.current.rotation.z -= clampedVelocity[0] * 0.1;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={currentPosition}>
      <cylinderGeometry args={[0.25, 0.25, 0.08, 32]} />
      <meshStandardMaterial 
        map={texture}
        metalness={0.9} 
        roughness={0.1}
        envMapIntensity={1}
      />
    </mesh>
  );
}

// Component cho hộp đựng chip nâng cao sử dụng texture
function AdvancedChipBox() {
  const boxRef = useRef<THREE.Group>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [shakeIntensity, setShakeIntensity] = useState(0);
  
  // Load các texture
  const boxBackTexture = useTexture('/chip-box/box-back.png');
  const boxFrontTexture = useTexture('/chip-box/box-front.png');
  const boxCoverTexture = useTexture('/chip-box/box-cover.png');
  const boxInsideTexture = useTexture('/chip-box/box-inside.png');
  
  // Tạo mảng chip với vị trí ngẫu nhiên
  const chips = useMemo(() => {
    const chipTextures = [
      '/chip-box/red.png', 
      '/chip-box/white.png', 
      '/chip-box/red.png', 
      '/chip-box/white.png', 
      '/chip-box/red.png', 
      '/chip-box/white.png'
    ];
    return chipTextures.map((texturePath, index) => ({
      id: index,
      texturePath,
      position: [
        (Math.random() - 0.5) * 2,
        0,
        (Math.random() - 0.5) * 2
      ] as [number, number, number],
      velocity: [0, 0, 0] as [number, number, number]
    }));
  }, []);
  
  useFrame((state) => {
    if (boxRef.current && isShaking) {
      const time = state.clock.getElapsedTime();
      const intensity = shakeIntensity;
      
      // Hiệu ứng lắc hộp
      boxRef.current.rotation.x = Math.sin(time * 15) * intensity * 0.2;
      boxRef.current.rotation.z = Math.cos(time * 12) * intensity * 0.2;
      boxRef.current.rotation.y = Math.sin(time * 8) * intensity * 0.1;
    }
  });

  const handleShake = () => {
    setIsShaking(true);
    setShakeIntensity(1);
    
    // Tăng dần cường độ lắc
    const shakeInterval = setInterval(() => {
      setShakeIntensity(prev => {
        if (prev > 0.1) {
          return prev * 0.9;
        } else {
          clearInterval(shakeInterval);
          setIsShaking(false);
          setShakeIntensity(0);
          return 0;
        }
      });
    }, 100);
  };

  return (
    <group ref={boxRef}>
      {/* Mặt sau của hộp */}
      <mesh position={[0, 0, -1.5]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[3, 1.2]} />
        <meshStandardMaterial map={boxBackTexture} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Mặt trước của hộp */}
      <mesh position={[0, 0, 1.5]} rotation={[0, Math.PI, 0]} castShadow receiveShadow>
        <planeGeometry args={[3, 1.2]} />
        <meshStandardMaterial map={boxFrontTexture} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Mặt trái của hộp */}
      <mesh position={[-1.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <planeGeometry args={[3, 1.2]} />
        <meshStandardMaterial map={boxBackTexture} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Mặt phải của hộp */}
      <mesh position={[1.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow receiveShadow>
        <planeGeometry args={[3, 1.2]} />
        <meshStandardMaterial map={boxBackTexture} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Mặt dưới của hộp */}
      <mesh position={[0, -0.6, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial map={boxInsideTexture} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Nắp hộp */}
      <mesh position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[3.2, 3.2]} />
        <meshStandardMaterial map={boxCoverTexture} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Chips bên trong */}
      {chips.map((chip) => (
        <PhysicsChip
          key={chip.id}
          position={chip.position}
          texturePath={chip.texturePath}
          velocity={chip.velocity}
          isShaking={isShaking}
        />
      ))}
      
      {/* Button để lắc */}
      <mesh position={[0, 1.5, 0]} onClick={handleShake}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#FFD700"
          emissiveIntensity={isShaking ? 0.3 : 0}
        />
      </mesh>
      
      {/* Text hướng dẫn */}
      <Text
        position={[0, 1.8, 0]}
        fontSize={0.2}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
      >
        LẮC
      </Text>
    </group>
  );
}

// Component chính
export default function AdvancedChipShaker() {
  return (
    <div className="w-full h-[700px] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-lg overflow-hidden relative">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[8, 8, 8]} />
        
        {/* Lighting nâng cao */}
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.6} color="#ff6b6b" />
        <pointLight position={[10, -10, -5]} intensity={0.6} color="#4ecdc4" />
        
        {/* Environment */}
        <Environment preset="sunset" />
        
        {/* Chip Box */}
        <AdvancedChipBox />
        
        {/* Controls */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
          maxDistance={20}
          minDistance={3}
        />
      </Canvas>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-white text-sm bg-black/60 p-3 rounded-lg backdrop-blur-sm">
        <p className="font-semibold mb-2">🎮 Điều khiển:</p>
        <p>🖱️ Click và kéo để xoay camera</p>
        <p>🔍 Scroll để zoom in/out</p>
        <p>🎲 Click vào nút vàng để lắc chip</p>
        <p>💫 Chips sẽ di chuyển theo physics</p>
      </div>
      
      {/* Title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">🎰 Hộp Lắc Chip 3D</h2>
        <p className="text-sm opacity-80">Sử dụng Three.js + React Three Fiber</p>
      </div>
    </div>
  );
} 