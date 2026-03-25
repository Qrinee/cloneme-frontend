import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import g1 from '../assets/girls/1.png';
import g2 from '../assets/girls/2.png';
import g3 from '../assets/girls/3.png';
import g4 from '../assets/girls/4.png';
import g5 from '../assets/girls/5.png';
import {
  ChevronUp,
  ChevronDown,
  Send,
  Heart,
  MessageSquare,
  Share2,
  MoreHorizontal,
  Sparkles
} from 'lucide-react';

// Mock video data for AI dating platform
const mockProfiles = [
  { id: 1, name: "Sophia", age: 22, location: "Paris", tags: ["Calm", "Sweet", "Student"], image: g1, video: null, likes: "1.2k", views: "5.4k", match: 98, bio: "Passionate about classical art and late-night philosophy." },
  { id: 2, name: "Emma", age: 24, location: "London", tags: ["Dominant", "Mature", "Professional"], image: g2, video: null, likes: "2.5k", views: "12k", match: 85, bio: "I appreciate ambition and a good sense of humor." },
  { id: 3, name: "Olivia", age: 21, location: "NYC", tags: ["Playful", "Youni", "Night owl"], image: g3, video: null, likes: "3.1k", views: "8.9k", match: 92, bio: "Let's explore the hidden gems of the city together." },
  { id: 4, name: "Isabella", age: 23, location: "Tokyo", tags: ["Kawaii", "Shy", "Mommy"], image: g4, video: null, likes: "4.2k", views: "15k", match: 95, bio: "Finding beauty in the small, everyday moments." },
  { id: 5, name: "Ava", age: 25, location: "LA", tags: ["Active", "Sporty", "Fun"], image: g5, video: null, likes: "1.8k", views: "6.2k", match: 88, bio: "Always down for an adventure or a good workout." },
  { id: 6, name: "Mia", age: 20, location: "Berlin", tags: ["Artistic", "Creative", "Student"], image: g1, video: null, likes: "958", views: "3.1k", match: 90, bio: "Creating art and looking for my next muse." },
  { id: 7, name: "Charlotte", age: 23, location: "Sydney", tags: ["Adventurous", "Travel", "Wild"], image: g2, video: null, likes: "1.5k", views: "4.7k", match: 82, bio: "Exploring the world, one sunset at a time." },
  { id: 8, name: "Amelia", age: 22, location: "Dubai", tags: ["Luxury", "Model", "Confident"], image: g3, video: null, likes: "5.6k", views: "22k", match: 97, bio: "Living a life of elegance and looking for a partner in crime." },
];

export default function DiscoverPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [message, setMessage] = useState("");
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState({});

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

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex, isMobile]);

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

  const toggleLike = (id) => {
    setIsLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Container height based on device
  const containerHeight = isMobile ? 'h-[calc(100vh-64px)]' : 'h-[85vh]';

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen bg-[#0a0a0f]">
          <div className="w-12 h-12 border-2 border-white/5 border-t-white/40 rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }


  return (
    <Layout>
      <div className="relative min-h-screen bg-[#0a0a0f] overflow-hidden flex items-center justify-center">
        {/* Background Decorative Blobs - Desktop only */}
        {!isMobile && (
          <>
            <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-[#741818]/5 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-[#741818]/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[40%] right-[15%] w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          </>
        )}

        {/* Floating background UI fragments */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-20 p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl opacity-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#741818]/20" />
                <div className="space-y-2">
                  <div className="w-24 h-2 bg-white/20 rounded-full" />
                  <div className="w-16 h-2 bg-white/10 rounded-full" />
                </div>
              </div>
              <div className="w-48 h-20 bg-white/5 rounded-2xl" />
            </div>

            <div className="absolute bottom-20 right-20 p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl opacity-20 rotate-6">
              <div className="flex gap-2 mb-4">
                {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-white/10" />)}
              </div>
              <div className="w-40 h-1 bg-white/20 rounded-full mb-2" />
              <div className="w-32 h-1 bg-white/10 rounded-full" />
            </div>
          </div>
        )}

        <div style={{ height: 'calc(100vh - 40px)' }} className={`relative z-10 flex items-center justify-center gap-6 ${isMobile ? '' : 'py-4 px-4'}`}>
          {/* Phone frame - Refined & Minimalistic */}
          <div className={`
            ${isMobile ? 'w-full' : 'w-[440px]'} 
            bg-[#0a0a0f] 
            ${isMobile ? '' : 'rounded-[3rem]'} 
            overflow-hidden 
            border border-white/5
            relative
          `}>

            {/* Scrollable content with snap */}
            <div
              ref={containerRef}
              className={`${containerHeight} overflow-y-scroll snap-y snap-mandatory no-scrollbar`}
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
                      className="w-full h-full object-cover opacity-80"
                    />
                    {/* Gradient overlay - Refined */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/20"></div>
                  </div>


                  <div className="relative h-full flex flex-col justify-end p-6 ">
                    <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-6 border border-white/5 mb-4">


                      {/* Profile info */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <img
                            src={profile.image}
                            alt={profile.name}
                            className="w-16 h-16 rounded-full border border-white/10 object-cover"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a0f]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-2xl tracking-tight">
                            {profile.name}, {profile.age}
                          </h3>
                        </div>
                      </div>

                      {/* Bio snippet */}
                      <p className="text-white/50 text-xs font-medium leading-relaxed mb-4 line-clamp-2">
                        {profile.bio}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {profile.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white/5 text-white/40 text-[9px] font-bold uppercase tracking-widest rounded-lg border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Message input area */}
                      <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-2xl p-1">
                        <input
                          type="text"
                          value={index === currentIndex ? message : ''}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Say something sweet..."
                          className="flex-1 bg-transparent text-white placeholder:text-white/20 px-5 py-3 text-sm outline-none"
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
                          className={`p-3.5 rounded-xl transition-all active:scale-95 ${message.trim()
                            ? 'bg-[#741818] text-white hover:bg-[#8d1d1d]'
                            : 'bg-white/5 text-white/10 cursor-not-allowed border border-white/5'
                            }`}
                        >
                          <Send size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Scroll hint */}
                    {currentIndex === 0 && index === 0 && (
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 animate-bounce">
                        <div className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] flex flex-col items-center gap-2">
                          <span>Scroll Down</span>
                          <ChevronDown size={14} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Vertical Progress Bar */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                    {mockProfiles.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-1 rounded-full transition-all duration-500 ${idx === currentIndex
                          ? 'h-8 bg-white'
                          : 'h-1.5 bg-white/10'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Navigation buttons */}
          {!isMobile && (
            <div className="flex flex-col gap-4">
              <button
                onClick={goToPrev}
                disabled={currentIndex === 0}
                className={`p-5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white transition-all ${currentIndex === 0
                  ? 'opacity-20 cursor-not-allowed'
                  : 'hover:bg-white/10 active:scale-90'
                  }`}
              >
                <ChevronUp size={24} />
              </button>
              <button
                onClick={goToNext}
                disabled={currentIndex === mockProfiles.length - 1}
                className={`p-5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white transition-all ${currentIndex === mockProfiles.length - 1
                  ? 'opacity-20 cursor-not-allowed'
                  : 'hover:bg-white/10 active:scale-90'
                  }`}
              >
                <ChevronDown size={24} />
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </Layout>
  );
}
