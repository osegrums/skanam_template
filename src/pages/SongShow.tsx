
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Music, 
  Edit, 
  ArrowLeft, 
  Youtube, 
  Video, 
  Share, 
  Calendar, 
  User, 
  Globe, 
  Tag,
  Info
} from "lucide-react";

const SongShowPage = () => {
  const { id } = useParams();
  
  // Mock data for song details
  const song = {
    id: parseInt(id || "1"),
    title: "Mountain High",
    lyrics: "Verse 1:\nStanding on the mountain high\nFeeling closer to the sky\n\nChorus:\nMountain high, spirit free\nNature's wonder all around me\n\nVerse 2:\nBreathing in the crystal air\nNot a worry, not a care\n\nChorus:\nMountain high, spirit free\nNature's wonder all around me\n\nBridge:\nThe world below seems so small\nUp here I stand proud and tall\n\nFinal Chorus:\nMountain high, spirit free\nNature's wonder all around me\nMountain high, spirit free\nNature's wonder all around me",
    description: "An original folk song about the natural beauty of mountains and finding inner peace.",
    is_public: true,
    music_notes: "Key: G Major\nTime: 4/4\nTempo: Moderato\n\nVerse: G - C - D - G\nChorus: Em - C - G - D\nBridge: C - G - Am - D",
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
    tags: ["Folk", "Nature", "Original"],
    created_at: new Date(2024, 5, 10)
  };
  
  // Format lyrics for display with line breaks
  const formattedLyrics = song.lyrics.split('\n').map((line, index) => (
    <div key={index} className={`${line.trim() === '' ? 'h-4' : ''}`}>
      {line}
    </div>
  ));
  
  // Format music notes with line breaks
  const formattedMusicNotes = song.music_notes.split('\n').map((line, index) => (
    <div key={index}>{line}</div>
  ));
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/my-songs">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to My Songs
            </Button>
          </Link>
        </div>
        
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Music className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">{song.title}</CardTitle>
              <Badge variant={song.is_public ? "default" : "outline"}>
                {song.is_public ? "Public" : "Private"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Link to={`/my-songs/${id}/edit`}>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Edit className="h-4 w-4" />
                  Edit Song
                </Button>
              </Link>
              <Button variant="secondary" size="sm" className="flex items-center gap-1">
                <Share className="h-4 w-4" />
                Share
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                {song.description && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">About this song</h3>
                    <p>{song.description}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Lyrics</h3>
                  <div className="bg-muted/40 p-4 rounded-md whitespace-pre-line">
                    {formattedLyrics}
                  </div>
                </div>
                
                {song.music_notes && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Music Notes</h3>
                    <div className="bg-muted/40 p-4 rounded-md font-mono text-sm">
                      {formattedMusicNotes}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-6">
                {song.media_links.youtube && (
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <Youtube className="h-4 w-4 text-red-600 dark:text-red-400" />
                      YouTube
                    </h3>
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <div className="text-center p-4">
                        <p className="text-sm text-muted-foreground mb-2">YouTube embed placeholder</p>
                        <a 
                          href={song.media_links.youtube} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          Open video
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                
                {song.media_links.vimeo && (
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <Video className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Vimeo
                    </h3>
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <div className="text-center p-4">
                        <p className="text-sm text-muted-foreground mb-2">Vimeo embed placeholder</p>
                        <a 
                          href={song.media_links.vimeo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          Open video
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Metadata
                  </h3>
                  <div className="bg-muted/40 p-4 rounded-md space-y-3">
                    {song.metadata.composer && (
                      <div className="flex items-start gap-2">
                        <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground">Composer/Artist</div>
                          <div>{song.metadata.composer}</div>
                        </div>
                      </div>
                    )}
                    
                    {song.metadata.year && (
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground">Year</div>
                          <div>{song.metadata.year}</div>
                        </div>
                      </div>
                    )}
                    
                    {song.metadata.genre && (
                      <div className="flex items-start gap-2">
                        <Music className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground">Genre</div>
                          <div>{song.metadata.genre}</div>
                        </div>
                      </div>
                    )}
                    
                    {song.metadata.language && (
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground">Language</div>
                          <div>{song.metadata.language}</div>
                        </div>
                      </div>
                    )}
                    
                    {song.metadata.duration && (
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground">Duration</div>
                          <div>{song.metadata.duration}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {song.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Added on {song.created_at.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Clock = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default SongShowPage;
