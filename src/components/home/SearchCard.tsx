
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const SearchCard = () => {
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
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          Quick Song Search
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter song title or lyrics..."
            className="w-full py-6 pl-4 pr-10 text-lg"
            value={searchQuery}
            onChange={handleSearch}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          
          {searchResults.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-background border border-border rounded-md shadow-lg">
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
      </CardContent>
    </Card>
  );
};
