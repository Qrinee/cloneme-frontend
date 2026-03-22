import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import g1 from '../assets/girls/1.png';
import g2 from '../assets/girls/2.png';
import g3 from '../assets/girls/3.png';
import g4 from '../assets/girls/4.png';
import g5 from '../assets/girls/5.png';
import { ChevronUp, ChevronDown, Send } from 'lucide-react';

// Mock video data for AI dating platform
const mockProfiles = [
  { id: 1, name: "Sophia", age: 22, location: "Paris", tags: ["Calm", "Sweet", "Student"], image: g1, video: null },
  { id: 2, name: "Emma", age: 24, location: "London", tags: ["Dominant", "Mature", "Professional"], image: g2, video: null },
  { id: 3, name: "Olivia", age: 21, location: "NYC", tags: ["Playful", "Youni", "Night owl"], image: g3, video: null },
  { id: 4, name: "Isabella", age: 23, location: "Tokyo", tags: ["Kawaii", "Shy", "Mommy"], image: g4, video: null },
  { id: 5, name: "Ava", age: 25, location: "LA", tags: ["Active", "Sporty", "Fun"], image: g5, video: null },
  { id: 6, name: "Mia", age: 20, location: "Berlin", tags: ["Artistic", "Creative", "Student"], image: g1, video: null },
  { id: 7, name: "Charlotte", age: 23, location: "Sydney", tags: ["Adventurous", "Travel", "Wild"], image: g2, video: null },
  { id: 8, name: "Amelia", age: 22, location: "Dubai", tags: ["Luxury", "Model", "Confident"], image: g3, video: null },
];

export default function DiscoverPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [message, setMessage] = useState("");
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Detect mobile device
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll detection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const itemHeight = isMobile ? window.innerHeight : window.innerHeight * 0.85;
      const newIndex = Math.round(scrollTop / itemHeight);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < mockProfiles.length) {
        setCurrentIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex, isMobile]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'j') {
        scrollToIndex(currentIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        scrollToIndex(currentIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const scrollToIndex = (index) => {
    if (index < 0 || index >= mockProfiles.length) return;
    
    if (containerRef.current) {
      const itemHeight = isMobile ? window.innerHeight : window.innerHeight * 0.85;
      containerRef.current.scrollTo({
        top: index * itemHeight,
        behavior: 'smooth'
      });
    }
    setCurrentIndex(index);
  };

  const goToNext = () => {
    scrollToIndex(currentIndex + 1);
  };

  const goToPrev = () => {
    scrollToIndex(currentIndex - 1);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      window.location.href = `/chat/${mockProfiles[currentIndex].id}?msg=${encodeURIComponent(message)}`;
    }
  };

  // Container height based on device
  const containerHeight = isMobile ? 'h-[calc(100vh-64px)]' : 'h-[85vh]';

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen bg-[var(--bg-primary)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"></div>
        </div>
      </Layout>
    );
  }

  const currentProfile = mockProfiles[currentIndex];

  return (
    <Layout>
      {/* Phone container for desktop */}
      <div className={`flex justify-center ${isMobile ? '' : 'py-4'}`}>
        {/* Phone frame */}
        <div className={`
          ${isMobile ? 'w-full' : 'w-[500px]'} 
          mx-auto 
          bg-black 
          rounded-2xl 
          overflow-hidden 
          shadow-2xl
          border border-[var(--border-subtle)]
          relative
        `}>

          {/* Navigation buttons */}
          <div className="absolute top-0 left-0 right-0 z-20 flex justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent">
            <button 
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full bg-black/40 backdrop-blur-sm transition-all ${
                currentIndex === 0 
                  ? 'opacity-30 cursor-not-allowed' 
                  : 'hover:bg-black/60 hover:scale-110'
              }`}
            >
              <ChevronUp className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={goToNext}
              disabled={currentIndex === mockProfiles.length - 1}
              className={`p-2 rounded-full bg-black/40 backdrop-blur-sm transition-all ${
                currentIndex === mockProfiles.length - 1 
                  ? 'opacity-30 cursor-not-allowed' 
                  : 'hover:bg-black/60 hover:scale-110'
              }`}
            >
              <ChevronDown className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Scrollable content with snap */}
          <div 
            ref={containerRef}
            className={`${containerHeight} overflow-y-scroll snap-y snap-mandatory scroll-smooth`}
            style={{ scrollBehavior: 'smooth' }}
          >
            {mockProfiles.map((profile, index) => (
              <div
                key={profile.id}
                className={`${containerHeight} w-full relative snap-start snap-always`}
              >
                {/* Background Image/Video */}
                <div className="absolute inset-0">
                  <img 
                    src={profile.image} 
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end pb-4 px-4">
                  {/* Profile info */}
                  <div className="flex items-end gap-3 mb-3">
                    <div className="relative">
                      <img 
                        src={profile.image} 
                        alt={profile.name}
                        className="w-14 h-14 rounded-full border-2 border-white object-cover shadow-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-xl drop-shadow-lg">
                        {profile.name}, {profile.age}
                      </h3>

                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {profile.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-[#DC2626] text-white text-xs font-semibold rounded-full shadow-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Progress indicator */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                    {mockProfiles.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`w-1 rounded-full transition-all ${
                          idx === currentIndex 
                            ? 'h-5 bg-white' 
                            : idx < currentIndex 
                              ? 'h-2 bg-white/50' 
                              : 'h-2 bg-white/30'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Message input only */}
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-1 py-1">
                    <input
                      type="text"
                      value={index === currentIndex ? message : ''}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Napisz wiadomość..."
                      className="flex-1 bg-transparent text-white placeholder:text-white/50 px-4 py-2 text-sm outline-none"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className={`p-2.5 rounded-full transition-all ${
                        message.trim()
                          ? 'bg-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/90'
                          : 'bg-white/20 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {/* Scroll hint */}
                  {currentIndex === 0 && index === 0 && (
                    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce">
                      <div className="text-white/70 text-xs flex items-center gap-1">
                        <span>Przewiń w dół</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* Hide scrollbar but keep functionality */
        .overflow-y-scroll::-webkit-scrollbar {
          display: none;
        }
        .overflow-y-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </Layout>
  );
}
