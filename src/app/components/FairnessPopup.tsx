'use client';

import { useState } from 'react';

interface FairnessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FairnessPopup({ isOpen, onClose }: FairnessPopupProps) {
  const [provablyFairExpanded, setProvablyFairExpanded] = useState(true);
  const [provablyFairGuideExpanded, setProvablyFairGuideExpanded] = useState(false);
  const [clientSeedOption, setClientSeedOption] = useState<'random' | 'manual'>('random');
  const [clientSeedValue, setClientSeedValue] = useState('1093');
  const [manualSeedValue, setManualSeedValue] = useState('');

  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Có thể thêm toast notification ở đây
  };

  const toggleProvablyFair = () => {
    setProvablyFairExpanded(!provablyFairExpanded);
    if (provablyFairGuideExpanded) {
      setProvablyFairGuideExpanded(false);
    }
  };

  const toggleProvablyFairGuide = () => {
    setProvablyFairGuideExpanded(!provablyFairGuideExpanded);
    if (provablyFairExpanded) {
      setProvablyFairExpanded(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1a1a2e] rounded-2xl w-full max-w-md h-[800px] flex flex-col">
        {/* Header - Fixed */}
        <div className="flex justify-between items-center p-6 pb-4 flex-shrink-0">
          <h2 className="text-xl font-bold text-white">Fairness</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content - No scroll, fixed height */}
        <div className="flex-1 px-6 pb-6 overflow-hidden">
          {/* Main Content Container */}
          <div className="bg-[#2d2d3a] rounded-xl p-4 mb-6">
            {/* Provably Fair Settings Section */}
            <div className="mb-6">
              <button
                onClick={toggleProvablyFair}
                className="flex justify-between items-center w-full text-left mb-3"
              >
                <h3 className="text-lg font-semibold text-white">Provably Fair Settings</h3>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    provablyFairExpanded ? '-rotate-90' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {provablyFairExpanded && (
                <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-pink-500 scrollbar-thumb-rounded-full">
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    The final result is determined by a combination of the Server seed and the Client seed of all betting players. Player can change the client seed and check the fairness of game result from Bet history.
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Client Seed</h3>
                    
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <div className="relative">
                          <input
                            type="radio"
                            name="clientSeed"
                            value="random"
                            checked={clientSeedOption === 'random'}
                            onChange={() => setClientSeedOption('random')}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 ${
                            clientSeedOption === 'random' 
                              ? 'border-green-500 bg-green-500' 
                              : 'border-gray-400'
                          } flex items-center justify-center`}>
                            {clientSeedOption === 'random' && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <span className="text-gray-300">Random</span>
                        <input
                          type="text"
                          value={clientSeedValue}
                          onChange={(e) => setClientSeedValue(e.target.value)}
                          className="ml-auto bg-[#1a1a2e] text-white px-3 py-1 rounded border border-gray-600 w-20 text-center"
                        />
                      </label>

                      <label className="flex items-center space-x-3 cursor-pointer">
                        <div className="relative">
                          <input
                            type="radio"
                            name="clientSeed"
                            value="manual"
                            checked={clientSeedOption === 'manual'}
                            onChange={() => setClientSeedOption('manual')}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 ${
                            clientSeedOption === 'manual' 
                              ? 'border-green-500 bg-green-500' 
                              : 'border-gray-400'
                          } flex items-center justify-center`}>
                            {clientSeedOption === 'manual' && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <span className="text-gray-300">Manual input (0 - 9999)</span>
                        <input
                          type="text"
                          value={manualSeedValue}
                          onChange={(e) => setManualSeedValue(e.target.value)}
                          placeholder="0-9999"
                          className="ml-auto bg-[#1a1a2e] text-white px-3 py-1 rounded border border-gray-600 w-20 text-center"
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Server Seed SHA 256</h3>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value="10227f5722eb364df623da42sssswe69"
                        readOnly
                        className="flex-1 bg-[#1a1a2e] text-white px-3 py-2 rounded border border-gray-600 text-sm"
                      />
                      <button
                        onClick={() => copyToClipboard("10227f5722eb364df623da42sssswe69")}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        title="Copy to clipboard"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Additional content to test scroll */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Additional Information</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <p className="text-gray-300 text-sm mb-3">
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="text-gray-300 text-sm">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Provably Fair Guide Button */}
          <div className="bg-[#2d2d3a] rounded-xl p-4">
            <button
              onClick={toggleProvablyFairGuide}
              className="flex justify-between items-center w-full text-left mb-3"
            >
              <h3 className="text-lg font-semibold text-white">Provably Fair Guide</h3>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  provablyFairGuideExpanded ? '-rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {provablyFairGuideExpanded && (
              <div className="max-h-[1500px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-pink-500 scrollbar-thumb-rounded-full text-gray-300 text-sm leading-relaxed">
                <p className="mb-3">
                  This guide explains how our provably fair system works and how you can verify the fairness of each game result.
                </p>
                <p className="mb-3">
                  The system uses cryptographic hashing to ensure that game outcomes cannot be manipulated by either the player or the house.
                </p>
                <p className="mb-3">
                  You can verify any game result by using the provided seeds and our verification tool.
                </p>
                <p className="mb-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="mb-3">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p className="mb-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p className="mb-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p className="mb-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p className="mb-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p className="mb-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p className="mb-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p className="mb-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p className="mb-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p className="mb-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p className="mb-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p className="mb-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p className="mb-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p className="mb-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p className="mb-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 