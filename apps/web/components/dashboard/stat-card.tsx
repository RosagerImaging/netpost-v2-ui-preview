import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
}

/**
 * A reusable card component to display a single statistic on the dashboard.
 */
export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{title}</CardTitle>
        <Icon className="h-5 w-5 text-secondary-text" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primary-text">{value}</div>
      </CardContent>
    </Card>
  );
};

