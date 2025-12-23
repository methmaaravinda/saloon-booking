import { useRef, useEffect, useState } from 'react';

export const AutoscrollHorizontal = ({ 
    children, 
    speed = 0.05, 
    style = {}, 
    className = 'flex flex-nowwrap overflow-x-auto whitespace-nowrap p-1 border border-gray-300 rounded-lg',
    isAutoScrollProp = false
}) => {
    const scrollRef = useRef(null);
    const [isAutoScroll, setIsAutoScroll] = useState(isAutoScrollProp);
    const animationIdRef = useRef(null);
    const directionRef = useRef(1); // 👈 Track direction: 1 = right, -1 = left
    const accumulatedScrollRef = useRef(0); // 👈 Track accumulated scroll for smooth slow scrolling
    
    const startAutoScroll = () => {
        if (!scrollRef.current) return;
        
        const clientWidth = scrollRef.current.clientWidth;
        const scrollWidth = scrollRef.current.scrollWidth;
        const scrollLeft = scrollRef.current.scrollLeft;
        
        // Skip if content doesn't need scrolling
        if (scrollWidth <= clientWidth) {
            animationIdRef.current = requestAnimationFrame(startAutoScroll);
            return;
        }
        
        // Accumulate small scroll increments (adjust this value to control speed)
        // 0.01 = extremely slow, 0.05 = very slow, 0.1 = slow, 0.2 = medium
        accumulatedScrollRef.current += speed * directionRef.current;
        
        // Only apply scroll when accumulated value reaches threshold (0.3px minimum for browser)
        if (Math.abs(accumulatedScrollRef.current) >= 0.3) {
            scrollRef.current.scrollLeft += accumulatedScrollRef.current;
            accumulatedScrollRef.current = 0; // Reset after applying
            
            // Check edges AFTER applying scroll (with small tolerance for subpixel issues)
            const newScrollLeft = scrollRef.current.scrollLeft;
            const maxScroll = scrollWidth - clientWidth;
            const tolerance = 1; // 1px tolerance for edge detection
            
            // Check if reached right edge
            if (newScrollLeft >= maxScroll - tolerance && directionRef.current === 1) {
                directionRef.current = -1; // Change to left
                accumulatedScrollRef.current = 0; // Reset accumulator at edge
            }
            // Check if reached left edge
            else if (newScrollLeft <= tolerance && directionRef.current === -1) {
                directionRef.current = 1; // Change to right
                accumulatedScrollRef.current = 0; // Reset accumulator at edge
            }
        }
        
        animationIdRef.current = requestAnimationFrame(startAutoScroll);
    };
    
    useEffect(() => {
        if (isAutoScroll) {
            animationIdRef.current = requestAnimationFrame(startAutoScroll);
        } else {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        }
        
        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, [isAutoScroll]);

    return (
        <div>
            <div 
                className={className} 
                style={style}
                ref={scrollRef} 
            >
                {children}
            </div>
        </div>
    );
};
