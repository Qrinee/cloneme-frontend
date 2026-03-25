import { useState } from "react";
import { FiMenu, FiX, FiHome, FiCompass, FiMessageCircle, FiStar, FiUser, FiGlobe, FiMail, FiSettings, FiLogOut, FiHelpCircle } from "react-icons/fi";
import { FaFemale, FaMale, FaDragon } from "react-icons/fa";
import logo from '../assets/gpt.png';
import { Link, useNavigate, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navItems = [
    { id: "home", label: "Home", icon: <FiHome />, link: "/" },
    { id: "discover", label: "Discover", icon: <FiCompass />, link: "/discover" },
    { id: "chat", label: "Chat", icon: <FiMessageCircle />, badge: "3", link: "/chat/123" },
    { id: "collection", label: "Collection", icon: <FiStar />, link: "/collection" },
    { id: "create", label: "Create", icon: <FiUser />, link: "/create-girl" },
    { id: "how-it-works", label: "How it works", icon: <FiHelpCircle />, link: "/how-it-works" },
  ];

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/auth/logout`, {
        credentials: "include"
      });
      window.location.href = '/login';
    } catch (err) {
      window.location.href = '/login';
    }
  };

  const footerItems = [
    { id: "settings", label: "Settings", icon: <FiSettings /> },
    { id: "logout", label: "Log Out", icon: <FiLogOut />, onClick: handleLogout },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-gray-100 font-sans overflow-hidden">
      
      {/* Mobile Top Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black/20 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between px-6 z-40">
        <Link to={'/'}>
          <img src={logo} alt="Logo" className="h-7" />
        </Link>
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-all outline-none"
        >
          {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </header>

      {/* Sidebar Backdrop (Mobile) */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Modern Glass */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#0f0f14] border-r border-white/5 transform transition-all duration-500 z-50
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex-shrink-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section (Desktop) */}
          <div className="hidden md:block p-6">
            <Link to={'/'}>
              <div className="flex items-center space-x-3">
                <img src={logo} alt="Logo" className="h-9" />
              </div>
            </Link>
          </div>

          {/* Navigation Section */}
          <nav className="flex-1 px-4 py-2 mt-20 md:mt-0 overflow-y-auto no-scrollbar">
            {/* Main Menu Section */}
            <div className="mb-8">
              <h3 className="text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold mb-4 px-4">Main Menu</h3>
              <ul className="space-y-1.5">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <Link to={item.link || '#'} onClick={() => setSidebarOpen(false)} style={{ textDecoration: 'none' }}>
                      <button
                        className={`w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 text-base font-bold
                          ${isActive(item.link)
                            ? 'bg-[#741818]/10 text-[#741818] border border-[#741818]/20'
                            : 'text-white/40 hover:text-white hover:bg-white/5'
                          }`}
                      >
                        <span className="text-xl mr-4">{item.icon}</span>
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-[#741818] text-white text-[10px] font-black px-2 py-0.5 rounded-lg">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account Section */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold mb-4 px-4">Account</h3>
              <ul className="space-y-1.5">
                {footerItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={(e) => {
                        setSidebarOpen(false);
                        item.onClick && item.onClick(e);
                      }}
                      className="w-full flex items-center px-4 py-3.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200 text-base font-bold"
                    >
                      <span className="text-xl mr-4">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors group">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                alt="Avatar"
                className="h-9 w-9 rounded-full border border-white/10"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate group-hover:text-[#741818] transition-colors">Master Qrin</h4>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-none mt-1">Premium</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Page content */}
        <main className="flex-1 pt-16 md:pt-0 pb-20 md:pb-0 overflow-auto no-scrollbar">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-black/20 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around px-6 z-40">
        {navItems.slice(0, 4).map((item) => (
          <Link 
            key={item.id} 
            to={item.link}
            className={`flex flex-col items-center justify-center space-y-1.5 transition-all duration-300 ${isActive(item.link) ? 'text-[#741818]' : 'text-white/30'}`}
          >
            <span className={`text-2xl transition-transform duration-300 ${isActive(item.link) ? 'scale-110' : ''}`}>
              {item.icon}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">
              {item.label === "Collection" ? "Vault" : item.label}
            </span>
          </Link>
        ))}
      </nav>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Layout;
