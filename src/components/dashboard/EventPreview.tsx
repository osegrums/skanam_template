
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, MapPin } from "lucide-react";

interface EventPreviewProps {
  id: number;
  title: string;
  date: Date;
  location: string;
  isPublic: boolean;
  image: string;
}

export const EventPreview: React.FC<EventPreviewProps> = ({
  id,
  title,
  date,
  location,
  isPublic,
  image,
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-24 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-base">{title}</h3>
            <div className="flex items-center text-muted-foreground text-xs mt-1">
              <Clock className="h-3 w-3 mr-1" />
              {date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
            <div className="flex items-center text-muted-foreground text-xs mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {location}
            </div>
          </div>
          <Badge variant={isPublic ? "default" : "outline"} className="text-xs">
            {isPublic ? "Public" : "Private"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-end gap-2">
        <Link to={`/my-events/${id}`}>
          <Button variant="ghost" size="sm" className="h-7 text-xs">View</Button>
        </Link>
        <Link to={`/my-events/${id}/edit`}>
          <Button variant="outline" size="sm" className="h-7 text-xs">Edit</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
