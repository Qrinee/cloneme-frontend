import { useNavigate } from "react-router-dom";
import { useAuthFetch } from "../utils/authFetch";
import Layout from "../components/Layout";
import { Heart, MessageCircle, Sparkles, Crown, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { X } from "lucide-react";

export default function CollectionPage() {
  const navigate = useNavigate();
  const authFetch = useAuthFetch();
  const [activeTab, setActiveTab] = useState("favorites");
  const [girlfriends, setGirlfriends] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, girlId: null, girlName: "" });

  useEffect(() => {
    const fetchGirlfriends = async () => {
      setIsLoading(true);
      try {
        if (activeTab === "created") {
          const res = await authFetch(`${import.meta.env.VITE_API_URL}/girlfriends/my`);
          const data = await res.json();
          if (data.type === "success") {
            setGirlfriends(data.girlfriends);
          }
        } else {
          const res = await authFetch(`${import.meta.env.VITE_API_URL}/users/favorites`);
          const data = await res.json();
          if (data.type === "success") {
            setFavorites(data.favorites);
          }
        }
      } catch (err) {
        console.error("Failed to fetch collection:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGirlfriends();
  }, [activeTab]);

  const handleChat = (girl) => {
    navigate(`/chat/${girl._id}`);
  };

  const handleRemove = async () => {
    if (!deleteModal.girlId) return;
    try {
      // Use different endpoint based on tab: favorites tab uses /users/favorites, created tab uses /girlfriends
      const endpoint = activeTab === "created" 
        ? `${import.meta.env.VITE_API_URL}/girlfriends/${deleteModal.girlId}`
        : `${import.meta.env.VITE_API_URL}/users/favorites/${deleteModal.girlId}`;
      
      await authFetch(endpoint, {
        method: "DELETE"
      });
      if (activeTab === "created") {
        setGirlfriends(prev => prev.filter(g => g._id !== deleteModal.girlId));
      } else {
        setFavorites(prev => prev.filter(g => g._id !== deleteModal.girlId));
      }
      setDeleteModal({ open: false, girlId: null, girlName: "" });
    } catch (err) {
      console.error(err);
      setDeleteModal({ open: false, girlId: null, girlName: "" });
    }
  };

  const openDeleteModal = (girl) => {
    setDeleteModal({ open: true, girlId: girl._id, girlName: girl.name });
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
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1,2,3,4].map((i) => (
                <div key={i} className="bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/5 animate-pulse">
                  <div className="aspect-[3/4.2] bg-white/10" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-white/10 rounded w-1/2" />
                    <div className="h-4 bg-white/10 rounded w-1/3" />
                    <div className="h-10 bg-white/10 rounded-2xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === "favorites" ? (
            favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {favorites.map((girl) => (
                  <div 
                    key={girl._id}
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
                        src={girl.mainVideo ? `${import.meta.env.VITE_URL}${girl.mainVideo}` : null}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        loop
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent" />
                      
                      {/* Online indicator */}
                      <div className="absolute top-5 right-5 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        <span className="text-white text-[10px] font-bold uppercase tracking-widest">Live</span>
                      </div>
                      
                      {/* Unsave button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(girl);
                        }}
                        className="absolute top-5 left-5 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white hover:text-red-500 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={18} />
                      </button>

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex flex-col gap-1 mb-4">
                          <h3 className="font-bold text-white text-2xl tracking-tight">{girl.name}</h3>
                          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{girl.age} • {girl.relationship || "Stranger"}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {girl.tags?.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white/5 text-white/50 text-[9px] font-bold uppercase tracking-widest rounded-lg border border-white/5">
                              {tag.label || tag}
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
            <>
              {girlfriends.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {girlfriends.map((girl) => (
                    <div 
                      key={girl._id}
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
                        {girl.mainVideo ? (
                          <video
                            src={`${import.meta.env.VITE_URL}${girl.mainVideo}`}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            loop
                            muted
                            playsInline
                          />
                        ) : girl.mainPhoto ? (
                          <img
                            src={girl.mainPhoto ? `${import.meta.env.VITE_URL}${girl.mainPhoto}` : null}
                            alt={girl.name}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-white/10" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent" />
                        
                        {/* Online indicator */}
                        <div className="absolute top-5 right-5 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          <span className="text-white text-[10px] font-bold uppercase tracking-widest">Live</span>
                        </div>
                        
                        {/* Delete button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteModal(girl);
                          }}
                          className="absolute top-5 left-5 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white hover:text-red-500 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={18} />
                        </button>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex flex-col gap-1 mb-4">
                            <h3 className="font-bold text-white text-2xl tracking-tight">{girl.name}</h3>
                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{girl.age} • {girl.relationship || "Stranger"}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-6">
                            {girl.tags?.slice(0, 2).map((tag, idx) => (
                              <span key={idx} className="px-3 py-1 bg-white/5 text-white/50 text-[9px] font-bold uppercase tracking-widest rounded-lg border border-white/5">
                                {tag.label || tag}
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
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModal.open} onOpenChange={(open) => !open && setDeleteModal({ open: false, girlId: null, girlName: "" })}>
        <DialogContent className="bg-[#0a0a0f] border-red-900/30 text-white max-w-sm mx-4">
          <DialogHeader>
            <div className="flex items-center justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-400" />
              </div>
            </div>
            <DialogTitle className="text-xl font-bold text-center">Remove Companion</DialogTitle>
            <DialogDescription className="text-white/40 text-center text-sm">
              Are you sure you want to remove <span className="text-white font-bold">{deleteModal.girlName}</span> from your collection? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 mt-4">
            <Button
              onClick={() => setDeleteModal({ open: false, girlId: null, girlName: "" })}
              className="flex-1 bg-white/10 text-white hover:bg-white/20 border border-white/10 font-bold"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRemove}
              className="flex-1 bg-red-600 text-white hover:bg-red-500 font-bold"
            >
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
