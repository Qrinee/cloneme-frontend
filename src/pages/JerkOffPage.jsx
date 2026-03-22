import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, Heart, Gift, Zap, Crown, Star, MessageCircle, X, MoreHorizontal, Paperclip, Smile, Lock, Play, Check, Hand, Mic, Droplets, Waves, Battery, Flame } from "lucide-react";
import Layout from "../components/Layout";
import video1 from '../assets/video2.mp4'
import video2 from '../assets/examplereel.mp4'

const quickChatGirls = [
  { id: 1, name: "Sophia", age: 22, location: "Paris", tags: [{ label: "Sweet", icon: Heart }, { label: "Dress-up", icon: Star }], video: video1, online: true, response: "< 1 min", mood: "Ready for you" },
  { id: 2, name: "Emma", age: 24, location: "London", tags: [{ label: "Dominant", icon: Crown }, { label: "Kisser", icon: Heart }], video: video2, online: true, response: "< 2 min", mood: "Waiting for you" },
  { id: 3, name: "Olivia", age: 21, location: "NYC", tags: [{ label: "Night Queen", icon: Star }, { label: "Hot", icon: Heart }], video: video1, online: true, response: "< 1 min", mood: "Let's have fun" },
  { id: 4, name: "Isabella", age: 23, location: "Tokyo", tags: [{ label: "Kawaii", icon: Star }, { label: "Shy", icon: Smile }], video: video2, online: true, response: "< 3 min", mood: "Be gentle with me" },
  { id: 5, name: "Ava", age: 25, location: "LA", tags: [{ label: "Beach", icon: Star }, { label: "Wild", icon: Zap }], video: video1, online: false, response: "< 5 min", mood: "Let's escape" },
  { id: 6, name: "Mia", age: 20, location: "Berlin", tags: [{ label: "Artist", icon: Star }, { label: "Dreamy", icon: Smile }], video: video2, online: true, response: "< 1 min", mood: "Create memories" },
  { id: 7, name: "Charlotte", age: 23, location: "Sydney", tags: [{ label: "Adventurer", icon: Star }, { label: "Passion", icon: Heart }], video: video1, online: true, response: "< 2 min", mood: "Thrill me" },
  { id: 8, name: "Amelia", age: 22, location: "Dubai", tags: [{ label: "Luxury", icon: Crown }, { label: "Royal", icon: Crown }], video: video2, online: true, response: "< 1 min", mood: "Treat me like royalty" },
];

const actionButtons = [
  { id: 1, label: "Open Mouth", icon: Mic, messagesNeeded: 0 },
  { id: 2, label: "Shake Hand", icon: Hand, messagesNeeded: 2 },
  { id: 3, label: "Lick", icon: Droplets, messagesNeeded: 4 },
  { id: 4, label: "Touch", icon: Waves, messagesNeeded: 6 },
  { id: 5, label: "Stroke", icon: Flame, messagesNeeded: 8 },
  { id: 6, label: "Cum", icon: Droplets, messagesNeeded: 10 },
  { id: 7, label: "Spank", icon: Hand, messagesNeeded: 12 },
  { id: 8, label: "Deep Throat", icon: Mic, messagesNeeded: 15 },
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
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm so glad you're here 💕", sender: "girl", time: "now" },
    { id: 2, text: "I've been waiting for someone like you...", sender: "girl", time: "now" },
  ]);

  const girl = quickChatGirls.find(g => g.id === parseInt(id)) || quickChatGirls[0];

 

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

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That feels so good! 💕",
        "You're making me hot! 🔥",
        "Tell me more baby...",
        "I love when you talk to me like that 💋",
        "Keep going, I'm enjoying this!",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: "girl",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };

  const handleQuickMessage = (text) => {
    setMessage(text);
    handleSendMessage();
  };


  return (
    <Layout>
      <div className="flex justify-center items-center gap-0" style={{height: '85vh'}}>
        {/* Main Content - Video with Chat Overlay */}
        <div className="max-w-[550px] w-full relative flex flex-col h-full">
          <div className="relative flex-1 rounded-none overflow-hidden w-full bg-black">
            <video
              ref={videoRef}
              src={girl.video}
              className="h-full object-cover"
              muted
              loop
              autoPlay
            />
            
            {/* Video Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t  from-black/80 via-transparent to-black/30" />
            
            {/* Chat Overlay on Video */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <div className="relative max-h-[300px] overflow-hidden custom-scrollbar space-y-2 mb-4" ref={chatContainerRef}>
                {messages.map((msg, index) => {
                  // Calculate opacity based on message position - newer messages (higher index) have higher opacity
                  const opacity = Math.min(1, 0.3 + (index * 0.1));
                  return (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : msg.sender === 'system' ? 'justify-center' : 'justify-start'}`}
                  >
                    {msg.sender === 'system' ? (
                      <span className="text-yellow-400 text-sm bg-yellow-400/10 px-4 py-2 rounded-full" style={{ opacity }}>
                        {msg.text}
                      </span>
                    ) : (
                      <div className={`max-w-[70%] ${msg.sender === 'user' ? 'order-2' : ''}`}>
                        <div 
                          className={`px-4 py-2 rounded-2xl text-sm ${
                            msg.sender === 'user' 
                              ? 'bg-red-800 text-white' 
                              : 'bg-black/50 text-white backdrop-blur-sm'
                          }`}
                          style={{ opacity }}
                        >
                          {msg.text}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              </div>
              
              {/* Chat Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Send a message..."
                  className="flex-1 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-900 border border-white/20"
                />
                <button 
                  onClick={handleSendMessage}
                  className="p-4 bg-red-800 rounded-full  hover:red-500 transition-all"
                >
                  <Send className="text-white" size={20} />
                </button>
              </div>
            </div>
            
            {/* Girl Info at Top */}
            <div className="absolute top-4 left-4 right-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-white text-xl font-bold">{girl.name}</h3>
                  <span className="text-white/70">{girl.age}</span>
                  {girl.online && (
                    <span className="flex items-center gap-1 text-green-400 text-xs">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Online
                    </span>
                  )}
                </div>
                <button className="p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors">
                  <MoreHorizontal className="text-white/70" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Action Buttons */}
        <div className="w-[320px] flex flex-col bg-black rounded-none h-full">
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <h3 className="text-white font-bold text-lg text-center">Actions</h3>
            <p className="text-white/50 text-sm text-center mt-1">Tap to interact with {girl.name}</p>
          </div>

          {/* Action Buttons List */}
          <div className="flex-1 p-2 space-y-1 overflow-y-auto">
            {actionButtons.map((btn) => {
              const userMessageCount = messages.filter(m => m.sender === 'user').length;
              const isUnlocked = userMessageCount >= btn.messagesNeeded;
              
              return (
                <button
                  key={btn.id}
                  disabled={!isUnlocked}
                  className={`w-full p-3 rounded-lg flex items-center justify-between transition-all ${
                    !isUnlocked 
                      ? 'bg-white/5 text-white/30 cursor-not-allowed' 
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <btn.icon className="w-5 h-5" />
                    <span className="font-medium">{btn.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {!isUnlocked ? (
                      <>
                        <Lock className="w-4 h-4" />
                        <span className="text-xs text-white/30">{btn.messagesNeeded} msgs</span>
                      </>
                    ) : (
                      <button 
                        onClick={() => console.log('Play:', btn.label)}
                        className="p-2 bg-red-800 hover:bg-red-500 rounded flex items-center gap-1"
                      >
                        <Play className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </button>
              );
            })}
          </div>


        </div>
      </div>
    </Layout>
  );
}
