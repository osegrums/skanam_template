
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";

interface DashboardSectionProps {
  title: string;
  icon: LucideIcon;
  seeAllLink: string;
  createNewLink: string;
  createNewText: string;
  children: ReactNode;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({
  title,
  icon: Icon,
  seeAllLink,
  createNewLink,
  createNewText,
  children,
}) => {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </h2>
        <div className="flex items-center gap-3">
          <Link to={seeAllLink} className="text-primary hover:text-primary/80 flex items-center gap-1">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to={createNewLink}>
            <Button size="sm" className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              {createNewText}
            </Button>
          </Link>
        </div>
      </div>
      {children}
    </section>
  );
};
