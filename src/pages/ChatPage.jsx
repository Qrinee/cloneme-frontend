import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Layout from "../components/Layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FaPaperPlane,
  FaImage,
  FaSmile,
  FaSearch,
  FaPlus,
  FaTrash,
  FaArrowLeft,
  FaLock,
  FaUnlock,
} from "react-icons/fa";
import { Sparkles, Lock, Star, Heart } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";
import Content from "@/components/Content";
import { useAuthFetch } from "@/utils/authFetch";

export default function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authFetch = useAuthFetch();
  const bottomRef = useRef(null);

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentChatbot, setCurrentChatbot] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatbotId, setCurrentChatbotId] = useState(null);
  
  // Relationship progression system
  const [relationshipLevel, setRelationshipLevel] = useState(1);
  const [relationshipXP, setRelationshipXP] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [unlockedContent, setUnlockedContent] = useState([]);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [newUnlock, setNewUnlock] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // XP needed per level (exponential growth)
  const xpPerLevel = (level) => Math.floor(100 * Math.pow(1.5, level - 1));
  
  // Unlockable content
  const unlockables = [
    { level: 2, name: "Private photo", icon: "📸", description: "Otrzymaj ekskluzywne zdjęcie" },
    { level: 3, name: "Filmik 15s", icon: "🎬", description: "Krótki filmik" },
    { level: 5, name: "Rozmowa wideo", icon: "📹", description: "Wideorozmowa" },
    { level: 7, name: "Intymne zdjęcia", icon: "💕", description: "Prywatna galeria" },
    { level: 10, name: "Ekskluzywny content", icon: "👑", description: "Dostęp do specjalnych scenariuszy" },
  ];
  
  // Add XP after sending message
  const addXP = (amount) => {
    const newXP = relationshipXP + amount;
    const xpNeeded = xpPerLevel(relationshipLevel);
    
    if (newXP >= xpNeeded) {
      // Level up!
      setRelationshipXP(newXP - xpNeeded);
      const newLevel = relationshipLevel + 1;
      setRelationshipLevel(newLevel);
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
      
      // Check for new unlockables
      const unlocked = unlockables.find(u => u.level === newLevel);
      if (unlocked) {
        setNewUnlock(unlocked);
        setShowUnlockModal(true);
        setUnlockedContent(prev => [...prev, unlocked]);
        setTimeout(() => setShowUnlockModal(false), 4000);
      }
    } else {
      setRelationshipXP(newXP);
    }
  };

  useEffect(() => {
    fetchMyChats();
  }, []);

  useEffect(() => {
    if (id) fetchChatMessages(id);
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMyChats = async () => {
    const res = await authFetch(`${import.meta.env.VITE_URL}/api/chats`);
    const data = await res.json();
    if (data.type === "success") {
      setChats(
        data.chats.map((c) => ({
          _id: c.chatbotId?._id || c.chatbotId,
          chatId: c._id,
          chatbotId: c.chatbotId?._id || c.chatbotId,
          name: c.chatbotId?.name,
          avatar: c.chatbotId?.mainPhoto,
          age: c.chatbotId?.age,
          bio: c.chatbotId?.bio,
          lastMessage: c.messages?.at(-1)?.content || "",
        }))
      );
    }
  };

  const fetchChatMessages = async (chatbotId) => {
    // Use chatbotId to get or create chat with initial message
    console.log('=== FETCH MESSAGES DEBUG ===');
    console.log('Fetching messages for chatbotId:', chatbotId);
    console.log('URL:', `${import.meta.env.VITE_URL}/api/chats/${chatbotId}`);
    
    const res = await authFetch(
      `${import.meta.env.VITE_URL}/api/chats/${chatbotId}`
    );
    console.log('Response status:', res.status);
    const data = await res.json();
    console.log('Response data:', data);
    
    if (data.type === "success") {
      setMessages(
        data.chat.messages.map((m) => ({
          id: m._id,
          text: m.content,
          sender: m.role === "user" ? "me" : "them",
        }))
      );
      // Store chatbot data for avatar display
      if (data.chatbot) {
        setCurrentChatbot({
          _id: data.chatbot._id,
          name: data.chatbot.name,
          avatar: data.chatbot.mainPhoto,
          age: data.chatbot.age,
          bio: data.chatbot.bio,
        });
      }
    } else {
      console.error('Error fetching chat:', data.message);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    // Use id directly as chatbotId
    const chatbotId = id;
    
    if (!chatbotId) {
      console.error('No chatbotId found');
      return;
    }

    const text = newMessage;
    setNewMessage("");

    setMessages((p) => [...p, { id: Date.now(), text, sender: "me" }]);
    setIsLoading(true);

    try {
      const res = await authFetch(
        `${import.meta.env.VITE_URL}/api/chats/${chatbotId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: { content: text } }),
        }
      );

      if (res.status === 403) {
        setOpen(true);
        setMessages([]);
        return;
      }

      const data = await res.json();
      if (data.type === "success") {
        const reply = data.chat.messages.at(-1);
        setMessages((p) => [
          ...p,
          { id: reply._id, text: reply.content, sender: "them" },
        ]);
      }
    } finally {
      setIsLoading(false);
      // Add XP for sending a message
      addXP(10);
    }
  };

  const handleDeleteChat = async () => {
    if (!id) return;
    if (!confirm("Delete this chat?")) return;

    // Use id directly as chatbotId
    await authFetch(`${import.meta.env.VITE_URL}/api/chats/${id}`, {
      method: "DELETE",
    });

    navigate("/chat");
  };

  const activeChat = chats.find((c) => c._id === id) || currentChatbot;

  // Handle invalid chatbot ID - redirect to chat list
  useEffect(() => {
    if (id && chats.length > 0 && !activeChat) {
      // ID exists but chatbot not found in user's chat list
      navigate("/chat", { replace: true });
    }
  }, [id, chats, activeChat, navigate]);

  // Calculate progress percentage
  const xpNeeded = xpPerLevel(relationshipLevel);
  const progressPercent = Math.min((relationshipXP / xpNeeded) * 100, 100);

  return (
    <Layout>
      <Dialog open={open} onOpenChange={setOpen}>
        <Content />
      </Dialog>

      <div className="flex h-screen bg-[#0a0a0f] text-white overflow-hidden">
        {/* LEFT – CHAT LIST - Refined */}
        <div className="hidden md:flex w-80 border-r border-white/5 flex-col bg-[#0a0a0f] h-full overflow-hidden">
          <div className="p-6">
            <h3 className="text-2xl font-bold tracking-tight mb-6">Messages</h3>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
              <input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-sm outline-none focus:border-white/10 transition-colors placeholder:text-white/20"
              />
            </div>
          </div>

          <ScrollArea className="flex-1 h-0 min-h-0">
            <div className="space-y-2 px-2">
              {chats.filter(chat => 
                searchQuery === "" || 
                chat.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                chat.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => navigate(`/chat/${chat._id}`)}
                  className={`flex w-[300px] items-center gap-3 p-4 rounded-[1.5rem] cursor-pointer transition-all ${
                    id === chat._id 
                      ? "bg-white/5 border border-white/10" 
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="relative">
                    <Avatar className="w-12 h-12 border border-white/10">
                      <AvatarImage src={chat.avatar} className="object-cover" />
                      <AvatarFallback className="bg-white/5 text-white/40">{chat.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0a0a0f]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm tracking-tight">{chat.name}</p>
                    <p className="text-[10px] text-white/30 truncate font-medium uppercase tracking-widest mt-0.5">
                      {chat.lastMessage || "Start a new conversation"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-6">
            <Link to="/">
              <button className="w-full bg-white/5 backdrop-blur-md border border-white/10 text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center gap-2">
                <FaPlus size={12} /> New Chat
              </button>
            </Link>
          </div>
        </div>

        {/* CENTER – CHAT AREA */}
        <div className="flex-1 flex flex-col bg-[#0a0a0f] relative h-full overflow-hidden">
          {!id ? (
            <div className="flex-1 flex flex-col items-center justify-center text-white/20 gap-4">
              <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center">
                <Sparkles size={32} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em]">Select a conversation to begin</p>
            </div>
          ) : (
            <>
              {/* Header with relationship progress */}
              <div className="px-6 py-4 border-b border-white/5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      className="md:hidden p-2 hover:bg-white/5 rounded-xl transition-colors"
                      onClick={() => navigate("/")}
                    >
                      <FaArrowLeft size={18} />
                    </button>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border border-white/10">
                        <AvatarImage src={activeChat?.avatar} className="object-cover" />
                      </Avatar>
                      <div>
                        <h2 className="font-bold text-base tracking-tight">{activeChat?.name}</h2>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Online Now</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
                      <Star size={12} className="text-yellow-500" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Level {relationshipLevel}</span>
                    </div>
                    <button onClick={handleDeleteChat} className="p-3 hover:bg-white/5 text-white/20 hover:text-red-500 rounded-xl transition-all">
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>

                {/* Affinity Progress Bar - Mini version */}
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative">
                  <div 
                    className="absolute inset-y-0 left-0 bg-[#741818] transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Messages Area */}
              <ScrollArea className="flex-1 px-6 py-8 overflow-hidden">
                <div className="space-y-6 max-w-4xl mx-auto">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] px-5 py-3.5 rounded-[1.5rem] text-sm leading-relaxed ${
                          m.sender === "me"
                            ? "bg-[#741818] text-white rounded-br-none font-medium"
                            : "bg-white/5 backdrop-blur-xl border border-white/5 text-white/90 rounded-bl-none"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 backdrop-blur-xl border border-white/5 px-5 py-3.5 rounded-[1.5rem] rounded-bl-none">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>
              </ScrollArea>

              {/* Chat Input */}
              <div className="p-6 overflow-hidden">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white/5 border border-white/5 rounded-[2rem] p-1.5 flex items-center gap-2 group transition-all focus-within:bg-white/10 focus-within:border-white/20 focus-within:ring-2 focus-within:ring-white/10">
                    <button className="p-3 text-white/20 hover:text-white/40 transition-colors">
                      <FaSmile size={18} />
                    </button>

                    <input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder={`Message ${activeChat?.name}...`}
                      className="flex-1 bg-transparent border-none outline-none text-sm px-2 text-white placeholder:text-white/20 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!newMessage.trim()}
                      className={`w-11 h-11 rounded-[1.25rem] flex items-center justify-center transition-all active:scale-90 ${
                        newMessage.trim() 
                          ? "bg-[#741818] text-white hover:bg-[#8d1d1d]" 
                          : "bg-white/5 text-white/10 border border-white/5 cursor-not-allowed"
                      }`}
                    >
                      <FaPaperPlane size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* RIGHT – PROFILE SIDEBAR */}
        {activeChat && (
          <div className="hidden xl:flex w-96 border-l border-white/5 flex-col bg-[#0a0a0f] h-full overflow-hidden">
            <ScrollArea className="flex-1 h-0 overflow-hidden">
              <div className="relative aspect-[4/5]">
                <img
                  src={activeChat?.avatar}
                  className="w-full h-full object-cover object-center opacity-80"
                  alt={activeChat?.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h2 className="text-3xl font-bold tracking-tight mb-1">{activeChat?.name}, {activeChat?.age}</h2>
                  <p className="text-white/30 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <Heart size={14} className="text-[#741818]" /> {activeChat?.age ? `${activeChat.age} years old` : 'Online'}
                  </p>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div>
                  <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">About Me</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-medium">
                    {activeChat?.bio || "Designed to be your perfect adaptive companion. I learn from our conversations to better match your energy and preferences."}
                  </p>
                </div>





                {/* Relationship Milestone Section */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Next Milestone</h3>
                  <div className="space-y-3">
                    {unlockables.filter(u => u.level <= relationshipLevel).map((unlock, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10"
                      >
                        <div className="w-12 h-12 rounded-xl bg-[#741818]/20 flex items-center justify-center text-xl">
                          {unlock.icon}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white/80">{unlock.name}</p>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Unlocked</p>
                        </div>
                      </div>
                    ))}
                    {unlockables.filter(u => u.level > relationshipLevel).slice(0, 1).map((locked, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-4 p-4 bg-transparent rounded-2xl border border-white/5 opacity-40 grayscale"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl">
                          <Lock size={20} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white/60">{locked.name}</p>
                          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Level {locked.level} Required</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {/* Level Up Notification - Refined */}
      {showLevelUp && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
          <div className="bg-[#741818] text-white px-8 py-4 rounded-[2rem] border border-white/20 flex items-center gap-4 shadow-[0_0_40px_rgba(116,24,24,0.4)]">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60">Level Up!</p>
              <p className="font-bold text-lg leading-none">You reached Level {relationshipLevel}</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
