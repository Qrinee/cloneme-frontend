import { useRef, useState } from "react";
import { Heart } from "lucide-react";

export default function JerkOffVideo({ 
  girlfriend, 
  videoRef, 
  likeAnimation, 
  setLikeAnimation, 
  onAddFavorite 
}) {
  return (
    <div className="relative flex-1 rounded-none overflow-hidden w-full h-full bg-black">
      <video
        ref={videoRef}
        src={girlfriend?.mainVideo ? `${import.meta.env.VITE_URL}${girlfriend.mainVideo}` : null}
        className="h-full object-cover w-full"
        muted
        loop
        autoPlay
      />

      {/* Video Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-black/20" />

      {/* Girl Info at Top */}
      <div className="absolute top-4 left-4 right-4">
        <div className="flex items-center justify-between bg-black/20 backdrop-blur-md px-4 py-3 rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <h3 className="text-white text-base font-bold tracking-tight leading-none">{girlfriend?.name}</h3>
              <span className="text-white/40 text-[10px] uppercase tracking-tighter mt-0.5">{girlfriend?.age} Years Old</span>
            </div>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-green-500/10 border border-green-500/10 text-green-400 text-[9px] uppercase tracking-widest font-bold">
              <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
              Live
            </span>
          </div>
          <button 
            onClick={async () => {
              setLikeAnimation(true);
              setTimeout(() => setLikeAnimation(false), 600);
              onAddFavorite?.();
            }}
            className={`cursor-pointer p-2 rounded-lg transition-all text-white/40 hover:text-white/80 ${likeAnimation ? 'animate-ping' : 'hover:bg-white/5'}`}
          >
            <Heart size={16} className={likeAnimation ? 'text-red-500 fill-current' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}