import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flame } from "lucide-react";
import { useAuthFetch } from "@/utils/authFetch";
import { useLayoutContext } from "../LayoutContext";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";


export default function QuickChatSection() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [girls, setGirls] = useState();
  const authFetch = useAuthFetch();
  const { isLoggedIn } = useLayoutContext();

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 px-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl md:text-[28px] font-black text-white tracking-tight flex items-center flex-wrap gap-2">
            <span className="text-[#e11d48]">JOIN</span>
            <span className="bg-transparent border border-white/20 rounded-xl px-3 py-1 text-sm md:text-lg uppercase tracking-wider flex items-center mt-1">LIVE</span>
            <span className="mt-1">NOW</span>
            <span className="bg-white/10 rounded-full px-2 py-0.5 text-gray-400 text-[10px] font-bold uppercase tracking-widest ml-1 mt-1">BETA</span>
          </h2>
        </div>
      </div>

      <div className="relative group/carousel">
        <button
          onClick={() => scrollCarousel(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-[#222222] hover:bg-[#333333] p-2 md:p-3 rounded-full text-white transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:block border-none shadow-xl"
        >
          <ChevronLeft size={24} />
        </button>

        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-2"
        >
          {girls && girls.girlfriends && girls.girlfriends.map((girl) => (
            <div
              key={girl._id || girl.id}
              className="flex-shrink-0 w-72 rounded-3xl overflow-hidden bg-white/5 border border-white/5 transition-all duration-300 hover:border-white/10 cursor-pointer"
              onClick={() => navigate(`/jerk-off/${girl._id || girl.id}`)}
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
                  src={girl.mainPhoto ? `${import.meta.env.VITE_URL}${girl.mainPhoto}` : null}
                  alt={girl.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 md:hidden"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span className="text-white text-[9px] font-bold uppercase tracking-wider">LIVE</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-bold text-white text-[22px] tracking-tight">{girl.name}</h3>
                    <span className="text-white/80 text-[20px] font-medium">{girl.age}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/jerk-off/${girl._id || girl.id}`);
                    }}
                    className="cursor-pointer w-full bg-[#e11d48] hover:bg-[#be123c] text-white py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2 border-none"
                  >
                    <MessageCircle size={18} fill="currentColor" className="text-white/90" />
                    Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollCarousel(1)}
          aria-label="Scroll carousel right"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-[#222222] hover:bg-[#333333] p-2 md:p-3 rounded-full text-white transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:block border-none shadow-xl"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}





