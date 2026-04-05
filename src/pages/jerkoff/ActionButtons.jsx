import { Mic, Lock, Play } from "lucide-react";

const actionButtons = [
  { id: 1, label: "Open Mouth", icon: Mic, messagesNeeded: 10 },
];

export default function ActionButtons({ messages }) {
  const userMessageCount = messages.filter(m => m.sender === 'user').length;

  return (
    <div className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
      {actionButtons.map((btn) => {
        const isUnlocked = userMessageCount >= btn.messagesNeeded;

        return (
          <button
            key={btn.id}
            disabled={!isUnlocked}
            className={`w-full p-4 rounded-xl flex items-center justify-between transition-all duration-200 ${!isUnlocked
                ? 'bg-transparent text-white/10 border border-white/5'
                : 'bg-white/5 hover:bg-white/[0.08] text-white/90 border border-white/10'
              }`}
          >
            <div className="flex items-center gap-3">
              <btn.icon className={`w-4 h-4 ${isUnlocked ? 'text-white/60' : 'text-white/10'}`} />
              <span className={`text-sm font-medium tracking-tight ${!isUnlocked ? 'opacity-30' : ''}`}>
                {btn.label}
              </span>
            </div>

            <div className="flex items-center">
              {!isUnlocked ? (
                <div className="flex flex-col items-end gap-1">
                  <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/20"
                      style={{ width: `${Math.min(100, (userMessageCount / btn.messagesNeeded) * 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-[9px] text-white/20 font-bold tracking-widest uppercase">{btn.messagesNeeded - userMessageCount} to unlock</span>
                </div>
              ) : (
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="cursor-pointer p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Play className="w-3 h-3 text-white/80 fill-current" />
                </button>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}