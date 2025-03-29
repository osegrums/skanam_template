
import { useState } from "react";
import { SearchHeader } from "@/components/shared/SearchHeader";
import { EventsTabs } from "@/components/events/EventsTabs";

const MyEventsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 2 rows of 3 cards

  // Mock data for events with all EventCardProps properties
  const upcomingEvents = [
    {
      id: 1,
      title: "My Choir Practice",
      date: new Date(2024, 6, 18),
      location: "Local Community Center",
      description: "Weekly choir practice session with vocal exercises and new song rehearsal.",
      isPublic: true,
      isOnline: false,
      kind: "Sadziedāšanās",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Voice Training Session",
      date: new Date(2024, 6, 22),
      location: "Music Studio",
      description: "Private voice training with professional coach to work on technique.",
      isPublic: false,
      isOnline: false,
      kind: "Meistarklase",
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Friend's Birthday Performance",
      date: new Date(2024, 7, 5),
      location: "Private Venue",
      description: "Performing selected songs at friend's birthday celebration.",
      isPublic: false,
      isOnline: true,
      kind: "Koncerts",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1470&auto=format&fit=crop"
    },
    // Add more upcoming events to demonstrate pagination
    ...[...Array(5)].map((_, index) => ({
      id: 100 + index,
      title: `Upcoming Event ${index + 4}`,
      date: new Date(2024, 7, 10 + index),
      location: `Location ${index + 4}`,
      description: `Description for event ${index + 4}`,
      isPublic: index % 2 === 0,
      isOnline: index % 3 === 0,
      kind: index % 3 === 0 ? "Dainu aplis" : index % 2 === 0 ? "Festivāls" : "Koncerts",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop"
    })),
  ];

  const historicalEvents = [
    {
      id: 4,
      title: "Jam Session",
      date: new Date(2024, 4, 15),
      location: "Local Cafe",
      description: "Informal gathering with other musicians to play and sing together.",
      isPublic: true,
      isOnline: false,
      kind: "Sadziedāšanās",
      image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1469&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Vocal Workshop",
      date: new Date(2024, 3, 10),
      location: "Music Academy",
      description: "Workshop focused on traditional singing techniques.",
      isPublic: true,
      isOnline: false,
      kind: "Meistarklase",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1470&auto=format&fit=crop"
    },
    // Add more historical events to demonstrate pagination
    ...[...Array(5)].map((_, index) => ({
      id: 200 + index,
      title: `Past Event ${index + 3}`,
      date: new Date(2024, 3, 5 - index),
      location: `Location ${index + 3}`,
      description: `Description for past event ${index + 3}`,
      isPublic: index % 2 === 0,
      isOnline: index % 3 === 0,
      kind: index % 3 === 0 ? "Dainu aplis" : index % 2 === 0 ? "Festivāls" : "Koncerts",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1470&auto=format&fit=crop"
    })),
  ];

  // Filter events based on search query
  const filteredUpcomingEvents = upcomingEvents.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredHistoricalEvents = historicalEvents.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <SearchHeader
          title="My Events"
          searchPlaceholder="Search your events..."
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          createButtonText="Create New Event"
          createButtonLink="/my-events/new"
        />
        
        <EventsTabs
          upcomingEvents={filteredUpcomingEvents}
          historicalEvents={filteredHistoricalEvents}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default MyEventsPage;
