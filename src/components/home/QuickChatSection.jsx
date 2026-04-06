import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flame } from "lucide-react";
import { useAuthFetch } from "@/utils/authFetch";
import { Heart, Shirt, Crown, Moon, Star, Sparkles, Flame as FlameIcon, Sun, Skull, Palette, Plane, Diamond } from "lucide-react";


export default function QuickChatSection() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [girls, setGirls] = useState();
  const authFetch = useAuthFetch();

  useEffect(() => {
    authFetch(`${import.meta.env.VITE_API_URL}/girlfriends`)
      .then(response => response.json())
      .then(data => {
        setGirls(data);
      });
  }, []);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: direction * 340, behavior: 'smooth' });
    }
  };



  return (
    <section id="girls-section" className="mb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/10 rounded-xl border border-red-500/10">
            <Flame className="text-red-500" size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Hot & Ready</h2>
            <p className="text-white/30 text-xs uppercase tracking-widest font-bold mt-1">Direct from the community</p>
          </div>
        </div>
        <span className="text-green-500/80 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          {girls && girls.girlfriends && girls.girlfriends.length} Girls Live Now
        </span>
      </div>

      <div className="relative group/carousel">
        <button
          onClick={() => scrollCarousel(-1)}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/5 backdrop-blur-xl hover:bg-white/10 p-4 rounded-full text-white border border-white/10 transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:block"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-2"
        >
          {girls && girls.girlfriends && girls.girlfriends.map((girl) => (
            <div
              key={girl._id || girl.id}
              className="flex-shrink-0 w-72 rounded-3xl overflow-hidden bg-white/5 border border-white/5 transition-all duration-300 hover:border-white/10"
              onClick={() => {}}
              onMouseEnter={e => {
                const vid = e.currentTarget.querySelector('video');
                if (vid) vid.play().catch(() => { });
              }}
              onMouseLeave={e => {
                const vid = e.currentTarget.querySelector('video');
                if (vid) { vid.pause(); vid.currentTime = 0; }
              }}
            >
              <div className="relative aspect-[3/4.2]">
                <video
                  src={girl.mainVideo ? `${import.meta.env.VITE_URL}${girl.mainVideo}` : null}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 md:block hidden"
                  loop
                  muted
                  playsInline
                  preload="auto"
                />
                <img
                  src={girl.mainImage ? `${import.meta.env.VITE_URL}${girl.mainImage}` : null}
                  alt={girl.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 md:hidden"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent" />

                <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                  <span className="text-white text-[10px] font-bold uppercase tracking-widest">Live</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex flex-col gap-1 mb-4">
                    <h3 className="font-bold text-white text-2xl tracking-tight">{girl.name}, {girl.age}</h3>
                    <span className="text-white/40 text-xs font-medium uppercase tracking-widest line-clamp-2">{girl.bio?.length > 80 ? girl.bio.substring(0, 80) + '...' : girl.bio}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {girl.tags && girl.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-white/5 flex items-center gap-2">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/jerk-off/${girl._id || girl.id}`);
                    }}
                    className="cursor-pointer w-full bg-[#741818] hover:bg-[#8d1d1d] text-white py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 border border-white/5"
                  >
                    Start Session
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollCarousel(1)}
          aria-label="Scroll carousel right"
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/5 backdrop-blur-xl hover:bg-white/10 p-4 rounded-full text-white border border-white/10 transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:block"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
}