import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Effect to manage theme and localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      updateTheme(savedTheme);
    } else {
      // Default to system preference if no saved theme
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDarkMode ? 'dark' : 'light');
      updateTheme(prefersDarkMode ? 'dark' : 'light');
    }
  }, []);

  // Function to update theme
  const updateTheme = (selectedTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    
    if (selectedTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', selectedTheme);
  };

  // Toggle theme handler
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    updateTheme(newTheme);
  };

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="text-gray-800 w-5 h-5" />
      ) : (
        <Sun className="text-yellow-500 w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;