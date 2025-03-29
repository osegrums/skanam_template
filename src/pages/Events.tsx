
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, MapPin, Clock, Music } from "lucide-react";
import { Link } from "react-router-dom";

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for events
  const upcomingEvents = [
    {
      id: 1,
      title: "Summer Choir Festival",
      date: new Date(2024, 6, 15),
      location: "Riga Concert Hall",
      description: "Join us for a celebration of choral music featuring choirs from across the Baltic region.",
      isOnline: false,
      kind: "Festivāls",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Virtual Karaoke Night",
      date: new Date(2024, 6, 20),
      location: "Zoom Meeting",
      description: "Sing your favorite songs from the comfort of your home in this virtual karaoke event.",
      isOnline: true,
      kind: "Sadziedāšanās",
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Opera Masterclass",
      date: new Date(2024, 6, 25),
      location: "Latvian National Opera",
      description: "Learn from professional opera singers and improve your vocal technique.",
      isOnline: false,
      kind: "Meistarklase",
      image: "https://images.unsplash.com/photo-1580809361436-42a7ec204889?q=80&w=1074&auto=format&fit=crop"
    },
  ];

  const historicalEvents = [
    {
      id: 4,
      title: "Spring Vocal Competition",
      date: new Date(2024, 3, 15),
      location: "Music Academy",
      description: "Annual competition showcasing vocal talents across different categories.",
      isOnline: false,
      kind: "Koncerts",
      image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1469&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Folk Music Workshop",
      date: new Date(2024, 2, 10),
      location: "Cultural Center",
      description: "Learn traditional Latvian folk songs and vocal techniques.",
      isOnline: false,
      kind: "Dainu aplis",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1470&auto=format&fit=crop"
    },
  ];

  // Calculate event duration in hours and minutes
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

  // Filter events based on search query
  const filteredUpcomingEvents = upcomingEvents.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredHistoricalEvents = historicalEvents.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Explore Singing Events</h1>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search events by title..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Tabs for Upcoming and Historical Events */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-6">
            <TabsTrigger value="upcoming" className="flex-1">Upcoming Events</TabsTrigger>
            <TabsTrigger value="historical" className="flex-1">Historical Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {filteredUpcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUpcomingEvents.map((event) => {
                  // Mock end time for demonstration (in real app this would come from API)
                  const endTime = new Date(event.date);
                  endTime.setHours(endTime.getHours() + 2); // Add 2 hours for demonstration
                  const duration = calculateDuration(event.date, endTime);
                  
                  return (
                    <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg line-clamp-1">{event.title}</h3>
                          <div className="flex flex-col gap-1 items-end">
                            {event.isOnline ? (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">Online</Badge>
                            ) : (
                              <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">In-Person</Badge>
                            )}
                            {event.kind && (
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400">
                                <Music className="h-3 w-3 mr-1" />
                                {event.kind}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm mb-2">
                          <Clock className="h-4 w-4 mr-1" />
                          {event.date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                          <span className="ml-1 font-medium">
                            {event.date.getHours().toString().padStart(2, '0')}:{event.date.getMinutes().toString().padStart(2, '0')}
                          </span>
                          {duration && (
                            <span className="ml-2 text-xs">
                              (Duration: {duration})
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.location}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Link to={`/events/${event.id}`} className="w-full">
                          <Button variant="ghost" className="w-full">View Details</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No upcoming events found matching your search.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="historical">
            {filteredHistoricalEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHistoricalEvents.map((event) => {
                  // Mock end time for demonstration (in real app this would come from API)
                  const endTime = new Date(event.date);
                  endTime.setHours(endTime.getHours() + 1); // Add 1 hour for demonstration
                  const duration = calculateDuration(event.date, endTime);
                  
                  return (
                    <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg line-clamp-1">{event.title}</h3>
                          <div className="flex flex-col gap-1 items-end">
                            {event.isOnline ? (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">Online</Badge>
                            ) : (
                              <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">In-Person</Badge>
                            )}
                            {event.kind && (
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400">
                                <Music className="h-3 w-3 mr-1" />
                                {event.kind}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm mb-2">
                          <Clock className="h-4 w-4 mr-1" />
                          {event.date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                          <span className="ml-1 font-medium">
                            {event.date.getHours().toString().padStart(2, '0')}:{event.date.getMinutes().toString().padStart(2, '0')}
                          </span>
                          {duration && (
                            <span className="ml-2 text-xs">
                              (Duration: {duration})
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.location}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Link to={`/events/${event.id}`} className="w-full">
                          <Button variant="ghost" className="w-full">View Details</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No historical events found matching your search.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EventsPage;
