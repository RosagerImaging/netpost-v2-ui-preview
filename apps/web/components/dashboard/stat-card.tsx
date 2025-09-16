import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
}

/**
 * A reusable card component to display a single statistic on the dashboard.
 */
export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{title}</CardTitle>
        <Icon className="text-secondary-text h-5 w-5" />
      </CardHeader>
      <CardContent>
        <div className="text-primary-text text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};
