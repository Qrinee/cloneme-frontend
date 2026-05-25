import React from "react";
import Layout from "../components/Layout";
import { Shield, Eye, Lock, Database, User, Bell, Globe, Heart, AlertTriangle } from "lucide-react";

const sections = [
  {
    id: "collection",
    title: "1. Information We Collect",
    content: "We collect information you provide directly to us, including: account credentials, profile information, messages and interactions with AI companions, usage data, and device information. We also collect information automatically when you use our platform.",
    icon: Database,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    id: "usage",
    title: "2. How We Use Your Information",
    content: "We use your information to: provide and improve our services, personalize your experience, communicate with you, ensure security and prevent fraud, and comply with legal obligations. Your data helps us improve AI responses and platform functionality.",
    icon: Eye,
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  },
  {
    id: "cookies",
    title: "3. Cookies and Tracking Technologies",
    content: "We use cookies and similar technologies to track activity and maintain your session. These help us understand how you use our platform and remember your preferences. You can control cookies through your browser settings.",
    icon: Lock,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10"
  },
  {
    id: "sharing",
    title: "4. Information Sharing",
    content: "We do not sell your personal information. We may share information with service providers who assist in our operations, when required by law, or to protect our rights. Any data sharing is done with strict confidentiality.",
    icon: User,
    color: "text-[#e11d48]",
    bg: "bg-red-400/10"
  },
  {
    id: "security",
    title: "5. Data Security",
    content: "We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but we work hard to protect your data.",
    icon: Shield,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10"
  },
  {
    id: "retention",
    title: "6. Data Retention",
    content: "We retain your information as long as your account is active or as needed to provide services. You can request deletion of your data at any time. We may retain certain information for legal compliance purposes.",
    icon: Bell,
    color: "text-orange-400",
    bg: "bg-orange-400/10"
  },
  {
    id: "third-party",
    title: "7. Third-Party Services",
    content: "Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.",
    icon: Globe,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10"
  },
  {
    id: "children",
    title: "8. Children's Privacy",
    content: "Our platform is not intended for children under 18. We do not knowingly collect information from children. If we learn we have collected data from a child, we will delete it immediately.",
    icon: Heart,
    color: "text-[#e11d48]",
    bg: "bg-[#e11d48]/10"
  },
  {
    id: "changes",
    title: "9. Changes to This Policy",
    content: "We may update this policy periodically. We will notify you of any material changes by posting the new policy on this page and updating the 'Last updated' date. Your continued use constitutes acceptance of changes.",
    icon: AlertTriangle,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10"
  }
];

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-[#0a0a0f] py-20 px-6 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e11d48]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#e11d48]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-full mb-6">
              <Shield size={14} className="text-[#e11d48]" />
              <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Privacy Framework</span>
            </div>
            <h1 className="text-6xl font-bold text-white tracking-tighter mb-6">Privacy Policy</h1>
            <p className="text-white/30 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
            </p>
          </div>

          {/* Last Updated */}
          <div className="text-center mb-16">
            <p className="text-white/20 text-sm">
              Last updated: March 2026
            </p>
          </div>

          {/* Quick Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 bg-white/5 border border-white/5 rounded-2xl text-center">
              <Lock size={24} className="text-green-400 mx-auto mb-3" />
              <h4 className="text-white font-bold mb-1">Encrypted</h4>
              <p className="text-white/30 text-xs">Your data is protected</p>
            </div>
            <div className="p-6 bg-white/5 border border-white/5 rounded-2xl text-center">
              <User size={24} className="text-blue-400 mx-auto mb-3" />
              <h4 className="text-white font-bold mb-1">You Control</h4>
              <p className="text-white/30 text-xs">Request deletion anytime</p>
            </div>
            <div className="p-6 bg-white/5 border border-white/5 rounded-2xl text-center">
              <Shield size={24} className="text-yellow-400 mx-auto mb-3" />
              <h4 className="text-white font-bold mb-1">No Selling</h4>
              <p className="text-white/30 text-xs">We never sell your data</p>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, idx) => (
              <div 
                key={idx}
                className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <div className={`w-14 h-14 rounded-2xl ${section.bg} flex items-center justify-center border border-white/5 flex-shrink-0`}>
                    <section.icon size={24} className={section.color} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white tracking-tight mb-4">{section.title}</h3>
                    <p className="text-white/40 leading-relaxed font-medium">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-20 text-center p-12 bg-white/5 backdrop-blur-2xl border border-white/5 rounded-[3rem]">
            <h3 className="text-2xl font-bold text-white mb-4">Questions?</h3>
            <p className="text-white/40 mb-8">
              If you have any questions about this privacy policy, please contact us.
            </p>
            <a 
              href="mailto:privacy@example.com" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-bold hover:scale-105 transition-all"
            >
              Contact Privacy Team
            </a>
          </div>

        </div>
      </div>
    </Layout>
  );
}





