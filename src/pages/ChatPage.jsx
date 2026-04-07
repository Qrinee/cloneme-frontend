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
import { Sparkles, Lock, Star, Heart, Coins, Play, Camera } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";
import Content from "@/components/Content";
import DialogMessageLimit from "@/components/DialogMessageLimit";
import { useAuthFetch } from "@/utils/authFetch";
import { useLayoutContext } from "@/components/LayoutContext";
import LoginRequiredDialog from "@/components/LoginRequiredDialog";

export default function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authFetch = useAuthFetch();
  const bottomRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Use LayoutContext for guest state management
  const { 
    isLoggedIn,
    isGuest: contextIsGuest, 
    setIsGuest: setContextIsGuest,
    messagesRemaining: contextMessagesRemaining, 
    setMessagesRemaining: setContextMessagesRemaining,
    updateGuestConversation,
    addGuestMessage,
    guestConversations,
    premium,
    messagesUsed,
    setMessagesUsed,
    updateUser
  } = useLayoutContext();

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentChatbot, setCurrentChatbot] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [incomingAiMessages, setIncomingAiMessages] = useState(0);
  const [currentChatbotId, setCurrentChatbotId] = useState(null);
  
  // Local guest mode state (synced with context)
  const [messagesRemaining, setMessagesRemaining] = useState(contextMessagesRemaining);
  const [isGuest, setIsGuest] = useState(contextIsGuest);
  const [showLimitExceeded, setShowLimitExceeded] = useState(false);
  const [limitErrorMessage, setLimitErrorMessage] = useState("Message limit reached. Upgrade to premium for unlimited messages.");
  const [requestingMedia, setRequestingMedia] = useState(null); // 'photo' or 'video'
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  
  // Sync with context
  useEffect(() => {
    setIsGuest(contextIsGuest);
    setMessagesRemaining(contextMessagesRemaining);
  }, [contextIsGuest, contextMessagesRemaining]);
  
  // Load conversation from context when id changes
  useEffect(() => {
    if (id && guestConversations[id]) {
      setMessages(guestConversations[id]);
    }
  }, [id, guestConversations]);
  
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

  useEffect(() => {
    fetchMyChats();
  }, []);

  useEffect(() => {
    if (id) fetchChatMessages(id);
  }, [id]);

  useEffect(() => {
    if (isInitialLoad && messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
      setIsInitialLoad(false);
    } else if (autoScroll) {
      bottomRef.current?.scrollIntoView({ 
        behavior: isInitialLoad ? "auto" : "smooth" 
      });
      if (isInitialLoad && messages.length > 0) {
        setIsInitialLoad(false);
      }
    }
  }, [messages, isTyping]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollHeight - scrollTop <= clientHeight + 150;
    setAutoScroll(isAtBottom);
  };

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
    const res = await authFetch(
      `${import.meta.env.VITE_URL}/api/chats/${chatbotId}`
    );

    if (res.status === 401) {
      if (!isLoggedIn) {
        setIsGuest(true);
        setContextIsGuest(true);
        setMessagesRemaining(10);
        setContextMessagesRemaining(10);
      }
      try {
        const data = await res.json();
        if (data.chatbot) {
          setCurrentChatbot({
            _id: data.chatbot._id,
            name: data.chatbot.name,
            avatar: data.chatbot.mainPhoto,
            age: data.chatbot.age,
            bio: data.chatbot.bio,
          });
        }
        if (data.guest) {
          setMessagesRemaining(data.messagesRemaining);
          setContextMessagesRemaining(data.messagesRemaining);
          if (data.messages && Array.isArray(data.messages)) {
            const loadedMessages = data.messages.map((m) => ({
              id: m._id,
              text: m.content,
              sender: m.role === "user" ? "me" : "them",
              type: m.type,
              isLocked: m.isLocked,
              price: m.price,
              mediaUrl: m.mediaUrl
            }));
            setMessages(loadedMessages);
            updateGuestConversation(chatbotId, loadedMessages, data.messagesRemaining);
          }
        }
      } catch (e) {}
      return;
    }
    
    const data = await res.json();
    if (data.type === "error") {
      if (!isLoggedIn && data.message && data.message.includes('Limit exceeded')) {
        setLimitErrorMessage(data.message);
        setShowLoginDialog(true);
        setIsGuest(true);
        setContextIsGuest(true);
        setMessagesRemaining(0);
        setContextMessagesRemaining(0);
      }
      return;
    }
    
    if (!isLoggedIn && data.guest) {
      setIsGuest(true);
      setContextIsGuest(true);
      setMessagesRemaining(data.messagesRemaining);
      setContextMessagesRemaining(data.messagesRemaining);
      
      const messagesSource = data.messages || (data.chat && data.chat.messages);
      
      if (messagesSource && Array.isArray(messagesSource)) {
        const uniqueMessages = [];
        const seenIds = new Set();
        
        messagesSource.forEach((m, index) => {
          const mId = m._id || `remote-${index}`;
          if (!seenIds.has(mId)) {
            seenIds.add(mId);
            uniqueMessages.push({
              id: mId,
              text: m.content,
              sender: m.role === "user" ? "me" : "them",
              type: m.type,
              isLocked: m.isLocked,
              price: m.price,
              mediaUrl: m.mediaUrl
            });
          }
        });
        setMessages(uniqueMessages);
        updateGuestConversation(chatbotId, uniqueMessages, data.messagesRemaining);
      }
      if (data.chatbot) {
        setCurrentChatbot({
          _id: data.chatbot._id,
          name: data.chatbot.name,
          avatar: data.chatbot.mainPhoto,
          age: data.chatbot.age,
          bio: data.chatbot.bio,
        });
      }
      return;
    }
    
    setIsGuest(false);
    if (data.chat) {
      const uniqueMessages = [];
      const seenIds = new Set();
      
      data.chat.messages.forEach((m, index) => {
        const mId = m._id || `remote-${index}`;
        if (!seenIds.has(mId)) {
          seenIds.add(mId);
          uniqueMessages.push({
            id: mId,
            text: m.content,
            sender: m.role === "user" ? "me" : "them",
            type: m.type,
            isLocked: m.isLocked,
            price: m.price,
            mediaUrl: m.mediaUrl
          });
        }
      });
      setMessages(uniqueMessages);
    }
    if (data.chatbot) {
      setCurrentChatbot({
        _id: data.chatbot._id,
        name: data.chatbot.name,
        avatar: data.chatbot.mainPhoto,
        age: data.chatbot.age,
        bio: data.chatbot.bio,
      });
    }
    
    if (chatbotId) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '/api/v1';
        const progressRes = await authFetch(`${apiUrl}/girlfriends/${chatbotId}/progress`);
        if (progressRes.ok) {
          const progressData = await progressRes.json();
          if (progressData.type === "success") {
            setRelationshipLevel(progressData.level);
            setRelationshipXP(progressData.xp);
          }
        }
      } catch (e) {
        console.error("Error fetching relationship progress:", e);
      }
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    if (isGuest && !isLoggedIn && messagesRemaining <= 0) {
      setLimitErrorMessage("Limit exceeded (5 messages). Please log in to continue chatting.");
      setShowLoginDialog(true);
      setIsTyping(false);
      return;
    }

    const isPremiumActive = premium?.isActive;
    const hasUnlimitedMessages = messagesRemaining === "unlimited";
    const hasMessagesLeft = typeof messagesRemaining === "number" && messagesRemaining > 0;
    
    if (!isPremiumActive && !hasUnlimitedMessages && !hasMessagesLeft && !isGuest && isLoggedIn) {
      setShowLimitExceeded(true);
      setIsTyping(false);
      return;
    }

    const chatbotId = id;
    const text = newMessage;
    setNewMessage("");

    setMessages((p) => [...p, { id: Date.now(), text, sender: "me" }]);
    setAutoScroll(true); // Force scroll to bottom on user message
    setIsLoading(true);
    setIsTyping(true);
    setIncomingAiMessages(0);

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
        try {
          const errorData = await res.json();
          if (errorData.message?.includes("Limit exceeded") || errorData.message?.toLowerCase().includes("log in") || errorData.message?.toLowerCase().includes("login")) {
            setLimitErrorMessage(errorData.message);
            setShowLoginDialog(true);
          } else if (errorData.message?.includes("Message limit") || errorData.message?.includes("message")) {
            setLimitErrorMessage(errorData.message || "Message limit reached. Upgrade to premium for unlimited messages.");
            setShowLimitExceeded(true);
            if (errorData.messagesUsed !== undefined) setMessagesUsed(errorData.messagesUsed);
          } else {
            setOpen(true);
          }
        } catch (e) {
          setOpen(true);
        }
        setIsTyping(false);
        return;
      }

      if (res.status === 401 && !isLoggedIn) {
        setIsGuest(true);
        setContextIsGuest(true);
        try {
          const data = await res.json();
          if (data.guest && data.messages) {
            const newMessages = data.messages.map((m) => ({
              id: m._id,
              text: m.content,
              sender: m.role === "user" ? "me" : "them",
              type: m.type,
              isLocked: m.isLocked,
              price: m.price,
              mediaUrl: m.mediaUrl
            }));
            setMessages(newMessages);
            updateGuestConversation(chatbotId, newMessages, data.messagesRemaining);
          }
        } catch (e) {}
        setIsLoading(false);
        setIsTyping(false);
        return;
      }

      const data = await res.json();
      
      if (res.status === 403 && data.message?.includes("Limit exceeded")) {
        setLimitErrorMessage(data.message);
        setShowLoginDialog(true);
        setIsLoading(false);
        setIsTyping(false);
        return;
      }

      if (data.type === "error") {
        const errorMsg = data.message || "Message limit reached. Upgrade to premium for unlimited messages.";
        setLimitErrorMessage(errorMsg);
        
        if (!isLoggedIn && (errorMsg.toLowerCase().includes("log in") || errorMsg.toLowerCase().includes("login") || errorMsg.includes("Limit exceeded"))) {
          setShowLoginDialog(true);
        } else {
          setShowLimitExceeded(true);
        }
        
        setIsLoading(false);
        setIsTyping(false);
        if (data.messagesUsed !== undefined) setMessagesUsed(data.messagesUsed);
        if (data.messagesRemaining !== undefined) {
          setMessagesRemaining(data.messagesRemaining);
          setContextMessagesRemaining(data.messagesRemaining);
        }
        return;
      }
      
      if (!isLoggedIn && data.guest) {
        setIsGuest(true);
        setContextIsGuest(true);
        setMessagesRemaining(data.messagesRemaining);
        setContextMessagesRemaining(data.messagesRemaining);
        
        const messagesSource = data.messages || (data.chat && data.chat.messages);
        if (messagesSource && Array.isArray(messagesSource)) {
          const uniqueMessages = [];
          const seenIds = new Set();
          
          messagesSource.forEach((m, index) => {
            const mId = m._id || `remote-${index}`;
            if (!seenIds.has(mId)) {
              seenIds.add(mId);
              uniqueMessages.push({
                id: mId,
                text: m.content,
                sender: m.role === "user" ? "me" : "them",
                type: m.type,
                isLocked: m.isLocked,
                price: m.price,
                mediaUrl: m.mediaUrl
              });
            }
          });
          setMessages(uniqueMessages);
          updateGuestConversation(chatbotId, uniqueMessages, data.messagesRemaining);
        }
        setIsTyping(false);
        return;
      }
      
      setIsGuest(false);
      if (data.type === "success" && data.chat) {

        // Note: this count logic is tricky because of animations, better slice from actual data
        const newAiMessages = data.chat.messages.slice(data.chat.messages.length - (data.newAiMessagesCount || 1)).filter(m => m.role !== "user");
        const newAiMessagesCount = data.newAiMessagesCount || newAiMessages.length;
        setIncomingAiMessages(newAiMessagesCount);
        
        if (newAiMessages.length > 0) {
          let delay = 0;
          newAiMessages.forEach((reply, index) => {
            setTimeout(() => {
              setMessages((p) => [
                ...p,
                { 
                  id: reply._id || Date.now() + Math.random(), 
                  text: reply.content, 
                  sender: "them",
                  type: reply.type,
                  isLocked: reply.isLocked,
                  price: reply.price,
                  mediaUrl: reply.mediaUrl
                },
              ]);
              setIncomingAiMessages(prev => Math.max(0, prev - 1));
              if (index === newAiMessages.length - 1) {
                setIsTyping(false);
              }
            }, delay);
            const typingSpeed = 3 + Math.random();
            delay += Math.max(500, (reply.content.length / typingSpeed * 500));
          });
        } else {
          setIsTyping(false);
        }
        
        if (data.messagesUsed !== undefined) setMessagesUsed(data.messagesUsed);
        if (data.messagesRemaining !== undefined) {
          setMessagesRemaining(data.messagesRemaining);
          setContextMessagesRemaining(data.messagesRemaining);
        }
        
        if (data.relationshipProgress) {
          const { level, xp } = data.relationshipProgress;
          if (level !== relationshipLevel) {
            setRelationshipLevel(level);
            setShowLevelUp(true);
            setTimeout(() => setShowLevelUp(false), 3000);
          }
          setRelationshipXP(xp);
        }
        
        if (data.newUnlocks && data.newUnlocks.length > 0) {
          setNewUnlock(data.newUnlocks[0]);
          setShowUnlockModal(true);
          setUnlockedContent(prev => [...prev, ...data.newUnlocks]);
          setTimeout(() => setShowUnlockModal(false), 4000);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlockMedia = async (messageId) => {
    try {
      const res = await authFetch(
        `${import.meta.env.VITE_URL}/api/chats/${id}/unlock/${messageId}`,
        { method: "POST" }
      );
      
      const data = await res.json();
      if (data.type === "success") {
        setMessages(prev => prev.map(m => 
          m.id === messageId ? { ...m, isLocked: false, mediaUrl: data.unlockedMessage.mediaUrl } : m
        ));
        if (data.remainingPoints !== undefined) {
          updateUser({ points: data.remainingPoints });
        }
      } else {
        if (data.message?.toLowerCase().includes("credits") || data.message?.toLowerCase().includes("points")) {
          setOpen(true);
        } else {
          alert(data.message);
        }
      }
    } catch (e) {
      console.error("Error unlocking media:", e);
    }
  };

  const handleRequestMedia = async (type = 'random') => {
    if (isLoading || requestingMedia) return;
    setIsLoading(true);
    setRequestingMedia(type);
    setIsTyping(true); // Show typing while generating
    try {
      const baseUrl = import.meta.env.VITE_URL || '';
      const res = await authFetch(
        `${baseUrl}/api/chats/${id}/request-media`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type }),
        }
      );
      const data = await res.json();
      if (data.type === "success") {
        if (data.remainingPoints !== undefined) {
          updateUser({ points: data.remainingPoints });
        }
        
        // Add message with small artificial delay for "AI typing" feel
        setTimeout(() => {
          setMessages(prev => [...prev, data.mediaMessage]);
          setIsTyping(false);
          // Scroll to bottom will happen via useEffect
        }, 1500);
      } else {
        if (data.message?.toLowerCase().includes("credits") || data.message?.toLowerCase().includes("points")) {
          setOpen(true);
        } else if (data.message?.toLowerCase().includes("authentication") || data.message?.toLowerCase().includes("login") || data.message?.toLowerCase().includes("log in") || data.message?.toLowerCase().includes("required")) {
          setLimitErrorMessage(data.message || "Login required to continue.");
          setShowLoginDialog(true);
        } else {
          setLimitErrorMessage(data.message || "An error occurred.");
          setShowLoginDialog(true);
        }
        setIsTyping(false);
      }
    } catch (e) {
      console.error("Error requesting media:", e);
      setIsTyping(false);
    } finally {
      setIsLoading(false);
      setRequestingMedia(null);
    }
  };

  const handleDeleteChat = async () => {
    if (!id) return;
    if (!confirm("Delete this chat?")) return;
    await authFetch(`${import.meta.env.VITE_URL}/api/chats/${id}`, { method: "DELETE" });
    navigate("/chat");
  };

  const activeChat = chats.find((c) => c._id === id) || currentChatbot;

  useEffect(() => {
    if (id && chats.length > 0 && !activeChat) {
      navigate("/chat", { replace: true });
    }
  }, [id, chats, activeChat, navigate]);

  const xpNeeded = xpPerLevel(relationshipLevel);
  const progressPercent = Math.min((relationshipXP / xpNeeded) * 100, 100);

  return (
    <Layout>
      <Dialog open={open} onOpenChange={setOpen}>
        <Content />
      </Dialog>

      <DialogMessageLimit 
        open={showLimitExceeded} 
        onOpenChange={setShowLimitExceeded}
        messagesUsed={messagesUsed || 0}
        messageLimit={20}
        onUpgrade={() => window.location = 'https://buy.stripe.com/bJedR87f4aTTgQK5pd6sw01'}
      />

      <LoginRequiredDialog 
        open={showLoginDialog} 
        onClose={() => setShowLoginDialog(false)}
        message={limitErrorMessage}
      />

      <div className="flex flex-1 bg-[#0a0a0f] text-white overflow-hidden h-[calc(100dvh-64px)] md:h-full">
        {/* LEFT – CHAT LIST */}
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
                chat.name?.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => navigate(`/chat/${chat._id}`)}
                  className={`flex w-full items-center gap-3 p-4 rounded-[1.5rem] cursor-pointer transition-all ${
                    id === chat._id ? "bg-white/5 border border-white/10" : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="relative">
                    <Avatar className="w-12 h-12 border border-white/10">
                      <AvatarImage src={chat.avatar ? `${import.meta.env.VITE_URL}${chat.avatar}` : null} className="object-cover" />
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
              <button className="w-full bg-white/5 backdrop-blur-md border border-white/10 text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <FaPlus size={12} /> New Chat
              </button>
            </Link>
          </div>
        </div>

        {/* CENTER – CHAT AREA */}
        <div className="flex-1 flex flex-col bg-[#0a0a0f] relative min-h-0 h-full overflow-hidden">
          {!id ? (
            <div className="flex-1 flex flex-col items-center justify-center text-white/20 gap-4">
              <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center">
                <Sparkles size={32} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em]">Select a conversation to begin</p>
            </div>
          ) : (
            <>
              <div className="px-3 md:px-6 py-2 md:py-4 border-b border-white/5 flex flex-col gap-1 md:gap-4 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-4">
                    <button className="md:hidden p-2 hover:bg-white/5 rounded-xl" onClick={() => navigate("/")}><FaArrowLeft size={18} /></button>
                    <div className="flex items-center gap-2 md:gap-3">
                      <Avatar className="w-8 h-8 md:w-10 md:h-10 border border-white/10">
                        <AvatarImage src={activeChat?.avatar ? `${import.meta.env.VITE_URL}${activeChat?.avatar}` : null} className="object-cover" />
                      </Avatar>
                      <div>
                        <h2 className="font-bold text-sm md:text-base tracking-tight">{activeChat?.name}</h2>
                        <div className="flex items-center gap-1 md:gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-[8px] md:text-[10px] font-bold text-white/30 uppercase tracking-widest hidden md:inline">Online Now</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    <div className="px-2 md:px-3 py-1 md:py-1.5 bg-white/5 border border-white/10 rounded-lg md:rounded-xl flex items-center gap-1 md:gap-2">
                      <Star size={10} md:size={12} className="text-yellow-500" />
                      <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">LVL {relationshipLevel}</span>
                    </div>
                    <button onClick={handleDeleteChat} className="p-2 md:p-3 text-white/20 hover:text-red-500"><FaTrash size={12} md:size={14} /></button>
                  </div>
                </div>
                <div className="w-full h-0.5 md:h-1 bg-white/5 rounded-full overflow-hidden relative">
                  <div className="absolute inset-y-0 left-0 bg-[#741818] transition-all duration-1000 ease-out" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              <ScrollArea 
                className="flex-1 px-3 md:px-6 py-4 md:py-8 h-0" 
                onScroll={handleScroll}
              >
                <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto pb-4">
                  {messages.map((m) => (
                    <div key={m.id} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
                      <div className={`flex flex-col gap-1 md:gap-2 max-w-[80%] ${m.sender === "me" ? "items-end" : "items-start"}`}>
                        {m.text && (
                          <div className={`px-3 md:px-5 py-2 md:py-3.5 rounded-[1rem] md:rounded-[1.5rem] text-xs md:text-sm leading-relaxed ${m.sender === "me" ? "bg-[#741818] text-white rounded-br-none font-medium" : "bg-white/5 backdrop-blur-xl border border-white/5 text-white/90 rounded-bl-none"}`}>
                            {m.text}
                          </div>
                        )}
                        {(m.type === 'photo' || m.type === 'video') && (
                          <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[3/4] w-64 bg-white/5">
                            {m.isLocked && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-black/40 backdrop-blur-md">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"><Lock size={20} className="text-white/60" /></div>
                                <button onClick={() => handleUnlockMedia(m.id)} className="bg-white text-black px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/90 flex items-center gap-2">
                                  <Coins size={14} /> Unlock for {m.price} Credits
                                </button>
                              </div>
                            )}
                            {m.type === 'photo' ? (
                              <img src={`${import.meta.env.VITE_URL}${m.mediaUrl}`} className={`w-full h-full object-cover ${m.isLocked ? 'blur-2xl' : ''}`} alt="Shared photo" />
                            ) : (
                              <div className="w-full h-full relative">
                                <video src={`${import.meta.env.VITE_URL}${m.mediaUrl}`} className={`w-full h-full object-cover ${m.isLocked ? 'blur-2xl' : ''}`} controls={!m.isLocked} />
                                {m.isLocked && <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><Play size={40} className="text-white/20" /></div>}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 border border-white/5 px-5 py-3.5 rounded-[1.5rem] rounded-bl-none">
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

              <div className="p-3 md:p-6 pb-safe">
                {isGuest && !isLoggedIn && (
                  <div className="max-w-4xl mx-auto mb-2 md:mb-4 bg-[#741818]/10 border border-[#741818]/20 rounded-lg md:rounded-xl px-3 md:px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2"><FaUnlock size={12} md:size={14} className="text-[#741818]" /><span className="text-[10px] md:text-xs text-white/60">Guest</span></div>
                    <div className="flex items-center gap-2"><span className="text-[10px] md:text-xs text-white/40">Left:</span><span className={`text-[10px] md:text-xs font-bold ${messagesRemaining <= 3 ? 'text-[#741818]' : 'text-white/80'}`}>{messagesRemaining}</span></div>
                  </div>
                )}
                <div className="max-w-4xl mx-auto pb-5">
                  {/* Desktop media buttons */}
                  <div className="hidden md:flex gap-4 mb-4">
                    <button 
                      onClick={() => handleRequestMedia('photo')}
                      disabled={isLoading || requestingMedia}
                      className={`flex-1 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 backdrop-blur-md px-4 py-3 rounded-2xl text-[10px] font-bold text-white/80 transition-all flex flex-col items-center justify-center gap-1 group uppercase tracking-widest ${isLoading || requestingMedia ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center gap-2">
                        {requestingMedia === 'photo' ? (
                          <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Camera size={14} className="text-white/40 group-hover:text-pink-500 transition-colors" />
                        )}
                        Send a naughty photo 📸
                      </div>
                      <div className="text-[9px] text-white/30 flex items-center gap-1 font-medium">
                        <Coins size={10} /> 50 Credits
                      </div>
                    </button>
                    <button 
                      onClick={() => handleRequestMedia('video')}
                      disabled={isLoading || requestingMedia}
                      className={`flex-1 bg-white/5 hover:bg-[#741818]/20 border border-white/5 hover:border-[#741818]/40 backdrop-blur-md px-4 py-3 rounded-2xl text-[10px] font-bold text-white/80 transition-all flex flex-col items-center justify-center gap-1 group uppercase tracking-widest ${isLoading || requestingMedia ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center gap-2">
                        {requestingMedia === 'video' ? (
                          <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Play size={14} className="text-white/40 group-hover:text-red-500 transition-colors" />
                        )}
                        Send a naughty video 🔥
                      </div>
                      <div className="text-[9px] text-white/30 flex items-center gap-1 font-medium">
                        <Coins size={10} /> 200 Credits
                      </div>
                    </button>
                  </div>
                  
                  {/* Mobile media buttons - simplified row */}
                  <div className="md:hidden flex gap-2 mb-3">
                    <button 
                      onClick={() => handleRequestMedia('photo')}
                      disabled={isLoading || requestingMedia}
                      className={`flex-1 bg-white/5 border border-white/5 backdrop-blur-md px-3 py-2 rounded-xl text-[9px] font-bold text-white/80 transition-all flex items-center justify-center gap-1 ${isLoading || requestingMedia ? 'opacity-50' : ''}`}
                    >
                      <Camera size={12} /> 📸 50
                    </button>
                    <button 
                      onClick={() => handleRequestMedia('video')}
                      disabled={isLoading || requestingMedia}
                      className={`flex-1 bg-white/5 border border-white/5 backdrop-blur-md px-3 py-2 rounded-xl text-[9px] font-bold text-white/80 transition-all flex items-center justify-center gap-1 ${isLoading || requestingMedia ? 'opacity-50' : ''}`}
                    >
                      <Play size={12} /> 🔥 200
                    </button>
                  </div>
                  
                  <div className="bg-white/5 border border-white/5 rounded-[2rem] p-1.5 flex items-center gap-2 focus-within:ring-2 focus-within:ring-white/10 transition-all">
                    <button className="p-2 md:p-3 text-white/20 hover:text-white/40 transition-colors"><FaSmile size={16} md:size={18} /></button>
                    <input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder={`Message...`}
                      disabled={isGuest && !isLoggedIn && messagesRemaining <= 0}
                      className="flex-1 bg-transparent border-none outline-none text-xs md:text-sm px-1 md:px-2 text-white placeholder:text-white/20 focus:ring-0"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!newMessage.trim() || (isGuest && !isLoggedIn && messagesRemaining <= 0)}
                      className={`w-9 h-9 md:w-11 md:h-11 rounded-[1rem] md:rounded-[1.25rem] flex items-center justify-center transition-all ${newMessage.trim() && !(isGuest && !isLoggedIn && messagesRemaining <= 0) ? "bg-[#741818] text-white hover:bg-[#8d1d1d]" : "bg-white/5 text-white/10"}`}
                    >
                      <FaPaperPlane size={12} md:size={14} />
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
            <ScrollArea className="flex-1">
              <div className="relative aspect-[4/5]">
                <img src={activeChat?.avatar ? `${import.meta.env.VITE_URL}${activeChat?.avatar}` : null} className="w-full h-full object-cover opacity-80" alt={activeChat?.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h2 className="text-3xl font-bold tracking-tight mb-1">{activeChat?.name}, {activeChat?.age}</h2>
                  <p className="text-white/30 text-xs font-bold uppercase flex items-center gap-2"><Heart size={14} className="text-[#741818]" /> {activeChat?.age ? `${activeChat.age} years old` : 'Online'}</p>
                </div>
              </div>
              <div className="p-8 space-y-8">
                <div>
                  <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">About Me</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-medium">{activeChat?.bio || "Your perfect adaptive companion."}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Next Milestone</h3>
                  <div className="space-y-3">
                    {unlockables.filter(u => u.level <= relationshipLevel).map((unlock, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div className="w-12 h-12 rounded-xl bg-[#741818]/20 flex items-center justify-center text-xl">{unlock.icon}</div>
                        <div><p className="text-xs font-bold text-white/80">{unlock.name}</p><p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Unlocked</p></div>
                      </div>
                    ))}
                    {unlockables.filter(u => u.level > relationshipLevel).slice(0, 1).map((locked, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 opacity-40 grayscale">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl"><Lock size={20} /></div>
                        <div><p className="text-xs font-bold text-white/60">{locked.name}</p><p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Level {locked.level} Required</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {showLevelUp && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
          <div className="bg-[#741818] text-white px-8 py-4 rounded-[2rem] border border-white/20 flex items-center gap-4 shadow-[0_0_40px_rgba(116,24,24,0.4)]">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Sparkles size={20} /></div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60">Level Up!</p>
              <p className="font-bold text-lg leading-none">You reached Level {relationshipLevel}</p>
            </div>
          </div>
        </div>
      )}

      {showUnlockModal && newUnlock && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#741818] to-[#0a0a0f] border border-yellow-500/30 rounded-[2rem] p-8 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles size={40} className="text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Content Unlocked!</h3>
            <p className="text-white/60 mb-6">{newUnlock.name}</p>
            {newUnlock.content && (
              <div className="mb-6 rounded-2xl overflow-hidden h-64 bg-black/20">
                {newUnlock.type === 'photo' ? (
                  <img src={`${import.meta.env.VITE_URL}${newUnlock.content}`} alt={newUnlock.name} className="w-full h-full object-cover" />
                ) : (
                  <video src={`${import.meta.env.VITE_URL}${newUnlock.content}`} className="w-full h-full object-cover" controls autoPlay />
                )}
              </div>
            )}
            <button onClick={() => setShowUnlockModal(false)} className="w-full py-3 bg-white text-black font-bold rounded-xl active:scale-95 transition-all">Awesome!</button>
          </div>
        </div>
      )}
    </Layout>
  );
}
