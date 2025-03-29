
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleAlert, Clock, Info } from "lucide-react";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MyEventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error" | "info">("info");
  const [alertMessage, setAlertMessage] = useState("");
  
  // Event kinds
  const eventKinds = [
    "Sadziedāšanās",
    "Dainu aplis",
    "Koncerts",
    "Meistarklase",
    "Festivāls",
    "Cits"
  ];
  
  // Mock event for editing - would fetch from API in real app
  const existingEvent = isEditing ? {
    id: parseInt(id),
    title: "Summer Choir Festival",
    description: "Join us for a celebration of choral music featuring choirs from across the Baltic region.",
    start_time: "2024-07-15T14:30",
    end_time: "2024-07-15T20:00",
    is_public: true,
    location: "Riga Concert Hall",
    online_link: "",
    kind: "Festivāls",
    banner_image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop"
  } : null;
  
  // Form state
  const [title, setTitle] = useState(existingEvent?.title || "");
  const [description, setDescription] = useState(existingEvent?.description || "");
  const [startTime, setStartTime] = useState(existingEvent?.start_time || "");
  const [endTime, setEndTime] = useState(existingEvent?.end_time || "");
  const [isPublic, setIsPublic] = useState(existingEvent?.is_public || false);
  const [location, setLocation] = useState(existingEvent?.location || "");
  const [onlineLink, setOnlineLink] = useState(existingEvent?.online_link || "");
  const [kind, setKind] = useState(existingEvent?.kind || "");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(existingEvent?.banner_image || "");
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview("");
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      setAlertType("error");
      setAlertMessage("Event title is required");
      setShowAlert(true);
      return;
    }
    
    if (!startTime) {
      setAlertType("error");
      setAlertMessage("Start time is required");
      setShowAlert(true);
      return;
    }
    
    if (!endTime) {
      setAlertType("error");
      setAlertMessage("End time is required");
      setShowAlert(true);
      return;
    }
    
    if (new Date(startTime) >= new Date(endTime)) {
      setAlertType("error");
      setAlertMessage("End time must be after start time");
      setShowAlert(true);
      return;
    }
    
    if (!location.trim() && !onlineLink.trim()) {
      setAlertType("error");
      setAlertMessage("Either location or online link is required");
      setShowAlert(true);
      return;
    }
    
    if (!kind.trim()) {
      setAlertType("error");
      setAlertMessage("Event kind is required");
      setShowAlert(true);
      return;
    }
    
    // Would submit data to API here
    console.log({
      title,
      description,
      start_time: startTime,
      end_time: endTime,
      is_public: isPublic,
      location,
      online_link: onlineLink,
      kind,
      image
    });
    
    // Show success message
    setAlertType("success");
    setAlertMessage(`Event successfully ${isEditing ? "updated" : "created"}!`);
    setShowAlert(true);
    
    // Redirect after success
    setTimeout(() => {
      navigate(isEditing ? `/events/${id}` : "/my-events");
    }, 1500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Event" : "Create New Event"}</CardTitle>
        </CardHeader>
        <CardContent>
          {showAlert && (
            <Alert 
              className={`mb-6 ${
                alertType === "success" 
                  ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800" 
                  : alertType === "error"
                  ? "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
                  : "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
              }`}
            >
              {alertType === "success" ? (
                <Info className={`h-4 w-4 ${alertType === "success" ? "text-green-600 dark:text-green-400" : ""}`} />
              ) : (
                <CircleAlert className={`h-4 w-4 ${alertType === "error" ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`} />
              )}
              <AlertTitle>
                {alertType === "success" ? "Success" : alertType === "error" ? "Error" : "Information"}
              </AlertTitle>
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your event a descriptive title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="kind">Event Kind <span className="text-red-500">*</span></Label>
              <Select value={kind} onValueChange={setKind}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select event kind" />
                </SelectTrigger>
                <SelectContent>
                  {eventKinds.map((eventKind) => (
                    <SelectItem key={eventKind} value={eventKind}>
                      {eventKind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your event, including what attendees can expect"
                rows={5}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="start_time">Start Date & Time <span className="text-red-500">*</span></Label>
                <Input
                  id="start_time"
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end_time">End Date & Time <span className="text-red-500">*</span></Label>
                <Input
                  id="end_time"
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Physical location of the event"
                />
                <p className="text-sm text-muted-foreground">
                  Required if this is an in-person event
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="online_link">Online Link</Label>
                <Input
                  id="online_link"
                  value={onlineLink}
                  onChange={(e) => setOnlineLink(e.target.value)}
                  placeholder="Link for online participation"
                />
                <p className="text-sm text-muted-foreground">
                  Required if this is an online event
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="banner_image">Banner Image</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="banner_image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="flex-1"
                />
                {imagePreview && (
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="sm"
                    onClick={handleRemoveImage}
                  >
                    Remove
                  </Button>
                )}
              </div>
              {imagePreview && (
                <div className="mt-2 relative">
                  <img 
                    src={imagePreview} 
                    alt="Event banner preview" 
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="is_public"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
              <Label htmlFor="is_public">Make this event public</Label>
            </div>
            
            <div className="pt-4 flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(isEditing ? `/events/${id}` : "/my-events")}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update Event" : "Create Event"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyEventForm;
