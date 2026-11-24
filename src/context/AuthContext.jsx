import { useState } from 'react';
import { AuthContext } from './authStore';

const SESSION_KEY = 'user_data';
function readStoredUser() {
  if (typeof window === 'undefined') return null;

  try {
    const storedUser = window.localStorage.getItem(SESSION_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const login = (profile) => {
    if (!profile || !['santri', 'admin_institusi', 'super_admin'].includes(profile.role)) {
      throw new Error('Profil login tidak memiliki role yang valid.');
    }

    setUser(profile);
    try {
      // Mock login must not inherit a stale API token from a previous session.
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user');
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(profile));
    } catch {
      // Keep the in-memory session usable when browser storage is unavailable.
    }
  };

  const logout = () => {
    setUser(null);
    try {
      window.localStorage.removeItem(SESSION_KEY);
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user');
    } catch {
      // The in-memory session is still cleared.
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

