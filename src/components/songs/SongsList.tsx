
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SongCard, SongCardProps } from "./SongCard";
import { PaginatedContent } from "@/components/shared/PaginatedContent";

interface SongsListProps {
  songs: SongCardProps[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const SongsList: React.FC<SongsListProps> = ({
  songs,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (songs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">No songs found matching your search.</p>
        <Link to="/my-songs/new">
          <Button>Add Your First Song</Button>
        </Link>
      </div>
    );
  }

  return (
    <PaginatedContent
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {songs.map((song) => (
          <SongCard key={song.id} {...song} />
        ))}
      </div>
    </PaginatedContent>
  );
};
