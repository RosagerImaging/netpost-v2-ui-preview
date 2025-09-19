import { Metadata } from "next";
import UserManagementPanel from "@/components/admin/user-management-panel";

export const metadata: Metadata = {
  title: "Admin - User Management",
  description: "Manage user subscriptions and billing information",
};

export default function UserManagementPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-gray-400 mt-2">
            View and manage user subscriptions, billing, and access permissions
          </p>
        </div>
      </div>

      <UserManagementPanel />
    </div>
  );
}