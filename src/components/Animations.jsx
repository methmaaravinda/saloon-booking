import React from 'react';

export default function AnimatedBorderDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center p-8">
      <style>{`
        /* Animated Border Class - Add this to any element */
        .animated-border {
          isolation: isolate;
          position: relative;
        }

        .animated-border::before {
          content: "";
          position: absolute;
          inset: -2px;
          z-index: -1;
          border-radius: inherit;
          background: conic-gradient(
            from var(--angle), 
            #381D6A 0%, 
            #E0D1FF 50%, 
            #381D6A 100%
          );
          animation: rotate 3s linear infinite;
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 2px;
        }

        /* Thicker border variants */
        .animated-border-thick::before {
          inset: -3px;
          padding: 3px;
        }

        .animated-border-extra-thick::before {
          inset: -4px;
          padding: 4px;
        }

        .animated-border:hover::before {
          animation-play-state: paused;
        }

        @property --angle {
          syntax: "<angle>";
          inherits: true;
          initial-value: 0deg;
        }

        @keyframes rotate {
          to {
            --angle: 360deg;
          }
        }

        /* Slower animation variant */
        .animated-border-slow::before {
          animation-duration: 6s;
        }

        /* Faster animation variant */
        .animated-border-fast::before {
          animation-duration: 1.5s;
        }

        /* Different color variants */
        .animated-border-blue::before {
          background: conic-gradient(
            from var(--angle), 
            #1e3a8a 0%, 
            #60a5fa 50%, 
            #1e3a8a 100%
          );
        }

        .animated-border-green::before {
          background: conic-gradient(
            from var(--angle), 
            #065f46 0%, 
            #34d399 50%, 
            #065f46 100%
          );
        }

        .animated-border-pink::before {
          background: conic-gradient(
            from var(--angle), 
            #831843 0%, 
            #f9a8d4 50%, 
            #831843 100%
          );
        }
      `}</style>

      <div className="max-w-6xl w-full space-y-8">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Animated Border Class Examples
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Example 1: Basic Card */}
          <div className="animated-border bg-slate-900 rounded-3xl p-8 transition-transform hover:scale-105">
            <h2 className="text-2xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Default
              </span> Animation
            </h2>
            <p className="text-gray-300 mb-6">
              Just add the "animated-border" class to any element. 3s rotation speed.
            </p>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">
              Click Me
            </button>
          </div>

          {/* Example 2: Slow Animation */}
          <div className="animated-border animated-border-slow bg-slate-900 rounded-3xl p-8 transition-transform hover:scale-105">
            <h2 className="text-2xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Slow
              </span> Animation
            </h2>
            <p className="text-gray-300 mb-6">
              Add "animated-border-slow" for 6s rotation. Perfect for subtle effects.
            </p>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">
              Click Me
            </button>
          </div>

          {/* Example 3: Blue Variant */}
          <div className="animated-border animated-border-blue bg-slate-900 rounded-3xl p-8 transition-transform hover:scale-105">
            <h2 className="text-2xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                Blue
              </span> Variant
            </h2>
            <p className="text-gray-300 mb-6">
              Use "animated-border-blue" for a blue color scheme.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              Click Me
            </button>
          </div>

          {/* Example 4: Green Variant */}
          <div className="animated-border animated-border-green bg-slate-900 rounded-3xl p-8 transition-transform hover:scale-105">
            <h2 className="text-2xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Green
              </span> Variant
            </h2>
            <p className="text-gray-300 mb-6">
              Use "animated-border-green" for a green color scheme.
            </p>
            <button className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
              Click Me
            </button>
          </div>

          {/* Example 5: Fast + Pink */}
          <div className="animated-border animated-border-fast animated-border-pink bg-slate-900 rounded-3xl p-8 transition-transform hover:scale-105">
            <h2 className="text-2xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
                Fast Pink
              </span> Combo
            </h2>
            <p className="text-gray-300 mb-6">
              Combine classes: "animated-border animated-border-fast animated-border-pink"
            </p>
            <button className="px-6 py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition">
              Click Me
            </button>
          </div>

          {/* Example 6: Thick Border */}
          <div className="bg-slate-900 rounded-3xl p-8 flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-bold text-white mb-2">Thick Borders</h2>
            <div className="animated-border animated-border-thick animated-border-green">
              <button className="w-full bg-white text-black py-3 px-6 rounded-lg text-sm font-semibold">
                Thick Border (3px)
              </button>
            </div>
            <div className="animated-border animated-border-extra-thick animated-border-pink">
              <button className="w-full bg-white text-black py-3 px-6 rounded-lg text-sm font-semibold">
                Extra Thick (4px)
              </button>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="animated-border bg-slate-900 rounded-3xl p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">How to Use:</h3>
          <div className="space-y-3 text-gray-300">
            <p>1. Copy the CSS from the &lt;style&gt; tag to your global CSS file</p>
            <p>2. Add the "animated-border" class to any element</p>
            <p>3. Optionally add modifier classes:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><code className="bg-slate-800 px-2 py-1 rounded">animated-border-thick</code> - Thicker border (3px)</li>
              <li><code className="bg-slate-800 px-2 py-1 rounded">animated-border-extra-thick</code> - Extra thick (4px)</li>
              <li><code className="bg-slate-800 px-2 py-1 rounded">animated-border-slow</code> - Slower animation (6s)</li>
              <li><code className="bg-slate-800 px-2 py-1 rounded">animated-border-fast</code> - Faster animation (1.5s)</li>
              <li><code className="bg-slate-800 px-2 py-1 rounded">animated-border-blue</code> - Blue color variant</li>
              <li><code className="bg-slate-800 px-2 py-1 rounded">animated-border-green</code> - Green color variant</li>
              <li><code className="bg-slate-800 px-2 py-1 rounded">animated-border-pink</code> - Pink color variant</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}