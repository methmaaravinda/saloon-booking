import { useState, useRef, useEffect } from 'react';
import { IoCloseCircle, IoVolumeHigh, IoVolumeMute } from 'react-icons/io5';
import mainHairVideo from '../assets/main_hair_video.mp4';

const VideoPopup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start video muted for autoplay
    video.muted = true;
    setIsMuted(true);

    // Try to play muted (autoplay)
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log('Autoplay prevented:', error);
      });
    }
  }, []);

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  // Match description height to video height
  useEffect(() => {
    const updateDescriptionHeight = () => {
      const video = videoRef.current;
      const videoContainer = videoContainerRef.current;
      const description = descriptionRef.current;
      
      if (video && description) {
        // Measure the actual rendered video height - prefer video element, fallback to container
        const videoHeight = video.offsetHeight || (videoContainer ? videoContainer.offsetHeight : 0);
        if (videoHeight > 0) {
          // Set both height and maxHeight to ensure it matches exactly
          description.style.height = `${videoHeight}px`;
          description.style.maxHeight = `${videoHeight}px`;
          description.style.overflowY = 'auto';
        }
      }
    };

    // Update on load and when video metadata is loaded
    const video = videoRef.current;
    
    if (video) {
      const handleLoad = () => {
        // Use requestAnimationFrame to ensure DOM has updated
        requestAnimationFrame(() => {
          setTimeout(updateDescriptionHeight, 50);
        });
      };
      
      video.addEventListener('loadedmetadata', handleLoad);
      video.addEventListener('loadeddata', handleLoad);
      video.addEventListener('canplay', handleLoad);
      
      // If video is already loaded
      if (video.readyState >= 2) {
        setTimeout(updateDescriptionHeight, 100);
      }

      // Initial update with delays to allow rendering
      const timeoutId1 = setTimeout(updateDescriptionHeight, 300);
      const timeoutId2 = setTimeout(updateDescriptionHeight, 500);
      
      const resizeHandler = () => {
        setTimeout(updateDescriptionHeight, 50);
      };
      window.addEventListener('resize', resizeHandler);

      return () => {
        clearTimeout(timeoutId1);
        clearTimeout(timeoutId2);
        video.removeEventListener('loadedmetadata', handleLoad);
        video.removeEventListener('loadeddata', handleLoad);
        video.removeEventListener('canplay', handleLoad);
        window.removeEventListener('resize', resizeHandler);
      };
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleVideoEnd = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  // Bride hair cutting description
  // Groom hair cutting description
const videoDescription = (
    <div className="space-y-3 text-gray-700">
      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-1">
          🤵 Groom Haircut & Styling
        </h3>
        {/* <p className="text-sm leading-relaxed">
          Look sharp and confident on your big day with our professional groom grooming services.
        </p> */}
      </div>
  
      <ul className="space-y-1.5 text-xs">
        <li className="flex items-start gap-2">
          ✂️ <span><strong>Precision Haircut</strong> – Clean, modern styles tailored to you</span>
        </li>
        <li className="flex items-start gap-2">
          💈 <span><strong>Hair Styling</strong> – Sleek, classic, or trendy wedding looks</span>
        </li>
        <li className="flex items-start gap-2">
          🧴 <span><strong>Hair Wash & Finish</strong> – Fresh, polished final touch</span>
        </li>
        <li className="flex items-start gap-2">
          🧔 <span><strong>Beard Trim</strong> – Sharp, well-defined grooming</span>
        </li>
      </ul>
  
      <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-gray-300">
        <p className="text-xs">
          ⭐ <strong>Why Choose Us:</strong> Experienced stylists, premium products, and attention to every detail — so you look your best in every photo.
        </p>
      </div>
    </div>
  );
  

  return (
    <div className="w-full py-4 px-4 flex items-center justify-center bg-white">
      {/* Main Container - Video + Description */}
      <div className="relative w-full max-w-6xl flex gap-4 bg-white rounded-lg shadow-xl items-start static-border static-border-blue p-2">
        {/* Close Button - Top Right of Container (outside overflow) */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 z-50 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
          aria-label="Close video"
        >
          <IoCloseCircle size={32} color="black" />
        </button>

        {/* Video Section - Left Side */}
        <div ref={videoContainerRef} className="flex-shrink-0 w-1/2 relative">
          <video
            ref={videoRef}
            src={mainHairVideo}
            autoPlay
            playsInline
            muted
            onEnded={handleVideoEnd}
            className="w-full h-auto rounded-lg object-contain"
          >
            Your browser does not support the video tag.
          </video>
          
          {/* Mute/Unmute Button - Bottom Left of Video */}
          <button
            onClick={handleToggleMute}
            className="absolute bottom-2 left-2 z-20 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors backdrop-blur-sm"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <IoVolumeMute size={15} color="white" />
            ) : (
              <IoVolumeHigh size={15} color="white" />
            )}
          </button>
        </div>

        {/* Description Section - Right Side with Scrollable Content */}
        <div ref={descriptionRef} className="flex-1 bg-gray-50 rounded-lg p-4 overflow-y-auto">
          {videoDescription}
        </div>
      </div>
    </div>
  );
};

export default VideoPopup;

