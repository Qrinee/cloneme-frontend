import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiUser, FiStar, FiChevronRight, FiX } from "react-icons/fi";

const TOUR_STEPS = [
  {
    id: 1,
    message: "Click any girl to start chatting",
    icon: <FiMessageCircle className="text-xl" />,
    position: "center",
    duration: 10000, // 10 seconds for first step
  },
  {
    id: 2,
    message: "Create your own AI girlfriend",
    icon: <FiUser className="text-xl" />,
    position: "center",
    duration: 10000, // 10 seconds for second step
  },
  {
    id: 3,
    message: "Unlock premium features",
    icon: <FiStar className="text-xl" />,
    position: "center",
    duration: 10000, // 10 seconds for third step
  },
];

export default function OnboardingTour({ 
  isOpen, 
  onComplete, 
  onSkip,
  targetElements = {} 
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tourRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Delay showing the tour slightly
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isVisible) return;

    // Calculate position based on target element
    const updatePosition = () => {
      const step = TOUR_STEPS[currentStep];
      const targetId = step?.id === 1 ? targetElements.discover :
                       step?.id === 2 ? targetElements.create :
                       targetElements.premium;
      
      if (targetId) {
        const element = document.querySelector(`[data-tour-target="${targetId}"]`);
        if (element) {
          const rect = element.getBoundingClientRect();
          setTooltipPosition({
            top: rect.bottom + 20,
            left: rect.left + rect.width / 2,
          });
        }
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [currentStep, isVisible, targetElements]);

  useEffect(() => {
    if (!isVisible) return;

    const step = TOUR_STEPS[currentStep];
    const timer = setTimeout(() => {
      if (currentStep < TOUR_STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleComplete();
      }
    }, step.duration);

    return () => clearTimeout(timer);
  }, [currentStep, isVisible]);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem("hasSeenOnboardingTour", "true");
    setIsVisible(false);
    setTimeout(() => {
      onComplete?.();
    }, 300);
  };

  const handleSkip = () => {
    localStorage.setItem("hasSeenOnboardingTour", "true");
    setIsVisible(false);
    onSkip?.();
  };

  if (!isOpen) return null;

  const currentTourStep = TOUR_STEPS[currentStep];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] pointer-events-none"
        >
          {/* Overlay with spotlight effect */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" />
          
          {/* Tour Container */}
          <div 
            ref={tourRef}
            className="absolute pointer-events-auto"
            style={{
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              transform: "translateX(-50%)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-[320px] bg-[#12121a]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Progress indicator */}
              <div className="h-1 bg-white/10 flex">
                {TOUR_STEPS.map((_, index) => (
                  <div
                    key={index}
                    className={`flex-1 transition-all duration-300 ${
                      index <= currentStep ? "bg-gradient-to-r from-[#741818] to-[#8B5CF6]" : "bg-white/10"
                    }`}
                    style={{
                      width: index < currentStep ? "100%" : 
                             index === currentStep ? `${(Date.now() % 10000) / 100}%` : "0%",
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#741818]/20 to-[#8B5CF6]/20 border border-white/10 flex items-center justify-center flex-shrink-0 text-[#741818]">
                    {currentTourStep.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-[#741818]">
                        Step {currentStep + 1} of {TOUR_STEPS.length}
                      </span>
                      <button
                        onClick={handleSkip}
                        className="text-white/30 hover:text-white/50 transition-colors"
                      >
                        <FiX className="text-lg" />
                      </button>
                    </div>
                    <p className="text-white font-semibold text-lg leading-tight">
                      {currentTourStep.message}
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <button
                    onClick={handleSkip}
                    className="text-sm text-white/40 hover:text-white/60 transition-colors"
                  >
                    Skip tour
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#741818] to-[#8B5CF6] rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    {currentStep < TOUR_STEPS.length - 1 ? "Next" : "Get Started"}
                    <FiChevronRight className="text-lg" />
                  </button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#741818]/10 rounded-full blur-3xl" />
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#8B5CF6]/10 rounded-full blur-2xl" />
            </motion.div>

            {/* Animated arrow pointer */}
            <motion.div
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#12121a] border-l border-t border-white/10 rotate-45"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>

          {/* Skip button in corner */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSkip}
            className="absolute top-6 right-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/60 hover:text-white text-sm font-medium transition-all pointer-events-auto"
          >
            Skip (30s)
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for managing the onboarding tour
export function useOnboardingTour() {
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    // Check if user has already seen the tour
    const hasSeenTour = localStorage.getItem("hasSeenOnboardingTour");
    const isFirstVisit = !localStorage.getItem("isFirstVisitComplete");
    
    if (!hasSeenTour && isFirstVisit) {
      // Mark first visit as complete
      localStorage.setItem("isFirstVisitComplete", "true");
      
      // Show tour after a short delay
      const timer = setTimeout(() => {
        setShowTour(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const startTour = () => {
    localStorage.removeItem("hasSeenOnboardingTour");
    setShowTour(true);
  };

  const endTour = () => {
    setShowTour(false);
  };

  return { showTour, startTour, endTour };
}
