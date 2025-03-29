
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Mail, AlertCircle, CheckCircle2, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const ProfilePage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("SingerJS");
  const [isLoading, setIsLoading] = useState(false);

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "Your song was approved",
      message: "Your song 'Summer Breeze' has been approved and is now public.",
      date: "2 days ago",
      isRead: false,
    },
    {
      id: 2,
      title: "New comment on your event",
      message: "Someone commented on your 'Voice Training Session' event.",
      date: "1 week ago",
      isRead: true,
    },
    {
      id: 3,
      title: "System maintenance",
      message: "The site will be down for maintenance on Sunday at 2AM.",
      date: "2 weeks ago",
      isRead: true,
    },
  ];

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock password update - would be replaced with actual API call
    setTimeout(() => {
      console.log("Password update attempted with:", { currentPassword, newPassword });
      setIsLoading(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password updated successfully");
    }, 1000);
  };

  const handleUpdateNickname = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock nickname update - would be replaced with actual API call
    setTimeout(() => {
      console.log("Nickname update attempted with:", { nickname });
      setIsLoading(false);
      toast.success("Nickname updated successfully");
    }, 1000);
  };

  const markAsRead = (id: number) => {
    console.log("Marked notification as read:", id);
    toast.success("Notification marked as read");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Avatar className="h-16 w-16">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">JS</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and notifications</p>
          </div>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateNickname} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nickname">Unique Nickname</Label>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="nickname" 
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="flex-1"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your unique nickname will be visible to other users
                    </p>
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Nickname"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to maintain account security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      type="password" 
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      type="password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage your notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                    </div>
                    <Switch id="emailNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="systemNotifications">System Notifications</Label>
                    </div>
                    <Switch id="systemNotifications" defaultChecked />
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="font-medium mb-4">Recent Notifications</h3>
                  {notifications.length > 0 ? (
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <Alert key={notification.id} variant={notification.isRead ? "default" : "default"} className={notification.isRead ? "bg-muted/50" : "bg-primary/5 border-primary/20"}>
                          <div className="flex justify-between">
                            <div className="flex items-start gap-2">
                              {notification.isRead ? 
                                <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-1" /> : 
                                <AlertCircle className="h-4 w-4 text-primary mt-1" />
                              }
                              <div>
                                <AlertTitle className={notification.isRead ? "text-muted-foreground" : ""}>{notification.title}</AlertTitle>
                                <AlertDescription className="text-sm text-muted-foreground">
                                  {notification.message}
                                  <p className="text-xs mt-1">{notification.date}</p>
                                </AlertDescription>
                              </div>
                            </div>
                            {!notification.isRead && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-auto py-1 text-xs"
                                onClick={() => markAsRead(notification.id)}
                              >
                                Mark as read
                              </Button>
                            )}
                          </div>
                        </Alert>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-4 text-muted-foreground">No notifications to display</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
