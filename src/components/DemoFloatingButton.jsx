import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

const DEMO_GIRL_ID = "69c7bb50d531ee949be6a444";

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
      window.location.href = `/jerk-off/69c7bb50d531ee949be6a444`;
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
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#e11d48] to-[#8B5CF6] rounded-2xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
            
            {/* Main button */}
            <button
              onClick={handleDemoClick}
              className="relative flex items-center gap-3 px-5 py-3.5 bg-[#0a0a0f]/95 backdrop-blur-xl rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 group-hover:scale-105"
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e11d48]/20 to-transparent border border-white/10 flex items-center justify-center overflow-hidden">
                <img src="/icon.png" alt="Demo" className="w-full h-full object-cover" />
              </div>
              
              {/* Text */}
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Try with</span>
                <span className="text-base font-bold text-white tracking-tight">Demo Girl</span>
                <span className="text-[10px] text-green-500/80 font-bold uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                  For free
                </span>
              </div>

              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDismiss();
                }}
                aria-label="Close demo popup"
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <FiX className="text-white/50 text-xs" />
              </button>
            </button>
          </div>

          {/* Pulse animation */}
          <motion.div
            className="absolute top-1/2 left-4 w-12 h-12 rounded-full bg-[#e11d48]/30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}





