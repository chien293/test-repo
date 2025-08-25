'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FairnessPopup from "./components/FairnessPopup";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold mb-4">React 19 + Next.js 15</h1>
          <p className="text-lg text-gray-600 mb-6">
            Khám phá các tính năng mới của React 19 và Next.js 15
          </p>
        </div>

        {/* Fairness Popup Button */}
        <button
          onClick={() => setIsPopupOpen(true)}
          className="px-6 py-3 bg-[#0f3460] hover:bg-[#16213e] text-white rounded-lg font-medium transition-colors mb-4"
        >
          Mở Fairness Popup
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
          <Link
            href="/hooks-demo"
            className="p-6 border-2 border-blue-200 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <h3 className="text-xl font-bold mb-2 text-blue-800">React 19 Hooks Demo</h3>
            <p className="text-sm text-gray-600">
              Khám phá các hooks mới như use(), useActionState, useFormState
            </p>
          </Link>
          
          <Link
            href="/advanced-hooks"
            className="p-6 border-2 border-green-200 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
          >
            <h3 className="text-xl font-bold mb-2 text-green-800">Advanced Hooks</h3>
            <p className="text-sm text-gray-600">
              useTransition, useDeferredValue, useOptimistic và Server Actions
            </p>
          </Link>

          <Link
            href="/confetti-demo"
            className="p-6 border-2 border-pink-200 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors"
          >
            <h3 className="text-xl font-bold mb-2 text-pink-800">🎊 Confetti Popup Demo</h3>
            <p className="text-sm text-gray-600">
              Trải nghiệm popup chúc mừng với hiệu ứng confetti đẹp mắt
            </p>
          </Link>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Next.js Docs
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://react.dev/blog/2024/02/15/react-labs-what-we-have-been-working-on-february-2024"
            target="_blank"
            rel="noopener noreferrer"
          >
            React 19 Docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Link
          href="/hooks-demo"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Hooks Demo
        </Link>
        <Link
          href="/advanced-hooks"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Advanced Hooks
        </Link>
        <Link
          href="/confetti-demo"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Confetti icon"
            width={16}
            height={16}
          />
          Confetti Demo
        </Link>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Next.js →
        </a>
      </footer>

      {/* Fairness Popup */}
      <FairnessPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </div>
  );
}
