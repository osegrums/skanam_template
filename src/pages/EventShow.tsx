
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar, Clock, MapPin, Share2, MessageSquare, Flag, Heart, Users, Music } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const EventShowPage = () => {
  const { id } = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Placeholder for authentication state
  const [isOwner, setIsOwner] = useState(true); // Placeholder for ownership check
  const [isSuggested, setIsSuggested] = useState(false); // Placeholder for suggestion status
  const [isLiked, setIsLiked] = useState(false);

  // Mock event data - would be fetched from API based on ID
  const event = {
    id: parseInt(id || "1"),
    title: "Summer Choir Festival",
    description: "Join us for a celebration of choral music featuring choirs from across the Baltic region. This annual event brings together vocal talents for performances, workshops, and collaborations. Perfect for choir members, vocal enthusiasts, and music lovers of all ages. Refreshments will be provided between performances.",
    date: new Date(2024, 6, 15, 14, 30), // July 15, 2024, 14:30
    endTime: new Date(2024, 6, 15, 20, 0), // July 15, 2024, 20:00
    location: "Riga Concert Hall",
    address: "K. Barona iela 25, Riga, LV-1011",
    isOnline: false,
    isPublic: true,
    onlineLink: "",
    kind: "Festivāls",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop",
    attendees: 42,
    songList: [
      { id: 1, title: "Mountain High" },
      { id: 2, title: "Summer Breeze" },
      { id: 3, title: "Latvian Folk Medley" },
      { id: 4, title: "The Sound of Silence" },
      { id: 5, title: "Amazing Grace" },
    ]
  };

  // Calculate event duration in hours and minutes
  const calculateDuration = () => {
    if (!event.endTime) return null;
    
    const durationMs = event.endTime.getTime() - event.date.getTime();
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

  const duration = calculateDuration();

  const handleSuggestForPublic = () => {
    setIsSuggested(true);
    // Would make API call to suggest the event
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    // Would make API call to like/unlike the event
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Alerts Section */}
        {isSuggested && (
          <Alert className="mb-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle>Suggestion Pending</AlertTitle>
            <AlertDescription>
              Your suggestion for this event to be made public is currently under review.
            </AlertDescription>
          </Alert>
        )}

        {/* Event Banner */}
        <div className="w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden relative">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6 text-white">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant={event.isOnline ? "outline" : "default"} className="bg-green-600 text-white border-green-500">
                  {event.isOnline ? "Online" : "In-Person"}
                </Badge>
                <Badge variant="outline" className="bg-blue-600/30 text-white border-blue-500">
                  {event.isPublic ? "Public" : "Private"}
                </Badge>
                {event.kind && (
                  <Badge variant="outline" className="bg-purple-600/30 text-white border-purple-500 flex items-center">
                    <Music className="h-3 w-3 mr-1" />
                    {event.kind}
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{event.title}</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Event Details */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">About This Event</h2>
                    <p className="text-muted-foreground whitespace-pre-line">{event.description}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p>{event.date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p>
                          {event.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
                          {event.endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          {duration && (
                            <span className="ml-2 text-sm text-muted-foreground">
                              (Duration: {duration})
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p>{event.location}</p>
                        <p className="text-sm text-muted-foreground">{event.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Music className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Event Type</p>
                        <p>{event.kind || "Not specified"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Attendees</p>
                        <p>{event.attendees} people attending</p>
                      </div>
                    </div>
                  </div>

                  {event.songList.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Music className="h-4 w-4" />
                        Song List
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {event.songList.map(song => (
                          <li key={song.id} className="p-2 bg-secondary/20 rounded-md">
                            <Link to={`/songs/${song.id}`} className="hover:text-primary">
                              {song.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-3 pt-4 border-t">
                    <Button variant="outline" className="flex items-center gap-2" onClick={toggleLike}>
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      {isLiked ? 'Liked' : 'Like'}
                    </Button>
                    
                    <Button variant="outline" className="flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    
                    <Button variant="outline" className="flex items-center gap-2">
                      <Flag className="h-4 w-4" />
                      Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div>
            <Card>
              <CardContent className="p-6">
                {isAuthenticated && (
                  <div className="space-y-4">
                    {isOwner ? (
                      <>
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold">Manage Event</h3>
                          <Link to={`/my-events/${event.id}/edit`}>
                            <Button className="w-full">Edit Event</Button>
                          </Link>
                          <Button variant="destructive" className="w-full">Delete Event</Button>
                        </div>
                        
                        {!event.isPublic && !isSuggested && (
                          <div className="pt-4 border-t">
                            <Button variant="outline" className="w-full" onClick={handleSuggestForPublic}>
                              Suggest for Public
                            </Button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Join Event</h3>
                        <Button className="w-full">RSVP to this Event</Button>
                        <Button variant="outline" className="w-full">Add to Calendar</Button>
                      </div>
                    )}
                  </div>
                )}
                
                {!isAuthenticated && (
                  <div className="space-y-4 text-center">
                    <h3 className="text-lg font-semibold">Want to join?</h3>
                    <p className="text-muted-foreground">Sign in to RSVP to this event and interact with other attendees.</p>
                    <Link to="/login">
                      <Button className="w-full">Sign In</Button>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      Don't have an account?{" "}
                      <Link to="/register" className="text-primary hover:underline">
                        Register now
                      </Link>
                    </p>
                  </div>
                )}
                
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-3">Organized by</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      RC
                    </div>
                    <div>
                      <p className="font-medium">Riga Choir</p>
                      <p className="text-sm text-muted-foreground">Event Organizer</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventShowPage;
