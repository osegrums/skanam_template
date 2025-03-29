
import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ThemeProvider } from "next-themes";

export function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string>("system");
  const [isThemeChanging, setIsThemeChanging] = useState(false);
  
  useEffect(() => {
    // Get initial theme from localStorage or HTML class
    const savedTheme = localStorage.getItem('theme') || 'system';
    const isDark = document.documentElement.classList.contains('dark');
    const initialTheme = savedTheme !== 'system' ? savedTheme : (isDark ? 'dark' : 'light');
    setTheme(initialTheme);
    
    // Listen for theme changes from Rails
    const handleThemeChanged = (e: CustomEvent) => {
      if (e.detail && e.detail.theme && !isThemeChanging) {
        setIsThemeChanging(true);
        setTheme(e.detail.theme);
        
        // Reset the flag after a delay
        setTimeout(() => {
          setIsThemeChanging(false);
        }, 100);
      }
    };
    
    window.addEventListener('theme-changed', handleThemeChanged as EventListener);
    
    return () => {
      window.removeEventListener('theme-changed', handleThemeChanged as EventListener);
    };
  }, [isThemeChanging]);

  return (
    <ThemeProvider defaultTheme={theme} enableSystem attribute="class">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
