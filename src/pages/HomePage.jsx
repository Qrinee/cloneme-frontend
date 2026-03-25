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
      <div className="w-full max-w-7xl mx-auto pb-12 px-4">
        {/* Hero Banner - Refined & Minimalistic */}
        <div className="relative overflow-hidden rounded-[2rem] mb-12 mt-8 border border-white/5">
          <div className="absolute inset-0 bg-[#0a0a0f]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#741818]/10 via-transparent to-transparent opacity-40" />
          <div className="relative px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">Your AI <span className="text-[#a82525]">Girlfriend</span> awaits</h1>
              <p className="text-lg opacity-40 mb-8 leading-relaxed font-medium">Connect with beautiful, intelligent AI girls designed to match your energy. Private, secure, and always ready.</p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => document.getElementById('girls-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-black px-8 py-4 rounded-full font-bold text-base flex items-center cursor-pointer gap-2 transition-all hover:bg-white/90 active:scale-95"
                >
                  Explore Now <ArrowRight size={20} />
                </button>
                <button className="bg-white/5 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-full font-bold text-base transition-all hover:bg-white/10">
                  How it works
                </button>
              </div>
            </div>
            <div className="hidden lg:flex gap-4">
              <div className="flex -space-x-4">
                {[video1, video2, video1, video2].map((vid, i) => (
                  <div key={i} className="w-16 h-16 rounded-full border border-white/20 overflow-hidden bg-black/40 backdrop-blur-xl">
                    <video src={vid} className="w-full h-full object-cover opacity-60" loop muted playsInline />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Online Now Section */}
        <section id="girls-section" className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-xl border border-red-500/10">
                <Flame className="text-red-500" size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Hot & Ready</h2>
                <p className="text-white/30 text-xs uppercase tracking-widest font-bold mt-1">Direct from the community</p>
              </div>
            </div>
            <span className="text-green-500/80 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              {quickChatGirls.filter(g => g.online).length} Girls Live Now
            </span>
          </div>

          <div className="relative group/carousel">
            <button
              onClick={() => scrollCarousel(girlsCarousel, -1)}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/5 backdrop-blur-xl hover:bg-white/10 p-4 rounded-full text-white border border-white/10 transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>

            <div
              ref={girlsCarousel}
              className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-2"
            >
              {quickChatGirls.map((girl) => (
                <div
                  key={girl.id}
                  className="flex-shrink-0 w-72 rounded-3xl overflow-hidden cursor-pointer bg-white/5 border border-white/5 transition-all duration-300 hover:border-white/10"
                  onClick={() => handleStartChat(girl)}
                  onMouseEnter={e => {
                    const vid = e.currentTarget.querySelector('video');
                    if (vid) vid.play().catch(() => { });
                  }}
                  onMouseLeave={e => {
                    const vid = e.currentTarget.querySelector('video');
                    if (vid) { vid.pause(); vid.currentTime = 0; }
                  }}
                >
                  <div className="relative aspect-[3/4.2]">
                    <video
                      src={girl.video}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      loop
                      muted
                      playsInline
                      preload="auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent" />

                    {/* Online indicator */}
                    {girl.online && (
                      <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                        <span className="text-white text-[10px] font-bold uppercase tracking-widest">Live</span>
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex flex-col gap-1 mb-4">
                        <h3 className="font-bold text-white text-2xl tracking-tight">{girl.name}</h3>
                        <span className="text-white/40 text-xs font-medium uppercase tracking-widest">{girl.age} • {girl.location}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {girl.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-white/5 flex items-center gap-2">
                            <tag.icon size={12} className="opacity-40" />
                            {tag.label}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/jerk-off/${girl.id}`);
                        }}
                        className="w-full bg-[#741818] hover:bg-[#8d1d1d] text-white py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 border border-white/5"
                      >
                        Start Session
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollCarousel(girlsCarousel, 1)}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/5 backdrop-blur-xl hover:bg-white/10 p-4 rounded-full text-white border border-white/10 transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </section>

        {/* Featured Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-xl border border-yellow-500/10">
                <Crown className="text-yellow-500" size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Top Trending</h2>
                <p className="text-white/30 text-xs uppercase tracking-widest font-bold mt-1">Voted by the community</p>
              </div>
            </div>
            <button className="text-white/40 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="relative group/carousel-feed">
            <button
              onClick={() => scrollCarousel(feedCarousel, -1)}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/5 backdrop-blur-xl hover:bg-white/10 p-4 rounded-full text-white border border-white/10 transition-all opacity-0 group-hover/carousel-feed:opacity-100 hidden md:block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>

            <div
              ref={feedCarousel}
              className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-2"
            >
              {feedProfiles.map((profile) => (
                <article
                  key={profile.id}
                  className="flex-shrink-0 w-80 bg-white/5 rounded-[2rem] overflow-hidden border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
                  onClick={() => handleStartChat(profile)}
                  onMouseEnter={e => {
                    const vid = e.currentTarget.querySelector('video');
                    if (vid) vid.play().catch(() => { });
                  }}
                  onMouseLeave={e => {
                    const vid = e.currentTarget.querySelector('video');
                    if (vid) { vid.pause(); vid.currentTime = 0; }
                  }}
                >
                  <div className="relative">
                    <video
                      src={profile.video}
                      className="w-full h-96 object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                      loop
                      muted
                      playsInline
                      preload="auto"
                    />
                    {profile.online && (
                      <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-white text-[10px] font-bold uppercase tracking-widest">Live</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="flex flex-col gap-1 mb-4">
                      <h3 className="font-bold text-white text-xl tracking-tight">{profile.name}, {profile.age}</h3>
                      <p className="text-white/30 text-xs italic">"{profile.mood}"</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {profile.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white/5 text-white/50 text-[9px] font-bold uppercase tracking-widest rounded-lg border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-white/5 hover:bg-white/10 text-white/80 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all border border-white/10 flex items-center justify-center gap-2">
                      <MessageCircle size={14} className="opacity-40" /> Open Chat
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <button
              onClick={() => scrollCarousel(feedCarousel, 1)}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/5 backdrop-blur-xl hover:bg-white/10 p-4 rounded-full text-white border border-white/10 transition-all opacity-0 group-hover/carousel-feed:opacity-100 hidden md:block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
