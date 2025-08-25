'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { fireConfettiFromElement } from './SimpleConfetti';
import { CreateTypes } from 'canvas-confetti';

interface ConfettiPopupProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    showConfetti?: boolean;
}

// export default function ConfettiPopup({
//   isOpen,
//   onClose,
//   title = '🎉 Chúc mừng! 🎉',
//   message = 'Bạn đã hoàn thành xuất sắc!',
//   showConfetti = true
// }: ConfettiPopupProps) {
//     const popupRef = useRef<HTMLDivElement>(null);
//     useEffect(() => {
//         const handleConfetti = () => {
//             if (popupRef.current) {
//                 fireConfettiFromElement(popupRef.current, {
//                     particleCount: 100,
//                 });
//             }
//         }
//         if (isOpen) {
//             handleConfetti();
//         }
//     }, [isOpen]);
//   return (
//     <>
//       {isOpen && (
//         <div ref={popupRef} className="fixed inset-0 flex items-center justify-center z-50">
//           {/* Modal content */}
//           <div className="bg-white/95 backdrop-blur-md rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95 border border-white/20">
//             {/* Close button */}
//             <button
//               onClick={onClose}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//               aria-label="Close"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>

//             {/* Content */}
//             <div className="text-center">
//               {/* Icon */}
//               <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full flex items-center justify-center mb-4">
//                 <span className="text-3xl">🎊</span>
//               </div>

//               {/* Title */}
//               <h2 className="text-2xl font-bold text-gray-800 mb-3">
//                 {title}
//               </h2>

//               {/* Message */}
//               <p className="text-gray-600 mb-6 leading-relaxed">
//                 {message}
//               </p>

//               {/* Action button */}
//               <button
//                 onClick={onClose}
//                 className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
//               >
//                 Tuyệt vời!
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// } 

export default function ConfettiPopup({
    isOpen,
    onClose,
    title = '🎉 Chúc mừng! 🎉',
    message = 'Bạn đã hoàn thành xuất sắc!',
    showConfetti = true
}: ConfettiPopupProps) {

    const animationInstance = useRef<((confetti: CreateTypes | null) => void) | undefined>(null);

    const getInstance = (instance: any) => {
        animationInstance.current = instance;
    };

    // Lấy instance qua onInit
    const handleInit = useCallback((instance: any) => {
        animationInstance.current = instance;
    }, []);

    // Hàm bắn confetti
    const fireConfetti = useCallback(() => {
        if (!animationInstance.current) return;

        makeShot(0.25, {
            spread: 26,
            startVelocity: 55
          });
      
          makeShot(0.2, {
            spread: 60
          });
      
          makeShot(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
          });
      
          makeShot(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
          });
      
          makeShot(0.1, {
            spread: 120,
            startVelocity: 45
          });
    }, []);

    const makeShot = (particleRatio: number, opts: any) => {
        animationInstance.current &&
          animationInstance.current({
            ...opts,
            origin: { y: 0.7 },
            particleCount: Math.floor(200 * particleRatio)
          });
      };

    // Khi modal mở, bắn confetti
    useEffect(() => {
        if (isOpen) {
            fireConfetti();
        }
    }, [isOpen, fireConfetti]);

    // Chạy khi modal mở
    useEffect(() => {
        if (isOpen) {
            fireConfetti();
        }
    }, [isOpen, fireConfetti]);


    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Modal content */}
                    <div className="bg-white/95 backdrop-blur-md rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95 border border-white/20">
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Close"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Content */}
                        <div className="text-center">
                            {/* Icon */}
                            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full flex items-center justify-center mb-4">
                                <span className="text-3xl">🎊</span>
                            </div>

                            {/* Title */}
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                {title}
                            </h2>

                            {/* Message */}
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {message}
                            </p>

                            {/* Action button */}
                            <button
                                onClick={onClose}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                            >
                                Tuyệt vời!
                            </button>
                        </div>
                    </div>
                    <ReactCanvasConfetti
                        refConfetti={getInstance}
                        style={{
                            position: "fixed",
                            pointerEvents: "none",
                            width: "100%",
                            height: "100%",
                            top: 0,
                            left: 0,
                            zIndex: 9999,
                        }}
                    />
                </div>


            )}
        </>
    );
} 