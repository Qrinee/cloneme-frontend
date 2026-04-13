import { Send, Lock, Play, Unlock } from "lucide-react";

export default function ChatOverlay({ 
  messages, 
  isTyping, 
  incomingAiMessages,
  message, 
  setMessage,
  onSend,
  onKeyPress,
  isLoggedIn,
  isGuest,
  messagesRemaining,
  isLoading,
  chatContainerRef 
}) {
  return (
    <div className="fixed left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent z-20 md:absolute md:inset-x-0 md:bottom-0" style={{ bottom: 'env(safe-area-inset-bottom)', top: 'auto' }}>
      <div
        className="relative max-h-[180px] md:max-h-[320px] overflow-y-auto custom-scrollbar space-y-3 mb-4 md:mb-6 pr-2"
        ref={chatContainerRef}
      >
        {messages.map((msg, index) => {
          const isNewest = index === messages.length - 1;
          const opacity = Math.min(1, 0.6 + (index * 0.1));

          return (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : msg.sender === 'system' ? 'justify-center' : 'justify-start'} ${isNewest ? 'animate-fade-in-up' : ''}`}
            >
              {msg.sender === 'system' ? (
                <span className="text-yellow-400 text-[10px] font-bold uppercase tracking-widest bg-yellow-400/5 px-3 py-1 rounded-full border border-yellow-400/10 backdrop-blur-md" style={{ opacity }}>
                  {msg.text}
                </span>
              ) : (
                <div className={`max-w-[85%] ${msg.sender === 'user' ? 'ml-8' : 'mr-8'}`}>
                  {(msg.type === 'photo' || msg.type === 'video') ? (
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[3/4] w-48 bg-white/5">
                      {msg.isLocked && (
                        <div 
                          className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 bg-black/40 backdrop-blur-md cursor-pointer"
                          onClick={() => window.location.href = '/premium'}
                        >
                          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                            <Lock size={20} className="text-white/60" />
                          </div>
                          <button className="px-4 py-2 bg-[#741818] hover:bg-[#8d1d1d] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all">
                            Unlock
                          </button>
                        </div>
                      )}
                      {msg.type === 'photo' ? (
                        <img src={`${import.meta.env.VITE_URL}${msg.mediaUrl}`} className={`w-full h-full object-cover ${msg.isLocked ? 'blur-2xl' : ''}`} alt="Shared photo" />
                      ) : (
                        <div className="w-full h-full relative">
                          <video src={`${import.meta.env.VITE_URL}${msg.mediaUrl}`} className={`w-full h-full object-cover ${msg.isLocked ? 'blur-2xl' : ''}`} controls={!msg.isLocked} />
                          {msg.isLocked && <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><Play size={32} className="text-white/20" /></div>}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm ${msg.sender === 'user'
                          ? 'bg-[#741818] text-white border border-white/5'
                          : 'bg-white/5 backdrop-blur-xl text-white/90 border border-white/10'
                        }`}
                      style={{ opacity }}
                    >
                      {msg.text}
                      {msg.time && msg.time !== 'now' && (
                        <div className="text-[10px] opacity-30 mt-1 text-right">{msg.time}</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/5 backdrop-blur-xl border border-white/5 px-4 py-2.5 rounded-2xl rounded-bl-none">
              <div className="flex gap-1.5 px-1 py-1">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-duration:1s]" />
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-duration:1s] [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-duration:1s] [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="flex items-center gap-3 relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder={isLoggedIn ? "Message..." : "Chat with girl..."}
          className={`flex-1 bg-white/5 backdrop-blur-xl text-white px-5 py-3 rounded-full focus:outline-none border border-white/10 placeholder:text-white/20 transition-colors focus:border-white/20 ${isGuest && !isLoggedIn && messagesRemaining <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        <button
          onClick={onSend}
          className={`cursor-pointer p-3 rounded-full transition-all text-white/80 active:scale-95 ${message.trim() && !isLoading && !(isGuest && !isLoggedIn && messagesRemaining <= 0)
              ? 'bg-[#741818] hover:bg-[#8d1d1d]' 
              : 'bg-white/10 cursor-not-allowed'
            }`}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}