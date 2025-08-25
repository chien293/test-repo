'use client';

import { useState, useEffect, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

interface SimpleConfettiProps {
  isActive: boolean;
  duration?: number; // Thời gian hiển thị confetti (ms)
  numberOfPieces?: number;
  colors?: string[];
  recycle?: boolean;
  origin?: { x: number; y: number }; // Điểm bắn (0-1, 0-1)
  spread?: number; // Góc bắn (độ)
}

export default function SimpleConfetti({
  isActive,
  duration = 5000,
  numberOfPieces = 150,
  colors = ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#9370DB', '#32CD32'],
  recycle = false,
  origin = { x: 0.5, y: 0.5 }, // Mặc định bắn từ giữa màn hình
  spread = 360 // Bắn ra tất cả hướng
}: SimpleConfettiProps) {
  const [shouldShow, setShouldShow] = useState(false);
  const confettiRef = useRef<any>(null);

  useEffect(() => {
    if (isActive) {
      setShouldShow(true);
      
      // Trigger confetti
      triggerConfetti();
      
      if (!recycle) {
        const timer = setTimeout(() => {
          setShouldShow(false);
        }, duration);
        
        return () => clearTimeout(timer);
      }
    } else {
      setShouldShow(false);
    }
  }, [isActive, duration, recycle]);

  const triggerConfetti = () => {
    if (!confettiRef.current) return;
    
    // Bắn confetti chính
    confettiRef.current.fire({
      particleCount: numberOfPieces,
      spread: spread,
      origin: origin,
      colors: colors,
      startVelocity: 30,
      gravity: 0.8,
      ticks: 200
    });

    // Bắn thêm một đợt nữa với delay
    setTimeout(() => {
      confettiRef.current?.fire({
        particleCount: Math.floor(numberOfPieces * 0.6),
        spread: spread,
        origin: origin,
        colors: colors,
        startVelocity: 25,
        gravity: 0.9,
        ticks: 180
      });
    }, 200);

    // Bắn đợt cuối
    setTimeout(() => {
      confettiRef.current?.fire({
        particleCount: Math.floor(numberOfPieces * 0.4),
        spread: spread,
        origin: origin,
        colors: colors,
        startVelocity: 20,
        gravity: 1.0,
        ticks: 150
      });
    }, 400);
  };

  const handleConfettiInit = ({ confetti }: { confetti: any }) => {
    confettiRef.current = confetti;
  };

  if (!shouldShow) return null;

  return (
    <ReactCanvasConfetti
      onInit={handleConfettiInit}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    />
  );
}

// Hook để sử dụng confetti dễ dàng
export function useConfetti() {
  const [isActive, setIsActive] = useState(false);

  const triggerConfetti = () => {
    setIsActive(true);
  };

  const stopConfetti = () => {
    setIsActive(false);
  };

  return {
    isActive,
    triggerConfetti,
    stopConfetti
  };
}

// Utility function để bắn confetti từ element cụ thể
export async function fireConfettiFromElement(
  element: HTMLElement,
  options: {
    particleCount?: number;
    colors?: string[];
    spread?: number;
  } = {}
) {
  try {
    const confetti = (await import('canvas-confetti')).default;
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const {
      particleCount = 100,
      colors = ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#9370DB', '#32CD32'],
      spread = 360
    } = options;

    confetti({
      particleCount,
      spread,
      origin: {
        x: centerX / window.innerWidth,
        y: centerY / window.innerHeight
      },
      colors,
      startVelocity: 30,
      gravity: 0.8,
      ticks: 200
    });
  } catch (error) {
    console.error('Error loading confetti:', error);
  }
} 