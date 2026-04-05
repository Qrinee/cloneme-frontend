import { useEffect, useRef, useState } from "react";
import { Crown, ArrowRight, MessageCircle } from "lucide-react";
import video1 from '../../assets/video2.mp4'
import video2 from '../../assets/examplereel.mp4'

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

export default function FeaturedSection() {
    const [girls, setGirls] = useState();
    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + '/girlfriends')
            .then(response => response.json())
            .then(data => {
                // Randomize the position of girlfriends
                const shuffled = [...data.girlfriends].sort(() => Math.random() - 0.5);
                setGirls({ ...data, girlfriends: shuffled });
            });
    }, [])
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: direction * 340, behavior: 'smooth' });
    }
  };

  const handleStartChat = (profile) => {
    window.location.href = `/chat/${profile._id}`;
  };

  return (
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
        <button className="text-white/40 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2" aria-label="View all profiles">
          View All <ArrowRight size={14} />
        </button>
      </div>

      <div className="relative group/carousel-feed">
        <button
          onClick={() => scrollCarousel(-1)}
          aria-label="Scroll carousel left"
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/5 backdrop-blur-xl hover:bg-white/10 p-4 rounded-full text-white border border-white/10 transition-all opacity-0 group-hover/carousel-feed:opacity-100 hidden md:block"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-2"
        >
          {girls && girls.girlfriends.map((profile) => (
            <article
              key={profile._id}
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
                  src={profile.mainVideo ? `${import.meta.env.VITE_URL}${profile.mainVideo}` : null}
                  className="w-full h-96 object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                  loop
                  muted
                  playsInline
                  preload="auto"
                />
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-white text-[10px] font-bold uppercase tracking-widest">Live</span>
                  </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex flex-col gap-1 mb-4">
                  <h3 className="font-bold text-white text-xl tracking-tight">{profile.name}, {profile.age}</h3>
                  <p className="text-white/30 text-xs italic line-clamp-2">{profile.bio?.length > 80 ? profile.bio.substring(0, 80) + '...' : profile.bio}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {profile.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/5 text-white/50 text-[9px] font-bold uppercase tracking-widest rounded-lg border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="cursor-pointer w-full bg-white/5 hover:bg-white/10 text-white/80 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all border border-white/10 flex items-center justify-center gap-2">
                  <MessageCircle size={14} className="opacity-40" /> Open Chat
                </button>
              </div>
            </article>
          ))}
        </div>

        <button
          onClick={() => scrollCarousel(1)}
          aria-label="Scroll carousel right"
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/5 backdrop-blur-xl hover:bg-white/10 p-4 rounded-full text-white border border-white/10 transition-all opacity-0 group-hover/carousel-feed:opacity-100 hidden md:block"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
}