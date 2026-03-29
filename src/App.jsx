import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import ReelScreen from "./components/ReelScreen";
import LoginModal from "./components/LoginModal";
import AgeVerification from "./components/AgeVerification";
import DemoFloatingButton from "./components/DemoFloatingButton";
import OnboardingTour, { useOnboardingTour } from "./components/OnboardingTour";

export default function App() {
  const [showReel, setShowReel] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { showTour, startTour, endTour } = useOnboardingTour();

  // Handle demo button click

  // Change title when user loses focus
  useEffect(() => {
    const originalTitle = document.title;
    
    const handleBlur = () => {
      document.title = "Come back, sweety! 💕";
    };
    
    const handleFocus = () => {
      document.title = originalTitle;
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.title = originalTitle;
    };
  }, []);

  return (
    <>
      {/* <AgeVerification /> */}
      {showReel && <ReelScreen onClose={() => setShowReel(false)} />}
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
      <HomePage />
      <DemoFloatingButton />
      <OnboardingTour 
        isOpen={showTour} 
        onComplete={endTour}
        targetElements={{
          discover: 'discover-link',
          create: 'create-link',
          premium: 'premium-link'
        }}
      />
    </>
  );
}
