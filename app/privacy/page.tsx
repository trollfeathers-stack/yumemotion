"use client";

import Link from "next/link";

export default function PrivacyPage() {
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
            <p className="text-xs text-gray-400">Privacy Policy</p>
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
            Privacy
          </div>

          <h2 className="text-5xl md:text-6xl font-black">
            Privacy Policy
          </h2>

          <p className="text-gray-400 mt-4">
            Last updated: 2026
          </p>

          <div className="mt-10 space-y-8 rounded-3xl bg-white/5 border border-purple-500/20 p-6 sm:p-10 backdrop-blur-xl text-gray-300 leading-relaxed">
            <section>
              <h3 className="text-2xl font-bold text-white mb-3">
                1. Information We May Collect
              </h3>
              <p>
                YumeMotion may collect basic account information such as name,
                email address, login details, referral code usage, credit balance,
                and generation history when backend systems are connected.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-white mb-3">
                2. AI Prompts And Generated Content
              </h3>
              <p>
                When users create anime images or videos, prompts and generated
                outputs may be processed to provide the service, improve user
                experience, and display creation history.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-white mb-3">
                3. How Information Is Used
              </h3>
              <p>
                Information may be used to manage accounts, provide AI generation
                features, track credits, support referrals, prevent abuse, improve
                platform performance, and provide customer support.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-white mb-3">
                4. Payments
              </h3>
              <p>
                Payment processing may be handled by third-party payment providers.
                YumeMotion should not directly store full card details when payment
                systems are added.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-white mb-3">
                5. Data Security
              </h3>
              <p>
                We aim to use reasonable technical measures to protect user data.
                However, no online service can guarantee complete security.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-white mb-3">
                6. User Choices
              </h3>
              <p>
                Users may request account support, data updates, or deletion
                options through the Contact page when backend support is available.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-white mb-3">
                7. Contact
              </h3>
              <p>
                For privacy questions, contact us through the Contact page.
              </p>
            </section>

            <p className="text-sm text-gray-500">
              Note: This is a basic starter privacy page for an early MVP and is
              not a substitute for professional legal advice.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}