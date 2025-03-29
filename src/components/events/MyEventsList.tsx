
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { EventCard } from "@/components/home/EventCard";
import { PaginatedContent } from "@/components/shared/PaginatedContent";

export interface MyEvent {
  id: number;
  title: string;
  date: Date;
  location: string;
  description: string;
  isPublic: boolean;
  isOnline: boolean;
  image: string;
  kind?: string; // Adding kind property
}

interface MyEventsListProps {
  events: MyEvent[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const MyEventsList: React.FC<MyEventsListProps> = ({
  events,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">No events found matching your search.</p>
        <Link to="/my-events/new">
          <Button>Create a New Event</Button>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {events.map((event) => (
          <div key={event.id} className="relative group">
            <EventCard
              id={event.id}
              title={event.title}
              date={event.date}
              location={event.location}
              isOnline={event.isOnline}
              image={event.image}
              kind={event.kind} // Pass kind to EventCard
            />
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link to={`/my-events/${event.id}/edit`}>
                <Button variant="secondary" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="destructive" size="icon" className="h-8 w-8">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </PaginatedContent>
  );
};
