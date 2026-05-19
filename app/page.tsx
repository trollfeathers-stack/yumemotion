"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-purple-900/20 blur-3xl"></div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-8 py-4 md:py-5 border-b border-purple-500/20 backdrop-blur-xl bg-black/80">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="YumeMotion Logo"
            className="w-12 h-12 object-contain"
          />

          <div>
            <h1 className="text-2xl font-bold tracking-wide">YumeMotion</h1>
            <p className="text-xs text-gray-400">AI Anime Video Platform</p>
          </div>
        </Link>

        <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          <Link href="/pricing">
            <button className="px-4 md:px-5 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all">
              Pricing
            </button>
          </Link>

          <Link href="/login">
            <button className="px-4 md:px-5 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all">
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
        <div>
          <div className="inline-block px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-6">
            Create AI Anime Images & Videos
          </div>

          <h2 className="text-5xl md:text-7xl font-black leading-tight">
            Turn Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
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
              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all font-semibold shadow-2xl shadow-purple-500/30">
                Start Creating Free
              </button>
            </Link>

            <Link href="/generate">
              <button className="px-8 py-4 rounded-2xl border border-purple-500/30 bg-white/5 hover:bg-white/10 transition-all">
                Try Generator
              </button>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
  <div>
    <p className="text-3xl font-black">AI</p>
    <p className="text-gray-400 text-sm">Anime Creation</p>
  </div>

  <div>
    <p className="text-3xl font-black">2</p>
    <p className="text-gray-400 text-sm">Image Credits</p>
  </div>

  <div>
    <p className="text-3xl font-black">40+</p>
    <p className="text-gray-400 text-sm">Video Credits</p>
  </div>
</div>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute w-80 h-80 bg-purple-600/30 rounded-full blur-3xl"></div>

          <div className="relative bg-gradient-to-br from-purple-900/50 to-black border border-purple-500/20 rounded-3xl p-6 shadow-2xl shadow-purple-500/20 backdrop-blur-xl max-w-md">
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
          <div className="p-8 rounded-3xl bg-white/5 border border-purple-500/20 hover:scale-105 transition-all">
            <div className="text-4xl mb-4">🎨</div>
            <h4 className="text-2xl font-bold mb-4">Anime Image Generator</h4>
            <p className="text-gray-400">
              Create characters, backgrounds, facial expressions, and action poses from prompts.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-purple-500/20 hover:scale-105 transition-all">
            <div className="text-4xl mb-4">🎬</div>
            <h4 className="text-2xl font-bold mb-4">Image To Anime Video</h4>
            <p className="text-gray-400">
              Turn anime images into short cinematic videos with camera movement and effects.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-purple-500/20 hover:scale-105 transition-all">
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
        <div className="rounded-3xl bg-gradient-to-r from-purple-900/40 to-pink-900/20 border border-purple-500/20 p-10">
          <h3 className="text-4xl font-black text-center">How YumeMotion Works</h3>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="rounded-2xl bg-black/40 border border-purple-500/20 p-6">
              <p className="text-purple-300 font-bold mb-3">Step 1</p>
              <h4 className="text-2xl font-bold">Write Your Prompt</h4>
              <p className="text-gray-400 mt-3">
                Describe your anime character, world, action, mood, or cinematic scene.
              </p>
            </div>

            <div className="rounded-2xl bg-black/40 border border-purple-500/20 p-6">
              <p className="text-purple-300 font-bold mb-3">Step 2</p>
              <h4 className="text-2xl font-bold">Choose Style & Effects</h4>
              <p className="text-gray-400 mt-3">
                Select anime style, image/video type, motion effects, and creative direction.
              </p>
            </div>

            <div className="rounded-2xl bg-black/40 border border-purple-500/20 p-6">
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

          <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-7">
  <p className="text-gray-400">Anime Image</p>
  <h4 className="text-4xl font-black mt-2">2 Credits</h4>
</div>

<div className="rounded-3xl bg-white/5 border border-purple-500/20 p-7">
  <p className="text-gray-400">Photo → Anime Video</p>
  <h4 className="text-4xl font-black mt-2">40 Credits</h4>
</div>

<div className="rounded-3xl bg-white/5 border border-purple-500/20 p-7">
  <p className="text-gray-400">Text → Anime Video</p>
  <h4 className="text-4xl font-black mt-2">80 Credits</h4>
</div>

<div className="rounded-3xl bg-white/5 border border-purple-500/20 p-7">
  <p className="text-gray-400">Referral Bonus</p>
  <h4 className="text-4xl font-black mt-2">+5 Credits</h4>
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

        <div className="flex gap-6">

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
    </div>
  );
}