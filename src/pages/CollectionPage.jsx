import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Heart, MessageCircle, Sparkles, Crown, Star, MapPin, Trash2 } from "lucide-react";
import video1 from '../assets/video2.mp4'
import video2 from '../assets/examplereel.mp4'

// Mock saved/favorited AI girlfriends
const savedGirlsArr = [
  { id: 1, name: "Sophia", age: 22, location: "Paris", tags: ["Sweet", "Romantic"], video: video1, online: true, mood: "Missing you", savedAt: "2 hours ago", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" },
  { id: 2, name: "Emma", age: 24, location: "London", tags: ["Dominant", "Bold"], video: video2, online: true, mood: "Waiting for you", savedAt: "1 day ago", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop" },
  { id: 3, name: "Olivia", age: 21, location: "NYC", tags: ["Night Queen", "Hot"], video: video1, online: true, mood: "Let's have fun", savedAt: "3 days ago", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop" },
  { id: 4, name: "Isabella", age: 23, location: "Tokyo", tags: ["Kawaii", "Shy"], video: video2, online: false, mood: "Be gentle with me", savedAt: "1 week ago", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop" },
  { id: 5, name: "Ava", age: 25, location: "LA", tags: ["Beach", "Wild"], video: video1, online: true, mood: "Let's escape", savedAt: "2 weeks ago", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop" },
  { id: 6, name: "Mia", age: 20, location: "Berlin", tags: ["Artist", "Dreamy"], video: video2, online: true, mood: "Create memories", savedAt: "3 weeks ago", avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=200&h=200&fit=crop" },
];

export default function CollectionPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("favorites");
  const [girls, setGirls] = useState(savedGirlsArr);

  const handleChat = (girl) => {
    navigate(`/chat/${girl.id}`);
  };

  const handleRemove = (girlId) => {
    setGirls(prev => prev.filter(g => g.id !== girlId));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#0a0a0f] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header - Refined */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full mb-4">
                <Crown size={12} className="text-[#741818]" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Premium Vault</span>
              </div>
              <h1 className="text-5xl font-bold text-white tracking-tighter">My Collection</h1>
              <p className="text-white/30 mt-2 font-medium tracking-wide">Your carefully curated AI companionship circle.</p>
            </div>

            {/* Tabs - Modern Glass Pill */}
            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl">
              <button
                onClick={() => setActiveTab("favorites")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "favorites" 
                    ? "bg-[#741818] text-white" 
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                <Heart size={16} fill={activeTab === "favorites" ? "currentColor" : "none"} />
                Favorites
              </button>
              <button
                onClick={() => setActiveTab("created")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "created" 
                    ? "bg-[#741818] text-white" 
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                <Sparkles size={16} fill={activeTab === "created" ? "currentColor" : "none"} />
                Created
              </button>
            </div>
          </div>

          {/* Grid of cards */}
          {activeTab === "favorites" ? (
            girls.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {girls.map((girl) => (
                  <div 
                    key={girl.id}
                    className="group relative bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500"
                  >
                    {/* Media Area */}
                    <div 
                      className="relative aspect-[3/4.2] overflow-hidden cursor-pointer"
                      onClick={() => handleChat(girl)}
                      onMouseEnter={e => {
                        const vid = e.currentTarget.querySelector('video');
                        if (vid) vid.play().catch(() => {});
                      }}
                      onMouseLeave={e => {
                        const vid = e.currentTarget.querySelector('video');
                        if (vid) {
                          vid.pause();
                          vid.currentTime = 0;
                        }
                      }}
                    >
                      <video
                        src={girl.video}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        loop
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent" />
                      
                      {/* Online indicator */}
                      {girl.online && (
                        <div className="absolute top-5 right-5 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          <span className="text-white text-[10px] font-bold uppercase tracking-widest">Live</span>
                        </div>
                      )}
                      
                      {/* Unsave button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(girl.id);
                        }}
                        className="absolute top-5 left-5 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white hover:text-red-500 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={18} />
                      </button>

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex flex-col gap-1 mb-4">
                          <h3 className="font-bold text-white text-2xl tracking-tight">{girl.name}</h3>
                          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{girl.age} • {girl.location}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {girl.tags.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white/5 text-white/50 text-[9px] font-bold uppercase tracking-widest rounded-lg border border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleChat(girl);
                          }}
                          className="w-full py-3.5 bg-[#741818] hover:bg-[#8d1d1d] text-white font-bold rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                        >
                          <MessageCircle size={18} />
                          Resume Chat
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/5">
                  <Heart size={40} className="text-white/10" strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight mb-2">No favorites yet</h3>
                <p className="text-white/30 max-w-sm mb-10 font-medium">Explore and discover companions that match your energy by exploring the gallery.</p>
                <button
                  onClick={() => navigate("/discover")}
                  className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all active:scale-95 cursor-pointer"
                >
                  Discover Connections
                </button>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/5">
                <Sparkles size={40} className="text-white/10" strokeWidth={1} />
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight mb-2">The Lab is Empty</h3>
              <p className="text-white/30 max-w-sm mb-10 font-medium">You haven't crafted any unique AI companions yet. Start building your perfect match.</p>
              <button
                onClick={() => navigate("/create-girl")}
                className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all active:scale-95 cursor-pointer"
              >
                Create AI Companion
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
