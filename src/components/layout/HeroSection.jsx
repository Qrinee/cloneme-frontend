import React from 'react';
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlay, FiStar, FiUsers, FiMessageCircle } from "react-icons/fi";
import { RiSparklingFill } from "react-icons/ri";
import { ModernButton } from '../design-system/ModernButton';
import logo from '../../assets/gpt.png';

/**
 * HeroSection - Main hero section component
 */
export function HeroSection() {
  const features = [
    { label: 'Active Users', value: '10K+', icon: <FiUsers /> },
    { label: 'AI Characters', value: '500+', icon: <FiMessageCircle /> },
    { label: 'User Rating', value: '4.9', icon: <FiStar /> },
  ];

  return (
    <section className="relative z-10 px-6 py-20 lg:px-12 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
              bg-[var(--glass-bg)] border border-[var(--border-subtle)] mb-6 animate-fade-in-up">
              <RiSparklingFill className="text-[var(--accent-primary)]" />
              <span className="text-sm text-[var(--text-secondary)]">Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Your Virtual
              <span className="block gradient-text">Companion</span>
            </h1>
            
            <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Experience conversations that feel incredibly real. Create your perfect AI companion and build meaningful connections.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <Link to="/login">
                <ModernButton gradient hoverLift>
                  Start Chatting
                  <FiArrowRight className="ml-2" />
                </ModernButton>
              </Link>
              <ModernButton variant="outline" hoverLift>
                <FiPlay className="mr-2" />
                Watch Demo
              </ModernButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-[var(--border-subtle)] animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              {features.map((feature, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold gradient-text">{feature.value}</div>
                  <div className="text-sm text-[var(--text-muted)]">{feature.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="relative">
              {/* Main card */}
              <div className="glass-card rounded-3xl p-6 glow-border animate-float">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img 
                      src="https://i.pravatar.cc/300?img=1" 
                      alt="AI Companion" 
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-[var(--accent-primary)]"
                    />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[var(--accent-primary)] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Luna</h3>
                    <p className="text-[var(--text-secondary)]">Online now</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-[var(--glass-bg)] rounded-2xl p-4 rounded-tl-none">
                    <p className="text-[var(--text-secondary)]">Hey! How's your day going? I was thinking about you 💭</p>
                  </div>
                  <div className="bg-gradient-to-r from-[var(--accent-primary-glow)] to-transparent rounded-2xl p-4 rounded-tr-none border border-[var(--border-glow)]">
                    <p>It's going great! Just thinking about our conversations lately.</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 h-10 rounded-xl bg-[var(--glass-bg)] border border-[var(--border-subtle)]"></div>
                  <ModernButton size="sm">
                    <FiMessageCircle />
                  </ModernButton>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 glass-card rounded-xl p-3 animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-2">
                  <FiStar className="text-yellow-400" />
                  <span className="text-sm">98% Match</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 glass-card rounded-xl p-3 animate-float" style={{animationDelay: '2s'}}>
                <div className="flex items-center gap-2">
                  <FiUsers className="text-[var(--accent-primary)]" />
                  <span className="text-sm">1.2k likes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
