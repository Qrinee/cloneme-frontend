import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import ReelScreen from "./components/ReelScreen";
import LoginModal from "./components/LoginModal";

export default function App() {
  const [showReel, setShowReel] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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
      {showReel && <ReelScreen onClose={() => setShowReel(false)} />}
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
      <HomePage />
    </>
  );
}
