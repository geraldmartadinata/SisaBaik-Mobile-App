import { createContext, useContext, useState } from 'react';
import userData from '../data/user.json';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState(userData);

  const login = (email, password) => {
    // simulasi login
    setUser(userData);
    setIsLoggedIn(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('sisabaik_role');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
