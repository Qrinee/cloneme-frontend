import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FiMenu, FiX, FiHome, FiCompass, FiMessageCircle, FiUser, FiGlobe, FiLogOut, FiSettings, FiStar } from "react-icons/fi";
import { FaVenus, FaMars, FaMagic, FaRobot, FaGem } from "react-icons/fa";
import { TbSpiral } from "react-icons/tb";
import { Crown, Coins, LogOut, User as UserIcon } from "lucide-react";
import logo from '../../assets/gpt.png';
import { useLayoutContext } from '../LayoutContext';

const languages = [
  { code: 'EN', name: 'English' },
  { code: 'PL', name: 'Polski' },
  { code: 'ES', name: 'Español' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'FR', name: 'Français' },
  { code: 'IT', name: 'Italiano' },
  { code: 'PT', name: 'Português' }
];

const getInitialLang = () => {
  const value = "; " + document.cookie;
  const parts = value.split("; googtrans=");
  if (parts.length === 2) {
    const val = parts.pop().split(";").shift();
    const match = val.match(/\/en\/([a-z]{2})/i);
    if (match && match[1]) {
      return match[1].toUpperCase();
    }
  }
  return 'EN';
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(getInitialLang);
  const dropdownRef = useRef(null);
  const langRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, premium } = useLayoutContext();

  const handleLangChange = (langCode) => {
    const expires = "; expires=" + new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    
    // Set the cookie on root path
    document.cookie = "googtrans=/en/" + langCode.toLowerCase() + expires + "; path=/";
    
    // Also try setting it on parent domain if we are on a subdomain
    const host = window.location.hostname;
    const parts = host.split('.');
    if (parts.length > 2) {
      const domain = parts.slice(-2).join('.');
      document.cookie = "googtrans=/en/" + langCode.toLowerCase() + expires + "; path=/; domain=." + domain;
    }
    
    setCurrentLang(langCode);
    setLangDropdownOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${import.meta.env.VITE_URL}/auth/logout`, {
        credentials: "include"
      });
      window.location.href = '/login';
    } catch (err) {
      window.location.href = '/login';
    }
  };

  const isActive = (path, categoryQuery = null) => {
    const searchParams = new URLSearchParams(location.search);
    const cat = searchParams.get('category');

    if (categoryQuery) {
      return location.pathname === '/' && cat === categoryQuery;
    }

    if (path === '/') {
      return location.pathname === '/' && !cat;
    }

    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl ${isScrolled ? 'shadow-lg shadow-black/20' : ''}`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="flex items-center justify-between px-4 lg:px-8 mx-auto h-16 lg:h-20">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img src={logo} alt="Logo" className="h-8 transition-transform duration-300 group-hover:scale-105" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1.5 lg:gap-3 mx-4">
          <Link
            to="/?category=girls"
            className={`flex items-center px-3 py-1.5 gap-2 font-bold text-sm rounded-full transition-all relative ${isActive('/', 'girls') ? 'bg-[#e11d48]/15 text-[#e11d48] border border-[#e11d48]/20' : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
          >
            <FaVenus className="text-base" />
            Girls
          </Link>
          <Link
            to="/?category=anime"
            className={`flex items-center px-3 py-1.5 gap-2 font-bold text-sm rounded-full transition-all relative ${isActive('/', 'anime') ? 'bg-[#e11d48]/15 text-[#e11d48] border border-[#e11d48]/20' : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
          >
            <TbSpiral className="text-base" />
            Anime
          </Link>
          <Link
            to="/?category=men"
            className={`flex items-center px-3 py-1.5 gap-2 font-bold text-sm rounded-full transition-all relative ${isActive('/', 'men') ? 'bg-[#e11d48]/15 text-[#e11d48] border border-[#e11d48]/20' : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
          >
            <FaMars className="text-base" />
            Men
          </Link>

          {/* Divider */}
          <div className="w-[1px] h-6 bg-white/10 mx-1"></div>

          <Link to="/discover" className={`flex items-center px-3 py-1.5 gap-2 font-bold text-sm rounded-full transition-all ${isActive('/discover') ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
            <FiCompass className="text-base" />
            Discover
          </Link>
          <Link to="/chat" className={`flex items-center px-3 py-1.5 gap-2 font-bold text-sm rounded-full transition-all ${isActive('/chat') ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
            <FiMessageCircle className="text-base" />
            Chat
          </Link>
          <Link to="/create-girl" className={`flex items-center px-3 py-1.5 gap-2 font-bold text-sm rounded-full transition-all ${isActive('/create-girl') ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
            <FaMagic className="text-base" />
            Create
          </Link>
          <Link to="/collection" className={`flex items-center px-3 py-1.5 gap-2 font-bold text-sm rounded-full transition-all ${isActive('/collection') ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
            <FaRobot className="text-base" />
            My AI
          </Link>

          {/* Premium button with -70% badge */}
          <Link
            to="/premium"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all font-bold text-sm ${isActive('/premium')
              ? 'border-amber-500 bg-amber-500/20 text-amber-300'
              : 'border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/50'
              }`}
          >
            <Crown size={14} className="fill-amber-400" />
            <span>Premium</span>
            <span className="bg-[#e11d48] text-white text-[9px] px-1.5 py-0.5 rounded-full font-black scale-90 shadow-md shadow-red-500/20">-70%</span>
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">

          {/* Language Selector (Desktop) */}
          <div className="hidden md:block relative" ref={langRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-white/80 hover:text-white transition-all text-xs font-bold cursor-pointer"
            >
              <FiGlobe className="text-sm" />
              <span>{currentLang}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-[#12121a] border border-white/10 rounded-2xl p-2 shadow-2xl animate-scale-in flex flex-col gap-0.5 max-h-60 overflow-y-auto no-scrollbar">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLangChange(lang.code)}
                    className={`w-full flex items-center p-2 rounded-xl text-xs font-bold text-left transition-colors ${currentLang === lang.code ? 'bg-[#e11d48]/15 text-[#e11d48]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                  >
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Auth Section */}
          {isLoggedIn && user ? (
            <div className="flex items-center gap-3">
              {/* Points Badge */}
              <div className="hidden sm:flex items-center gap-1.5 bg-[#e11d48]/10 border border-[#e11d48]/20 px-3.5 py-1.5 rounded-full shadow-inner">
                <Coins className="w-3.5 h-3.5 text-[#e11d48]" />
                <span className="text-white text-xs font-black tracking-wide">
                  {user.points?.toLocaleString('en-US').replace(/,/g, ' ')}
                </span>
                <span className="text-[#e11d48] text-[9px] font-black tracking-widest ml-0.5">PTS</span>
              </div>

              {/* Profile Avatar Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pr-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                >
                  <img
                    alt="Avatar"
                    src="image.webp"
                    className="h-7 w-7 rounded-full border border-white/10 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80';
                    }}
                  />
                  <span className="text-xs font-bold text-white/80 hidden md:block max-w-[80px] truncate">{user.username}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#12121a] border border-white/10 rounded-2xl p-3 shadow-2xl animate-scale-in text-left">
                    <div className="px-2 py-1.5 border-b border-white/5 mb-2">
                      <p className="text-sm font-bold text-white truncate">{user.username}</p>
                      <p className="text-[10px] text-white/40 truncate">{user.email}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-[#e11d48]/20 text-[#e11d48] rounded-md">
                          {user.subscriptionPlan || 'Free'}
                        </span>
                        {premium?.isActive && <Crown size={12} className="text-amber-400 fill-amber-400" />}
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <FiUser className="text-sm" />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      to="/collection"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <FiStar className="text-sm" />
                      <span>Collection</span>
                    </Link>

                    <Link
                      to="/premium"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-amber-400 hover:bg-white/5 transition-colors"
                    >
                      <Crown size={14} className="fill-amber-400" />
                      <span>Upgrade Plan</span>
                    </Link>

                    <div className="h-[1px] bg-white/5 my-2"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-[#e11d48] hover:bg-[#e11d48]/10 transition-colors cursor-pointer"
                    >
                      <LogOut size={14} />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="hidden sm:block font-bold text-[14px] text-white/70 hover:text-white transition-colors">
                Login
              </Link>
              <Link to="/register">
                <Button className="bg-[#e11d48] hover:bg-[#be123c] text-white rounded-full px-5 py-2.5 h-auto text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-red-500/15 border-0 scale-95 md:scale-100 hover:scale-[1.03] active:scale-95">
                  Start free
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden text-white p-2 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/5 hover:border-white/10 cursor-pointer shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-[#0a0a0f]/95 border-b border-white/10 shadow-2xl backdrop-blur-3xl animate-in slide-in-from-top-2 px-4 py-4 max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="flex flex-col p-2 gap-1.5 bg-[#12121a] rounded-2xl border border-white/5">

            {/* User Profile Block in mobile menu */}
            {isLoggedIn && user && (
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl mb-2">
                <img
                  alt="Avatar"
                  src="image.webp"
                  className="h-10 w-10 rounded-full border border-white/10 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-white truncate">{user.username}</p>
                  <p className="text-[10px] text-white/40 truncate">{user.email}</p>
                </div>
                <div className="flex items-center bg-[#e11d48]/20 border border-[#e11d48]/40 px-2.5 py-1 rounded-lg shrink-0">
                  <span className="text-white text-xs font-black">{user.points?.toLocaleString('en-US').replace(/,/g, ' ')}</span>
                  <span className="text-[#e11d48] text-[8px] ml-1 font-bold">PTS</span>
                </div>
              </div>
            )}

            <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3.5 font-bold text-[14px] p-3 rounded-xl transition-colors ${isActive('/') && !location.search ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5'}`}>
              <FiHome className="text-lg" />
              Home
            </Link>

            <Link to="/?category=girls" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3.5 font-bold text-[14px] p-3 rounded-xl transition-colors ${isActive('/', 'girls') ? 'bg-[#e11d48]/15 text-[#e11d48] border border-[#e11d48]/20' : 'text-gray-300 hover:bg-white/5'}`}>
              <FaVenus className="text-lg" />
              Girls
            </Link>
 
            <Link to="/?category=anime" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3.5 font-bold text-[14px] p-3 rounded-xl transition-colors ${isActive('/', 'anime') ? 'bg-[#e11d48]/15 text-[#e11d48] border border-[#e11d48]/20' : 'text-gray-300 hover:bg-white/5'}`}>
              <TbSpiral className="text-lg" />
              Anime
            </Link>
 
            <Link to="/?category=men" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3.5 font-bold text-[14px] p-3 rounded-xl transition-colors ${isActive('/', 'men') ? 'bg-[#e11d48]/15 text-[#e11d48] border border-[#e11d48]/20' : 'text-gray-300 hover:bg-white/5'}`}>
              <FaMars className="text-lg" />
              Men
            </Link>

            <div className="h-[1px] bg-white/5 w-full my-1"></div>

            <Link to="/discover" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3.5 font-bold text-[14px] p-3 rounded-xl transition-colors ${isActive('/discover') ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5'}`}>
              <FiCompass className="text-lg" />
              Discover
            </Link>

            <Link to="/chat" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3.5 font-bold text-[14px] p-3 rounded-xl transition-colors ${isActive('/chat') ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5'}`}>
              <FiMessageCircle className="text-lg" />
              Chat
            </Link>

            <Link to="/create-girl" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3.5 font-bold text-[14px] p-3 rounded-xl transition-colors ${isActive('/create-girl') ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5'}`}>
              <FaMagic className="text-lg" />
              Create
            </Link>

            <Link to="/collection" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3.5 font-bold text-[14px] p-3 rounded-xl transition-colors ${isActive('/collection') ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5'}`}>
              <FaRobot className="text-lg" />
              My AI
            </Link>

            <Link to="/premium" onClick={() => setMobileMenuOpen(false)} className={`flex items-center justify-between font-bold text-[14px] p-3 rounded-xl transition-all border border-[#d4af37]/20 bg-[#d4af37]/5 text-amber-400 hover:bg-[#d4af37]/10`}>
              <div className="flex items-center gap-3.5">
                <FaGem className="text-lg" />
                Premium
              </div>
              <span className="bg-[#e11d48] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                -70%
              </span>
            </Link>

            <div className="h-[1px] bg-white/5 w-full my-1"></div>

            {/* Language Selector (Mobile) */}
            <div className="p-3">
              <span className="text-[10px] uppercase font-bold text-white/30 tracking-widest block mb-2 px-1">Language</span>
              <div className="grid grid-cols-4 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLangChange(lang.code)}
                    className={`flex items-center justify-center py-2.5 rounded-xl border text-xs font-bold transition-all ${currentLang === lang.code ? 'border-[#e11d48] bg-[#e11d48]/15 text-[#e11d48]' : 'border-white/5 bg-white/5 text-white/60'}`}
                  >
                    {lang.code}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Logout (if logged in) */}
            {isLoggedIn && user && (
              <>
                <div className="h-[1px] bg-white/5 w-full my-1"></div>
                <button
                  onClick={(e) => { setMobileMenuOpen(false); handleLogout(e); }}
                  className="w-full flex items-center gap-3.5 font-bold text-[14px] p-3 rounded-xl transition-colors text-[#e11d48] hover:bg-[#e11d48]/10 cursor-pointer"
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}





