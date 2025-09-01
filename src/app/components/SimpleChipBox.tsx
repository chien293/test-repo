'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Component cho chip đơn giản
function SimpleChip({ color }: {
  color: 'red' | 'white';
}) {
  const chipColor = color === 'red' ? '/chip-box/red.png' : '/chip-box/white.png';

  return (
    <div
      className="absolute transition-all duration-300 ease-in-out"
    >
      <Image
        src={chipColor}
        alt={`${color} chip`}
        width={50}
        height={50}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

// Component cho chip animation với frame
function AnimatedChip({ color, position, currentFrame }: {
  color: 'red' | 'white';
  position: { x: number; y: number; };
  currentFrame: number;
}) {
  const getFrameImage = (frame: number) => {
    // Đảm bảo frame number nằm trong khoảng 1-100
    const safeFrame = Math.max(1, Math.min(frame, 100));
    return `/chip/chip/2-red-2-white/2-red-2-white-${safeFrame}.png`;
  };

  return (
    <div
      className="absolute transition-all duration-75 ease-linear"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-40%, -50%)'
      }}
    >
      <Image
        src={getFrameImage(currentFrame)}
        alt={`${color} chip frame ${currentFrame}`}
        width={100}
        height={100 }
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}

// Component chính cho hộp chip 2D
export default function SimpleChipBox() {
  const [isShaking, setIsShaking] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [shakeCount, setShakeCount] = useState(0);
  const [chipPositions, setChipPositions] = useState([
    { x: 30, y: 40 },
    { x: 45, y: 40 },
  ]);
  
  const animationRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const frameCount = 100; // Số frame có sẵn từ 1-100
  const frameDelay = 50; // 50ms = 20 FPS
  const shakesPerCycle = 3; // Số lần lắc để hoàn thành một chu kỳ

  useEffect(() => {
    if (isShaking) {
      const animate = () => {
        setCurrentFrame(prev => {
          let nextFrame = prev + 1;
          
          // Nếu đã hết frame, quay lại frame đầu
          if (nextFrame > frameCount) {
            nextFrame = 1;
            setShakeCount(prev => prev + 1);
          }
          
          // Dừng animation sau khi hoàn thành đủ số lần lắc
          if (shakeCount >= shakesPerCycle && nextFrame === 1) {
            setIsShaking(false);
            setShakeCount(0);
            // Trở về vị trí ban đầu
            setChipPositions([
              { x: 30, y: 40 },
              { x: 70, y: 40 },
              { x: 30, y: 60 },
              { x: 70, y: 60 }
            ]);
            return 1;
          }
          
          return nextFrame;
        });
        
        if (isShaking) {
          animationRef.current = setTimeout(animate, frameDelay);
        }
      };
      
      animationRef.current = setTimeout(animate, frameDelay);
    }
    
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isShaking, shakeCount, frameCount, shakesPerCycle]);

  const handleShake = () => {
    if (!isShaking) {
      setIsShaking(true);
      setCurrentFrame(1);
      setShakeCount(0);
    }
  };

  return (
    <div className="w-full h-[400px] bg-gradient-to-br from-blue-800 to-purple-800 rounded-lg overflow-hidden relative flex items-center justify-center">
      {/* Hộp đựng chip 2D */}
      <div className="relative w-80 h-60">
        {/* Tạo hộp box bằng CSS với các mặt riêng biệt */}
        <div className="flex items-center justify-center">
          <div className="absolute top-[46px] left-[40px]" style={{ zIndex: 0 }}>
            <Image
              src="/chip-box/box-back.png"
              alt="Box Bottom"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
          {/* Mặt đáy của hộp */}
          <div className="absolute bottom-[75px] left-[50px]" style={{ zIndex: 0 }}>
            <Image
              src="/chip-box/box-inside.png"
              alt="Box Bottom"
              width={180}
              height={180}
              className="object-contain"
            />
          </div>

          {/* Mặt chính của hộp */}
          <div className="absolute bottom-10 left-10" style={{ zIndex: 1 }}>
            <Image
              src="/chip-box/box-front.png"
              alt="Box Front"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>

          {/* Nắp hộp */}
          <div className="absolute bottom-[60px] left-[40px]" style={{ zIndex: 2 }}>
            <Image
              src="/chip-box/box-cover.png"
              alt="Box Cover"
              className="object-contain"
              width={200}
              height={200}
            />
          </div>

          {/* Chips bên trong - sử dụng animation frame khi lắc */}
          <div style={{ zIndex: 3 }}>
            {isShaking ? (
              // Khi lắc, sử dụng AnimatedChip với frame
              <>
                <AnimatedChip color="red" position={chipPositions[0]} currentFrame={currentFrame} />
              </>
            ) : (
              // Khi không lắc, sử dụng SimpleChip bình thường
              <>
              <div className='absolute top-[40px] left-[80px] h-full w-full'>
                <SimpleChip color="red" />
              </div>
              <div className='absolute top-[70px] left-[120px] h-full w-full'>
                <SimpleChip color="white" />
              </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Button để lắc */}
      <button
        onClick={handleShake}
        disabled={isShaking}
        className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 transition-all duration-200 shadow-lg ${isShaking ? 'animate-pulse' : 'hover:scale-110'
          }`}
        style={{
          zIndex: 20,
          background: 'radial-gradient(circle, #FFD700 0%, #FFA500 100%)'
        }}
      >
        <span className="text-white font-bold text-lg">🎲</span>
      </button>

      {/* Shake indicator */}
      {isShaking && (
        <div className="absolute top-16 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold animate-pulse" style={{ zIndex: 20 }}>
          Lắc {shakeCount + 1}/{shakesPerCycle}
        </div>
      )}

      {/* Frame counter */}
      {isShaking && (
        <div className="absolute top-24 right-4 bg-blue-400 text-white px-3 py-1 rounded-full text-sm font-bold" style={{ zIndex: 20 }}>
          Frame: {currentFrame}/100
        </div>
      )}

      {/* Progress bar */}
      {isShaking && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-3 bg-gray-700 rounded-full overflow-hidden" style={{ zIndex: 20 }}>
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-75 ease-linear"
            style={{ 
              width: `${((shakeCount * frameCount + currentFrame) / (shakesPerCycle * frameCount)) * 100}%` 
            }}
          />
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 p-2 rounded backdrop-blur-sm" style={{ zIndex: 20 }}>
        <p>🎲 Click nút vàng để lắc chip</p>
      </div>

      {/* Title */}
      <div className="absolute top-4 left-4 text-white text-center" style={{ zIndex: 20 }}>
        <h3 className="text-lg font-bold mb-1">🎰 Hộp Chip 2D với Animation</h3>
        <p className="text-sm opacity-80">100 frames animation mượt mà</p>
      </div>
    </div>
  );
} 