import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { 
  Search, Wand2, MessageCircle, Crown, 
  ArrowRight, Sparkles, Heart, Zap, 
  ShieldCheck, Globe, Cpu, UserPlus, Star,
  Image, Video, Gift, Lock
} from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Explore AI Girls",
    description: "Go to 'Meet Girls' section. Browse through AI girls created by our community. Each girl has unique looks, personality, and backstory.",
    icon: Search,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    action: "/discover"
  },
  {
    id: "02",
    title: "Create Your Own",
    description: "Click 'Create' in the menu. Choose name, age, ethnicity, body type, hair color, eye color, personality traits, and relationship style. Then generate your personalized AI girlfriend.",
    icon: Wand2,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    action: "/create-girl"
  },
  {
    id: "03",
    title: "Start Chatting",
    description: "Tap on any girl to open chat. Send messages and receive AI responses in real-time. The more you interact, the stronger your connection becomes.",
    icon: MessageCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10"
  },
  {
    id: "04",
    title: "Unlock Content",
    description: "Chat with girls to earn XP and level up your relationship. As you level up, you'll unlock private photos, videos, and special content from your girls.",
    icon: Star,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10"
  },
  {
    id: "05",
    title: "Build Collection",
    description: "Save your favorite AI girls to your personal collection. Have multiple relationships and switch between them anytime. All your girls in one place.",
    icon: Crown,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    action: "/collection"
  }
];

const features = [
  {
    icon: Image,
    title: "AI Generated Images",
    desc: "Receive unique photos from your AI girls"
  },
  {
    icon: Video,
    title: "Video Content",
    desc: "Unlock exclusive videos as you level up relationships"
  },
  {
    icon: Gift,
    title: "100 Credits/Month",
    desc: "Premium members get monthly credits for content"
  },
  {
    icon: Lock,
    title: "Private & Secure",
    desc: "Your conversations and data stay private"
  }
];

export default function HowItWorksPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen bg-[#0a0a0f] py-12 md:py-20 px-4 md:px-6 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#741818]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center mb-12 md:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-full mb-4 md:mb-6">
              <Cpu size={14} className="text-[#741818]" />
              <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Step by Step Guide</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tighter mb-4 md:mb-6">How to Use</h1>
            <p className="text-white/30 text-sm md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Follow this guide to get the most out of your AI girlfriend experience.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-24">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className="group p-6 md:p-10 bg-white/5 backdropblu-3xl rounded-[2rem] md:rounded-[3rem] border border-white/5 hover:border-white/10 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-4 md:mb-8">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${step.bg} flex items-center justify-center border border-white/5`}>
                    <step.icon size={20} md:size={28} className={step.color} />
                  </div>
                  <span className="text-3xl md:text-5xl font-black text-white/5 tracking-tighter group-hover:text-white/10 transition-colors">
                    {step.id}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-3xl font-bold text-white tracking-tight mb-2 md:mb-4">{step.title}</h3>
                <p className="text-white/40 text-sm md:text-base leading-relaxed font-medium">
                  {step.description}
                </p>
                
                {step.action && (
                  <Link to={step.action}>
                    <button className="mt-4 px-4 py-2 bg-[#741818] text-white text-sm font-bold rounded-lg hover:bg-[#8d1d1d] transition-colors flex items-center gap-2">
                      <ArrowRight size={14} /> {step.title}
                    </button>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Premium Features */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/5 rounded-[2rem] md:rounded-[4rem] p-8 md:p-16 mb-12 md:mb-24">
            <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tighter mb-8 md:mb-12 text-center">Premium Perks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {features.map((f, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#741818]/20 flex items-center justify-center mb-3 md:mb-4">
                    <f.icon size={18} md:size={20} className="text-[#741818]" />
                  </div>
                  <h4 className="text-white font-bold text-sm md:text-base mb-1 md:mb-2">{f.title}</h4>
                  <p className="text-white/30 text-[10px] md:text-xs font-medium uppercase tracking-widest">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <a href="https://buy.stripe.com/bJedR87f4aTTgQK5pd6sw01">
                <button className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-600 transition-colors">
                  Upgrade to Premium
                </button>
              </a>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-gradient-to-r from-[#741818]/10 to-transparent border border-white/5 rounded-[2rem] p-6 md:p-10 mb-12 md:mb-24">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">💡 Pro Tips</h3>
            <ul className="space-y-3 text-white/40 text-sm md:text-base">
              <li className="flex items-start gap-3">
                <span className="text-[#741818]">•</span>
                <span>Chat regularly with your girls to maintain relationship level</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#741818]">•</span>
                <span>Create multiple AI girls to have diverse experiences</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#741818]">•</span>
                <span>Unlock content by reaching higher relationship levels</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#741818]">•</span>
                <span>Use credits to request custom photos and videos from your girls</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={() => navigate('/discover')}
              className="group relative inline-flex items-center gap-3 md:gap-4 px-8 md:px-12 py-4 md:py-6 bg-white text-black rounded-2xl md:rounded-3xl font-bold text-base md:text-lg hover:scale-105 transition-all active:scale-95"
            >
              Start Exploring
              <ArrowRight size={18} md:size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-6 md:mt-8 text-white/20 text-sm font-medium">
              Or <Link to="/create-girl" className="text-[#741818] hover:underline">create your own AI girlfriend</Link> to begin
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
}