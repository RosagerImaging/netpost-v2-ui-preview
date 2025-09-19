import { Metadata } from "next";
import SubscriptionAnalytics from "@/components/admin/subscription-analytics";

export const metadata: Metadata = {
  title: "Admin - Subscription Analytics",
  description: "View subscription metrics, trends, and conversion analytics",
};

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Subscription Analytics</h1>
          <p className="text-gray-400 mt-2">
            Track subscription metrics, user conversion, and revenue trends
          </p>
        </div>
      </div>

      <SubscriptionAnalytics />
    </div>
  );
}