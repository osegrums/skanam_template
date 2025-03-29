
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MyEventsList, MyEvent } from "./MyEventsList";

interface EventsTabsProps {
  upcomingEvents: MyEvent[];
  historicalEvents: MyEvent[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
}

export const EventsTabs: React.FC<EventsTabsProps> = ({
  upcomingEvents,
  historicalEvents,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}) => {
  const upcomingTotalPages = Math.ceil(upcomingEvents.length / itemsPerPage);
  const paginatedUpcomingEvents = upcomingEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const historicalTotalPages = Math.ceil(historicalEvents.length / itemsPerPage);
  const paginatedHistoricalEvents = historicalEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Tabs defaultValue="upcoming" className="w-full" onValueChange={() => setCurrentPage(1)}>
      <TabsList className="w-full max-w-md mx-auto mb-6">
        <TabsTrigger value="upcoming" className="flex-1">Upcoming Events</TabsTrigger>
        <TabsTrigger value="historical" className="flex-1">Past Events</TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming">
        <MyEventsList 
          events={paginatedUpcomingEvents}
          currentPage={currentPage}
          totalPages={upcomingTotalPages}
          onPageChange={setCurrentPage}
        />
      </TabsContent>

      <TabsContent value="historical">
        <MyEventsList 
          events={paginatedHistoricalEvents}
          currentPage={currentPage}
          totalPages={historicalTotalPages}
          onPageChange={setCurrentPage}
        />
      </TabsContent>
    </Tabs>
  );
};
