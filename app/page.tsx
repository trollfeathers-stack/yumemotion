"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex items-center justify-center px-6 py-16">
      <div className="absolute inset-0 bg-purple-900/20 blur-3xl"></div>

      <main className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <img
            src="/logo.png"
            alt="YumeMotion Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        <div className="inline-block px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-8">
          AI Anime Video Platform Coming Soon
        </div>

        <h1 className="text-5xl md:text-7xl font-black leading-tight">
          YumeMotion Is
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
            Launching Soon!
          </span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          We are building an AI anime image and video creation platform for
          anime creators, Shorts creators, editors, and future storytellers.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-6 backdrop-blur-xl">
            <p className="text-4xl mb-4">🎨</p>
            <h3 className="text-xl font-bold">Anime Images</h3>
            <p className="text-gray-400 mt-3">
              Create characters, backgrounds, expressions, and action poses.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-6 backdrop-blur-xl">
            <p className="text-4xl mb-4">🎬</p>
            <h3 className="text-xl font-bold">Anime Videos</h3>
            <p className="text-gray-400 mt-3">
              Turn anime ideas into cinematic short-form videos.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-6 backdrop-blur-xl">
            <p className="text-4xl mb-4">⚡</p>
            <h3 className="text-xl font-bold">AI Motion</h3>
            <p className="text-gray-400 mt-3">
              Add camera movement, rain, glow, and anime energy effects.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:support@yumemotion.com">
            <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all font-semibold shadow-2xl shadow-purple-500/30">
              Get in Touch
            </button>
          </a>

          <Link href="/contact">
            <button className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-purple-500/30 bg-white/5 hover:bg-white/10 transition-all">
              Contact Page 
            </button>
          </Link>
        </div>

        <p className="text-gray-500 text-sm mt-10">
          © 2026 YumeMotion. Building the future of AI anime creation.
        </p>
      </main>
    </div>
  );
}