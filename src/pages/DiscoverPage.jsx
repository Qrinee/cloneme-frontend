import Layout from '../components/Layout';
import { useAuthFetch } from '../utils/authFetch';
import { useNavigate } from 'react-router-dom';
import g1 from '../assets/girls/1.png';
import g2 from '../assets/girls/2.png';
import g3 from '../assets/girls/3.png';
import g4 from '../assets/girls/4.png';
import g5 from '../assets/girls/5.png';

import { useState, useRef, useEffect } from 'react';
import {
  ChevronUp,
  ChevronDown,
  Heart,
  MessageSquare,
  Share2,
  MoreHorizontal,
  Sparkles
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock video data for AI dating platform
// Mock data replaced by API
const mockProfiles = [];

export default function DiscoverPage() {
  const navigate = useNavigate();
  const authFetch = useAuthFetch();
  const [girlfriends, setGirlfriends] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
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
    const fetchGirlfriends = async () => {
      try {
        const res = await authFetch(`${import.meta.env.VITE_API_URL}/girlfriends`);
        const data = await res.json();
        if (data.type === "success") {
          setGirlfriends(data.girlfriends);
        }
      } catch (err) {
        console.error("Failed to fetch girlfriends:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGirlfriends();
  }, []);

  // Handle scroll detection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const itemHeight = isMobile ? window.innerHeight : window.innerHeight * 0.85;
      const newIndex = Math.round(scrollTop / itemHeight);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < girlfriends.length) {
        setCurrentIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex, isMobile]);

  const scrollToIndex = (index) => {
    if (index < 0 || index >= girlfriends.length) return;

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

  const toggleLike = async (id) => {
    try {
      if (isLiked[id]) {
        // Remove from favorites - we'll need to check if there's a delete endpoint
        // For now just toggle local state
        setIsLiked(prev => ({ ...prev, [id]: false }));
      } else {
        await authFetch(`${import.meta.env.VITE_API_URL}/users/favorites`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ girlfriendId: id })
        });
        setIsLiked(prev => ({ ...prev, [id]: true }));
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  // Container height based on device
  const containerHeight = isMobile ? 'h-[100dvh]' : 'h-[85vh]';

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

            {/* Scrollable container for profiles */}
            <div
              ref={containerRef}
              className={`${containerHeight} overflow-y-scroll snap-y snap-mandatory no-scrollbar`}
              style={{ scrollBehavior: 'smooth' }}
            >
              {girlfriends.map((profile, index) => (
                <div
                  key={profile._id}
                  className={`${containerHeight} w-full relative snap-start snap-always`}
                >
                  {/* Background Image/Video */}
                  <div className="absolute inset-0">
                    {profile.mainVideo ? (
                      <video
                        src={`${import.meta.env.VITE_URL}${profile.mainVideo}`}
                        className="w-full h-full object-cover opacity-80"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={profile.mainVideo ? `${import.meta.env.VITE_URL}${profile.mainVideo}` : (profile.cloneAvatarPhotoUrl ? `${import.meta.env.VITE_URL}${profile.cloneAvatarPhotoUrl}` : null)}
                        alt={profile.name}
                        className="w-full h-full object-cover opacity-80"
                      />
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/20"></div>
                  </div>

                  <div className={`relative h-full flex flex-col justify-end ${isMobile ? 'p-4 pb-32' : 'p-6'}`}>
                    <div className={`bg-white/5 backdrop-blur-2xl border border-white/5 mb-4 ${isMobile ? 'rounded-[1.5rem] p-4' : 'rounded-[2.5rem] p-6'}`}>
                      {/* Profile info */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <Avatar className="w-16 h-16 border border-white/10 object-contain">
                            <AvatarImage src={profile.mainPhoto ? `${import.meta.env.VITE_URL}${profile.mainPhoto}` : profile.cloneAvatarPhotoUrl} className="object-cover" />
                            <AvatarFallback>{profile.name?.[0]}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a0f]" />
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-white font-bold tracking-tight ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                            {profile.name}, {profile.age}
                          </h3>
                          <p className="text-[#c7c7c7] text-[10px] font-bold uppercase tracking-widest">{profile.relationship || "Stranger"}</p>
                        </div>
                      </div>

                      {/* Bio snippet */}
                      <p className="text-white/50 text-xs font-medium leading-relaxed mb-4 line-clamp-2">
                        {profile.bio}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {profile.tags?.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white/5 text-white/40 text-[9px] font-bold uppercase tracking-widest rounded-lg border border-white/5"
                          >
                            {tag.label || tag}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleLike(profile._id)}
                          className={`flex-1 p-3 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 ${isLiked[profile._id] ? 'bg-[#741818] text-white' : 'bg-white/5 text-white/40 hover:text-white/80 border border-white/5'}`}
                        >
                          <Heart size={16} fill={isLiked[profile._id] ? "currentColor" : "none"} />
                          <span className="text-xs font-bold uppercase tracking-widest">Like</span>
                        </button>
                        <button
                          onClick={() => navigate(`/chat/${profile._id}`)}
                          className="flex-[2] p-3 rounded-2xl transition-all active:scale-95 bg-[#741818] text-white hover:bg-[#8d1d1d] flex items-center justify-center gap-2"
                        >
                          <MessageSquare size={16} />
                          <span className="text-xs font-bold uppercase tracking-widest">Start Chatting</span>
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

                  {/* Vertical Progress Bar - Hide on mobile if it overlaps too much or make smaller */}
                  <div className={`absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 ${isMobile ? 'scale-75' : ''}`}>
                    {girlfriends.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-1 rounded-full transition-all duration-500 ${idx === currentIndex
                          ? (isMobile ? 'h-6 bg-white' : 'h-8 bg-white')
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
                onClick={() => { console.log('goToPrev clicked, currentIndex:', currentIndex); goToPrev(); }}
                disabled={currentIndex === 0}
                className={`p-5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white transition-all ${currentIndex === 0
                  ? 'opacity-20 cursor-not-allowed'
                  : 'hover:bg-white/10 active:scale-90'
                  }`}
              >
                <ChevronUp size={24} />
              </button>
              <button
                onClick={() => { console.log('goToNext clicked, currentIndex:', currentIndex, 'length:', girlfriends.length); goToNext(); }}
                disabled={currentIndex === girlfriends.length - 1}
                className={`p-5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white transition-all ${currentIndex === girlfriends.length - 1
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
