
import { useState, useEffect } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { SongsByLetter } from "@/components/home/SongsByLetter";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Update auth state in localStorage to share with Navbar
  useEffect(() => {
    localStorage.setItem('demoAuthenticated', isAuthenticated ? 'true' : 'false');
    // Force Navbar to re-check auth state by dispatching a custom event
    window.dispatchEvent(new Event('auth-state-changed'));
  }, [isAuthenticated]);

  const toggleAuth = () => {
    setIsAuthenticated(prevState => !prevState);
  };

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <div className="mb-4 flex justify-end">
        <Button 
          onClick={toggleAuth}
          variant="outline"
          size="sm"
        >
          {isAuthenticated ? 'Sign Out (Demo)' : 'Sign In (Demo)'}
        </Button>
      </div>
      
      <section className="mb-12">
        <HeroSection isAuthenticated={isAuthenticated} />
      </section>

      <section className="mb-12">
        <UpcomingEvents />
      </section>

      <section>
        <SongsByLetter />
      </section>
    </div>
  );
};

export default Index;
