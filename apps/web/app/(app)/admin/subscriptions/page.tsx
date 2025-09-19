import { Metadata } from "next";
import { redirect } from "next/navigation";
import SubscriptionDashboard from "@/components/admin/subscription-dashboard";

export const metadata: Metadata = {
  title: "Admin - Subscription Management",
  description: "Admin dashboard for managing user subscriptions and billing",
};

// TODO: Replace with actual admin auth check
function isAdmin(): boolean {
  // This would typically check the user's role from session/JWT
  // For now, we'll return true for development
  return true;
}

export default function AdminSubscriptionsPage() {
  if (!isAdmin()) {
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Subscription Management</h1>
          <p className="text-gray-400 mt-2">
            Manage user subscriptions, billing, and system analytics
          </p>
        </div>
      </div>

      <SubscriptionDashboard />
    </div>
  );
}