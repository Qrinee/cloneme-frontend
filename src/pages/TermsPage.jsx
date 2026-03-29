import React from "react";
import Layout from "../components/Layout";
import { Scale, Shield, User, MessageCircle, Heart, AlertTriangle, FileText } from "lucide-react";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: "By accessing and using this platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
    icon: Scale,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    id: "eligibility",
    title: "2. Eligibility",
    content: "You must be at least 18 years of age or the age of majority in your jurisdiction to use this platform. By using our services, you represent and warrant that you meets this requirement.",
    icon: User,
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  },
  {
    id: "account",
    title: "3. Account Responsibilities",
    content: "You are responsible for maintaining the confidentiality of your account credentials. You agree to accept responsibility for all activities that occur under your account. Report any unauthorized access immediately.",
    icon: Shield,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10"
  },
  {
    id: "conduct",
    title: "4. User Conduct",
    content: "You agree to use our platform in a manner consistent with all applicable laws and regulations. prohibited behaviors include: harassment, abuse, sharing inappropriate content, attempting to extract personal information from other users, and any activity that violates the rights of others.",
    icon: MessageCircle,
    color: "text-red-400",
    bg: "bg-red-400/10"
  },
  {
    id: "content",
    title: "5. User-Generated Content",
    content: "You retain ownership of content you create on our platform. However, by posting content, you grant us a worldwide, royalty-free license to use, modify, and display such content for the operation of our services.",
    icon: FileText,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10"
  },
  {
    id: "termination",
    title: "6. Termination",
    content: "We reserve the right to suspend or terminate your account at any time for any reason, including but not limited to violation of these terms. Upon termination, your right to use our services immediately ceases.",
    icon: AlertTriangle,
    color: "text-orange-400",
    bg: "bg-orange-400/10"
  },
  {
    id: "limitation",
    title: "7. Limitation of Liability",
    content: "Our platform is provided 'as is' without any warranties. We shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.",
    icon: Heart,
    color: "text-pink-400",
    bg: "bg-pink-400/10"
  },
  {
    id: "changes",
    title: "8. Changes to Terms",
    content: "We reserve the right to modify these terms at any time. Continued use of our platform after changes constitutes acceptance of the new terms. We will notify users of significant changes.",
    icon: Scale,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10"
  }
];

export default function TermsPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-[#0a0a0f] py-20 px-6 relative overflow-hidden">
  
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#741818]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-full mb-6">
              <Scale size={14} className="text-[#741818]" />
              <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Legal Framework</span>
            </div>
            <h1 className="text-6xl font-bold text-white tracking-tighter mb-6">Terms of Service</h1>
            <p className="text-white/30 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before using our platform. Your use of this service constitutes agreement to these terms.
            </p>
          </div>

          {/* Last Updated */}
          <div className="text-center mb-16">
            <p className="text-white/20 text-sm">
              Last updated: March 2026
            </p>
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
              If you have any questions about these terms, please contact us.
            </p>
            <a 
              href="mailto:support@example.com" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-bold hover:scale-105 transition-all"
            >
              Contact Support
            </a>
          </div>

        </div>
      </div>
    </Layout>
  );
}