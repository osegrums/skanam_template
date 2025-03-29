
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface SearchHeaderProps {
  title: string;
  searchPlaceholder: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  createButtonText: string;
  createButtonLink: string;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  title,
  searchPlaceholder,
  searchQuery,
  onSearchChange,
  createButtonText,
  createButtonLink,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link to={createButtonLink}>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {createButtonText}
          </Button>
        </Link>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full pl-10"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </>
  );
};
