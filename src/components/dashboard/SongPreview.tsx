
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface SongPreviewProps {
  id: number;
  title: string;
  tags: string[];
  hasYoutube: boolean;
  hasVimeo: boolean;
  isPublic: boolean;
}

export const SongPreview: React.FC<SongPreviewProps> = ({
  id,
  title,
  tags,
  hasYoutube,
  hasVimeo,
  isPublic,
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-base">{title}</h3>
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant={isPublic ? "default" : "outline"} className="text-xs">
              {isPublic ? "Public" : "Private"}
            </Badge>
            <div className="flex gap-1">
              {hasYoutube && (
                <Badge variant="outline" className="text-xs bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400">
                  YouTube
                </Badge>
              )}
              {hasVimeo && (
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  Vimeo
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-end gap-2">
        <Link to={`/my-songs/${id}`}>
          <Button variant="ghost" size="sm" className="h-7 text-xs">View</Button>
        </Link>
        <Link to={`/my-songs/${id}/edit`}>
          <Button variant="outline" size="sm" className="h-7 text-xs">Edit</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
