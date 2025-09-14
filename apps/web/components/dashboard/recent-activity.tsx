import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag, Zap, List } from 'lucide-react';

// Hardcoded placeholder data for recent activity
const activityItems = [
  {
    icon: Tag,
    text: 'Item Sold: Vintage Leather Jacket',
    time: '2m ago',
  },
  {
    icon: Zap,
    text: 'New Offer on: Red Silk Scarf',
    time: '15m ago',
  },
  {
    icon: List,
    text: 'Item Listed: Blue Denim Jeans',
    time: '1h ago',
  },
   {
    icon: Tag,
    text: 'Item Sold: Retro Sunglasses',
    time: '3h ago',
  },
];

/**
 * A component to display a feed of recent user activities.
 */
export const RecentActivity: React.FC = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activityItems.map((item, index) => (
            <li key={index} className="flex items-center space-x-4">
              <div className="rounded-full bg-white/10 p-2">
                  <item.icon className="h-5 w-5 text-secondary-text" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-primary-text">{item.text}</p>
                <p className="text-xs text-secondary-text">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

