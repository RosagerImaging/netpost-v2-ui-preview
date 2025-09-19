"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";
import { Card } from "@repo/ui";
import { Users, BarChart3, Activity } from "lucide-react";
import UserManagementPanel from "./user-management-panel";
import SubscriptionAnalytics from "./subscription-analytics";
import SystemMonitoring from "./system-monitoring";

export default function SubscriptionDashboard() {
  return (
    <div className="space-y-6">
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-white">247</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Active Subscriptions</p>
              <p className="text-2xl font-bold text-white">186</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Activity className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Monthly Revenue</p>
              <p className="text-2xl font-bold text-white">$18,420</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-900 border-gray-800">
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            <Users className="w-4 h-4 mr-2" />
            User Management
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="monitoring"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            <Activity className="w-4 h-4 mr-2" />
            Monitoring
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <UserManagementPanel />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <SubscriptionAnalytics />
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <SystemMonitoring />
        </TabsContent>
      </Tabs>
    </div>
  );
}