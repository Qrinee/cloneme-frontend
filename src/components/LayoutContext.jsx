import { createContext, useContext, useState, useEffect } from 'react';

const LayoutContext = createContext({
  isLoggedIn: false,
  isLoading: true,
  user: null,
  updateUser: () => {},
  // Guest mode state
  isGuest: false,
  messagesRemaining: 10,
  guestConversations: {},
  updateGuestConversation: () => {},
  clearGuestConversation: () => {}
});

export const useLayoutContext = () => useContext(LayoutContext);

export function LayoutProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  // Guest mode state
  const [isGuest, setIsGuest] = useState(false);
  const [messagesRemaining, setMessagesRemaining] = useState(10);
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
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
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
      // Guest mode
      isGuest,
      setIsGuest,
      messagesRemaining, 
      setMessagesRemaining,
      guestConversations,
      updateGuestConversation,
      clearGuestConversation,
      addGuestMessage
    }}>
      {children}
    </LayoutContext.Provider>
  );
}