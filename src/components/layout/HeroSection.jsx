import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../../assets/task_01kmwzbe1tfvp912tg8rwe5hay_1774793926_img_1.webp";
import img2 from "../../assets/task_01kmwzmaxbfbtrtm45b78g5cv6_1774794217_img_0.webp";
import img3 from "../../assets/task_01kmx0114jf4n8czx2xbegyq4b_1774794633_img_1.webp";

export default function HeroSection() {
  const heroImages = [img1, img2, img3];
  const navigator = useNavigate()

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] mb-8 md:mt-8 mt-4 border border-white/5">
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#741818]/10 via-transparent to-transparent opacity-40" />
      <div className="relative px-4 py-8 md:px-8 md:py-16 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        
        {/* Hero Images - on top for mobile, right side for desktop */}
        <div className="md:hidden flex items-center justify-center order-1">
          <div className="flex -space-x-2 md:-space-x-4">
            {heroImages.map((src, i) => (
              <div 
                key={i} 
                className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-[#0a0a0f] overflow-hidden bg-black/40 backdrop-blur-xl shrink-0"
                style={{ zIndex: heroImages.length - i }}
              >
                <img src={src} alt="AI Character" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Text content - below images on mobile */}
        <div className="text-white max-w-2xl text-center md:text-left order-2 md:order-1">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 tracking-tight">Your AI <span className="text-[#a82525]">Girlfriend</span> awaits</h1>
          <p className="text-sm md:text-base opacity-40 mb-4 md:mb-8 leading-relaxed font-medium">Connect with beautiful, intelligent AI girls designed to match your energy. Private, secure, and always ready.</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4">
            <button
              onClick={() => navigator("/discover")}
              className="bg-white text-black px-5 md:px-8 py-2.5 md:py-4 rounded-full font-bold text-xs md:text-base flex items-center cursor-pointer gap-2 transition-all hover:bg-white/90 active:scale-95"
            >
              Explore Now <ArrowRight size={16} md:size={20} />
            </button>
            <Link to="/how-it-works">
              <button className="cursor-pointer bg-white/5 backdrop-blur-md text-white border border-white/10 px-5 md:px-8 py-2.5 md:py-4 rounded-full font-bold text-xs md:text-base transition-all hover:bg-white/10">
                How it works
              </button>
            </Link>
          </div>
        </div>
        
        {/* Hero Images - right side for desktop */}
        <div className="hidden md:flex items-center justify-center order-1">
          <div className="flex -space-x-2 md:-space-x-4">
            {heroImages.map((src, i) => (
              <div 
                key={i} 
                className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#0a0a0f] overflow-hidden bg-black/40 backdrop-blur-xl shrink-0"
                style={{ zIndex: heroImages.length - i }}
              >
                <img src={src} alt="AI Character" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
