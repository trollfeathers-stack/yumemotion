"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-purple-900/20 blur-3xl"></div>

      <nav className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-8 py-4 md:py-5 border-b border-purple-500/20 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="YumeMotion Logo"
            className="w-12 h-12 object-contain"
          />

          <div>
            <h1 className="text-2xl font-bold">YumeMotion</h1>
            <p className="text-xs text-gray-400">Terms of Service</p>
          </div>
        </Link>

        <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          <Link href="/pricing">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all">
              Pricing
            </button>
          </Link>

          <Link href="/contact">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all">
              Contact
            </button>
          </Link>

          <Link href="/signup">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all shadow-lg shadow-purple-500/30">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 px-6 md:px-12 py-14">
        <section className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-6">
            Legal
          </div>

          <h2 className="text-5xl md:text-6xl font-black">
            Terms of Service
          </h2>

          <p className="text-gray-400 mt-4">
            Last updated: 2026
          </p>

          <div className="mt-10 space-y-8 rounded-3xl bg-white/5 border border-purple-500/20 p-6 sm:p-10 backdrop-blur-xl text-gray-300 leading-relaxed">
            <section>
              <h3 className="text-2xl font-bold text-white mb-3">
                1. About YumeMotion
              </h3>
              <p>
                YumeMotion is an AI anime image and video creation platform. The
                current version may include prototype features, demo interfaces,
                placeholder outputs, and experimental tools.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-white mb-3">
                2. User Accounts
              </h3>
              <p>
                Users are responsible for keeping their account information safe.
                You should not share your login details with others.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-white mb-3">
                3. Credits
              </h3>
              <p>
                YumeMotion may use a credit system for anime image and video
                generation. Credit pricing, usage rules, and bonuses may change
                as the platform develops.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-white mb-3">
                4. AI Generated Content
              </h3>
              <p>
                Users are responsible for the prompts they enter and the content
                they create. Do not use YumeMotion to create harmful, illegal,
                abusive, copyrighted, or misleading content.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-white mb-3">
                5. Platform Changes
              </h3>
              <p>
                YumeMotion may change, pause, remove, or improve features at any
                time, especially while the platform is under development.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-white mb-3">
                6. Contact
              </h3>
              <p>
                For questions about these terms, contact us through the Contact
                page.
              </p>
            </section>

            <p className="text-sm text-gray-500">
              Note: This is a basic starter terms page for an early MVP and is
              not a substitute for professional legal advice.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}