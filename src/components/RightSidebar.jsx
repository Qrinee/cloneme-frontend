import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Sparkles, Plus, Info, Lock } from "lucide-react";
import { useLayoutContext } from "./LayoutContext";

export default function RightSidebar() {
  const navigate = useNavigate();
  const { isLoggedIn } = useLayoutContext();

  const [onlineGirls, setOnlineGirls] = useState([]);
  const [allGirlfriends, setAllGirlfriends] = useState([]);
  const [recentChats, setRecentChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(false);

  // Fetch girlfriends list
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/girlfriends')
      .then(response => response.json())
      .then(data => {
        if (data.girlfriends && data.girlfriends.length > 0) {
          setAllGirlfriends(data.girlfriends);
          // Shuffle and pick 3 girls to show as active online
          const shuffled = [...data.girlfriends].sort(() => Math.random() - 0.5);
          setOnlineGirls(shuffled.slice(0, 3));
        }
      })
      .catch(err => console.error("Error fetching girlfriends:", err));
  }, []);

  // Fetch recent active chats for logged in user
  useEffect(() => {
    const fetchRecentChats = async () => {
      const token = localStorage.getItem("token");
      if (!token || !isLoggedIn) {
        setRecentChats([]);
        return;
      }
      setLoadingChats(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/chats`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.type === "success" && data.chats) {
          // Sort by updated time (newest chats first) and limit to 4
          const sorted = [...data.chats].sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
          setRecentChats(sorted.slice(0, 4));
        }
      } catch (err) {
        console.error("Error fetching recent chats:", err);
      } finally {
        setLoadingChats(false);
      }
    };

    fetchRecentChats();
  }, [isLoggedIn]);

  // Compute actual database statistics
  const getStats = () => {
    let girlsCount = 0;
    let animeCount = 0;
    let menCount = 0;

    allGirlfriends.forEach(girl => {
      const tags = girl.tags?.map(t => t.toLowerCase()) || [];
      const isMale = tags.includes("male") || tags.includes("men") || tags.includes("mężczyzna");
      const isAnime = tags.includes("anime");

      if (isMale) {
        menCount++;
      } else if (isAnime) {
        animeCount++;
      } else {
        girlsCount++;
      }
    });

    return { girlsCount, animeCount, menCount, total: allGirlfriends.length };
  };

  const stats = getStats();

  const handleChatClick = (girlId) => {
    navigate(`/jerk-off/${girlId}`);
  };

  return (
    <aside className="hidden xl:flex w-80 bg-[#0a0a0f] border-l border-white/5 h-full overflow-y-auto no-scrollbar shrink-0 flex-col gap-6 py-6 px-4">

      {/* 1. COMPANIONS ONLINE NOW */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white/20">
            Online Now
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-[#e11d48] bg-[#e11d48]/10 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48] animate-ping" />
            LIVE
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {onlineGirls.map((girl) => (
            <button
              key={girl._id || girl.id}
              onClick={() => handleChatClick(girl._id || girl.id)}
              className="w-full text-left group p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-[#e11d48]/40 hover:bg-[#e11d48]/5 active:scale-[0.98] transition-all duration-200 flex items-center gap-3 relative overflow-hidden cursor-pointer shadow-sm hover:shadow-lg hover:shadow-[#e11d48]/10"
            >
              {/* Subtle red glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#e11d48]/0 to-[#e11d48]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none rounded-2xl" />

              {/* Avatar */}
              <div className="relative shrink-0">
                <img
                  src={girl.mainPhoto ? `${import.meta.env.VITE_URL}${girl.mainPhoto}` : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                  alt={girl.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/10 group-hover:border-[#e11d48]/50 transition-all duration-200"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80';
                  }}
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0a0a0f]" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 relative z-10">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white group-hover:text-[#e11d48] transition-colors truncate">{girl.name}</h4>
                  <span className="text-[10px] text-white/40 font-semibold">{girl.age}</span>
                </div>
                <p className="text-[11px] text-white/50 group-hover:text-[#e11d48]/80 truncate mt-0.5 font-medium transition-colors">
                  {girl.tags?.[0] ? girl.tags[0].charAt(0).toUpperCase() + girl.tags[0].slice(1) : "Flirty"} · Tap to chat
                </p>
              </div>

              {/* Chat CTA — always visible, pops on hover */}
              <div className="relative z-10 shrink-0 flex items-center gap-1 bg-white/5 group-hover:bg-[#e11d48] text-white/50 group-hover:text-white px-2.5 py-1.5 rounded-xl transition-all duration-200 border border-white/10 group-hover:border-[#e11d48] text-[11px] font-black uppercase tracking-wide shadow-sm group-hover:shadow-md group-hover:shadow-[#e11d48]/30">
                <MessageCircle size={12} className="fill-current" />
                <span>Chat</span>
              </div>
            </button>
          ))}

          {onlineGirls.length === 0 && (
            <div className="text-center py-4 text-white/20 text-xs font-bold">
              Loading online AI...
            </div>
          )}
        </div>
      </div>

      {/* 2. REAL USER RECENT CHATS */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white/20 px-1">
          My Chats
        </span>

        {isLoggedIn ? (
          <div className="flex flex-col gap-2">
            {loadingChats ? (
              <div className="text-center py-6 text-white/20 text-xs font-bold">
                Loading chats...
              </div>
            ) : recentChats.length > 0 ? (
              recentChats.map((chat) => {
                const companion = chat.chatbotId;
                if (!companion) return null;
                const lastMsg = chat.messages && chat.messages.length > 0
                  ? chat.messages[chat.messages.length - 1].content
                  : "Start chatting...";

                return (
                  <button
                    key={chat._id}
                    onClick={() => handleChatClick(companion._id || companion.id)}
                    className="w-full text-left group p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-[#e11d48]/40 hover:bg-[#e11d48]/5 active:scale-[0.98] transition-all duration-200 flex items-center gap-3 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-[#e11d48]/10"
                  >
                    <div className="relative shrink-0">
                      <img
                        src={companion.mainPhoto ? `${import.meta.env.VITE_URL}${companion.mainPhoto}` : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                        alt={companion.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white/10 group-hover:border-[#e11d48]/50 transition-all duration-200"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80';
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white group-hover:text-[#e11d48] transition-colors truncate">
                        {companion.name}
                      </h4>
                      <p className="text-[10px] text-white/40 truncate mt-0.5 font-medium leading-none">
                        {lastMsg}
                      </p>
                    </div>

                    <MessageCircle size={14} className="shrink-0 text-white/20 group-hover:text-[#e11d48] transition-colors" />
                  </button>
                );
              })
            ) : (
              <div className="text-center py-6 px-4 bg-white/5 border border-white/5 rounded-2xl text-white/30 text-xs font-semibold leading-relaxed">
                No recent chats. Start a conversation with someone from the list!
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center gap-3">
            <Lock size={18} className="text-white/20" />
            <p className="text-[10px] text-white/40 leading-relaxed font-bold">
              Log in to save your chat history and access it quickly.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer active:scale-95"
            >
              Log In
            </button>
          </div>
        )}
      </div>

      {/* 3. QUICK AI CREATOR CTA */}
      <div className="flex flex-col gap-2.5">
        <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white/20 px-1">
          Creator
        </span>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-[#e11d48]/10 border border-amber-500/20 relative overflow-hidden group">
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#e11d48]/10 rounded-full blur-lg group-hover:scale-125 transition-transform duration-500" />

          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider">Your Own AI Companion</span>
          </div>

          <h4 className="text-xs font-bold text-white mb-1">Create your dream companion</h4>
          <p className="text-[10px] text-white/40 leading-relaxed font-medium mb-3">
            Design a unique character with their own personality, appearance, and behavior.
          </p>

          <button
            onClick={() => navigate('/create-girl')}
            className="w-full py-2 bg-[#e11d48] hover:bg-[#be123c] text-white text-[10px] font-black uppercase text-center rounded-xl transition-all cursor-pointer border-none shadow-md shadow-[#e11d48]/15 active:scale-95 flex items-center justify-center gap-1"
          >
            <Plus size={12} /> Create AI Now
          </button>
        </div>
      </div>

    </aside>
  );
}
