import React, { useEffect, useRef, useState, useCallback } from "react";
import video1 from "../assets/examplereel.mp4";
import video2 from "../assets/examplereel.mp4";

export default function ReelScreen({ onClose }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const overlayRef = useRef(null); // Dodajemy ref dla overlay

  const reels = {
    author: "Emilia",
    tags: ["Calm", "Sweet", "Student"],
    videos: [
      { video: video1 },
      { video: video2 },
    ]
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // 🔄 Resetuj wideo przy zmianie reela
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    setProgress(0);

    const playVideo = async () => {
      if (isPlaying) {
        try {
          await video.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
        }
      }
    };

    playVideo();

    return () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, [currentIndex]);

  // ⏱️ Aktualizacja paska postępu
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration && video.duration > 0) {
        const currentProgress = (video.currentTime / video.duration) * 100;
        setProgress(currentProgress);
      }
    };

    const handleEnded = () => {
      nextReel();
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };
    
    const handlePause = () => {
      setIsPlaying(false);
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [currentIndex]);

  // ▶️ Następny reel
  const nextReel = useCallback(() => {
    setCurrentIndex(prev => 
      prev < reels.videos.length - 1 ? prev + 1 : 0
    );
  }, [reels.videos.length]);

  // ◀️ Poprzedni reel
  const prevReel = useCallback(() => {
    setCurrentIndex(prev => 
      prev > 0 ? prev - 1 : reels.videos.length - 1
    );
  }, [reels.videos.length]);

  // ⏯️ Play/Pause
  const togglePlayPause = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Play failed:", error);
        setIsPlaying(false);
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  // 🖱️ Obsługa kliknięć (swipe-like) - ZATRZYMUJEMY PROPAGACJĘ
  const handleClick = (e) => {
    e.stopPropagation(); // Zapobiega propagacji do overlay
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const width = rect.width;
    const clickPosition = x / width;

    if (clickPosition < 0.25) {
      prevReel();
    } else if (clickPosition > 0.75) {
      nextReel();
    } else {
      togglePlayPause();
    }
  };

  // 👆 Obsługa gestów dotykowych - ZATRZYMUJEMY PROPAGACJĘ
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    e.stopPropagation(); // Zapobiega propagacji do overlay
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    e.stopPropagation(); // Zapobiega propagacji do overlay
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation(); // Zapobiega propagacji do overlay
    
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextReel();
    } else if (isRightSwipe) {
      prevReel();
    } else {
      togglePlayPause();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // ⌨️ Obsługa klawiatury
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowRight':
          nextReel();
          break;
        case 'ArrowLeft':
          prevReel();
          break;
        case ' ':
          togglePlayPause();
          e.preventDefault(); // Zapobiega domyślnej akcji (scroll)
          break;
        case 'Escape':
          onClose(); // ESC zamyka reel
          break;
        default:
          return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextReel, prevReel, togglePlayPause, onClose]);

  // 🎯 Funkcja do kliknięcia w overlay (tło)
  const handleOverlayClick = (e) => {
    // Sprawdź czy kliknięto bezpośrednio w overlay, nie w jego dzieci
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div 
      ref={overlayRef} // Dodajemy ref do overlay
      className="fixed inset-0 bg-[#000000bd] flex justify-center items-center z-50 p-5"
      onClick={handleOverlayClick} // Używamy poprawnej funkcji
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-xl h-full bg-black overflow-hidden cursor-pointer rounded-lg"
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 🔘 Paski postępu */}
        <div className="absolute top-4 left-3 right-3 flex gap-2 z-10">
          {reels.videos.map((_, index) => (
            <div 
              key={index} 
              className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-100"
                style={{
                  width:
                    index < currentIndex
                      ? "100%"
                      : index === currentIndex
                      ? `${progress}%`
                      : "0%",
                }}
              />
            </div>
          ))}
        </div>

        <video
          ref={videoRef}
          key={reels.videos[currentIndex].video}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          loop={false}
          preload="metadata"
        >
          <source src={reels.videos[currentIndex].video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Author info with tags */}
        <div className="absolute bottom-20 left-4 right-4 z-10">
          <p className="font-bold text-2xl text-white drop-shadow-lg mb-2">{reels.author}</p>
          <div className="flex flex-wrap gap-1.5">
            {reels.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-[#DC2626] text-white text-xs font-semibold rounded-full shadow-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {!isPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center z-10"
            onClick={(e) => {
              e.stopPropagation(); // Zapobiega propagacji
              togglePlayPause();
            }}
          >
            <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
              <svg 
                className="w-10 h-10 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        )}

        {/* 📱 Wskazówki dotykowe */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-between px-6 pointer-events-none">
          <div className="text-white/70 text-sm text-shadow-lg">
            ← Poprzedni
          </div>
          <div className="text-white/70 text-sm text-shadow-lg">
            Następny →
          </div>
        </div>


      </div>
    </div>
  );
}