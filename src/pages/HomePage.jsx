import Layout from "../components/Layout";
import HeroSection from "../components/layout/HeroSection";
import QuickChatSection from "../components/home/QuickChatSection";
import FeaturedSection from "../components/home/FeaturedSection";
import { Link } from "react-router-dom";
import { FiHeart, FiTwitter, FiInstagram, FiMail } from "react-icons/fi";
import { Wand2 } from "lucide-react";
import customAiBanner from "../assets/banners/new_banner_2.png";

export default function HomePage() {
  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto pb-12 px-4">
        <HeroSection />
        
        {/* Section Heading */}
        <div className="text-center mt-12 mb-8">
          <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-[0.1em] drop-shadow-md">
            JOIN NOW, LIVE, TALK TO OUR GIRLS
          </h2>
        </div>

        <QuickChatSection />
        <FeaturedSection />

        {/* Create Your Own Custom AI Girl Banner */}
        <div className="mt-12 w-full rounded-3xl overflow-hidden relative group cursor-pointer border border-white/5 hover:border-white/20 transition-all shadow-2xl" onClick={() => window.location.href = '/premium'}>
          <img src={customAiBanner} alt="Create AI Girl" className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0a0a0f]/80 to-[#0a0a0f] md:via-[#0a0a0f]/50" />
          
          <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center items-end text-right">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6 max-w-lg">
              Create your own <br />
              <span className="text-[#e11d48]">AI Companion</span>
            </h2>
            
            <button className="bg-[#e11d48] hover:bg-[#be123c] text-white px-8 py-4 rounded-xl font-bold text-lg md:text-xl transition-all active:scale-95 flex items-center gap-3 shadow-lg shadow-[#e11d48]/20 border border-white/10">
              <Wand2 size={24} /> Create Your Own AI
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">ClonMe</h3>
              <p className="text-white/30 max-w-sm mb-6">
                Clonme is a AI girlfriend app that lets you design your own personalized virtual companion or instantly connect with lifelike AI characters. It offers immersive, unrestricted fantasy experiences while keeping everything private and secure.
              </p>

            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Platform</h4>
              <ul className="space-y-3">
                <li><Link to="/discover" className="text-white/30 hover:text-white transition-colors">Discover</Link></li>
                <li><Link to="/create-girl" className="text-white/30 hover:text-white transition-colors">Create</Link></li>
                <li><Link to="/how-it-works" className="text-white/30 hover:text-white transition-colors">How it Works</Link></li>
                <li><Link to="/discover" className="text-white/30 hover:text-white transition-colors">Explore</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/terms" className="text-white/30 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-white/30 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/login" className="text-white/30 hover:text-white transition-colors">Login</Link></li>
                <li><Link to="/register" className="text-white/30 hover:text-white transition-colors">Sign Up</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-sm">© 2026 ClonMe. All rights reserved.</p>

          </div>
        </div>
      </footer>
    </Layout>
  );
}





