"use client";

import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -right-32 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:72px_72px]"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-8 py-4 md:py-5 border-b border-purple-500/20 backdrop-blur-xl bg-black/70">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="YumeMotion Logo"
            className="w-12 h-12 object-contain transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
          />

          <div>
            <h1 className="text-2xl font-bold">YumeMotion</h1>
            <p className="text-xs text-gray-400">Contact</p>
          </div>
        </Link>

        <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          <Link href="/">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:border-purple-400/60 transition-all">
              Home
            </button>
          </Link>

          <Link href="/pricing">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:border-purple-400/60 transition-all">
              Pricing
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
        <section className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-6 shadow-lg shadow-purple-500/10">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
            Get In Touch
          </div>

          <h2 className="text-5xl md:text-6xl font-black">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-300 animate-gradient">
              YumeMotion
            </span>
          </h2>

          <p className="text-gray-300 mt-6 text-lg">
            Have questions, feedback, partnership ideas, or support requests?
            Send us a message.
          </p>
        </section>

        <section className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-14">
          {/* Contact Form */}
          <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-purple-500/20 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-purple-500/10 animate-fade-in-up">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

            <div className="relative">
              <h3 className="text-3xl font-bold mb-3">Send Message</h3>
              <p className="text-gray-400 mb-6">
                We’ll use your message to understand your request and improve
                YumeMotion.
              </p>

              <form
                action="https://formspree.io/f/mzdolzdl"
                method="POST"
                className="space-y-5"
              >
                <div>
                  <p className="text-sm text-gray-400 mb-2">Your Name</p>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                    className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">Email Address</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">Category</p>
                  <select
                    name="category"
                    className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all"
                  >
                    <option>Support</option>
                    <option>Feedback</option>
                    <option>Partnership</option>
                    <option>Billing</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">Message</p>
                  <textarea
                    name="message"
                    placeholder="Write your message..."
                    required
                    className="w-full h-40 bg-black/40 border border-purple-500/20 rounded-2xl p-5 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="relative overflow-hidden w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition-all font-semibold shadow-lg shadow-purple-500/30 group"
                >
                  <span className="relative z-10">Send Message</span>
                  <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
                </button>

                <p className="text-gray-500 text-sm text-center">
                  Your message will be sent to YumeMotion through Formspree.
                </p>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-8 backdrop-blur-xl shadow-2xl shadow-purple-500/5 hover:-translate-y-2 hover:border-pink-500/40 transition-all">
              <p className="text-4xl mb-4 animate-float-small">📩</p>
              <h3 className="text-2xl font-bold">Email</h3>
              <p className="text-gray-400 mt-3">support@yumemotion.com</p>
            </div>

            <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-8 backdrop-blur-xl shadow-2xl shadow-purple-500/5 hover:-translate-y-2 hover:border-purple-400/50 transition-all">
              <p className="text-4xl mb-4 animate-float-small">🌙</p>
              <h3 className="text-2xl font-bold">Brand</h3>
              <p className="text-gray-400 mt-3">
                AI anime image and video creation platform for creators.
              </p>
            </div>

            <div className="rounded-3xl bg-gradient-to-r from-purple-900/40 to-pink-900/20 border border-purple-500/20 p-8 shadow-2xl shadow-purple-500/10 hover:-translate-y-2 hover:border-cyan-400/40 transition-all">
              <p className="text-4xl mb-4 animate-float-small">🎁</p>
              <h3 className="text-2xl font-bold">Creators Welcome</h3>
              <p className="text-gray-300 mt-3">
                We’re building YumeMotion for anime creators, Shorts creators,
                editors, and future AI storytellers.
              </p>
            </div>

            <div className="rounded-3xl bg-black/40 border border-purple-500/20 p-8 backdrop-blur-xl hover:border-purple-400/50 transition-all">
              <h3 className="text-2xl font-bold">Best For</h3>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="rounded-xl bg-white/5 border border-purple-500/20 p-4">
                  <p className="text-2xl">🎨</p>
                  <p className="text-gray-400 text-sm mt-2">Anime artists</p>
                </div>

                <div className="rounded-xl bg-white/5 border border-purple-500/20 p-4">
                  <p className="text-2xl">🎬</p>
                  <p className="text-gray-400 text-sm mt-2">Video creators</p>
                </div>

                <div className="rounded-xl bg-white/5 border border-purple-500/20 p-4">
                  <p className="text-2xl">⚡</p>
                  <p className="text-gray-400 text-sm mt-2">Shorts editors</p>
                </div>

                <div className="rounded-xl bg-white/5 border border-purple-500/20 p-4">
                  <p className="text-2xl">🚀</p>
                  <p className="text-gray-400 text-sm mt-2">AI founders</p>
                </div>
              </div>
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