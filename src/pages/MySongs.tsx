import { useState } from "react";
import { SearchHeader } from "@/components/shared/SearchHeader";
import { SongsList } from "@/components/songs/SongsList";

const MySongsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Mock data for songs
  const mySongs = [
    {
      id: 1,
      title: "Mountain High",
      tags: ["Folk", "Latvian"],
      hasYoutube: true,
      hasVimeo: false,
      isPublic: true,
      lyricsLineCount: 24,
      createdAt: new Date(2024, 5, 10),
    },
    {
      id: 2,
      title: "Summer Breeze",
      tags: ["Pop", "Original"],
      hasYoutube: true,
      hasVimeo: true,
      isPublic: true,
      lyricsLineCount: 16,
      createdAt: new Date(2024, 5, 15),
    },
    {
      id: 3,
      title: "Midnight Dreams",
      tags: ["Ballad", "Cover"],
      hasYoutube: false,
      hasVimeo: false,
      isPublic: false,
      lyricsLineCount: 32,
      createdAt: new Date(2024, 5, 20),
    },
    {
      id: 4,
      title: "First Steps",
      tags: ["Classical", "Piano"],
      hasYoutube: false,
      hasVimeo: true,
      isPublic: true,
      lyricsLineCount: 18,
      createdAt: new Date(2024, 4, 25),
    },
    {
      id: 5,
      title: "Dancing in the Rain",
      tags: ["Jazz", "Cover"],
      hasYoutube: true,
      hasVimeo: false,
      isPublic: false,
      lyricsLineCount: 28,
      createdAt: new Date(2024, 4, 18),
    },
    // Add more mock songs to demonstrate pagination
    ...[...Array(20)].map((_, index) => ({
      id: 6 + index,
      title: `Example Song ${index + 1}`,
      tags: index % 2 === 0 ? ["Example", "Demo"] : ["Test", "Sample"],
      hasYoutube: index % 3 === 0,
      hasVimeo: index % 4 === 0,
      isPublic: index % 2 === 0,
      lyricsLineCount: 10 + index,
      createdAt: new Date(2024, 3, 15 - index),
    })),
  ];

  // Filter songs based on search query
  const filteredSongs = mySongs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Paginate songs
  const totalPages = Math.ceil(filteredSongs.length / itemsPerPage);
  const paginatedSongs = filteredSongs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <SearchHeader
          title="My Songs"
          searchPlaceholder="Search by title or tag..."
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          createButtonText="Add New Song"
          createButtonLink="/my-songs/new"
        />
        
        <SongsList
          songs={paginatedSongs}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default MySongsPage;
