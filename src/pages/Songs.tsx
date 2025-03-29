
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Youtube, Video, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function Songs() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30; // 3 cards per row, 10 rows max = 30 cards per page

  // Mock data for songs list
  const songs = [
    {
      id: 1,
      title: "Imagine",
      artist: "John Lennon",
      lyrics: "Imagine there's no heaven\nIt's easy if you try\nNo hell below us\nAbove us, only sky",
      tags: ["Rock", "Classic", "70s"],
      hasYoutube: true,
      hasVimeo: false,
      lyricsLineCount: 24,
      createdAt: "1971"
    },
    {
      id: 2,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      lyrics: "Is this the real life?\nIs this just fantasy?\nCaught in a landslide\nNo escape from reality",
      tags: ["Rock", "Progressive", "70s"],
      hasYoutube: true,
      hasVimeo: true,
      lyricsLineCount: 67,
      createdAt: "1975"
    },
    {
      id: 3,
      title: "Yesterday",
      artist: "The Beatles",
      lyrics: "Yesterday, all my troubles seemed so far away\nNow it looks as though they're here to stay\nOh, I believe in yesterday\nSuddenly, I'm not half the man I used to be",
      tags: ["Pop", "Classic", "60s"],
      hasYoutube: true,
      hasVimeo: false,
      lyricsLineCount: 16,
      createdAt: "1965"
    },
    {
      id: 4,
      title: "Like a Rolling Stone",
      artist: "Bob Dylan",
      lyrics: "Once upon a time you dressed so fine\nYou threw the bums a dime in your prime, didn't you?\nPeople'd call, say, 'Beware doll, you're bound to fall'\nYou thought they were all kiddin' you",
      tags: ["Folk", "Rock", "60s"],
      hasYoutube: true,
      hasVimeo: false,
      lyricsLineCount: 42,
      createdAt: "1965"
    },
    {
      id: 5,
      title: "Respect",
      artist: "Aretha Franklin",
      lyrics: "What you want, baby, I got it\nWhat you need, do you know I got it\nAll I'm askin' is for a little respect\nWhen you come home",
      tags: ["Soul", "R&B", "60s"],
      hasYoutube: true,
      hasVimeo: false,
      lyricsLineCount: 19,
      createdAt: "1967"
    },
    // More mock songs to demonstrate pagination
    ...[...Array(35)].map((_, index) => ({
      id: 6 + index,
      title: `Example Song ${index + 1}`,
      artist: `Artist ${index + 1}`,
      lyrics: `This is the first line of song ${index + 1}\nThis is the second line of lyrics\nHere is the third line to show\nAnd this is the fourth line of text`,
      tags: index % 3 === 0 ? ["Pop", "Modern"] : index % 2 === 0 ? ["Rock", "90s"] : ["Electronic", "2000s"],
      hasYoutube: index % 2 === 0,
      hasVimeo: index % 3 === 0,
      lyricsLineCount: 10 + (index % 20),
      createdAt: `${2000 + (index % 23)}`
    })),
  ];

  // Calculate pagination
  const totalPages = Math.ceil(songs.length / itemsPerPage);
  const paginatedSongs = songs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Music className="h-5 w-5 text-primary" />
          Browse Songs
        </h1>
        
        {/* Grid of song cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {paginatedSongs.map((song) => (
            <Card key={song.id} className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col h-full">
                  {/* Title section - most important */}
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">{song.title}</h3>
                  
                  {/* Lyrics excerpt - second most important */}
                  <div className="mb-4 text-sm border-l-2 border-primary/30 pl-3 text-muted-foreground">
                    {song.lyrics.split('\n').slice(0, 4).map((line, i) => (
                      <p key={i} className={i === 3 ? "line-clamp-1" : ""}>{line}</p>
                    ))}
                  </div>
                  
                  {/* Metadata section - grouped together visually */}
                  <div className="p-3 bg-muted/30 rounded-md mt-auto mb-2">
                    <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{song.artist}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {song.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 mb-1">
                      {song.hasYoutube && (
                        <div className="flex items-center text-xs text-red-600 dark:text-red-400">
                          <Youtube className="h-3 w-3 mr-1" />
                          YouTube
                        </div>
                      )}
                      {song.hasVimeo && (
                        <div className="flex items-center text-xs text-blue-600 dark:text-blue-400">
                          <Video className="h-3 w-3 mr-1" />
                          Vimeo
                        </div>
                      )}
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      {song.lyricsLineCount} lines of lyrics
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-2 flex justify-end">
                    <Link to={`/songs/${song.id}`} className="text-primary hover:underline text-sm">
                      View Song →
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Pagination controls */}
        {totalPages > 1 && (
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => {
                const pageNumber = i + 1;
                
                // Display first page, last page, and pages around current page
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink 
                        isActive={currentPage === pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                
                // Show ellipsis for pagination breaks
                if (
                  (pageNumber === 2 && currentPage > 3) ||
                  (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                ) {
                  return <PaginationItem key={pageNumber}>...</PaginationItem>;
                }
                
                return null;
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
