import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import { ThemeProvider } from './components/theme-provider'
import NotFound from './pages/NotFound'
import ChatPage from './pages/ChatPage'
import GoogleSuccessLogin from './pages/GoogleSuccessLogin'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MainPage from './pages/MainPage'
import App from './App'
import LandingPage from './pages/LandingPage'
import InteractiveVideoCard from './components/InteractiveVideoTab'
import DiscoverPage from './pages/DiscoverPage'
import CollectionPage from './pages/CollectionPage'
import JerkOffPage from './pages/JerkOffPage'
import CreateGirlPage from './pages/CreateGirlPage'
import HowItWorksPage from './pages/HowItWorksPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import ProfilePage from './pages/ProfilePage'
import PremiumPage from './pages/PremiumPage'
import { LayoutProvider, useLayoutContext } from './components/LayoutContext'

function Application() {
  const { isLoggedIn, isLoading } = useLayoutContext();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  if (isLoading) {
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
        path='/chat' 
        element={<ChatPage />} 
      />
      <Route 
        path='/chat/:id' 
        element={<ChatPage />} 
      />

      <Route 
        path='/discover' 
        element={<DiscoverPage />} 
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

      <Route 
        path='/terms' 
        element={<TermsPage />} 
      />

      <Route 
        path='/privacy' 
        element={<PrivacyPage />} 
      />

      <Route 
        path='/profile' 
        element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} 
      />

      <Route 
        path='/premium' 
        element={<PremiumPage />} 
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider>
        <LayoutProvider>
          <Application />
        </LayoutProvider>
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>
)