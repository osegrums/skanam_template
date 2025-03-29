
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  message: string;
  buttonText: string;
  buttonLink: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  buttonText,
  buttonLink,
}) => {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <p className="text-muted-foreground mb-4">{message}</p>
        <Link to={buttonLink}>
          <Button>{buttonText}</Button>
        </Link>
      </CardContent>
    </Card>
  );
};
