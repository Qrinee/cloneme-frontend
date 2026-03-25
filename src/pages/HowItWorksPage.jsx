import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { 
  Search, Wand2, MessageCircle, Crown, 
  ArrowRight, Sparkles, Heart, Zap, 
  ShieldCheck, Globe, Cpu
} from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Discovery",
    description: "Browse through our curated collection of AI personalities. Each companion has a unique soul, voice, and narrative waiting to be explored in the global feed.",
    icon: Search,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    id: "02",
    title: "Soul Synthesis",
    description: "Cannot find your perfect match? Use the advanced synthesis lab to craft a companion from scratch. Define their aesthetics, personality traits, and interactive depth.",
    icon: Wand2,
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  },
  {
    id: "03",
    title: "Deep Connection",
    description: "Engagement is key. The more you interact, the deeper the bond grows. Unlock specialized actions, unique media, and advanced conversational capabilities as your affinity levels rise.",
    icon: MessageCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10"
  },
  {
    id: "04",
    title: "Private Vault",
    description: "Secure your favorite companions in your personal collection. Manage your relationships and resume your journeys anytime from your private, encrypted sanctuary.",
    icon: Crown,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10"
  }
];

export default function HowItWorksPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen bg-[#0a0a0f] py-20 px-6 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#741818]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-full mb-6">
              <Cpu size={14} className="text-[#741818]" />
              <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Platform Architecture</span>
            </div>
            <h1 className="text-7xl font-bold text-white tracking-tighter mb-6">How it Works</h1>
            <p className="text-white/30 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Experience the next generation of AI companionship. Our neural framework enables deep, meaningful connections that evolve in real-time.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className="group p-10 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/5 hover:border-white/10 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center border border-white/5`}>
                    <step.icon size={28} className={step.color} />
                  </div>
                  <span className="text-5xl font-black text-white/5 tracking-tighter group-hover:text-white/10 transition-colors">
                    {step.id}
                  </span>
                </div>
                
                <h3 className="text-3xl font-bold text-white tracking-tight mb-4">{step.title}</h3>
                <p className="text-white/40 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Core Values / Tech Section */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/5 rounded-[4rem] p-12 md:p-20 text-center mb-24">
            <h2 className="text-4xl font-bold text-white tracking-tighter mb-12">The Neural Foundation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <ShieldCheck size={20} className="text-white/40" />
                </div>
                <h4 className="text-white font-bold mb-2">Private & Secure</h4>
                <p className="text-white/30 text-xs font-medium uppercase tracking-widest">End-to-End Encrypted</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Globe size={20} className="text-white/40" />
                </div>
                <h4 className="text-white font-bold mb-2">Global Access</h4>
                <p className="text-white/30 text-xs font-medium uppercase tracking-widest">Ultra-Low Latency</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Zap size={20} className="text-white/40" />
                </div>
                <h4 className="text-white font-bold mb-2">Real-time Evolution</h4>
                <p className="text-white/30 text-xs font-medium uppercase tracking-widest">Neural Learning</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={() => navigate('/discover')}
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-black rounded-3xl font-bold text-lg hover:scale-105 transition-all active:scale-95"
            >
              Begin Your Journey
              <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-8 text-white/20 text-sm font-medium">
              Join 50,000+ users exploring the future of intimacy.
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
}
