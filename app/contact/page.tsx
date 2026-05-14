"use client";

import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-purple-900/20 blur-3xl"></div>

      {/* Navbar */}
<nav className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-8 py-4 md:py-5 border-b border-purple-500/20 backdrop-blur-xl">
  <Link href="/" className="flex items-center gap-3">
    <img
      src="/logo.png"
      alt="YumeMotion Logo"
      className="w-12 h-12 object-contain"
    />

    <div>
      <h1 className="text-2xl font-bold">YumeMotion</h1>
      <p className="text-xs text-gray-400">Contact</p>
    </div>
  </Link>

  <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
    <Link href="/">
      <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all">
        Home
      </button>
    </Link>
  </div>
</nav>

      <main className="relative z-10 px-6 md:px-12 py-14">
        <section className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-6">
            Get In Touch
          </div>

          <h2 className="text-5xl md:text-6xl font-black">
            Contact YumeMotion
          </h2>

          <p className="text-gray-300 mt-6 text-lg">
            Have questions, feedback, partnership ideas, or support requests?
            Send us a message.
          </p>
        </section>

        <section className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-14">
          {/* Contact Form */}
<div className="rounded-3xl bg-white/5 border border-purple-500/20 p-6 sm:p-8 backdrop-blur-xl">
  <h3 className="text-3xl font-bold mb-6">Send Message</h3>

  <form
    action="https://formspree.io/f/mzdolzdl"
    method="POST"
    className="space-y-5"
  >
    <input
      type="text"
      name="name"
      placeholder="Your Name"
      required
      className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
    />

    <input
      type="email"
      name="email"
      placeholder="Email Address"
      required
      className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
    />

    <select
      name="category"
      className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
    >
      <option>Support</option>
      <option>Feedback</option>
      <option>Partnership</option>
      <option>Billing</option>
      <option>Other</option>
    </select>

    <textarea
      name="message"
      placeholder="Write your message..."
      required
      className="w-full h-40 bg-black/40 border border-purple-500/20 rounded-2xl p-5 outline-none focus:border-purple-500 resize-none"
    />

    <button
      type="submit"
      className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition-all font-semibold shadow-lg shadow-purple-500/30"
    >
      Send Message
    </button>

    <p className="text-gray-500 text-sm text-center">
      Your message will be sent to YumeMotion through Formspree.
    </p>
  </form>
</div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-8 backdrop-blur-xl">
              <p className="text-4xl mb-4">📩</p>
              <h3 className="text-2xl font-bold">Email</h3>
              <p className="text-gray-400 mt-3">
                support@yumemotion.com
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-8 backdrop-blur-xl">
              <p className="text-4xl mb-4">🌙</p>
              <h3 className="text-2xl font-bold">Brand</h3>
              <p className="text-gray-400 mt-3">
                AI anime image and video creation platform for creators.
              </p>
            </div>

            <div className="rounded-3xl bg-gradient-to-r from-purple-900/40 to-pink-900/20 border border-purple-500/20 p-8">
              <p className="text-4xl mb-4">🎁</p>
              <h3 className="text-2xl font-bold">Creators Welcome</h3>
              <p className="text-gray-300 mt-3">
                We’re building YumeMotion for anime creators, Shorts creators,
                editors, and future AI storytellers.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}