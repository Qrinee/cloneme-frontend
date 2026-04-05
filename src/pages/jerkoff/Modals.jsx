import { Sparkles } from "lucide-react";

export function LevelUpNotification({ show, level }) {
  if (!show) return null;
  
  return (
    <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
      <div className="bg-[#741818] text-white px-8 py-4 rounded-[2rem] border border-white/20 flex items-center gap-4 shadow-[0_0_40px_rgba(116,24,24,0.4)]">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Sparkles size={20} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest opacity-60">Level Up!</p>
          <p className="font-bold text-lg leading-none">You reached Level {level}</p>
        </div>
      </div>
    </div>
  );
}

export function UnlockModal({ show, unlock, onClose }) {
  if (!show || !unlock) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-[#741818] to-[#0a0a0f] border border-yellow-500/30 rounded-[2rem] p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles size={40} className="text-yellow-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Content Unlocked!</h3>
        <p className="text-white/60 mb-6">{unlock.name}</p>
        
        {unlock.content && (
          <>
            {unlock.type === 'photo' ? (
              <img 
                src={unlock.content.startsWith('http') ? unlock.content : `${import.meta.env.VITE_URL}${unlock.content}`}
                alt={unlock.name}
                className="w-full h-64 object-cover rounded-2xl mb-6"
              />
            ) : unlock.type === 'video' ? (
              <video 
                src={unlock.content.startsWith('http') ? unlock.content : `${import.meta.env.VITE_URL}${unlock.content}`}
                className="w-full h-64 object-cover rounded-2xl mb-6"
                controls
              />
            ) : null}
          </>
        )}
        
        <button 
          onClick={onClose}
          className="w-full py-3 bg-white text-black font-bold rounded-xl"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}