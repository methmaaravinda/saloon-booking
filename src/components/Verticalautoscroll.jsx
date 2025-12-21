import { useEffect, useRef } from 'react';

// Reusable Vertical AutoScroll component - supports both auto-scroll AND manual scroll
export function VerticalAutoScroll({ 
  children, 
  speed = 30, 
  direction = 'down', // 'down' or 'up'
  pauseOnHover = true 
}) {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const isPausedRef = useRef(false);
  const isUserScrollingRef = useRef(false);
  const userScrollTimeoutRef = useRef(null);
  const isAutoScrollingRef = useRef(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Clone the children for seamless loop
    const content = scrollContainer.querySelector('.scroll-content-vertical');
    const clone = content.cloneNode(true);
    clone.classList.add('scroll-clone-vertical');
    scrollContainer.appendChild(clone);

    let scrollPosition = 0;
    const contentHeight = content.offsetHeight;

    const animate = () => {
      if (!isPausedRef.current && !isUserScrollingRef.current) {
        if (direction === 'down') {
          scrollPosition += speed / 60;
          if (scrollPosition >= contentHeight) {
            scrollPosition = 0;
          }
        } else {
          scrollPosition -= speed / 60;
          if (scrollPosition <= -contentHeight) {
            scrollPosition = 0;
          }
        }
        isAutoScrollingRef.current = true;
        scrollContainer.scrollTop = scrollPosition;
        requestAnimationFrame(() => {
          isAutoScrollingRef.current = false;
        });
      } else {
        // Sync scrollPosition with current scroll when paused/user scrolling
        scrollPosition = scrollContainer.scrollTop;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
    };
  }, [speed, direction]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      isPausedRef.current = true;
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      isPausedRef.current = false;
    }
  };

  const handleTouchStart = () => {
    isUserScrollingRef.current = true;
    if (userScrollTimeoutRef.current) {
      clearTimeout(userScrollTimeoutRef.current);
    }
  };

  const handleTouchEnd = () => {
    userScrollTimeoutRef.current = setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 2000);
  };

  const handleWheel = () => {
    isUserScrollingRef.current = true;
    if (userScrollTimeoutRef.current) {
      clearTimeout(userScrollTimeoutRef.current);
    }
    userScrollTimeoutRef.current = setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 2000);
  };

  const handleScroll = () => {
    // Detect manual scroll
    if (!isAutoScrollingRef.current) {
      isUserScrollingRef.current = true;
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
      userScrollTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
      }, 2000);
    }
  };

  return (
    <div
      ref={scrollRef}
      className="overflow-y-auto h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      onScroll={handleScroll}
      style={{ 
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none', 
        WebkitOverflowScrolling: 'touch',
        height: '100%'
      }}
    >
      <style>
        {`
          .scroll-content-vertical, .scroll-clone-vertical {
            display: block;
          }
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div className="scroll-content-vertical">
        {children}
      </div>
    </div>
  );
}

// Demo component showing both horizontal and vertical auto-scroll
export default function AutoScrollDemo() {
  const items = [
    { id: 1, title: 'Item 1', color: 'bg-blue-500' },
    { id: 2, title: 'Item 2', color: 'bg-purple-500' },
    { id: 3, title: 'Item 3', color: 'bg-pink-500' },
    { id: 4, title: 'Item 4', color: 'bg-orange-500' },
    { id: 5, title: 'Item 5', color: 'bg-green-500' },
    { id: 6, title: 'Item 6', color: 'bg-red-500' },
    { id: 7, title: 'Item 7', color: 'bg-indigo-500' },
    { id: 8, title: 'Item 8', color: 'bg-yellow-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-12">
        Auto-Scroll Components Demo
      </h1>

      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Horizontal Auto-Scroll */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Horizontal Auto-Scroll
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Auto-scrolls left • Pauses on hover • Manual scroll supported
          </p>
          <AutoScroll speed={50} direction="left" pauseOnHover={true}>
            <div className="flex gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`${item.color} text-white rounded-xl p-6 min-w-[200px] flex-shrink-0`}
                >
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm mt-2">Scroll horizontally</p>
                </div>
              ))}
            </div>
          </AutoScroll>
        </div>

        {/* Vertical Auto-Scroll - Slow */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Vertical Auto-Scroll (Slow Down)
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Auto-scrolls down • Speed: 20 • Pauses on hover
          </p>
          <VerticalAutoScroll speed={20} direction="down" pauseOnHover={true}>
            <div className="h-[300px] space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`${item.color} text-white rounded-xl p-6`}
                >
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm mt-2">Scroll vertically (slow)</p>
                </div>
              ))}
            </div>
          </VerticalAutoScroll>
        </div>

        {/* Vertical Auto-Scroll - Fast */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Vertical Auto-Scroll (Fast Up)
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Auto-scrolls up • Speed: 60 • Always scrolling
          </p>
          <VerticalAutoScroll speed={60} direction="up" pauseOnHover={false}>
            <div className="h-[300px] space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`${item.color} text-white rounded-xl p-6`}
                >
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm mt-2">Scroll vertically (fast)</p>
                </div>
              ))}
            </div>
          </VerticalAutoScroll>
        </div>

        {/* Side by Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Horizontal Right
            </h2>
            <AutoScroll speed={40} direction="right" pauseOnHover={true}>
              <div className="flex gap-3">
                {items.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className={`${item.color} text-white rounded-lg p-4 min-w-[150px]`}
                  >
                    <h3 className="font-bold">{item.title}</h3>
                  </div>
                ))}
              </div>
            </AutoScroll>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Vertical Down
            </h2>
            <VerticalAutoScroll speed={30} direction="down" pauseOnHover={true}>
              <div className="h-[200px] space-y-3">
                {items.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className={`${item.color} text-white rounded-lg p-4`}
                  >
                    <h3 className="font-bold">{item.title}</h3>
                  </div>
                ))}
              </div>
            </VerticalAutoScroll>
          </div>
        </div>

      </div>

      {/* Usage Guide */}
      <div className="max-w-6xl mx-auto mt-12 bg-gray-900 rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Usage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold text-green-400 mb-2">Horizontal Auto-Scroll</h3>
            <div className="bg-gray-800 rounded-lg p-4">
              <pre className="text-sm text-green-400"><code>{`import { AutoScroll } from './AutoScroll';

<AutoScroll 
  speed={50} 
  direction="left" 
  pauseOnHover={true}
>
  <div className="flex gap-4">
    {/* Your items */}
  </div>
</AutoScroll>`}</code></pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-blue-400 mb-2">Vertical Auto-Scroll</h3>
            <div className="bg-gray-800 rounded-lg p-4">
              <pre className="text-sm text-blue-400"><code>{`import { VerticalAutoScroll } from './AutoScroll';

<VerticalAutoScroll 
  speed={30} 
  direction="down" 
  pauseOnHover={true}
>
  <div className="h-[300px] space-y-4">
    {/* Your items */}
  </div>
</VerticalAutoScroll>`}</code></pre>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-bold text-yellow-400 mb-2">Props</h3>
          <ul className="space-y-2 text-sm">
            <li><code className="text-purple-400">speed</code>: Number (default: 30) - Scrolling speed</li>
            <li><code className="text-purple-400">direction</code>: 'left' | 'right' | 'up' | 'down' - Scroll direction</li>
            <li><code className="text-purple-400">pauseOnHover</code>: Boolean (default: true) - Pause when hovering</li>
          </ul>
        </div>

        <div className="mt-6 bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-bold text-red-400 mb-2">Features</h3>
          <ul className="space-y-2 text-sm">
            <li>✅ Seamless infinite loop</li>
            <li>✅ Pause on hover (optional)</li>
            <li>✅ Manual scroll support (touch & mouse wheel)</li>
            <li>✅ Auto-resume after 2 seconds of inactivity</li>
            <li>✅ No visible scrollbar</li>
            <li>✅ Smooth 60fps animation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
