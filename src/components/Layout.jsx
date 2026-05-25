import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiCompass, FiMessageCircle, FiStar, FiUser, FiHelpCircle, FiLogOut, FiUserPlus, FiLock } from "react-icons/fi";
import { Crown, Coins, Flame, User as UserIcon, LogOut } from "lucide-react";
import Header from "./Header/Header";
import RightSidebar from "./RightSidebar";
import DialogLoginPrompt from "./DialogLoginPrompt";
import { useLayoutContext } from "./LayoutContext";

const Layout = ({ children }) => {
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, premium } = useLayoutContext();

  const isChatOrJerkoff = location.pathname.startsWith('/chat') || location.pathname.startsWith('/jerk-off');

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

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { id: "home", label: "Home", icon: <FiHome />, link: "/" },
    { id: "discover", label: "Discover", icon: <FiCompass />, link: "/discover" },
    { id: "chat", label: "Chat", icon: <FiMessageCircle />, link: "/chat" },
    { id: "collection", label: "My Collection", icon: <FiStar />, link: "/collection" },
    { id: "create", label: "Create AI", icon: <FiUser />, link: "/create-girl" },
    { id: "how-it-works", label: "How It Works", icon: <FiHelpCircle />, link: "/how-it-works" },
  ];

  return (
    <div className="flex flex-col h-[100dvh] bg-[#0a0a0f] text-gray-100 font-sans overflow-hidden">
      {/* Top Header Navigation */}
      <Header />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-row min-w-0 relative overflow-hidden">
        
        {/* Desktop Sidebar (hidden on mobile, visible from md up) */}
        <aside className="hidden md:flex flex-col w-64 bg-[#0a0a0f] border-r border-white/5 h-full overflow-y-auto no-scrollbar shrink-0 justify-between py-6">
          <div className="flex flex-col gap-6">
            
            {/* Sidebar Navigation */}
            <div className="px-4">
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white/20 px-4 block mb-3">
                Navigation
              </span>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link 
                    key={item.id} 
                    to={item.link} 
                    style={{ textDecoration: 'none' }}
                  >
                    <button
                      className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 text-sm font-bold cursor-pointer border ${
                        isActive(item.link)
                          ? 'bg-[#e11d48]/10 text-[#e11d48] border-[#e11d48]/20 shadow-md shadow-[#e11d48]/5'
                          : 'text-white/40 border-transparent hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="text-lg mr-3.5">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Sensual Premium Promo Card */}
            <div className="px-4">
              <div 
                onClick={() => navigate('/premium')}
                className="mx-1 p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-[#e11d48]/10 border border-amber-500/20 hover:border-amber-500/40 relative group overflow-hidden cursor-pointer transition-all duration-300 shadow-lg shadow-black/40 hover:scale-[1.01]"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#e11d48]/10 rounded-full blur-md group-hover:scale-125 transition-all duration-500" />
                <div className="flex items-center gap-2 mb-2 relative z-10">
                  <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider">Premium</span>
                  <span className="ml-auto bg-[#e11d48] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-sm shadow-[#e11d48]/35">-70%</span>
                </div>
                <p className="text-[10px] text-white/50 leading-relaxed relative z-10 font-bold">
                  Unlock unlimited messages and premium 18+ photo generation!
                </p>
              </div>
            </div>

          </div>

          {/* User Account / Footer Area */}
          <div className="px-4 border-t border-white/5 pt-5">
            {isLoggedIn && user ? (
              <div className="flex flex-col gap-3">
                
                {/* User stats widget */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                  <img
                    alt="Avatar"
                    src="image.webp"
                    className="h-9 w-9 rounded-full border border-white/10 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{user.username}</h4>
                    <p className="text-[9px] font-black uppercase text-white/30 tracking-widest mt-0.5">
                      {user.subscriptionPlan || 'Free'}
                    </p>
                  </div>
                  
                  {/* Points display */}
                  <div className="flex items-center bg-[#e11d48]/15 border border-[#e11d48]/30 px-2 py-1 rounded-lg shrink-0">
                    <span className="text-white text-xs font-black">
                      {user.points?.toLocaleString('en-US').replace(/,/g, ' ')}
                    </span>
                    <span className="text-[#e11d48] text-[8px] font-black ml-1">PTS</span>
                  </div>
                </div>

                 {/* Log Out Button */}
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/5 hover:border-[#e11d48]/20 bg-white/5 hover:bg-[#e11d48]/10 text-white/60 hover:text-[#e11d48] text-xs font-bold transition-all cursor-pointer"
                >
                  <LogOut size={14} />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition-all cursor-pointer border border-white/5">
                    Log In
                  </button>
                </Link>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <button className="w-full py-3 rounded-xl bg-[#e11d48] hover:bg-[#be123c] text-white font-black text-xs uppercase tracking-wider transition-all cursor-pointer border-none shadow-md shadow-[#e11d48]/15">
                    Sign Up Free
                  </button>
                </Link>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto no-scrollbar relative bg-[#0a0a0f]">
          {children}
        </main>

        {/* Desktop Right Sidebar (hidden on mobile, visible from xl up, hidden on chat/jerk-off pages) */}
        {!isChatOrJerkoff && <RightSidebar />}
      </div>

      {/* Dialog for Guest message limit redirect */}
      <DialogLoginPrompt 
        open={loginPromptOpen}
        onOpenChange={setLoginPromptOpen}
        onLogin={() => {
          setLoginPromptOpen(false);
          window.location.href = "/login";
        }}
        onMaybeLater={() => setLoginPromptOpen(false)}
      />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Layout;
