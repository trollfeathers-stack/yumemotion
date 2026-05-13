"use client";

import Link from "next/link";
import { useState } from "react";

export default function GeneratePage() {
  const [type, setType] = useState<"image" | "video">("image");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [credits, setCredits] = useState(125);

  const [history, setHistory] = useState<
    { id: number; type: "image" | "video"; title: string; cost: number }[]
  >([]);

  const creditCost = type === "image" ? 1 : 5;

  function handleGenerate() {
    if (credits < creditCost) {
      alert("Not enough credits!");
      return;
    }

    setIsGenerating(true);
    setHasResult(false);

    setTimeout(() => {
      setCredits((currentCredits) => currentCredits - creditCost);

      setHistory((currentHistory) => [
        {
          id: Date.now(),
          type,
          title: type === "image" ? "Anime Image" : "Anime Video",
          cost: creditCost,
        },
        ...currentHistory,
      ]);

      setIsGenerating(false);
      setHasResult(true);
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-purple-900/20 blur-3xl"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-8 py-4 md:py-5 border-b border-purple-500/20 backdrop-blur-xl">
        <Link href="/dashboard" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="YumeMotion Logo"
            className="w-12 h-12 object-contain"
          />

          <div>
            <h1 className="text-2xl font-bold">YumeMotion</h1>
            <p className="text-xs text-gray-400">Anime Generator</p>
          </div>
        </Link>

        <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          <div className="px-4 py-2 text-sm md:text-base rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300">
            {credits} Credits
          </div>

          <Link href="/pricing">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all shadow-lg shadow-purple-500/30">
              Buy Credits
            </button>
          </Link>

          <Link href="/dashboard">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all">
              Dashboard
            </button>
          </Link>

          <Link href="/profile">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all">
              Profile
            </button>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 px-6 md:px-12 py-10">
        {/* Header */}
        <section className="rounded-3xl bg-gradient-to-r from-purple-900/40 to-pink-900/30 border border-purple-500/20 p-8 shadow-2xl shadow-purple-500/10">
          <h2 className="text-4xl md:text-5xl font-black">
            Generate Anime Content
          </h2>

          <p className="text-gray-300 mt-4 max-w-3xl">
            Create anime images, cinematic scenes, and short AI anime videos using prompts, styles, and motion effects.
          </p>
        </section>

        <section className="grid lg:grid-cols-2 gap-8 mt-10">
          {/* Left Panel */}
          <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-8 backdrop-blur-xl">
            <h3 className="text-3xl font-bold mb-6">Creation Settings</h3>

            {/* Tabs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => {
                  setType("image");
                  setHasResult(false);
                }}
                className={`rounded-2xl border p-5 text-left transition-all ${
                  type === "image"
                    ? "bg-purple-500/20 border-purple-400 shadow-lg shadow-purple-500/20"
                    : "bg-black/30 border-purple-500/20 hover:bg-purple-500/10"
                }`}
              >
                <p className="text-xl font-bold">Anime Image</p>
                <p className="text-gray-400 text-sm mt-2">1 credit</p>
              </button>

              <button
                onClick={() => {
                  setType("video");
                  setHasResult(false);
                }}
                className={`rounded-2xl border p-5 text-left transition-all ${
                  type === "video"
                    ? "bg-purple-500/20 border-purple-400 shadow-lg shadow-purple-500/20"
                    : "bg-black/30 border-purple-500/20 hover:bg-purple-500/10"
                }`}
              >
                <p className="text-xl font-bold">Anime Video</p>
                <p className="text-gray-400 text-sm mt-2">5 credits</p>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">Prompt</p>
                <textarea
                  placeholder={
                    type === "image"
                      ? "Example: Anime girl with glowing purple eyes, cyberpunk Tokyo background, cinematic lighting..."
                      : "Example: Anime boy walking through Tokyo rain, slow camera movement, neon lights, emotional scene..."
                  }
                  className="w-full h-44 bg-black/40 border border-purple-500/20 rounded-2xl p-5 outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {type === "video" && (
                <div>
                  <p className="text-gray-400 text-sm mb-2">
                    Upload Image For Image-To-Video
                  </p>

                  <div className="rounded-2xl bg-black/40 border border-dashed border-purple-500/30 p-8 text-center">
                    <p className="text-4xl mb-4">📤</p>
                    <p className="font-bold">Upload anime image</p>
                    <p className="text-gray-400 text-sm mt-2">
                      Later this will let users upload an image and turn it into video.
                    </p>

                    <button className="mt-5 px-6 py-3 rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all">
                      Choose Image
                    </button>
                  </div>
                </div>
              )}

              <div>
                <p className="text-gray-400 text-sm mb-2">Anime Style</p>

                <select className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500">
                  <option>Cyberpunk Anime</option>
                  <option>Dark Fantasy Anime</option>
                  <option>Romantic Anime</option>
                  <option>Action Shonen Anime</option>
                  <option>Studio Cinematic Anime</option>
                </select>
              </div>

              {type === "video" && (
                <div>
                  <p className="text-gray-400 text-sm mb-2">Motion / Effects</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Camera Movement",
                      "Rain Effect",
                      "Energy Aura",
                      "Walking Scene",
                      "Slow Zoom",
                      "Neon Glow",
                    ].map((effect) => (
                      <label
                        key={effect}
                        className="flex items-center gap-3 rounded-2xl bg-black/30 border border-purple-500/20 px-4 py-4 cursor-pointer hover:bg-purple-500/10"
                      >
                        <input type="checkbox" />
                        <span>{effect}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Credit Cost */}
              <div className="rounded-2xl bg-black/40 border border-purple-500/20 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-gray-400">Estimated Cost</p>

                  <p className="text-2xl font-black text-purple-300">
                    {creditCost} {creditCost === 1 ? "Credit" : "Credits"}
                  </p>
                </div>

                <p className="text-sm text-gray-400 mt-3">
                  After generation:{" "}
                  {credits - creditCost >= 0 ? credits - creditCost : 0} Credits
                </p>
              </div>

              {credits <= 10 && (
                <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-5">
                  <p className="font-bold text-red-300">Low credits warning</p>
                  <p className="text-gray-400 text-sm mt-2">
                    You are running low on credits. Upgrade your plan or buy more credits to continue generating.
                  </p>

                  <Link href="/pricing">
                    <button className="mt-4 px-5 py-3 rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-all">
                      View Pricing
                    </button>
                  </Link>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition-all font-semibold shadow-lg shadow-purple-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isGenerating
                  ? "Generating..."
                  : type === "image"
                  ? "Generate Anime Image"
                  : "Generate Anime Video"}
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-8 backdrop-blur-xl">
            <h3 className="text-3xl font-bold mb-6">Output Preview</h3>

            <div className="h-[520px] rounded-3xl bg-black/50 border border-purple-500/20 flex flex-col items-center justify-center text-center p-8">
              {isGenerating ? (
                <>
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-4xl shadow-lg shadow-purple-500/30 animate-pulse">
                    ⚡
                  </div>

                  <h4 className="text-3xl font-bold mt-8">
                    Generating your anime {type}...
                  </h4>

                  <p className="text-gray-400 mt-4 max-w-sm">
                    Creating cinematic anime visuals. This is a preview loading animation until AI APIs are connected.
                  </p>

                  <div className="w-full max-w-sm h-3 bg-black/50 rounded-full overflow-hidden mt-8">
                    <div className="h-full w-2/3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
                  </div>
                </>
              ) : hasResult ? (
                <>
                  <div className="w-full h-72 rounded-3xl bg-gradient-to-br from-purple-900/70 to-pink-900/40 border border-purple-500/20 flex items-center justify-center text-6xl shadow-lg shadow-purple-500/20">
                    {type === "image" ? "🎨" : "🎬"}
                  </div>

                  <h4 className="text-3xl font-bold mt-8">
                    Anime {type} generated successfully
                  </h4>

                  <p className="text-gray-400 mt-4 max-w-sm">
                    This is a placeholder result. Later, the real AI output will appear here.
                  </p>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-4xl shadow-lg shadow-purple-500/30">
                    {type === "image" ? "🎨" : "🎬"}
                  </div>

                  <h4 className="text-3xl font-bold mt-8">
                    Your anime {type} will appear here
                  </h4>

                  <p className="text-gray-400 mt-4 max-w-sm">
                    After connecting AI APIs later, generated anime{" "}
                    {type === "image" ? "images" : "videos"} will show here.
                  </p>
                </>
              )}

              <div className="mt-8 flex gap-4">
                <button className="px-6 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-gray-400">
                  Download
                </button>

                <button className="px-6 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-gray-400">
                  Share
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="mt-10 rounded-3xl bg-white/5 border border-purple-500/20 p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-3xl font-bold">Recent Creations</h3>
              <p className="text-gray-400 mt-2">
                Your generated anime images and videos will appear here.
              </p>
            </div>

            {history.length > 0 && (
              <button
                onClick={() => setHistory([])}
                className="px-5 py-3 rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all"
              >
                Clear History
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="mt-8 rounded-2xl bg-black/40 border border-purple-500/20 p-8 text-center">
              <p className="text-4xl mb-4">🌙</p>
              <h4 className="text-2xl font-bold">No creations yet</h4>
              <p className="text-gray-400 mt-2">
                Generate your first anime image or video to see it here.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-black/40 border border-purple-500/20 p-5"
                >
                  <div className="h-44 rounded-xl bg-gradient-to-br from-purple-900/60 to-pink-900/30 flex items-center justify-center text-5xl">
                    {item.type === "image" ? "🎨" : "🎬"}
                  </div>

                  <h4 className="font-bold mt-4">{item.title}</h4>

                  <p className="text-gray-400 text-sm mt-2">
                    Generated successfully • {item.cost}{" "}
                    {item.cost === 1 ? "credit" : "credits"} used
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}