import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

// En reducer för att hantera användaraktioner
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // Uppdatera användarinformationen med data från inloggningen
      return { ...state, user: action.user };
    case 'LOGOUT':
      // När användaren loggar ut, sätt användarinformationen till null
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    // Kolla om användaren är inloggad och uppdatera användarstatusen
    const token = localStorage.getItem('token');
    if (token) {
      // Gör ett anrop för att hämta användarinformation från servern om det behövs
      // När du får användarinformationen från servern, använd 'dispatch' för att uppdatera användarinformationen
      // Exempel: dispatch({ type: 'LOGIN', user: userData });
      const userData = {}; // Uppdatera detta med den faktiska användarinformationen
      dispatch({ type: 'LOGIN', user: userData });
    }
  }, []);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};








/*import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};*/
