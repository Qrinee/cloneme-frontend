import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Wand2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import banner1 from "../../assets/banners/new_banner_1.png";
import banner2 from "../../assets/banners/new_banner_2.png";
import banner3 from "../../assets/banners/new_banner_3.png";

export default function HeroSection() {
  const navigator = useNavigate();
  const banners = [banner1, banner2, banner3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div
      className="relative w-full aspect-[21/9] md:aspect-[7/2] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-8 md:mt-8 mt-4 cursor-pointer group shadow-2xl bg-[#0f0f14]"
      onClick={() => navigator("/create-girl")}
    >
      {/* Banner Images */}
      {banners.map((banner, index) => (
        <img
          key={index}
          src={banner}
          alt={`Banner ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      {/* Overlay Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-end px-8 md:px-16 lg:px-24 pointer-events-none">
        <div className="flex flex-col items-end md:items-end text-right md:text-right max-w-lg md:max-w-2xl mt-4 md:mt-0">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] max-w-md  font-black mb-4 md:mb-6 tracking-tight text-white leading-tight drop-shadow-2xl">
            Create your own <span className="text-[#e11d48]">AI Girlfriend</span>
          </h1>
          <button
            className="bg-[#e11d48] hover:bg-[#be123c] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg flex items-center gap-2 md:gap-3 transition-transform hover:scale-105 shadow-lg shadow-[#e11d48]/20 pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              navigator("/create-girl");
            }}
          >
            <Wand2 size={20} className="md:w-6 md:h-6" /> Create Now
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/60 text-white/70 hover:text-white rounded-full transition-all opacity-0 group-hover:opacity-100 z-30 backdrop-blur-sm pointer-events-auto"
      >
        <ChevronLeft size={24} className="md:w-8 md:h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/60 text-white/70 hover:text-white rounded-full transition-all opacity-0 group-hover:opacity-100 z-30 backdrop-blur-sm pointer-events-auto"
      >
        <ChevronRight size={24} className="md:w-8 md:h-8" />
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 z-30 bg-black/20 px-3 py-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`transition-all duration-300 rounded-full ${index === currentIndex
              ? "w-6 md:w-8 h-1.5 md:h-2 bg-[#e11d48]"
              : "w-1.5 md:w-2 h-1.5 md:h-2 bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>
    </div>
  );
}





