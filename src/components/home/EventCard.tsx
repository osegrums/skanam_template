
import { Clock, MapPin, Music } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface EventCardProps {
  id: number;
  title: string;
  date: Date;
  location: string;
  isOnline: boolean;
  image: string;
  kind?: string; // Adding kind property
}

export const EventCard = ({ id, title, date, location, isOnline, image, kind }: EventCardProps) => {
  const calculateDuration = (startDate: Date, endDate?: Date) => {
    if (!endDate) return null;
    
    const durationMs = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours === 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else if (minutes === 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } else {
      return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
  };

  // Create a mock end time 2 hours after the start time
  const endTime = new Date(date);
  endTime.setHours(endTime.getHours() + 2);
  const duration = calculateDuration(date, endTime);

  return (
    <Card key={id} className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <div className="flex flex-col gap-1 items-end">
            {isOnline ? (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">Online</Badge>
            ) : (
              <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">In-Person</Badge>
            )}
            {kind && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400">
                {kind}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center text-muted-foreground text-sm mb-2">
          <Clock className="h-4 w-4 mr-1" />
          {date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} 
          <span className="ml-1 font-medium">
            {date.getHours().toString().padStart(2, '0')}:{date.getMinutes().toString().padStart(2, '0')}
          </span>
          {duration && (
            <span className="ml-2 text-xs">
              (Duration: {duration})
            </span>
          )}
        </div>
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          {location}
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/events/${id}`} className="w-full">
          <Button variant="ghost" className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
