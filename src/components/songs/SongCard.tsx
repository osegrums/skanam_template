
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Youtube, Video } from "lucide-react";
import { Link } from "react-router-dom";

export interface SongCardProps {
  id: number;
  title: string;
  tags: string[];
  hasYoutube: boolean;
  hasVimeo: boolean;
  isPublic: boolean;
  lyricsLineCount: number;
  createdAt: Date;
}

export const SongCard: React.FC<SongCardProps> = ({
  id,
  title,
  tags,
  hasYoutube,
  hasVimeo,
  isPublic,
  lyricsLineCount,
  createdAt,
}) => {
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="flex flex-col h-full">
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg truncate">{title}</h3>
              <Badge variant={isPublic ? "default" : "outline"} className="text-xs">
                {isPublic ? "Public" : "Private"}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2">
              <div>{lyricsLineCount} lines of lyrics</div>
              <div>Added {createdAt.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
            </div>
            <div className="flex gap-2 mb-2">
              {hasYoutube && (
                <div className="flex items-center text-xs text-red-600 dark:text-red-400">
                  <Youtube className="h-3 w-3 mr-1" />
                  YouTube
                </div>
              )}
              {hasVimeo && (
                <div className="flex items-center text-xs text-blue-600 dark:text-blue-400">
                  <Video className="h-3 w-3 mr-1" />
                  Vimeo
                </div>
              )}
            </div>
          </div>
          <div className="mt-auto pt-2 flex justify-end gap-2">
            <Link to={`/my-songs/${id}`}>
              <Button variant="ghost" size="sm">View</Button>
            </Link>
            <Link to={`/my-songs/${id}/edit`}>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Edit className="h-3 w-3" />
                Edit
              </Button>
            </Link>
            <Button variant="destructive" size="sm" className="flex items-center gap-1">
              <Trash className="h-3 w-3" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
