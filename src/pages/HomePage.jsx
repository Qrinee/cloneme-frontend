import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import video1 from '../assets/video2.mp4'
import video2 from '../assets/examplereel.mp4'
import { Heart, MessageCircle, Sparkles, Zap, ArrowRight, Flame, Crown, Moon, Shirt, Star, Plane, Diamond, Palette, Sun, Skull, Hand } from "lucide-react";
import { FaKiss } from "react-icons/fa";

const quickChatGirls = [
  { id: 1, name: "Sophia", age: 22, location: "Paris", tags: [{ label: "Sweet", icon: Heart }, { label: "Dress-up", icon: Shirt }], video: video1, online: true, response: "< 1 min", mood: "Ready for you" },
  { id: 2, name: "Emma", age: 24, location: "London", tags: [{ label: "Dominant", icon: Crown }, { label: "Kisser", icon: Heart }], video: video2, online: true, response: "< 2 min", mood: "Waiting for you" },
  { id: 3, name: "Olivia", age: 21, location: "NYC", tags: [{ label: "Night Queen", icon: Moon }, { label: "Hot", icon: Flame }], video: video1, online: true, response: "< 1 min", mood: "Let's have fun" },
  { id: 4, name: "Isabella", age: 23, location: "Tokyo", tags: [{ label: "Kawaii", icon: Star }, { label: "Shy", icon: Sparkles }], video: video2, online: true, response: "< 3 min", mood: "Be gentle with me" },
  { id: 5, name: "Ava", age: 25, location: "LA", tags: [{ label: "Beach", icon: Sun }, { label: "Wild", icon: Skull }], video: video1, online: false, response: "< 5 min", mood: "Let's escape" },
  { id: 6, name: "Mia", age: 20, location: "Berlin", tags: [{ label: "Artist", icon: Palette }, { label: "Dreamy", icon: Sparkles }], video: video2, online: true, response: "< 1 min", mood: "Create memories" },
  { id: 7, name: "Charlotte", age: 23, location: "Sydney", tags: [{ label: "Adventurer", icon: Plane }, { label: "Passion", icon: Flame }], video: video1, online: true, response: "< 2 min", mood: "Thrill me" },
  { id: 8, name: "Amelia", age: 22, location: "Dubai", tags: [{ label: "Luxury", icon: Diamond }, { label: "Royal", icon: Crown }], video: video2, online: true, response: "< 1 min", mood: "Treat me like royalty" },
];

const feedProfiles = [
  { id: 1, name: "Alice", age: 25, location: "Paris", tags: ["Sensual", "Romantic", "Flirty"], video: video1, likes: 1240, comments: 89, online: true, mood: "Missing you" },
  { id: 2, name: "Bella", age: 22, location: "Tokyo", tags: ["Cute", "Shy", "Teasing"], video: video2, likes: 890, comments: 45, online: true, mood: "Come say hi" },
  { id: 3, name: "Cathy", age: 30, location: "NYC", tags: ["Experienced", "Bold", "Daring"], video: video1, likes: 2100, comments: 156, online: false, mood: "Next time" },
  { id: 4, name: "Diana", age: 27, location: "London", tags: ["Fit", "Active", "Athletic"], video: video2, likes: 3200, comments: 234, online: true, mood: "Work out together" },
  { id: 5, name: "Eva", age: 24, location: "LA", tags: ["Free Spirit", "Artistic", "Wild"], video: video1, likes: 4500, comments: 312, online: true, mood: "Live in the moment" },
  { id: 6, name: "Fiona", age: 26, location: "Berlin", tags: ["Mysterious", "Deep", "Soul"], video: video2, likes: 780, comments: 56, online: false, mood: "Let's talk night" },
  { id: 7, name: "Grace", age: 23, location: "Seoul", tags: ["K-pop", "Dancer", "Cute"], video: video1, likes: 1890, comments: 145, online: true, mood: "Dance with me" },
  { id: 8, name: "Hannah", age: 28, location: "Sydney", tags: ["Beach", "Sunset", "Vibes"], video: video2, likes: 2650, comments: 198, online: true, mood: "Sunset vibes" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const girlsCarousel = useRef(null);
  const feedCarousel = useRef(null);

  const scrollCarousel = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({ left: direction * 340, behavior: 'smooth' });
    }
  };

  const handleStartChat = (profile) => {
    window.location.href = `/chat/${profile.id}`;
  };

  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto pb-8">
        
        {/* Hero Banner - More Provocative */}
        <div className="relative overflow-hidden rounded-3xl mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-[#000000] to-[#d62a2a] opacity-90" />
          <div className="absolute inset-0 opacity-20" />
          <div className="relative px-8 py-16 flex items-center justify-between">
            <div className="text-white max-w-xl">
              <h1 className="text-5xl font-bold mb-3">Hot AI girls are waiting</h1>
              <p className="text-xl opacity-95 mb-6">Connect with beautiful AI girls who are dying to chat with YOU</p>
              <button 
                onClick={() => document.getElementById('girls-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-[#DC2626] px-8 py-4 rounded-full font-bold text-lg flex items-center cursor-pointer gap-2  transition-transform shadow-lg"
              >
                Start Teasing <ArrowRight size={22} />
              </button>
            </div>
            <div className="hidden lg:flex gap-3">
              <div className="flex -space-x-6">
                {[video1, video2, video1, video2].map((vid, i) => (
                  <video key={i} src={vid} className="w-20 h-20 rounded-full border-4 border-white/40 object-cover" loop muted playsInline />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Online Now Section - More Provocative */}
        <section id="girls-section" className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold text-white flex gap-3 items-center"><Flame className="text-red-400"/> Hot & Ready Now</h2>
            </div>
            <span className="text-red-400 font-semibold">{quickChatGirls.filter(g => g.online).length} girls waiting for you</span>
          </div>

          <div className="relative">
            <button 
              onClick={() => scrollCarousel(girlsCarousel, -1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-4 rounded-full text-white transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            
            <div 
              ref={girlsCarousel}
              className="flex gap-5 overflow-x-auto scroll-smooth pb-6 px-10"
              style={{ scrollbarWidth: 'none' }}
            >
              {quickChatGirls.map((girl) => (
                <div 
                  key={girl.id}
                  className="flex-shrink-0 w-70 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300"
                  onClick={() => handleStartChat(girl)}
                  onMouseEnter={e => {
                    const vid = e.currentTarget.querySelector('video');
                    if (vid) vid.play().catch(() => {});
                  }}
                  onMouseLeave={e => {
                    const vid = e.currentTarget.querySelector('video');
                    if (vid) { vid.pause(); vid.currentTime = 0; }
                  }}
                >
                  <div className="relative aspect-[3/4]">
                    <video 
                      src={girl.video} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loop
                      muted
                      playsInline
                      preload="auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                    
                    {/* Online indicator */}
                    {girl.online && (
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-white text-xs font-bold">Online</span>
                      </div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-bold text-white text-2xl mb-5">{girl.name}, {girl.age}</h3>
 
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {girl.tags.map((tag, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-black-500/90 text-white text-xs font-bold rounded-full flex items-center gap-1">
                            <tag.icon size={12} />
                            {tag.label}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between ">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/jerk-off/${girl.id}`);
                          }}
                          className="bg-gradient-to-r from-red-800 to-red-900 cursor-pointer hover:from-red-700 hover:to-red-900 text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-1.5 transition-all shadow-lg"
                        >
                          <FaKiss size={16} />
                          Jerk off with {girl.name}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => scrollCarousel(girlsCarousel, 1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-4 rounded-full text-white transition-all "
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </section>

        {/* Featured Girls - More Provocative */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Crown className="text-red-400" size={28} />
              <h2 className="text-3xl font-bold text-white">Most Popular Tonight</h2>
            </div>
            <button className="text-red-400 font-semibold hover:underline">View All</button>
          </div>

          <div className="relative">
            <button 
              onClick={() => scrollCarousel(feedCarousel, -1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-4 rounded-full text-white transition-all "
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            
            <div 
              ref={feedCarousel}
              className="flex gap-5 overflow-x-auto scroll-smooth pb-6 px-10"
              style={{ scrollbarWidth: 'none' }}
            >
              {feedProfiles.map((profile) => (
                <article 
                  key={profile.id} 
                  className="flex-shrink-0 w-80 bg-[#0f0f14] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-red-600/20 transition-all cursor-pointer group"
                  onClick={() => handleStartChat(profile)}
                  onMouseEnter={e => {
                    const vid = e.currentTarget.querySelector('video');
                    if (vid) vid.play().catch(() => {});
                  }}
                  onMouseLeave={e => {
                    const vid = e.currentTarget.querySelector('video');
                    if (vid) { vid.pause(); vid.currentTime = 0; }
                  }}
                >
                  <div className="relative">
                    <video 
                      src={profile.video} 
                      className="w-full h-96 object-cover transition-transform duration-500"
                      loop
                      muted
                      playsInline
                      preload="auto"
                    />
                    {profile.online && (
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-white text-xs font-bold">Online</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    
                    {/* Provocative mood */}
                    <div className="absolute bottom-20 left-0 right-0 px-4">
                      <p className="text-red-300 text-lg font-medium italic">"{profile.mood}"</p>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-white text-xl">{profile.name}, {profile.age}</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {profile.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-red-900/40 text-red-300 text-xs font-semibold rounded-full border border-red-700/50">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
   
                      <button className=" bg-red-800 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer">
                       <MessageCircle size={15}/> Chat
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            <button 
              onClick={() => scrollCarousel(feedCarousel, 1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-4 rounded-full text-white transition-all hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </section>

        {/* CTA Section - More Provocative */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#DC2626] via-[#991B1B] to-[#DC2626] p-12 text-center">
          <div className="absolute inset-0 opacity-20" />
          <div className="relative">
            <Zap className="mx-auto text-yellow-300 mb-6" size={64} />
            <h2 className="text-5xl font-bold text-white mb-3 flex items-center justify-center gap-3">Ready for Some Fun? <Sparkles className="text-yellow-300" /></h2>
            <p className="text-white/90 text-xl mb-8">Join thousands of guys having the time of their lives chatting with our AI girls</p>
            <button 
              onClick={() => handleStartChat(quickChatGirls[0])}
              className="bg-white text-[#DC2626] px-12 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform inline-flex items-center gap-3 shadow-2xl"
            >
              <MessageCircle size={24} />
              Start Free & Chat Now <Heart className="text-red-500" size={24} />
            </button>
          </div>
        </div>

      </div>
    </Layout>
  );
}
