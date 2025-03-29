
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  CircleAlert, 
  Info, 
  Plus, 
  Trash, 
  Youtube, 
  Video, 
  CheckCircle2,
  Music,
  Calendar
} from "lucide-react";
import { toast } from "sonner";

const MySongForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error" | "info">("info");
  const [alertMessage, setAlertMessage] = useState("");
  
  // Mock song for editing - would fetch from API in real app
  const existingSong = isEditing ? {
    id: parseInt(id || "1"),
    title: "Mountain High",
    lyrics: "Verse 1:\nStanding on the mountain high\nFeeling closer to the sky\n\nChorus:\nMountain high, spirit free\nNature's wonder all around me",
    description: "An original folk song about the natural beauty of mountains and finding inner peace.",
    is_public: true,
    music_notes: "Key: G Major\nTime: 4/4\nTempo: Moderato",
    media_links: {
      youtube: "https://youtube.com/watch?v=example1",
      vimeo: ""
    },
    metadata: {
      composer: "Jane Smith",
      year: "2023",
      genre: "Folk",
      language: "English",
      duration: "3:45"
    },
    tags: ["Folk", "Nature", "Original"]
  } : null;
  
  // Form state
  const [title, setTitle] = useState(existingSong?.title || "");
  const [lyrics, setLyrics] = useState(existingSong?.lyrics || "");
  const [description, setDescription] = useState(existingSong?.description || "");
  const [isPublic, setIsPublic] = useState(existingSong?.is_public || false);
  const [musicNotes, setMusicNotes] = useState(existingSong?.music_notes || "");
  const [youtubeLink, setYoutubeLink] = useState(existingSong?.media_links.youtube || "");
  const [vimeoLink, setVimeoLink] = useState(existingSong?.media_links.vimeo || "");
  
  // Metadata fields
  const [composer, setComposer] = useState(existingSong?.metadata.composer || "");
  const [year, setYear] = useState(existingSong?.metadata.year || "");
  const [genre, setGenre] = useState(existingSong?.metadata.genre || "");
  const [language, setLanguage] = useState(existingSong?.metadata.language || "");
  const [duration, setDuration] = useState(existingSong?.metadata.duration || "");
  
  // Tags
  const [tags, setTags] = useState<string[]>(existingSong?.tags || []);
  const [newTag, setNewTag] = useState("");
  
  // Validation state
  const [errors, setErrors] = useState<{
    title?: string;
    lyrics?: string;
  }>({});
  
  // Common genres for select
  const commonGenres = [
    "Folk", "Pop", "Rock", "Classical", "Jazz", "Blues", 
    "Country", "Electronic", "Hip-Hop", "R&B", "Other"
  ];
  
  // Common languages for select
  const commonLanguages = [
    "English", "Latvian", "Russian", "German", "French", 
    "Spanish", "Italian", "Other"
  ];
  
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const validateForm = () => {
    const newErrors: {title?: string; lyrics?: string} = {};
    let isValid = true;
    
    if (!title.trim()) {
      newErrors.title = "Song title is required";
      isValid = false;
    }
    
    if (!lyrics.trim()) {
      newErrors.lyrics = "Lyrics are required";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!validateForm()) {
      setAlertType("error");
      setAlertMessage("Please fix the errors before submitting");
      setShowAlert(true);
      return;
    }
    
    // Prepare metadata
    const metadata = {
      composer,
      year,
      genre,
      language,
      duration
    };
    
    // Prepare media links
    const media_links = {
      youtube: youtubeLink,
      vimeo: vimeoLink
    };
    
    // Would submit data to API here
    console.log({
      title,
      lyrics,
      description,
      is_public: isPublic,
      music_notes: musicNotes,
      media_links,
      metadata,
      tags
    });
    
    // Show success toast
    toast.success(
      isEditing ? "Song updated successfully!" : "Song created successfully!",
      {
        description: `"${title}" has been ${isEditing ? "updated" : "added"} to your collection.`,
      }
    );
    
    // Redirect after success
    setTimeout(() => {
      navigate("/my-songs");
    }, 500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            {isEditing ? "Edit Song" : "Add New Song"}
          </CardTitle>
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
                <CheckCircle2 className={`h-4 w-4 ${alertType === "success" ? "text-green-600 dark:text-green-400" : ""}`} />
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
              <Label htmlFor="title" className={errors.title ? "text-red-500" : ""}>
                Song Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter song title"
                className={errors.title ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lyrics" className={errors.lyrics ? "text-red-500" : ""}>
                Lyrics <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="lyrics"
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                placeholder="Enter song lyrics. Use line breaks to separate verses and chorus."
                rows={8}
                className={errors.lyrics ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.lyrics && (
                <p className="text-sm text-red-500">{errors.lyrics}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Line count: {lyrics.split('\n').filter(line => line.trim() !== '').length}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the song, its origins, meaning, etc."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="music_notes">Music Notes</Label>
              <Textarea
                id="music_notes"
                value={musicNotes}
                onChange={(e) => setMusicNotes(e.target.value)}
                placeholder="Include key, tempo, chords, or other musical notation"
                rows={3}
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Video className="h-4 w-4 text-primary" />
                Media Links
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <Label htmlFor="youtube_link">YouTube Link</Label>
                </div>
                <Input
                  id="youtube_link"
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <Label htmlFor="vimeo_link">Vimeo Link</Label>
                </div>
                <Input
                  id="vimeo_link"
                  value={vimeoLink}
                  onChange={(e) => setVimeoLink(e.target.value)}
                  placeholder="https://vimeo.com/..."
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                Metadata
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="composer">Composer/Artist</Label>
                  <Input
                    id="composer"
                    value={composer}
                    onChange={(e) => setComposer(e.target.value)}
                    placeholder="Name of composer or artist"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Year of composition"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Select
                    value={genre}
                    onValueChange={setGenre}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonGenres.map((g) => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={language}
                    onValueChange={setLanguage}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonLanguages.map((lang) => (
                        <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 3:45"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-4 w-4 p-0 rounded-full text-muted-foreground hover:text-foreground"
                      onClick={() => removeTag(tag)}
                      type="button"
                    >
                      <Trash className="h-3 w-3" />
                      <span className="sr-only">Remove tag</span>
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" size="sm" onClick={addTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="is_public"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
              <Label htmlFor="is_public">Make this song public</Label>
            </div>
            
            <div className="pt-4 flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/my-songs")}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update Song" : "Add Song"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MySongForm;
