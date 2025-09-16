import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Tag, Zap, List } from "lucide-react";

// Hardcoded placeholder data for recent activity
const activityItems = [
  {
    icon: Tag,
    text: "Item Sold: Vintage Leather Jacket",
    time: "2m ago",
  },
  {
    icon: Zap,
    text: "New Offer on: Red Silk Scarf",
    time: "15m ago",
  },
  {
    icon: List,
    text: "Item Listed: Blue Denim Jeans",
    time: "1h ago",
  },
  {
    icon: Tag,
    text: "Item Sold: Retro Sunglasses",
    time: "3h ago",
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
                <item.icon className="text-secondary-text h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-primary-text text-sm font-medium">
                  {item.text}
                </p>
                <p className="text-secondary-text text-xs">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
