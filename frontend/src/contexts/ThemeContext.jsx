import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('emotion-detective-theme');
    return savedTheme || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('emotion-detective-theme', theme);
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('dark', 'light');
    document.body.classList.remove('dark', 'light');
    
    // Add new theme class
    root.classList.add(theme);
    document.body.classList.add(theme);
    
    // Set CSS custom properties for both themes
    if (theme === 'dark') {
      root.style.setProperty('--bg-primary', '#0f0f23');
      root.style.setProperty('--bg-secondary', '#1a1a2e');
      root.style.setProperty('--bg-accent', '#16213e');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#a1a1aa');
      root.style.setProperty('--text-tertiary', '#6b7280');
      root.style.setProperty('--border-primary', 'rgba(255, 255, 255, 0.1)');
      root.style.setProperty('--border-secondary', 'rgba(255, 255, 255, 0.2)');
      root.style.setProperty('--glow-color', 'rgba(167, 139, 250, 0.5)');
    } else {
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f8fafc');
      root.style.setProperty('--bg-accent', '#e2e8f0');
      root.style.setProperty('--text-primary', '#1e293b');
      root.style.setProperty('--text-secondary', '#475569');
      root.style.setProperty('--text-tertiary', '#64748b');
      root.style.setProperty('--border-primary', 'rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--border-secondary', 'rgba(0, 0, 0, 0.2)');
      root.style.setProperty('--glow-color', 'rgba(59, 130, 246, 0.5)');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
