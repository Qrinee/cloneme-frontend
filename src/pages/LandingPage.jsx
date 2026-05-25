import React from 'react';
import { FiMessageCircle, FiUsers } from "react-icons/fi";
import { RiSparklingFill } from "react-icons/ri";
import { GlassCard, FeatureCard, ModernButton } from '@/components/design-system';
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../assets/gpt.png";

export default function LandingPage() {
  const features = [
    {
      icon: <FiMessageCircle className="text-3xl" />,
      title: "Natural Conversations",
      description: "Advanced AI understands context, emotions, and nuance for authentic interactions."
    },
    {
      icon: <RiSparklingFill className="text-3xl" />,
      title: "Custom Characters",
      description: "Create unique AI companions with distinct personalities and appearances."
    },
    {
      icon: <FiUsers className="text-3xl" />,
      title: "Active Community",
      description: "Join thousands of users sharing experiences and discovering new connections."
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white overflow-hidden">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--accent-primary-glow)] rounded-full blur-[150px] opacity-20 animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[var(--accent-secondary-glow)] rounded-full blur-[150px] opacity-15 animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent-cyan)] rounded-full blur-[200px] opacity-5"></div>
      </div>


      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20 lg:px-12 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Experience the <span className="gradient-text">Future</span>
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Our AI technology creates deeply personalized conversations that adapt to your preferences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <GlassCard glow className="text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary-glow)] to-[var(--accent-secondary-glow)] opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready to Start?
              </h2>
              <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
                Join thousands of users already experiencing the future of AI companionship.
              </p>
              <Link to="/login">
                <ModernButton gradient hoverLift size="lg">
                  Get Started Free
                  <FiArrowRight className="ml-2" />
                </ModernButton>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 lg:px-12 border-t border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <span className="font-bold">ClonMe</span>
          </div>
          <p className="text-[var(--text-muted)] text-sm">
            © {new Date().getFullYear()} ClonMe. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}





