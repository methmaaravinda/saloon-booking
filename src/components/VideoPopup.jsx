import { useState, useRef, useEffect } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import mainHairVideo from '../assets/main_hair_video.mp4';

const VideoPopup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try to play with sound (autoplay)
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // If autoplay with sound fails, try muted autoplay
        video.muted = true;
        video.play().catch((error) => {
          console.log('Autoplay prevented:', error);
        });
      });
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleVideoEnd = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="w-1/2 py-4 px-4 flex items-center justify-center bg-white">
      {/* Video Container with proper padding */}
      <div className="relative w-full max-w-4xl">
        {/* Close Button - Top Right */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 z-10 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
          aria-label="Close video"
        >
          <IoCloseCircle size={32} color="black" />
        </button>

        {/* Video */}
        <video
          ref={videoRef}
          src={mainHairVideo}
          autoPlay
          playsInline
          onEnded={handleVideoEnd}
          className="w-full h-auto rounded-lg shadow-xl object-contain"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPopup;

