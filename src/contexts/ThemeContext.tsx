import React, { createContext, useContext, ReactNode } from 'react';

// Define the theme colors and other design variables
export const theme = {
  colors: {
    darkGreen: '#1B4332',
    lightGreen: '#95D5B2',
    mediumGreen: '#40916C',
    paleGreen: '#D8F3DC',
    accent: '#FF7F50',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    background: '#F5F7F5',
    card: '#FFFFFF',
    textPrimary: '#1F2937',
    textSecondary: '#4B5563',
    border: '#E5E7EB',
  },
  fonts: {
    primary: '"Inter", sans-serif',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  spacing: {
    base: '8px',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
  animation: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
};

type ThemeContextType = {
  theme: typeof theme;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}