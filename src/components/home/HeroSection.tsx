
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Music } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface HeroSectionProps {
  isAuthenticated: boolean;
}

export const HeroSection = ({ isAuthenticated }: HeroSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 1) {
      setSearchResults([
        `${query} - Popular Song`,
        `The ${query} Experience`,
        `${query} in the Morning`,
        `${query} Forever`,
        `My ${query} Story`,
      ]);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] transition-shadow duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 to-blue-900/30 z-10"></div>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] z-5"></div>
      <img 
        src="/lovable-uploads/5e1c470e-14bd-4aa3-9ce8-e0073d2ed26e.png" 
        alt="Music tree with glowing notes" 
        className="w-full h-[400px] md:h-[500px] object-cover"
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-start p-8 md:p-12">
        <h1 className="text-amber-100 text-2xl md:text-4xl font-bold mb-4 max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          Discover Singing Events and Lyrics at Skanam.lv
        </h1>
        <p className="text-amber-50/90 mb-6 max-w-lg drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          Join our community of singing enthusiasts to discover events, share lyrics, and connect with other singers.
        </p>
        
        <div className="w-full max-w-xl mb-8 relative">
          <div className="bg-blue-950/40 backdrop-blur-md p-4 rounded-lg border border-amber-200/20">
            <label className="block text-amber-100 font-medium mb-2 flex items-center">
              <Music className="w-4 h-4 mr-2 text-amber-200" />
              Find Songs and Lyrics
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for songs by title or lyrics..."
                className="w-full py-6 pl-4 pr-10 text-lg bg-white/90 backdrop-blur-sm border-transparent focus-visible:border-amber-300"
                value={searchQuery}
                onChange={handleSearch}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-700" />
              
              {searchResults.length > 0 && (
                <div className="absolute z-30 mt-1 w-full bg-background border border-border rounded-md shadow-lg">
                  <ul className="py-1">
                    {searchResults.map((result, index) => (
                      <li key={index} className="px-4 py-2 hover:bg-secondary/10 cursor-pointer">
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
