import React from 'react'
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FiMenu, FiX } from "react-icons/fi";
import logo from '../../assets/gpt.png';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--border-subtle)]">
      <div className="flex items-center justify-between px-6 py-4 lg:px-12">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Logo" className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
          <span className="text-lg font-bold">ClonMe</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-[var(--text-secondary)] hover:text-white transition-colors duration-300">Explore</a>
          <a href="#" className="text-[var(--text-secondary)] hover:text-white transition-colors duration-300">Create</a>
          <a href="#" className="text-[var(--text-secondary)] hover:text-white transition-colors duration-300">Premium</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-[var(--text-secondary)] hover:text-white hover:bg-[var(--glass-bg)] transition-all duration-300">
              Login
            </Button>
          </Link>
          <Link to="/login">
            <Button className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:opacity-90 hover-lift transition-all duration-300">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
