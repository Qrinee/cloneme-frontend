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
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Relationship progression system
  const [relationshipLevel, setRelationshipLevel] = useState(1);
  const [relationshipXP, setRelationshipXP] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [unlockedContent, setUnlockedContent] = useState([]);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [newUnlock, setNewUnlock] = useState(null);
  
  // XP needed per level (exponential growth)
  const xpPerLevel = (level) => Math.floor(100 * Math.pow(1.5, level - 1));
  
  // Unlockable content
  const unlockables = [
    { level: 2, name: "Prywatne zdjęcie", icon: "📸", description: "Otrzymaj ekskluzywne zdjęcie" },
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
          _id: c._id,
          name: c.chatbotId?.cloneName,
          avatar: c.chatbotId?.cloneAvatarPhotoUrl,
          lastMessage: c.messages.at(-1)?.content || "",
        }))
      );
    }
  };

  const fetchChatMessages = async (chatId) => {
    const res = await authFetch(
      `${import.meta.env.VITE_URL}/api/chats/${chatId}`
    );
    const data = await res.json();
    if (data.type === "success") {
      setMessages(
        data.chat.messages.map((m) => ({
          id: m._id,
          text: m.content,
          sender: m.role === "user" ? "me" : "them",
        }))
      );
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const text = newMessage;
    setNewMessage("");

    setMessages((p) => [...p, { id: Date.now(), text, sender: "me" }]);
    setIsLoading(true);

    try {
      const res = await authFetch(
        `${import.meta.env.VITE_URL}/api/chats/${id}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: { role: "user", content: text } }),
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

    await authFetch(`${import.meta.env.VITE_URL}/api/chats/${id}`, {
      method: "DELETE",
    });

    navigate("/chats");
  };

  const activeChat = chats.find((c) => c._id === id);

  // Calculate progress percentage
  const xpNeeded = xpPerLevel(relationshipLevel);
  const progressPercent = Math.min((relationshipXP / xpNeeded) * 100, 100);

  return (
    <Layout>
      <Dialog open={open} onOpenChange={setOpen}>
        <Content />
      </Dialog>

      {/* Level Up Modal */}
      {showLevelUp && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-gradient-to-br from-[#6c5ce7] to-[#a855f7] p-8 rounded-3xl text-center transform animate-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-white mb-2">Level Up!</h2>
            <p className="text-white/80 text-xl">Doszedłeś do poziomu {relationshipLevel}!</p>
            <div className="mt-4 text-5xl">⭐</div>
          </div>
        </div>
      )}

      {/* Unlock Modal */}
      {showUnlockModal && newUnlock && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-gradient-to-br from-yellow-600 to-orange-500 p-8 rounded-3xl text-center max-w-sm mx-4">
            <div className="text-6xl mb-4">{newUnlock.icon}</div>
            <h2 className="text-2xl font-bold text-white mb-2">Odblokowano!</h2>
            <p className="text-white/90 text-lg mb-4">{newUnlock.name}</p>
            <p className="text-white/70 text-sm">{newUnlock.description}</p>
            <button 
              onClick={() => setShowUnlockModal(false)}
              className="mt-6 px-8 py-3 bg-white text-yellow-600 rounded-full font-bold hover:scale-105 transition-transform"
            >
              Super! 💕
            </button>
          </div>
        </div>
      )}

      <div className="flex h-full  text-white">

        {/* LEFT – CHAT LIST */}
        <div className="hidden md:flex w-80  border-r border-white/10 flex-col">
        <h3 className="text-2xl">Chat</h3>
          <div className="p-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-white/40" />
              <Input
                placeholder="Search..."
                className="pl-9  border-none text-sm"
              />
            </div>
          </div>

          <ScrollArea className="flex-1 px-2">
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => navigate(`/chat/${chat._id}`)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-white/5 ${
                  id === chat._id && "bg-white/10"
                }`}
              >
                <Avatar>
                  <AvatarImage src={`${import.meta.env.VITE_URL}${chat.avatar}`} />
                  <AvatarFallback>{chat.name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{chat.name}</p>
                  <p className="text-xs text-white/40 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>

          <Link to="/" className="p-4">
            <Button variant="outline" className="w-full">
              <FaPlus className="mr-2" /> New Chat
            </Button>
          </Link>
        </div>

        {/* CENTER – CHAT */}
        <div className="flex-1 flex flex-col">
          {!id ? (
            <div className="flex-1 flex items-center justify-center text-white/50">
              Select a chat
            </div>
          ) : (
            <>
              {/* Header with relationship progress */}
              <div className="flex flex-col px-4 py-3 border-b border-white/10 ">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="md:hidden"
                      onClick={() => navigate("/")}
                    >
                      <FaArrowLeft />
                    </Button>
                    <Avatar>
                      <AvatarImage
                        src={`${import.meta.env.VITE_URL}${activeChat?.avatar}`}
                      />
                    </Avatar>
                  </div>
                  <Button size="icon" variant="ghost" onClick={handleDeleteChat}>
                    <FaTrash />
                  </Button>
                </div>
                

              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${
                        m.sender === "me" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                          m.sender === "me"
                            ? "bg-[#6c5ce7] rounded-br-md"
                            : "bg-[#1a1a1a] border border-white/10 rounded-bl-md"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-white/10 ">
                <div className="flex items-center gap-2 border-2 rounded-full px-3 py-2">
                  <FaSmile className="text-white/40" />
                  <FaImage className="text-white/40" />
                  <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Write a message..."
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                  <button
                    onClick={handleSend}
                    className="w-9 h-9 bg-[#6c5ce7] rounded-full flex items-center justify-center"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* RIGHT – PROFILE */}
        {activeChat && (
          <div className="hidden xl:flex w-[360px] bg-[#0f0f0f] border-l border-white/10 flex-col">
            <div className="relative h-[420px]">
              <img
                src={`${import.meta.env.VITE_URL}${activeChat.avatar}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            <div className="p-4 space-y-4">
              <h2 className="text-xl font-semibold">{activeChat.name}</h2>
              <p className="text-sm text-white/60">
                Alternative goth model working part-time at a goth store.
              </p>

              <Button className="w-full bg-red-600 hover:bg-red-700">
                📞 Call Me
              </Button>
              <Button variant="outline" className="w-full border-red-600 text-red-600">
                ✨ Generate Image
              </Button>

              <div className="grid grid-cols-2 gap-3 text-sm pt-4 border-t border-white/10">
                <div><p className="text-white/40">Age</p>19</div>
                <div><p className="text-white/40">Body</p>Slim</div>
                <div><p className="text-white/40">Ethnicity</p>Canadian</div>
                <div><p className="text-white/40">Language</p>English</div>
              </div>

              {/* Unlocked Content Section */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <h3 className="text-sm font-semibold text-white/80 mb-3">🎁 Odblokowane</h3>
                <div className="space-y-2">
                  {unlockables.slice(0, relationshipLevel).map((unlock, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-[#DC2626]/20 rounded-xl border border-[#DC2626]/30"
                    >
                      <span className="text-2xl">{unlock.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-white">{unlock.name}</p>
                        <p className="text-xs text-white/50">{unlock.description}</p>
                      </div>
                    </div>
                  ))}
                  {unlockables.slice(relationshipLevel).slice(0, 2).map((locked, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 opacity-60"
                    >
                      <span className="text-2xl grayscale">🔒</span>
                      <div>
                        <p className="text-sm font-medium text-white/60">Wymagany poziom {locked.level}</p>
                        <p className="text-xs text-white/40">{locked.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
