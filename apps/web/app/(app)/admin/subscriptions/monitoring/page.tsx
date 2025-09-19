import { Metadata } from "next";
import SystemMonitoring from "@/components/admin/system-monitoring";

export const metadata: Metadata = {
  title: "Admin - System Monitoring",
  description: "Monitor usage limits, billing health, and system events",
};

export default function MonitoringPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">System Monitoring</h1>
          <p className="text-gray-400 mt-2">
            Monitor system health, usage limits, and billing events
          </p>
        </div>
      </div>

      <SystemMonitoring />
    </div>
  );
}