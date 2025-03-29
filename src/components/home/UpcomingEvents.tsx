
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { EventCard } from "./EventCard";

export const UpcomingEvents = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Summer Choir Festival",
      date: new Date(2024, 6, 15, 14, 30),
      location: "Riga Concert Hall",
      isOnline: false,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Virtual Karaoke Night",
      date: new Date(2024, 6, 20, 19, 0),
      location: "Zoom Meeting",
      isOnline: true,
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Opera Masterclass",
      date: new Date(2024, 6, 25, 10, 15),
      location: "Latvian National Opera",
      isOnline: false,
      image: "https://images.unsplash.com/photo-1580809361436-42a7ec204889?q=80&w=1074&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Vocal Techniques Workshop",
      date: new Date(2024, 7, 5, 16, 45),
      location: "Music Academy",
      isOnline: false,
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Folk Song Exchange",
      date: new Date(2024, 7, 10, 12, 0),
      location: "Cultural Center",
      isOnline: false,
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Live Streaming Concert",
      date: new Date(2024, 7, 15, 20, 30),
      location: "YouTube Live",
      isOnline: true,
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1469&auto=format&fit=crop"
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Upcoming Events
        </h2>
        <Link to="/events" className="text-primary hover:text-primary/80 flex items-center gap-1">
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.slice(0, 6).map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </>
  );
};
