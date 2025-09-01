'use client';

import SimpleChipBox from '../components/SimpleChipBox';

export default function ChipShakerDemoPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">🎰 Chip Shaker Demo</h1>
          <p className="text-gray-300 text-lg">
            Animation lắc chip với 100 frames hình ảnh có sẵn
          </p>
        </div>
        
        <div className="grid gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              🎲 SimpleChipBox với Frame Animation
            </h2>
            <SimpleChipBox />
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">📋 Tính năng:</h3>
            <ul className="text-gray-300 space-y-2">
              <li>✅ Sử dụng 100 frames hình ảnh có sẵn</li>
              <li>✅ Animation mượt mà với 20 FPS</li>
              <li>✅ Lắc 3 lần để hoàn thành một chu kỳ</li>
              <li>✅ Progress bar hiển thị tiến độ</li>
              <li>✅ Chỉ báo số lần lắc hiện tại</li>
              <li>✅ Frame counter hiển thị frame hiện tại</li>
              <li>✅ Tự động chuyển đổi giữa SimpleChip và AnimatedChip</li>
            </ul>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">🔧 Cách sử dụng:</h3>
            <ol className="text-gray-300 space-y-2 list-decimal list-inside">
              <li>Click nút 🎲 màu vàng để bắt đầu lắc</li>
              <li>Animation sẽ chạy qua 100 frames</li>
              <li>Lặp lại 3 lần để hoàn thành</li>
              <li>Theo dõi progress bar và chỉ báo lắc</li>
              <li>Animation tự động dừng khi hoàn thành</li>
              <li>Chip sẽ hiển thị frame animation khi lắc</li>
            </ol>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">🎨 UI Elements:</h3>
            <ul className="text-gray-300 space-y-2">
              <li>🎯 <strong>Shake Button:</strong> Nút vàng với icon 🎲</li>
              <li>📊 <strong>Progress Bar:</strong> Thanh tiến độ ở dưới</li>
              <li>🔄 <strong>Shake Counter:</strong> Hiển thị "Lắc X/3"</li>
              <li>🎬 <strong>Frame Counter:</strong> Hiển thị "Frame: X/100"</li>
              <li>📱 <strong>Responsive:</strong> Tương thích mọi kích thước màn hình</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 