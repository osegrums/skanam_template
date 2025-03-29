
import { useState } from "react";
import { Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Footer() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Placeholder for authentication state
  const [language, setLanguage] = useState("en"); // Default language

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "lv" : "en");
  };
  
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-primary-foreground/90">
              A modern music platform for sharing and discovering singing events and song lyrics.
            </p>
            <p className="text-primary-foreground/90 mt-2 text-sm">
              No copyrighted or non-public content allowed.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-primary-foreground/90 hover:text-primary-foreground">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/songs" className="text-primary-foreground/90 hover:text-primary-foreground">
                  Songs
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-primary-foreground/90 hover:text-primary-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-primary-foreground/90 hover:text-primary-foreground">
                  Legal Terms
                </Link>
              </li>
              {isAuthenticated && (
                <>
                  <li>
                    <Link to="/my-events" className="text-primary-foreground/90 hover:text-primary-foreground">
                      My Events
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-songs" className="text-primary-foreground/90 hover:text-primary-foreground">
                      My Songs
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              {isAuthenticated && (
                <li>
                  <Link to="/feedback" className="text-primary-foreground/90 hover:text-primary-foreground">
                    Send Feedback
                  </Link>
                </li>
              )}
              <li>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleLanguage}
                  className="text-primary-foreground/90 hover:text-primary-foreground p-0 h-auto font-normal flex items-center gap-2"
                >
                  <Globe className="h-4 w-4" />
                  {language === "en" ? "English" : "Latviešu"}
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-primary-foreground/90 hover:text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="text-primary-foreground/90 hover:text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="text-primary-foreground/90 hover:text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-primary-foreground/90 hover:text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/90">
          <p className="flex items-center justify-center gap-1">
            <span>© {new Date().getFullYear()} Skanam.lv - All rights reserved</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
