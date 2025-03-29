import { Card } from "@/components/ui/card";
import { Calendar, Music, Plus } from "lucide-react";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { EventPreview } from "@/components/dashboard/EventPreview";
import { SongPreview } from "@/components/dashboard/SongPreview";
import { EmptyState } from "@/components/dashboard/EmptyState";

const DashboardPage = () => {
  // Mock data
  const userEvents = [
    {
      id: 1,
      title: "My Choir Practice",
      date: new Date(2024, 6, 18),
      location: "Local Community Center",
      isPublic: true,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Voice Training Session",
      date: new Date(2024, 6, 22),
      location: "Music Studio",
      isPublic: false,
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Friend's Birthday Performance",
      date: new Date(2024, 7, 5),
      location: "Private Venue",
      isPublic: false,
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1470&auto=format&fit=crop"
    },
  ];

  const userSongs = [
    {
      id: 1,
      title: "Mountain High",
      tags: ["Folk", "Latvian"],
      hasYoutube: true,
      hasVimeo: false,
      isPublic: true,
    },
    {
      id: 2,
      title: "Summer Breeze",
      tags: ["Pop", "Original"],
      hasYoutube: true,
      hasVimeo: true,
      isPublic: true,
    },
    {
      id: 3,
      title: "Midnight Dreams",
      tags: ["Ballad", "Cover"],
      hasYoutube: false,
      hasVimeo: false,
      isPublic: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="flex flex-col gap-10">
        {/* Personal Events Section */}
        <DashboardSection
          title="My Events"
          icon={Calendar}
          seeAllLink="/my-events"
          createNewLink="/my-events/new"
          createNewText="Create New Event"
        >
          {userEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userEvents.map((event) => (
                <EventPreview key={event.id} {...event} />
              ))}
            </div>
          ) : (
            <EmptyState
              message="You haven't created any events yet."
              buttonText="Create Your First Event"
              buttonLink="/my-events/new"
            />
          )}
        </DashboardSection>
        
        {/* Personal Songs Section */}
        <DashboardSection
          title="My Songs"
          icon={Music}
          seeAllLink="/my-songs"
          createNewLink="/my-songs/new"
          createNewText="Add New Song"
        >
          {userSongs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userSongs.map((song) => (
                <SongPreview key={song.id} {...song} />
              ))}
            </div>
          ) : (
            <EmptyState
              message="You haven't added any songs yet."
              buttonText="Add Your First Song"
              buttonLink="/my-songs/new"
            />
          )}
        </DashboardSection>
      </div>
    </div>
  );
};

export default DashboardPage;
