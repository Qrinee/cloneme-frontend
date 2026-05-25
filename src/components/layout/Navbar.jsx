import React from 'react';
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { ModernButton } from '../design-system/ModernButton';
import logo from '../../assets/gpt.png';

/**
 * Navbar - Navigation bar component
 */
export function Navbar() {
  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-12">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" 
          />
          <span className="text-xl font-bold">ClonMe</span>
        </Link>
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link, index) => (
          <a 
            key={index}
            href={link.href} 
            className="text-[var(--text-secondary)] hover:text-white transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
      
      <div className="flex items-center gap-4">
        <Link to="/login">
          <ModernButton variant="ghost">
            Login
          </ModernButton>
        </Link>
        <Link to="/login">
          <ModernButton gradient hoverLift>
            Get Started
          </ModernButton>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;





