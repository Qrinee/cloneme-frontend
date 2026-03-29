import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
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
            <a href="/how-it-works">
              <button className="cursor-pointer bg-white/5 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-full font-bold text-base transition-all hover:bg-white/10">
                How it works
              </button>
            </a>
          </div>
        </div>
        <div className="hidden lg:flex gap-4">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-16 h-16 rounded-full border border-white/20 overflow-hidden bg-black/40 backdrop-blur-xl">
                <div className="w-full h-full bg-gradient-to-br from-[#741818]/20 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
