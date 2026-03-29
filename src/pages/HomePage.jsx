import Layout from "../components/Layout";
import HeroSection from "../components/layout/HeroSection";
import QuickChatSection from "../components/home/QuickChatSection";
import FeaturedSection from "../components/home/FeaturedSection";
import { Link } from "react-router-dom";
import { FiHeart, FiTwitter, FiInstagram, FiMail } from "react-icons/fi";

export default function HomePage() {
  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto pb-12 px-4">
        <HeroSection />
        <QuickChatSection />
        <FeaturedSection />
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

            {/* Links */}
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
