import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiX, FiMessageCircle } from "react-icons/fi";

const DEMO_GIRL_ID = "demo-girl-001";

export default function DemoFloatingButton({ onDemoClick }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if user has already used demo
    const hasUsedDemo = localStorage.getItem("hasUsedDemo");
    if (!hasUsedDemo) {
      // Show after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDemoClick = () => {
    localStorage.setItem("hasUsedDemo", "true");
    setIsVisible(false);
    if (onDemoClick) {
      onDemoClick(DEMO_GIRL_ID);
    } else {
      window.location.href = `/chat/${DEMO_GIRL_ID}`;
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("hasUsedDemo", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#741818] to-[#8B5CF6] rounded-2xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
            
            {/* Main button */}
            <button
              onClick={handleDemoClick}
              className="relative flex items-center gap-3 px-5 py-3.5 bg-[#12121a]/95 backdrop-blur-xl rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:scale-105"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#741818] to-[#8B5CF6] flex items-center justify-center">
                <FiUser className="text-white text-lg" />
              </div>
              
              {/* Text */}
              <div className="flex flex-col items-start">
                <span className="text-xs text-white/50 font-medium">Try with</span>
                <span className="text-sm font-bold text-white">Demo Girl</span>
              </div>

              {/* Icon */}
              <div className="ml-2 w-8 h-8 rounded-lg bg-[#741818]/20 flex items-center justify-center">
                <FiMessageCircle className="text-[#741818]" />
              </div>

              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDismiss();
                }}
                aria-label="Close demo popup"
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <FiX className="text-white/70 text-xs" />
              </button>
            </button>
          </div>

          {/* Pulse animation */}
          <motion.div
            className="absolute top-1/2 left-4 w-12 h-12 rounded-full bg-[#741818]/30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
