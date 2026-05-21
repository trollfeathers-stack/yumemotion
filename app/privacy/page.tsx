"use client";

import Link from "next/link";

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We May Collect",
      icon: "🧾",
      text: "YumeMotion may collect basic account information such as name, email address, login details, referral code usage, credit balance, and generation history when backend systems are connected.",
    },
    {
      title: "2. AI Prompts And Generated Content",
      icon: "🎨",
      text: "When users create anime images or videos, prompts and generated outputs may be processed to provide the service, improve user experience, and display creation history.",
    },
    {
      title: "3. How Information Is Used",
      icon: "⚙️",
      text: "Information may be used to manage accounts, provide AI generation features, track credits, support referrals, prevent abuse, improve platform performance, and provide customer support.",
    },
    {
      title: "4. Payments",
      icon: "💳",
      text: "Payment processing may be handled by third-party payment providers. YumeMotion should not directly store full card details when payment systems are added.",
    },
    {
      title: "5. Data Security",
      icon: "🛡️",
      text: "We aim to use reasonable technical measures to protect user data. However, no online service can guarantee complete security.",
    },
    {
      title: "6. User Choices",
      icon: "👤",
      text: "Users may request account support, data updates, or deletion options through the Contact page when backend support is available.",
    },
    {
      title: "7. Contact",
      icon: "📩",
      text: "For privacy questions, contact us through the Contact page.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -right-32 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:72px_72px]"></div>
      </div>

      <nav className="relative z-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-8 py-4 md:py-5 border-b border-purple-500/20 backdrop-blur-xl bg-black/70">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="YumeMotion Logo"
            className="w-12 h-12 object-contain transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
          />

          <div>
            <h1 className="text-2xl font-bold">YumeMotion</h1>
            <p className="text-xs text-gray-400">Privacy Policy</p>
          </div>
        </Link>

        <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          <Link href="/pricing">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:border-purple-400/60 transition-all">
              Pricing
            </button>
          </Link>

          <Link href="/contact">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:border-purple-400/60 transition-all">
              Contact
            </button>
          </Link>

          <Link href="/signup">
            <button className="relative overflow-hidden px-4 py-2 text-sm md:text-base rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all shadow-lg shadow-purple-500/30 group">
              <span className="relative z-10">Sign Up</span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
            </button>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 px-6 md:px-12 py-14">
        <section className="max-w-5xl mx-auto">
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-6 shadow-lg shadow-purple-500/10">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
              Privacy
            </div>

            <h2 className="text-5xl md:text-6xl font-black">
              Privacy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-300 animate-gradient">
                Policy
              </span>
            </h2>

            <p className="text-gray-400 mt-4">Last updated: 2026</p>

            <p className="text-gray-300 mt-6 max-w-3xl mx-auto text-lg">
              This page explains how YumeMotion may handle account information,
              prompts, generated content, credits, and support requests.
            </p>
          </div>

          <div className="mt-12 rounded-3xl bg-white/5 border border-purple-500/20 p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-purple-500/10 animate-fade-in-up">
            <div className="grid gap-6">
              {sections.map((section) => (
                <section
                  key={section.title}
                  className="rounded-2xl bg-black/40 border border-purple-500/20 p-6 hover:-translate-y-1 hover:border-purple-400/50 transition-all"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-3xl shrink-0 animate-float-small">
                      {section.icon}
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {section.title}
                      </h3>

                      <p className="text-gray-300 leading-relaxed mt-3">
                        {section.text}
                      </p>
                    </div>
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-purple-900/40 to-pink-900/20 border border-purple-500/20 p-6">
              <h3 className="text-2xl font-bold">Important Note</h3>

              <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                This is a basic starter privacy page for an early MVP and is not
                a substitute for professional legal advice. Before public launch,
                review this page with a legal professional and update it based
                on your actual APIs, payment provider, storage system, and data
                handling practices.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/terms">
                <button className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:border-purple-400/60 transition-all">
                  View Terms
                </button>
              </Link>

              <Link href="/contact">
                <button className="relative overflow-hidden w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all font-semibold shadow-lg shadow-purple-500/30 group">
                  <span className="relative z-10">Contact Support</span>
                  <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-small {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out both;
        }

        .animate-float-small {
          animation: float-small 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 250% 250%;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </div>
  );
}