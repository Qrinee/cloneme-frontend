import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, Heart, Gift, Zap, Crown, Star, MessageCircle, X, MoreHorizontal, Paperclip, Smile, Lock, Play, Check, Hand, Mic, Droplets, Waves, Battery, Flame } from "lucide-react";
import Layout from "../components/Layout";
import video1 from '../assets/video2.mp4'
import video2 from '../assets/examplereel.mp4'
import { useAuthFetch } from "@/utils/authFetch";
import { useLayoutContext } from "../components/LayoutContext";

const actionButtons = [
  { id: 1, label: "Open Mouth", icon: Mic, messagesNeeded: 10 },
];

const presetMessages = [
  "You're so beautiful 💕",
  "I want you so bad",
  "Show me more",
  "You're amazing!",
  "Let's have fun together",
  "I can't resist you",
];

export default function JerkOffPage() {
  const { id } = useParams(); // This is chatbotId
  const navigate = useNavigate();
  const authFetch = useAuthFetch();
  const { isLoggedIn } = useLayoutContext();
  const [girls, setGirls] = useState();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [message, setMessage] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [likeAnimation, setLikeAnimation] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch girlfriend data
      fetch(import.meta.env.VITE_API_URL + '/girlfriends/' + id)
        .then(res => res.json())
        .then(data => {
          setGirls(data);
          // For non-logged in users, show initial message only
          if (!isLoggedIn && data.girlfriend?.initialMessage) {
            setMessages([{
              id: 1,
              text: data.girlfriend.initialMessage,
              sender: "girl",
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
          }
        })
        .catch(err => console.error('Error fetching girlfriend:', err));

      // Only fetch chat messages if user is logged in
      if (isLoggedIn) {
        fetchChatMessages();
      }
    }
  }, [id, isLoggedIn]);

  useEffect(() => {
    // Smooth scroll to bottom when new messages appear
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  // Change title when user loses focus
  useEffect(() => {
    const originalTitle = document.title;

    const handleBlur = () => {
      document.title = "Don't leave me alone! 💕";
    };

    const handleFocus = () => {
      document.title = originalTitle;
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.title = originalTitle;
    };
  }, []);

  const fetchChatMessages = async () => {
    try {
      // Get or create chat using chatbotId
      const res = await authFetch(`${import.meta.env.VITE_URL}/api/chats/${id}`);
      const data = await res.json();
      
      console.log('JerkOffPage - fetchChatMessages:', data);
      
      if (data.type === "success") {
        setCurrentChat(data.chat);
        // Convert messages to UI format
        setMessages(
          data.chat.messages.map((m, index) => ({
            id: m._id || index,
            text: m.content,
            sender: m.role === "user" ? "user" : "girl",
            time: m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'now'
          }))
        );
      } else {
        console.error('Error fetching chat:', data.message);
      }
    } catch (error) {
      console.error('Error fetching chat:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !id) return;

    // For non-logged in users, redirect to login
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const text = message;
    const userMessage = {
      id: Date.now(),
      text: text,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const res = await authFetch(
        `${import.meta.env.VITE_URL}/api/chats/${id}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: { content: text } })
        }
      );

      const data = await res.json();
      console.log('JerkOffPage - sendMessage:', data);
      
      if (data.type === "success") {
        // Add AI response
        const aiMessage = {
          id: Date.now() + 1,
          text: data.chat.messages[data.chat.messages.length - 1].content,
          sender: "girl",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickMessage = (text) => {
    setMessage(text);
    handleSendMessage();
  };


  return (
    <Layout>
      {girls ? (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-0 bg-[#0a0a0f]" style={{ height: '85vh' }}>
          {/* Main Content - Video with Chat Overlay */}
          <div className="max-w-[550px] w-full md:w-auto relative flex flex-col h-full md:h-full order-1 border-x border-white/5">
            <div className="relative flex-1 rounded-none overflow-hidden w-full h-[50vh] md:h-full bg-black">
              <video
                ref={videoRef}
                src={girls && girls.girlfriend.mainVideo}
                className="h-full object-cover w-full"
                muted
                loop
                autoPlay
              />

              {/* Video Overlay Gradient - Minimalist & Subtle */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-black/20" />

              {/* Chat Overlay on Video */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent">
                <div
                  className="relative max-h-[320px] overflow-y-auto custom-scrollbar space-y-3 mb-6 pr-2"
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
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 backdrop-blur-xl border border-white/5 px-4 py-2.5 rounded-2xl rounded-bl-none">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input - Subtler Glass Look */}
                <div className="flex items-center gap-3 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={isLoggedIn ? `Message ${girls && girls.girlfriend.name}...` : "Type a message..."}
                    className="flex-1 bg-white/5 backdrop-blur-xl text-white px-5 py-3 rounded-full focus:outline-none border border-white/10 placeholder:text-white/20 transition-colors focus:border-white/20"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || isLoading}
                    className={`cursor-pointer p-3 rounded-full transition-all text-white/80 active:scale-95 ${message.trim() && !isLoading 
                        ? 'bg-[#741818] hover:bg-[#8d1d1d]' 
                        : 'bg-white/10 cursor-not-allowed'
                    }`}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>

              {/* Girl Info at Top - Clean header */}
              <div className="absolute top-4 left-4 right-4">
                <div className="flex items-center justify-between bg-black/20 backdrop-blur-md px-4 py-3 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <h3 className="text-white text-base font-bold tracking-tight leading-none">{girls && girls.girlfriend.name}</h3>
                      <span className="text-white/40 text-[10px] uppercase tracking-tighter mt-0.5">{girls && girls.girlfriend.age} Years Old</span>
                    </div>
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-green-500/10 border border-green-500/10 text-green-400 text-[9px] uppercase tracking-widest font-bold">
                        <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                        Live
                      </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={async () => {
                        // Trigger like animation
                        setLikeAnimation(true);
                        setTimeout(() => setLikeAnimation(false), 600);
                        
                        try {
                          await authFetch(`${import.meta.env.VITE_API_URL}/users/favorites`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ girlfriendId: girls?.girlfriend?._id })
                          });
                        } catch (err) {
                          console.error("Failed to add favorite:", err);
                        }
                      }}
                      className={`cursor-pointer p-2 rounded-lg transition-all text-white/40 hover:text-white/80 ${likeAnimation ? 'animate-ping' : 'hover:bg-white/5'}`}
                    >
                      <Heart size={16} className={likeAnimation ? 'text-red-500 fill-current' : ''} />
                    </button>
                    {/* <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white/80">
                      <MoreHorizontal size={16} />
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Action Buttons - Minimalist Control Panel */}
          <div className="w-full md:w-[320px] flex flex-col bg-[#0a0a0f] border-l border-white/5 h-[40vh] md:h-full order-2">
            {/* Header */}
            <div className="p-6">
              <h3 className="text-white/90 font-bold text-lg tracking-tight">Interactions</h3>
              <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">Unlock actions via chat</p>
            </div>

            {/* Action Buttons List */}
            <div className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
              {actionButtons.map((btn) => {
                const userMessageCount = messages.filter(m => m.sender === 'user').length;
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
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
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

            {/* Bottom Footer/Status - Stripped down */}
            <div className="p-6 mt-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/20 text-[9px] font-bold uppercase tracking-[0.2em]">Affinity</span>
                <span className="text-white/40 text-[9px] font-bold tracking-widest">LVL {Math.floor(messages.filter(m => m.sender === 'user').length / 5) + 1}</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white/30"
                  style={{ width: `${(messages.filter(m => m.sender === 'user').length % 5) * 20}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : null}

    </Layout>
  );
}
