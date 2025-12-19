import React, { useState } from 'react';

// Demo logo
const main_logo = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop";

// Version 1: Dark Slate with Gold Shimmer
function HeaderVersion1() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700 shadow-xl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Italiana&family=Poppins:wght@400;500&display=swap');
        @keyframes goldShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .gold-shimmer {
          background: linear-gradient(90deg, #fbbf24 0%, #fef3c7 50%, #fbbf24 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: goldShimmer 2.5s ease-in-out infinite;
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-semibold text-white tracking-wide" style={{ fontFamily: "'Italiana', serif" }}>
            Salon Neesha
          </span>
          <span className="text-xs text-slate-400" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Powered by <span className="font-medium gold-shimmer">Skylla</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={main_logo}
            alt="Profile"
            className="w-8 h-8 rounded-full border-2 border-slate-600 hover:border-slate-500 transition-all hover:scale-105"
          />
        </div>
      </div>
    </header>
  );
}

// Version 2: Black with Pink Glow Pulse
function HeaderVersion2() {
  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-800 shadow-2xl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:wght@400;700&display=swap');
        @keyframes pinkGlow {
          0%, 100% { 
            color: #ec4899;
            text-shadow: 0 0 10px rgba(236, 72, 153, 0.8), 0 0 20px rgba(236, 72, 153, 0.5);
          }
          50% { 
            color: #f472b6;
            text-shadow: 0 0 20px rgba(244, 114, 182, 1), 0 0 30px rgba(244, 114, 182, 0.7);
          }
        }
        .pink-glow {
          animation: pinkGlow 2s ease-in-out infinite;
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <div className="flex flex-col leading-tight">
          <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Salon Neesha
          </span>
          <span className="text-xs text-gray-500 -mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Powered by <span className="font-bold pink-glow">Skylla</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={main_logo}
            alt="Profile"
            className="w-8 h-8 rounded-full ring-2 ring-pink-500 ring-offset-2 ring-offset-black hover:ring-pink-400 transition-all hover:scale-110"
          />
        </div>
      </div>
    </header>
  );
}

// Version 3: Dark Gray with Purple Gradient Flow
function HeaderVersion3() {
  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 shadow-2xl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bellefair&family=Jost:wght@400;500&display=swap');
        @keyframes purpleFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .purple-flow {
          background: linear-gradient(90deg, #a855f7, #ec4899, #8b5cf6, #a855f7);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: purpleFlow 3s ease infinite;
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: "'Bellefair', serif" }}>
            Salon Neesha
          </span>
          <span className="text-xs text-gray-400" style={{ fontFamily: "'Jost', sans-serif" }}>
            Powered by <span className="font-semibold purple-flow">Skylla</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={main_logo}
            alt="Profile"
            className="w-8 h-8 rounded-full border-2 border-purple-500 hover:border-purple-400 transition-all hover:scale-110 shadow-lg shadow-purple-500/30"
          />
        </div>
      </div>
    </header>
  );
}

// Version 4: Dark Slate with Cyan Neon
function HeaderVersion4() {
  return (
    <header className="sticky top-0 z-50 bg-slate-800 border-b border-slate-600 shadow-2xl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Lato:wght@400;700&display=swap');
        @keyframes cyanNeon {
          0%, 100% { 
            color: #06b6d4;
            text-shadow: 0 0 5px #06b6d4, 0 0 10px #06b6d4;
          }
          50% { 
            color: #67e8f9;
            text-shadow: 0 0 15px #06b6d4, 0 0 25px #06b6d4, 0 0 35px #06b6d4;
          }
        }
        .cyan-neon {
          animation: cyanNeon 1.5s ease-in-out infinite;
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-bold text-white tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
            SALON NEESHA
          </span>
          <span className="text-xs text-slate-400" style={{ fontFamily: "'Lato', sans-serif" }}>
            Powered by <span className="font-bold cyan-neon">Skylla</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={main_logo}
            alt="Profile"
            className="w-8 h-8 rounded-full border-2 border-cyan-400 hover:border-cyan-300 transition-all hover:scale-110 shadow-md"
          />
        </div>
      </div>
    </header>
  );
}

// Version 5: Black with Rainbow Shift
function HeaderVersion5() {
  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-800 shadow-2xl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500&display=swap');
        @keyframes rainbowShift {
          0% { color: #3b82f6; }
          20% { color: #8b5cf6; }
          40% { color: #ec4899; }
          60% { color: #f59e0b; }
          80% { color: #10b981; }
          100% { color: #3b82f6; }
        }
        .rainbow-shift {
          animation: rainbowShift 5s linear infinite;
          font-weight: 700;
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Salon Neesha
          </span>
          <span className="text-xs text-gray-500" style={{ fontFamily: "'Inter', sans-serif" }}>
            Powered by <span className="rainbow-shift">Skylla</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={main_logo}
            alt="Profile"
            className="w-8 h-8 rounded-full border-2 border-gray-600 hover:border-gray-500 transition-colors"
          />
        </div>
      </div>
    </header>
  );
}

// Version 6: Dark with Emerald Pulse
function HeaderVersion6() {
  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-2xl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Montserrat:wght@400;500&display=swap');
        @keyframes emeraldPulse {
          0%, 100% { 
            transform: scale(1);
            color: #10b981;
            text-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
          }
          50% { 
            transform: scale(1.08);
            color: #34d399;
            text-shadow: 0 0 15px rgba(52, 211, 153, 0.8);
          }
        }
        .emerald-pulse {
          display: inline-block;
          animation: emeraldPulse 2s ease-in-out infinite;
          font-weight: 600;
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Salon Neesha
          </span>
          <span className="text-xs text-gray-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Powered by <span className="emerald-pulse">Skylla</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={main_logo}
            alt="Profile"
            className="w-8 h-8 rounded-full border-2 border-emerald-500 hover:border-emerald-400 transition-all hover:scale-105"
          />
        </div>
      </div>
    </header>
  );
}

// Version 7: Black with Rose Gold Sparkle
function HeaderVersion7() {
  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-900 shadow-2xl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@600;700&family=Raleway:wght@400;500&display=swap');
        @keyframes roseSparkle {
          0%, 100% { 
            background-position: -200% 0;
            filter: brightness(1);
          }
          50% { 
            background-position: 200% 0;
            filter: brightness(1.3);
          }
        }
        .rose-sparkle {
          background: linear-gradient(90deg, #f43f5e 0%, #fda4af 30%, #fecdd3 50%, #fda4af 70%, #f43f5e 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: roseSparkle 3s ease-in-out infinite;
          font-weight: 700;
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-bold text-white tracking-wider" style={{ fontFamily: "'Bodoni Moda', serif" }}>
            Salon Neesha
          </span>
          <span className="text-xs text-gray-500" style={{ fontFamily: "'Raleway', sans-serif" }}>
            Powered by <span className="rose-sparkle">Skylla</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={main_logo}
            alt="Profile"
            className="w-8 h-8 rounded-full border-2 border-rose-400 hover:border-rose-300 transition-all hover:scale-110 shadow-sm"
          />
        </div>
      </div>
    </header>
  );
}

// Version 8: Dark Slate with Violet Bounce
function HeaderVersion8() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700 shadow-2xl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Quicksand:wght@500;600&display=swap');
        @keyframes violetBounce {
          0%, 100% { 
            transform: translateY(0px);
            color: #8b5cf6;
          }
          50% { 
            transform: translateY(-3px);
            color: #a78bfa;
            text-shadow: 0 3px 10px rgba(139, 92, 246, 0.6);
          }
        }
        .violet-bounce {
          display: inline-block;
          animation: violetBounce 1.5s ease-in-out infinite;
          font-weight: 600;
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <div className="flex flex-col leading-tight">
          <span className="text-2xl font-semibold text-white" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Salon Neesha
          </span>
          <span className="text-xs text-slate-400 -mt-1" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Powered by <span className="violet-bounce">Skylla</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={main_logo}
            alt="Profile"
            className="w-8 h-8 rounded-full ring-2 ring-violet-500 ring-offset-2 ring-offset-slate-900 hover:ring-violet-400 transition-all"
          />
        </div>
      </div>
    </header>
  );
}

// Demo App with Switcher
export default function App() {
  const [version, setVersion] = useState(1);

  const versions = [
    { num: 1, name: 'Gold Shimmer', desc: 'Luxury gold flowing shimmer effect', component: <HeaderVersion1 /> },
    { num: 2, name: 'Pink Glow Pulse', desc: 'Glowing pink pulse animation', component: <HeaderVersion2 /> },
    { num: 3, name: 'Purple Gradient Flow', desc: 'Smooth purple-pink gradient movement', component: <HeaderVersion3 /> },
    { num: 4, name: 'Cyan Neon', desc: 'Electric cyan neon glow', component: <HeaderVersion4 /> },
    { num: 5, name: 'Rainbow Shift', desc: 'Multi-color rainbow transition', component: <HeaderVersion5 /> },
    { num: 6, name: 'Emerald Pulse', desc: 'Growing emerald green pulse', component: <HeaderVersion6 /> },
    { num: 7, name: 'Rose Gold Sparkle', desc: 'Rose gold shimmer effect', component: <HeaderVersion7 /> },
    { num: 8, name: 'Violet Bounce', desc: 'Bouncing violet animation', component: <HeaderVersion8 /> },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {versions.find(v => v.num === version)?.component}
      
      <div className="max-w-4xl mx-auto p-6 mt-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Dark Theme Headers with Animations
        </h1>
        <p className="text-gray-400 mb-6">All 8 versions with eye-catching "Powered by Skylla" animations</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {versions.map(v => (
            <button
              key={v.num}
              onClick={() => setVersion(v.num)}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                version === v.num
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              Version {v.num}
            </button>
          ))}
        </div>

        <div className="bg-gray-900 rounded-xl p-6 shadow-xl border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-2">
            {versions.find(v => v.num === version)?.name}
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            {versions.find(v => v.num === version)?.desc}
          </p>
          
          <div className="space-y-2 text-sm text-gray-300 bg-gray-800/50 rounded-lg p-4">
            <p><strong className="text-yellow-400">Version 1:</strong> Gold shimmer - Luxury & elegance</p>
            <p><strong className="text-pink-400">Version 2:</strong> Pink glow pulse - Feminine & bold</p>
            <p><strong className="text-purple-400">Version 3:</strong> Purple gradient - Modern & dynamic</p>
            <p><strong className="text-cyan-400">Version 4:</strong> Cyan neon - Tech & futuristic</p>
            <p><strong className="text-blue-400">Version 5:</strong> Rainbow shift - Playful & vibrant</p>
            <p><strong className="text-emerald-400">Version 6:</strong> Emerald pulse - Fresh & premium</p>
            <p><strong className="text-rose-400">Version 7:</strong> Rose gold - Elegant & sophisticated</p>
            <p><strong className="text-violet-400">Version 8:</strong> Violet bounce - Fun & energetic</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-purple-900/30 rounded-lg border border-purple-700/50">
          <p className="text-sm text-purple-200">
            <strong>✨ Pro Tip:</strong> All animations are smooth, visible on dark backgrounds, and grab attention without being distracting!
          </p>
        </div>
      </div>
    </div>
  );
}