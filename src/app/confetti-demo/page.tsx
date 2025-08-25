'use client';

import { useState, useRef } from 'react';
import ConfettiPopup from '../components/ConfettiPopup';
import SimpleConfetti, { useConfetti, fireConfettiFromElement } from '../components/SimpleConfetti';

export default function ConfettiDemoPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [customTitle, setCustomTitle] = useState('🎉 Chúc mừng! 🎉');
  const [customMessage, setCustomMessage] = useState('Bạn đã hoàn thành xuất sắc!');
  
  // Simple confetti states
  const { isActive: isSimpleConfettiActive, triggerConfetti, stopConfetti } = useConfetti();
  const [confettiOrigin, setConfettiOrigin] = useState({ x: 0.5, y: 0.5 });
  const [confettiSpread, setConfettiSpread] = useState(360);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [buttonPosition, setButtonPosition] = useState<{ x: number; y: number } | null>(null);

  const openPopup = async () => {
    // Lưu vị trí của button trước khi mở popup
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Chuyển đổi sang tọa độ tương đối (0-1)
      const relativeX = centerX / window.innerWidth;
      const relativeY = centerY / window.innerHeight;
      
      setButtonPosition({ x: relativeX, y: relativeY });
      console.log('Button position saved:', { x: relativeX, y: relativeY });
    }
    
    setIsPopupOpen(true);
    
    // Bắn confetti từ vị trí button đã lưu
    if (buttonPosition) {
      await fireConfettiFromElement(buttonRef.current!, {
        particleCount: 150,
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
        spread: 180
      });
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const fireFromButton = async () => {
    if (buttonRef.current) {
      await fireConfettiFromElement(buttonRef.current, {
        particleCount: 150,
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
        spread: 180
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          🎊 Confetti Popup Demo 🎊
        </h1>

        {/* ConfettiPopup Section */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            🎆 ConfettiPopup - Hiệu ứng Firework từ Modal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề:
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tiêu đề..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nội dung:
              </label>
              <input
                type="text"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập nội dung..."
              />
            </div>
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="showConfetti"
              checked={showConfetti}
              onChange={(e) => setShowConfetti(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="showConfetti" className="ml-2 text-sm text-gray-700">
              Hiển thị hiệu ứng confetti (Firework từ giữa modal)
            </label>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={openPopup}
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              🎆 Mở Popup Firework!
            </button>

            <button
              onClick={() => {
                setCustomTitle('🏆 Thành công! 🏆');
                setCustomMessage('Bạn đã vượt qua thử thách một cách xuất sắc!');
                setShowConfetti(true);
                openPopup();
              }}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              🏆 Thành công!
            </button>

            <button
              onClick={() => {
                setCustomTitle('🎓 Hoàn thành! 🎓');
                setCustomMessage('Chúc mừng bạn đã hoàn thành khóa học!');
                setShowConfetti(true);
                openPopup();
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              🎓 Hoàn thành khóa học!
            </button>
          </div>
        </div>

        {/* SimpleConfetti Section */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            ✨ SimpleConfetti - Hiệu ứng từ điểm cụ thể
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vị trí X (0-1):
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={confettiOrigin.x}
                onChange={(e) => setConfettiOrigin(prev => ({ ...prev, x: parseFloat(e.target.value) }))}
                className="w-full"
              />
              <span className="text-sm text-gray-500">{confettiOrigin.x}</span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vị trí Y (0-1):
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={confettiOrigin.y}
                onChange={(e) => setConfettiOrigin(prev => ({ ...prev, y: parseFloat(e.target.value) }))}
                className="w-full"
              />
              <span className="text-sm text-gray-500">{confettiOrigin.y}</span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Góc bắn (độ):
              </label>
              <input
                type="range"
                min="0"
                max="360"
                step="10"
                value={confettiSpread}
                onChange={(e) => setConfettiSpread(parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-gray-500">{confettiSpread}°</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={triggerConfetti}
              className="bg-gradient-to-r from-pink-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              🎊 Bắn Confetti từ vị trí tùy chỉnh!
            </button>

            <button
              onClick={stopConfetti}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
            >
              ⏹️ Dừng Confetti
            </button>

            <button
              ref={buttonRef}
              onClick={fireFromButton}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              🎯 Bắn từ nút này!
            </button>
          </div>

          {/* SimpleConfetti Component */}
          <SimpleConfetti
            isActive={isSimpleConfettiActive}
            origin={confettiOrigin}
            spread={confettiSpread}
            numberOfPieces={200}
            colors={['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#9370DB', '#32CD32']}
          />
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            🚀 Hướng dẫn sử dụng
          </h2>
          
          <div className="space-y-4 text-gray-600">
            <div className="flex items-start">
              <span className="text-blue-500 font-bold mr-3">1.</span>
              <p>Component <code className="bg-gray-100 px-2 py-1 rounded">ConfettiPopup</code> sử dụng <code className="bg-gray-100 px-2 py-1 rounded">canvas-confetti</code> để bắn từ giữa modal</p>
            </div>
            
            <div className="flex items-start">
              <span className="text-blue-500 font-bold mr-3">2.</span>
              <p>Component <code className="bg-gray-100 px-2 py-1 rounded">SimpleConfetti</code> cho phép bắn từ vị trí tùy chỉnh với góc bắn linh hoạt</p>
            </div>
            
            <div className="flex items-start">
              <span className="text-blue-500 font-bold mr-3">3.</span>
              <p>Function <code className="bg-gray-100 px-2 py-1 rounded">fireConfettiFromElement()</code> bắn confetti từ element cụ thể</p>
            </div>
            
            <div className="flex items-start">
              <span className="text-blue-500 font-bold mr-3">4.</span>
              <p>Hiệu ứng firework với 3 đợt bắn liên tiếp tạo cảm giác sống động</p>
            </div>
          </div>
        </div>
      </div>

      {/* Confetti Popup */}
      <ConfettiPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        title={customTitle}
        message={customMessage}
        showConfetti={showConfetti}
      />
    </div>
  );
} 