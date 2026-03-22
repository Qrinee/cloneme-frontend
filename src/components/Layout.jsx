import { useState } from "react";
import { FiMenu, FiX, FiHome, FiCompass, FiMessageCircle, FiStar, FiUser, FiGlobe, FiMail, FiSettings, FiLogOut } from "react-icons/fi";
import { FaFemale, FaMale, FaDragon } from "react-icons/fa";
import logo from '../assets/gpt.png';
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("girls");
  const [activeNav, setActiveNav] = useState("home");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const tabs = [
    { id: "girls", label: "Girls", icon: <FaFemale /> },
    { id: "anime", label: "Anime", icon: <FaDragon /> },
    { id: "guys", label: "Guys", icon: <FaMale /> },
  ];

  const navItems = [
    { id: "home", label: "Home", icon: <FiHome />, link: "/" },
    { id: "discover", label: "Discover", icon: <FiCompass />, link: "/discover" },
    { id: "chat", label: "Chat", icon: <FiMessageCircle />, badge: "3", link: "/chat/123" },
    { id: "collection", label: "Collection", icon: <FiStar />, link: "/collection" },
    { id: "create", label: "Create", icon: <FiUser />, link: "/clone" },
  ];

  const footerItems = [
    { id: "contact", label: "Contact Us", icon: <FiMail /> },
    { id: "language", label: "Language", icon: <FiGlobe /> },
    { id: "settings", label: "Settings", icon: <FiSettings /> },
    { id: "logout", label: "Log Out", icon: <FiLogOut /> },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-gray-100">

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0f0f14] border-r border-gray-800/50 transform transition-all duration-300 z-20
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex-shrink-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-4">
            <Link to={'/'}>
              <div className="flex items-center space-x-3">
                <img src={logo} alt="Logo" className="h-8" />
              </div>
            </Link>
          </div>

          {/* Navigation Section */}
          <nav className="flex-1 px-3 py-2 overflow-y-auto">
            {/* Main Menu Section */}
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2 px-3">Main Menu</h3>
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <Link to={item.link || '#'} key={item.id} style={{ textDecoration: 'none' }}>
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveNav(item.id)}
                        className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium
                          ${activeNav === item.id
                            ? 'bg-[#DC2626]/10 text-[#DC2626]'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                          }`}
                      >
                        <span className="text-lg mr-3">{item.icon}</span>
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-[#DC2626] text-white text-xs px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>

            {/* Account Section */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2 px-3">Account</h3>
              <ul className="space-y-1">
                {footerItems.map((item) => (
                  <li key={item.id}>
                    <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200 text-sm font-medium">
                      <span className="text-lg mr-3">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* User Profile Section */}
          <div className="p-3 border-t border-gray-800/50">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/30 cursor-pointer transition-colors">
              <img 
                src="https://i.pravatar.cc/300" 
                alt="Avatar" 
                className="h-8 w-8 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-white truncate">Qrin</h4>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-850 shadow-lg px-4 py-3 border-b border-gray-700">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
            {/* Left section */}
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <button 
                className="md:hidden text-gray-100 hover:text-[#DC2626] transition-colors duration-200 p-2 hover:bg-gray-800 rounded-lg"
                onClick={toggleSidebar}
              >
                {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>

              <div className="flex space-x-1 rounded-xl p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all duration-200
                      ${activeTab === tab.id 
                        ? 'bg-gradient-to-r from-red-900/40 to-red-900/40 text-[#DC2626] shadow-lg shadow-red-900/20' 
                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
                      }
                    `}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-semibold">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Profile */}

          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;