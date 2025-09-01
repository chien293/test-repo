'use client';

import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as spine from '@esotericsoftware/spine-threejs';

interface SpineAnimationProps {
  atlasPath: string;
  jsonPath: string;
  pngPath: string;
  animationName?: string;
  loop?: boolean;
}

function SpineModel({ atlasPath, jsonPath, pngPath, animationName, loop = true }: SpineAnimationProps) {
  const [spineMesh, setSpineMesh] = useState<any>(null);
  const [animationState, setAnimationState] = useState<any>(null);
  const { scene } = useThree();

  useEffect(() => {
    const loadSpine = async () => {
      try {
        console.log('Loading Spine animation...');
        console.log('Atlas path:', atlasPath);
        console.log('JSON path:', jsonPath);
        console.log('PNG path:', pngPath);

        // Test basic Spine functionality
        console.log('Spine namespace:', spine);
        console.log('Available classes:', Object.keys(spine));
        
        // Load atlas file - cần load file trước
        const atlasResponse = await fetch(atlasPath);
        const atlasText = await atlasResponse.text();
        const atlas = new spine.TextureAtlas(atlasText);
        console.log('Atlas loaded:', atlas);
        
        const atlasLoader = new spine.AtlasAttachmentLoader(atlas);
        console.log('Atlas loader created:', atlasLoader);
        
        // Load skeleton data
        const skeletonJsonLoader = new spine.SkeletonJson(atlasLoader);
        console.log('Skeleton JSON loader created:', skeletonJsonLoader);
        
        const skeletonData = await skeletonJsonLoader.readSkeletonData(jsonPath);
        console.log('Skeleton data loaded:', skeletonData);
        
        // Create skeleton
        const skeleton = new spine.Skeleton(skeletonData);
        console.log('Skeleton created:', skeleton);
        
        // Create Spine mesh - sửa tham số
        const mesh = new spine.SkeletonMesh({ skeleton, skeletonData });
        console.log('Spine mesh created:', mesh);
        
        // Set position and scale
        mesh.position.set(0, 0, 0);
        mesh.scale.set(0.5, 0.5, 0.5);
        
        // Add to scene
        scene.add(mesh);
        setSpineMesh(mesh);
        
        console.log('Spine mesh added to scene');
        
        // Setup animation - sửa cách tạo AnimationState
        if (animationName && skeletonData.animations && skeletonData.animations.length > 0) {
          console.log('Available animations:', skeletonData.animations.map((a: any) => a.name));
          
          const animState = new spine.AnimationState(new spine.AnimationStateData(skeletonData));
          animState.setAnimation(0, animationName, loop);
          setAnimationState(animState);
          
          console.log('Animation state created for:', animationName);
        } else {
          console.log('No animations found in skeleton data');
        }
        
      } catch (error) {
        console.error('Error loading Spine animation:', error);
        
        // Fallback: create a simple mesh to show something
        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.MeshBasicMaterial({ 
          color: 0xff0000,
          side: THREE.DoubleSide 
        });
        
        const fallbackMesh = new THREE.Mesh(geometry, material);
        fallbackMesh.position.set(0, 0, 0);
        scene.add(fallbackMesh);
        
        console.log('Fallback mesh added due to error');
      }
    };

    loadSpine();
  }, [atlasPath, jsonPath, pngPath, animationName, loop, scene]);

  useFrame((state, delta) => {
    if (animationState && spineMesh) {
      try {
        // Update animation
        animationState.update(delta);
        
        // Update skeleton
        spineMesh.skeleton.updateWorldTransform();
        
        // Update mesh
        spineMesh.update();
      } catch (error) {
        console.error('Error updating animation:', error);
      }
    }
  });

  return null;
}

export default function SpineAnimation({ 
  atlasPath, 
  jsonPath, 
  pngPath, 
  animationName = "animation", 
  loop = true 
}: SpineAnimationProps) {
  return (
    <div className="w-full h-96 border border-gray-300 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: '#f0f0f0' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <SpineModel
          atlasPath={atlasPath}
          jsonPath={jsonPath}
          pngPath={pngPath}
          animationName={animationName}
          loop={loop}
        />
        
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>
      
      <div className="p-4 text-center text-gray-600">
        <p>Spine Animation: {animationName}</p>
        <p className="text-sm">Kiểm tra console để xem log và available classes</p>
        <p className="text-xs text-red-500">Nếu có lỗi, sẽ hiển thị mesh đỏ fallback</p>
      </div>
    </div>
  );
} 