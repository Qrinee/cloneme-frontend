import { createContext, useContext, useState, useEffect } from 'react';

const LayoutContext = createContext({
  isLoggedIn: false,
  isLoading: true,
  user: null,
  updateUser: () => {}
});

export const useLayoutContext = () => useContext(LayoutContext);

export function LayoutProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

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

  return (
    <LayoutContext.Provider value={{ isLoggedIn, isLoading, user, updateUser }}>
      {children}
    </LayoutContext.Provider>
  );
}