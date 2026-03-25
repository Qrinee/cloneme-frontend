import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import './index.css'
import { ThemeProvider } from './components/theme-provider'
import NotFound from './pages/NotFound'
import ChatPage from './pages/ChatPage'
import GoogleSuccessLogin from './pages/GoogleSuccessLogin'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MainPage from './pages/MainPage'
import App from './App'
import { useAuthFetch } from './utils/authFetch'
import LandingPage from './pages/LandingPage'
import InteractiveVideoCard from './components/InteractiveVideoTab'
import DiscoverPage from './pages/DiscoverPage'
import CollectionPage from './pages/CollectionPage'
import JerkOffPage from './pages/JerkOffPage'
import CreateGirlPage from './pages/CreateGirlPage'
import HowItWorksPage from './pages/HowItWorksPage'

// Dashboard component for authenticated users


// Main App component with routes
function Application() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const authFetch = useAuthFetch();

  // Wykrywanie urządzenia mobilnego
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // 768px - typowy breakpoint dla mobile
    };

    checkIsMobile(); // sprawdzenie przy pierwszym renderze
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Sprawdzenie autoryzacji
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authFetch(import.meta.env.VITE_URL + "/mydata");
        const data = await res.json();
        setIsLoggedIn(data?.type === "success");
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={<App />} 
      />
      <Route path='/main' element={<LandingPage/>} />

      <Route path='/google/success' element={<GoogleSuccessLogin />} />
      <Route 
        path='/login' 
        element={<MainPage />} 
      />
      <Route 
        path='/register' 
        element={<MainPage />} 
      />
      <Route 
        path='/live-action'
        element={<InteractiveVideoCard/>}
      />


      <Route 
        path='/chat/:id' 
        element={<ChatPage />} 
      />

      <Route 
        path='/discover' 
        element={isLoggedIn ? <DiscoverPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path='/collection' 
        element={isLoggedIn ? <CollectionPage /> : <Navigate to="/login" />} 
      />

      <Route 
        path='/jerk-off/:id' 
        element={<JerkOffPage />} 
      />

      <Route 
        path='/create-girl' 
        element={<CreateGirlPage />} 
      />

      <Route 
        path='/how-it-works' 
        element={<HowItWorksPage />} 
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider>
        <Application />
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>
)