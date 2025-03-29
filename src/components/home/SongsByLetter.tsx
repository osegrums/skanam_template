
import { Music, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const SongsByLetter = () => {
  const alphabetCounts = [
    { letter: "A", count: 56 },
    { letter: "B", count: 42 },
    { letter: "C", count: 38 },
    { letter: "D", count: 29 },
    { letter: "E", count: 25 },
    { letter: "F", count: 20 },
    { letter: "G", count: 18 },
    { letter: "H", count: 15 },
    { letter: "I", count: 14 },
    { letter: "J", count: 12 },
    { letter: "K", count: 10 },
    { letter: "L", count: 35 },
    { letter: "M", count: 42 },
    { letter: "N", count: 15 },
    { letter: "O", count: 18 },
    { letter: "P", count: 25 },
    { letter: "Q", count: 3 },
    { letter: "R", count: 22 },
    { letter: "S", count: 47 },
    { letter: "T", count: 34 },
    { letter: "U", count: 12 },
    { letter: "V", count: 9 },
    { letter: "W", count: 7 },
    { letter: "X", count: 1 },
    { letter: "Y", count: 5 },
    { letter: "Z", count: 4 },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Music className="h-5 w-5 text-primary" />
          Songs by First Letter
        </h2>
        <Link to="/songs" className="text-primary hover:text-primary/80 flex items-center gap-1">
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      
      <div className="w-full">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-13 gap-2">
          {alphabetCounts.map(({ letter, count }) => (
            <Link 
              key={letter} 
              to={`/songs?letter=${letter}`}
              className={cn(
                "flex flex-col items-center justify-center p-2 h-16 border rounded-md transition-colors",
                "hover:border-primary hover:bg-primary/5"
              )}
            >
              <span className="text-xl font-bold">{letter}</span>
              <span className="text-xs text-muted-foreground">{count} songs</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
