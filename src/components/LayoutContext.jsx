import { createContext, useContext, useState, useEffect } from 'react';

const LayoutContext = createContext({
  isLoggedIn: false,
  isLoading: true,
  user: null,
  updateUser: () => {},
  // Guest mode state
  isGuest: false,
  messagesRemaining: 10,
  messagesUsed: 0,
  premium: { isActive: false, expiresAt: null },
  canCreateGirlfriend: true,
  lastGirlfriendCreated: null,
  guestConversations: {},
  updateGuestConversation: () => {},
  clearGuestConversation: () => {}
});

export const useLayoutContext = () => useContext(LayoutContext);

export function LayoutProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  // Premium and messaging state
  // premium is { isActive: bool, expiresAt: string | null }
  const [premium, setPremium] = useState({ isActive: false, expiresAt: null });
  const [messagesUsed, setMessagesUsed] = useState(0);
  // messagesRemaining is number or "unlimited"
  const [messagesRemaining, setMessagesRemaining] = useState(10);
  const [canCreateGirlfriend, setCanCreateGirlfriend] = useState(true);
  const [lastGirlfriendCreated, setLastGirlfriendCreated] = useState(null);
  
  // Guest mode state
  const [isGuest, setIsGuest] = useState(false);
  const [guestConversations, setGuestConversations] = useState({}); // { chatbotId: messages[] }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_URL + "/mydata", {
          method: 'GET',
          credentials: "include"
        });
        const data = await res.json();
        if (data?.type === "success") {
          setIsLoggedIn(true);
          setUser(data.user);
          // Update premium and messaging state from user data
          // premium: { isActive: bool, expiresAt: string | null }
          // messagesRemaining: number | "unlimited"
          if (data.user) {
            setPremium(data.user.premium || { isActive: false, expiresAt: null });
            setMessagesUsed(data.user.messagesUsed || 0);
            setMessagesRemaining(data.user.messagesRemaining !== undefined 
              ? data.user.messagesRemaining 
              : 10);
            setCanCreateGirlfriend(data.user.canCreateGirlfriend !== undefined 
              ? data.user.canCreateGirlfriend 
              : true);
            setLastGirlfriendCreated(data.user.lastGirlfriendCreated || null);
          }
        } else {
          setIsLoggedIn(false);
          setUser(null);
          setPremium({ isActive: false, expiresAt: null });
          setMessagesUsed(0);
          setMessagesRemaining(10);
          setCanCreateGirlfriend(true);
          setLastGirlfriendCreated(null);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
        setPremium({ isActive: false, expiresAt: null });
        setMessagesUsed(0);
        setMessagesRemaining(10);
        setCanCreateGirlfriend(true);
        setLastGirlfriendCreated(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const updateUser = (newUserData) => {
    if (newUserData) {
      setUser(prev => ({ ...prev, ...newUserData }));
    }
  };
  
  // Guest conversation helpers
  const updateGuestConversation = (chatbotId, messages, remaining) => {
    setGuestConversations(prev => ({
      ...prev,
      [chatbotId]: messages
    }));
    if (remaining !== undefined) {
      setMessagesRemaining(remaining);
    }
    setIsGuest(true);
  };
  
  const clearGuestConversation = (chatbotId) => {
    setGuestConversations(prev => {
      const newConversations = { ...prev };
      delete newConversations[chatbotId];
      return newConversations;
    });
  };
  
  const addGuestMessage = (chatbotId, message) => {
    setGuestConversations(prev => ({
      ...prev,
      [chatbotId]: [...(prev[chatbotId] || []), message]
    }));
  };

  return (
    <LayoutContext.Provider value={{ 
      isLoggedIn, 
      isLoading, 
      user, 
      updateUser,
      // Premium state - { isActive: bool, expiresAt: string | null }
      premium,
      setPremium,
      messagesUsed,
      setMessagesUsed,
      messagesRemaining, 
      setMessagesRemaining,
      canCreateGirlfriend,
      setCanCreateGirlfriend,
      lastGirlfriendCreated,
      setLastGirlfriendCreated,
      // Guest mode
      isGuest,
      setIsGuest,
      guestConversations,
      updateGuestConversation,
      clearGuestConversation,
      addGuestMessage
    }}>
      {children}
    </LayoutContext.Provider>
  );
}