import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, User, Music, Calendar, LogIn, Search, AudioLines } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isThemeChanging, setIsThemeChanging] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkAuthState = () => {
      const authState = localStorage.getItem('demoAuthenticated');
      setIsAuthenticated(authState === 'true');
    };
    
    checkAuthState();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    const handleAuthChange = () => {
      checkAuthState();
    };
    
    const handleThemeSync = (e) => {
      if (e.detail && e.detail.theme && !isThemeChanging) {
        setTheme(e.detail.theme);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("auth-state-changed", handleAuthChange);
    window.addEventListener("theme-sync", handleThemeSync);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("auth-state-changed", handleAuthChange);
      window.removeEventListener("theme-sync", handleThemeSync);
    };
  }, [setTheme, isThemeChanging]);

  const handleThemeToggle = () => {
    if (isThemeChanging) return;
    
    setIsThemeChanging(true);
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    
    window.dispatchEvent(new CustomEvent('theme-changed', { 
      detail: { theme: newTheme } 
    }));
    
    setTimeout(() => {
      setIsThemeChanging(false);
    }, 100);
  };

  const publicNavLinks = [
    { href: "/", label: "Home", icon: AudioLines },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/songs", label: "Songs", icon: Music },
  ];

  const authNavLinks = [
    { href: "/dashboard", label: "Dashboard", icon: User },
    { href: "/my-events", label: "My Events", icon: Calendar },
    { href: "/my-songs", label: "My Songs", icon: Music },
  ];

  const mobileMenuClasses = cn(
    "md:hidden pt-4 pb-3 space-y-2 rounded-lg mt-2",
    "backdrop-blur-md border border-border/30",
    isScrolled ? "bg-background/70" : "bg-background/90"
  );

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || isMobileMenuOpen 
          ? "backdrop-blur-md py-2 border-b border-border/30 bg-background/70" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <AudioLines className="h-6 w-6 mr-2 text-primary" />
            <span className="text-primary">Skanam</span>
            <span className="text-secondary">.lv</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {publicNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
            
            {isAuthenticated && authNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleThemeToggle}
              className="text-foreground/80 hover:text-primary"
              disabled={isThemeChanging}
            >
              {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {!isAuthenticated ? (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" className="flex items-center gap-2">
                    Join Now
                  </Button>
                </Link>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="h-9 w-9 rounded-full p-0">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="" alt="User" />
                      <AvatarFallback className="text-sm">JS</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/dashboard" className="w-full">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsAuthenticated(false)}>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className={mobileMenuClasses}>
            {publicNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block py-2 text-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
            
            {isAuthenticated && authNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block py-2 text-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
            
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleThemeToggle}
              >
                {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              {!isAuthenticated ? (
                <div className="flex space-x-2">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="default" size="sm">
                      Join Now
                    </Button>
                  </Link>
                </div>
              ) : (
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="text-sm">JS</AvatarFallback>
                  </Avatar>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
