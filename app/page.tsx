"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -right-32 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.12),transparent_35%)]"></div>

        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-8 py-4 md:py-5 border-b border-purple-500/20 backdrop-blur-xl bg-black/80">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="YumeMotion Logo"
            className="w-12 h-12 object-contain transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
          />

          <div>
            <h1 className="text-2xl font-bold tracking-wide">YumeMotion</h1>
            <p className="text-xs text-gray-400">AI Anime Video Platform</p>
          </div>
        </Link>

        <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          <Link href="/pricing">
            <button className="px-4 md:px-5 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:border-purple-400/50 transition-all">
              Pricing
            </button>
          </Link>

          <Link href="/login">
            <button className="px-4 md:px-5 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:border-purple-400/50 transition-all">
              Login
            </button>
          </Link>

          <Link href="/signup">
            <button className="px-4 md:px-5 py-2 text-sm md:text-base rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all shadow-lg shadow-purple-500/30">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 px-6 md:px-16 pt-40 pb-24 grid md:grid-cols-2 gap-16 items-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-6 shadow-lg shadow-purple-500/10">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
            Create AI Anime Images & Videos
          </div>

          <h2 className="text-5xl md:text-7xl font-black leading-tight">
            Turn Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-300 animate-gradient">
              Anime Ideas
            </span>
            Into Motion
          </h2>

          <p className="mt-8 text-lg text-gray-300 max-w-xl leading-relaxed">
            YumeMotion helps creators generate anime characters, cinematic scenes,
            action poses, and short anime videos using AI-powered creation tools.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/signup">
              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all font-semibold shadow-2xl shadow-purple-500/30 relative overflow-hidden group">
                <span className="relative z-10">Start Creating Free</span>
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
              </button>
            </Link>

            <Link href="/generate">
              <button className="px-8 py-4 rounded-2xl border border-purple-500/30 bg-white/5 hover:bg-white/10 hover:border-purple-400/60 transition-all">
                Try Generator
              </button>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
            <div className="rounded-2xl bg-white/5 border border-purple-500/20 p-4 hover:-translate-y-1 transition-all">
              <p className="text-3xl font-black">AI</p>
              <p className="text-gray-400 text-sm">Anime Creation</p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-pink-500/20 p-4 hover:-translate-y-1 transition-all">
              <p className="text-3xl font-black">2</p>
              <p className="text-gray-400 text-sm">Image Credits</p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-cyan-500/20 p-4 hover:-translate-y-1 transition-all">
              <p className="text-3xl font-black">40+</p>
              <p className="text-gray-400 text-sm">Video Credits</p>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center animate-float">
          <div className="absolute w-80 h-80 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>

          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-3xl bg-pink-500/20 border border-pink-500/30 rotate-12 animate-float-slow"></div>
          <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-cyan-500/10 border border-cyan-500/20 animate-float-slower"></div>

          <div className="relative bg-gradient-to-br from-purple-900/50 to-black border border-purple-500/20 rounded-3xl p-6 shadow-2xl shadow-purple-500/20 backdrop-blur-xl max-w-md hover:scale-[1.02] transition-all duration-500">
            <img
              src="/mascot.png"
              alt="YumeMotion Mascot"
              className="rounded-2xl object-cover h-[420px] w-full"
            />

            <div className="mt-6">
              <h3 className="text-2xl font-bold">Dream. Animate. Create.</h3>
              <p className="text-gray-400 mt-2">
                Build cinematic anime visuals for Shorts, Reels, edits, and stories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Moving Badge Strip */}
      <section className="relative z-10 border-y border-purple-500/20 bg-white/[0.03] overflow-hidden">
        <div className="flex gap-10 whitespace-nowrap py-5 animate-marquee text-gray-300">
          <span>🎨 Anime Image Generator</span>
          <span>🖼️ Photo → Anime Video</span>
          <span>🎬 Text → Anime Video</span>
          <span>✨ Prompt Enhancer</span>
          <span>🔍 HD Upscale</span>
          <span>🧼 Background Remover</span>
          <span>🎨 Anime Image Generator</span>
          <span>🖼️ Photo → Anime Video</span>
          <span>🎬 Text → Anime Video</span>
          <span>✨ Prompt Enhancer</span>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 md:px-16 py-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h3 className="text-4xl md:text-5xl font-black">
            Everything You Need To Create Anime Content
          </h3>

          <p className="text-gray-400 mt-5">
            Start with anime images, then turn your best creations into motion with cinematic effects.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white/5 border border-purple-500/20 hover:scale-105 hover:border-pink-500/40 transition-all shadow-lg shadow-purple-500/5">
            <div className="text-4xl mb-4">🎨</div>
            <h4 className="text-2xl font-bold mb-4">Anime Image Generator</h4>
            <p className="text-gray-400">
              Create characters, backgrounds, facial expressions, and action poses from prompts.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-purple-500/20 hover:scale-105 hover:border-purple-400/50 transition-all shadow-lg shadow-purple-500/5">
            <div className="text-4xl mb-4">🎬</div>
            <h4 className="text-2xl font-bold mb-4">Image To Anime Video</h4>
            <p className="text-gray-400">
              Turn anime images into short cinematic videos with camera movement and effects.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-purple-500/20 hover:scale-105 hover:border-cyan-400/40 transition-all shadow-lg shadow-purple-500/5">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-2xl font-bold mb-4">Motion Effects</h4>
            <p className="text-gray-400">
              Add rain, energy aura, walking scenes, slow zoom, neon glow, and cinematic motion.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 px-6 md:px-16 py-20">
        <div className="rounded-3xl bg-gradient-to-r from-purple-900/40 to-pink-900/20 border border-purple-500/20 p-10 shadow-2xl shadow-purple-500/10">
          <h3 className="text-4xl font-black text-center">How YumeMotion Works</h3>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="rounded-2xl bg-black/40 border border-purple-500/20 p-6 hover:-translate-y-2 transition-all">
              <p className="text-purple-300 font-bold mb-3">Step 1</p>
              <h4 className="text-2xl font-bold">Write Your Prompt</h4>
              <p className="text-gray-400 mt-3">
                Describe your anime character, world, action, mood, or cinematic scene.
              </p>
            </div>

            <div className="rounded-2xl bg-black/40 border border-purple-500/20 p-6 hover:-translate-y-2 transition-all">
              <p className="text-purple-300 font-bold mb-3">Step 2</p>
              <h4 className="text-2xl font-bold">Choose Style & Effects</h4>
              <p className="text-gray-400 mt-3">
                Select anime style, image/video type, motion effects, and creative direction.
              </p>
            </div>

            <div className="rounded-2xl bg-black/40 border border-purple-500/20 p-6 hover:-translate-y-2 transition-all">
              <p className="text-purple-300 font-bold mb-3">Step 3</p>
              <h4 className="text-2xl font-bold">Generate & Download</h4>
              <p className="text-gray-400 mt-3">
                Create anime images or videos and use them for content, stories, or Shorts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credit System */}
      <section className="relative z-10 px-6 md:px-16 py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-4xl md:text-5xl font-black">
              Simple Credit-Based Creation
            </h3>

            <p className="text-gray-400 mt-5 text-lg">
              Start free, earn credits through referrals, and upgrade when you need more anime generations.
            </p>

            <Link href="/pricing">
              <button className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all font-semibold shadow-lg shadow-purple-500/30">
                View Pricing
              </button>
            </Link>
          </div>

          <div className="grid gap-5">
            <div className="rounded-3xl bg-gradient-to-r from-pink-500/15 to-purple-600/10 border border-pink-500/30 p-7 shadow-lg shadow-pink-500/10 hover:scale-[1.02] transition-all">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-pink-300 text-sm font-semibold">🎨 Anime Image</p>
                  <h4 className="text-4xl font-black mt-2">2 Credits</h4>
                </div>
                <span className="text-4xl">✨</span>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-r from-purple-500/15 to-blue-600/10 border border-purple-500/30 p-7 shadow-lg shadow-purple-500/10 hover:scale-[1.02] transition-all">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-purple-300 text-sm font-semibold">🖼️ Photo → Anime Video</p>
                  <h4 className="text-4xl font-black mt-2">40 Credits</h4>
                </div>
                <span className="text-4xl">🎬</span>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-r from-cyan-500/15 to-purple-600/10 border border-cyan-500/30 p-7 shadow-lg shadow-cyan-500/10 hover:scale-[1.02] transition-all">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-cyan-300 text-sm font-semibold">✍️ Text → Anime Video</p>
                  <h4 className="text-4xl font-black mt-2">80 Credits</h4>
                </div>
                <span className="text-4xl">⚡</span>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-r from-yellow-500/15 to-pink-600/10 border border-yellow-500/30 p-7 shadow-lg shadow-yellow-500/10 hover:scale-[1.02] transition-all">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-yellow-300 text-sm font-semibold">🎁 Referral Bonus</p>
                  <h4 className="text-4xl font-black mt-2">+5 Credits</h4>
                </div>
                <span className="text-4xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-6 md:px-16 py-24">
        <div className="rounded-3xl bg-gradient-to-r from-pink-900/30 to-purple-900/50 border border-purple-500/20 p-12 text-center shadow-2xl shadow-purple-500/20">
          <h3 className="text-4xl md:text-6xl font-black">
            Start Your Anime AI Studio Today
          </h3>

          <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg">
            Build anime visuals, create Shorts, test story ideas, and bring your anime imagination into motion.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link href="/signup">
              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all font-semibold shadow-lg shadow-purple-500/30">
                Create Free Account
              </button>
            </Link>

            <Link href="/pricing">
              <button className="px-8 py-4 rounded-2xl border border-purple-500/30 bg-white/5 hover:bg-white/10 transition-all">
                See Plans
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-500/20 px-6 md:px-16 py-8 text-gray-400 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© 2026 YumeMotion. All rights reserved.</p>

        <div className="flex gap-6 flex-wrap justify-center">
          <Link href="/pricing" className="hover:text-white transition-all">
            Pricing
          </Link>

          <Link href="/login" className="hover:text-white transition-all">
            Login
          </Link>

          <Link href="/signup" className="hover:text-white transition-all">
            Sign Up
          </Link>

          <Link href="/contact" className="hover:text-white transition-all">
            Contact
          </Link>

          <Link href="/terms" className="hover:text-white transition-all">
            Terms
          </Link>

          <Link href="/privacy" className="hover:text-white transition-all">
            Privacy
          </Link>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-16px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(12deg);
          }
          50% {
            transform: translateY(-20px) rotate(18deg);
          }
        }

        @keyframes float-slower {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(22px);
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

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.9s ease-out both;
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 7s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 9s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 250% 250%;
          animation: gradient 4s ease infinite;
        }

        .animate-marquee {
          animation: marquee 22s linear infinite;
        }
      `}</style>
    </div>
  );
}