import { useEffect, useState } from "react";
import { Search, Zap, MessageCircle } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useLayoutContext } from "../LayoutContext";

import imgGirls from "../../assets/task_01kmwzmaxbfbtrtm45b78g5cv6_1774794217_img_0.webp";
import imgAnime from "../../assets/anime.jpg";
import imgMen from "../../assets/men.jpg";

const mainCategories = [
  { id: "girls", name: "Girls", image: imgGirls },
  { id: "anime", name: "Anime", image: imgAnime },
  { id: "men", name: "Men", image: imgMen }
];

const subCategories = [
  "All",
  "Flirty",
  "Romantic",
  "Bold",
  "Shy",
  "Cute",
  "18-21",
  "22-30",
  "30+"
];

export default function FeaturedSection() {
  const [girls, setGirls] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useLayoutContext();

  const activeCategory = searchParams.get("category") || "girls";
  const [activeSubCategory, setActiveSubCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Sync subcategory reset when main category changes
  useEffect(() => {
    setActiveSubCategory("All");
  }, [activeCategory]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/girlfriends')
      .then(response => response.json())
      .then(data => {
        // Randomize the position of girlfriends
        const shuffled = [...data.girlfriends].sort(() => Math.random() - 0.5);
        setGirls(shuffled);
      })
      .catch(err => console.error("Error fetching girlfriends:", err));
  }, []);

  const handleCategorySelect = (category) => {
    setSearchParams({ category });
  };

  const handleStartChat = async (profile) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/chats`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ chatbotId: profile._id || profile.id }),
        });
        const data = await res.json();
        if (data.chat?._id) {
          navigate(`/jerk-off/${profile._id || profile.id}`);
          return;
        }
      } catch (e) {
        console.error("Error creating chat:", e);
      }
    }
    navigate(`/jerk-off/${profile._id || profile.id}`);
  };

  const filteredGirls = girls.filter((girl) => {
    // 0. Only show active characters
    if (girl.status !== 'active') return false;

    // 1. Search query filter
    if (searchQuery && !girl.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // 2. Main Category Filter
    const tagsLower = girl.tags?.map(t => t.toLowerCase()) || [];
    const isMale = tagsLower.includes("male") || tagsLower.includes("men") || tagsLower.includes("mężczyzna");
    const isAnime = tagsLower.includes("anime");

    const catLower = activeCategory.toLowerCase();
    const isAnimeTab = catLower === "anime";
    const isMenTab = catLower === "men" || catLower === "mężczyźni" || catLower === "mezczyzni" || catLower === "mężczyzna";
    const isGirlsTab = !isAnimeTab && !isMenTab;

    if (isGirlsTab) {
      if (isMale) return false;
      if (isAnime) return false; // Realistic girls only
    } else if (isAnimeTab) {
      if (!isAnime) return false;
    } else if (isMenTab) {
      if (!isMale) return false;
    }

    // 3. Sub-category filter within active main category
    if (activeSubCategory === "All") return true;

    if (activeSubCategory === "18-21") return girl.age >= 18 && girl.age <= 21;
    if (activeSubCategory === "22-30") return girl.age >= 22 && girl.age <= 30;
    if (activeSubCategory === "30+") return girl.age > 30;

    const searchTarget = `${girl.tags?.join(" ")} ${girl.bio} ${girl.description || ''}`.toLowerCase();
    return searchTarget.includes(activeSubCategory.toLowerCase());
  });

  return (
    <section className="mb-20 mt-12">
      {/* Category Card Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {mainCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategorySelect(cat.id)}
            className={`relative aspect-[21/9] md:aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer group border transition-all duration-300 ${activeCategory === cat.id
              ? "border-[#e11d48] shadow-lg shadow-[#e11d48]/15 scale-[1.02]"
              : "border-white/5 hover:border-white/10 hover:scale-[1.01]"
              }`}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-2xl font-black uppercase tracking-wider drop-shadow-md">
                {cat.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
        <div className="relative w-full md:w-64 flex-shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
          <input
            type="text"
            placeholder="Search character..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#12121a] border border-white/5 text-white pl-11 pr-4 py-2.5 rounded-full focus:outline-none focus:border-white/20 transition-colors text-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar w-full pb-2 md:pb-0">
          {subCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveSubCategory(cat)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeSubCategory === cat
                ? "bg-transparent text-white border border-[#e11d48]"
                : "bg-[#12121a] text-white/70 hover:bg-[#1a1a24] hover:text-white border border-transparent"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Characters */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {filteredGirls.map((profile) => (
          <article
            key={profile._id || profile.id}
            className="relative bg-[#12121a] border border-white/5 hover:border-white/10 rounded-3xl overflow-hidden cursor-pointer group aspect-[3/4.2] transition-all duration-300 hover:shadow-2xl hover:shadow-[#0a0a0f]/80"
            onClick={() => handleStartChat(profile)}
          >
            <img
              src={profile.mainPhoto ? `${import.meta.env.VITE_URL}${profile.mainPhoto}` : null}
              alt={profile.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            />



            {/* Bottom Info Gradient */}
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent flex flex-col justify-end min-h-[40%]">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-white text-[22px] tracking-tight">
                  {profile.name}
                </h3>
                <span className="font-medium text-white/80 text-[20px]">{profile.age}</span>
              </div>
              <p className="text-white/70 text-sm line-clamp-2 leading-relaxed mb-4">
                {profile.bio}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartChat(profile);
                }}
                className="w-full bg-[#e11d48]/10 hover:bg-[#e11d48] border border-[#e11d48]/20 hover:border-transparent text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-red-500/5 group-hover:scale-[1.02]"
              >
                <MessageCircle size={14} className="fill-current" />
                Chat
              </button>
            </div>
          </article>
        ))}
        {filteredGirls.length === 0 && (
          <div className="col-span-full py-20 text-center text-white/40 font-bold bg-[#12121a] rounded-3xl border border-white/5">
            No characters found for selected filters in this category.
          </div>
        )}
      </div>
    </section>
  );
}





