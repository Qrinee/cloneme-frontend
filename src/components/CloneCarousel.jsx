import { useRef } from "react";
import ScrollButton from "./ScrollButton";
import CharacterCard from "./CharacterCard";

export default function CloneCarousel({ title, clones, navigate }) {
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const firstItem = carouselRef.current.firstElementChild;
      if (!firstItem) return;
      
      const itemWidth = firstItem.offsetWidth;
      const gap = 16;
      const scrollAmount = itemWidth + gap;
      
      carouselRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (clones.length === 0) return null;

  return (
    <section className="mt-12 w-full px-4">
      <div className="max-w-7xl mx-auto relative">
        <h2 className="text-xl font-semibold text-white mb-4 px-2">{title}</h2>

        <div className="relative">
          <ScrollButton 
            direction="left" 
            onClick={() => scrollCarousel(-1)} 
          />
          
          <ScrollButton 
            direction="right" 
            onClick={() => scrollCarousel(1)} 
          />

          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory hide-scrollbar"
          >
            {clones.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/chat-profile/${item._id}`)}
                className="snap-start flex-shrink-0 cursor-pointer hover:scale-[1.02] transition-transform w-[calc(100vw-3rem)] min-[500px]:w-[calc(50vw-3rem)] md:w-[320px]"
              >
                <CharacterCard
                  imageUrl={import.meta.env.VITE_URL + item.cloneAvatarPhotoUrl}
                  name={item.cloneName}
                  description={item.shortBio}
                  likes={item.likes}
                  messages={item.messages}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}





