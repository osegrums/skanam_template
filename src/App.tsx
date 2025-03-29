
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Songs from "./pages/Songs";
import NotFound from "./pages/NotFound";
import EventsPage from "./pages/Events";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";
import MyEventsPage from "./pages/MyEvents";
import MySongsPage from "./pages/MySongs";
import FAQPage from "./pages/FAQ";
import LegalPage from "./pages/Legal";
import EventShowPage from "./pages/EventShow";
import MyEventForm from "./pages/MyEventForm";
import MySongForm from "./pages/MySongForm";
import SongShowPage from "./pages/SongShow";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventShowPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-events" element={<MyEventsPage />} />
            <Route path="/my-events/new" element={<MyEventForm />} />
            <Route path="/my-events/:id/edit" element={<MyEventForm />} />
            <Route path="/my-songs" element={<MySongsPage />} />
            <Route path="/my-songs/new" element={<MySongForm />} />
            <Route path="/my-songs/:id/edit" element={<MySongForm />} />
            <Route path="/my-songs/:id" element={<SongShowPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
