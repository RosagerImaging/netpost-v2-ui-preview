"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@repo/ui";
import { Badge } from "@repo/ui";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  UserCheck,
  UserX,
  Target,
  Calendar,
  Activity,
} from "lucide-react";
import { SubscriptionService } from "@/lib/services/subscription-service";
import { SubscriptionAnalytics as AnalyticsData } from "@/lib/types/subscription";

const tierColors = {
  free: "#6B7280",
  beta: "#3B82F6",
  pro: "#10B981",
  enterprise: "#8B5CF6",
};

// Mock revenue data for charts
const revenueData = [
  { month: "Jan", revenue: 15420, users: 142 },
  { month: "Feb", revenue: 16850, users: 158 },
  { month: "Mar", revenue: 17200, users: 167 },
  { month: "Apr", revenue: 16900, users: 164 },
  { month: "May", revenue: 18100, users: 178 },
  { month: "Jun", revenue: 18420, users: 186 },
];

const conversionData = [
  { month: "Jan", trials: 45, conversions: 28 },
  { month: "Feb", trials: 52, conversions: 34 },
  { month: "Mar", trials: 48, conversions: 32 },
  { month: "Apr", trials: 41, conversions: 29 },
  { month: "May", trials: 55, conversions: 38 },
  { month: "Jun", trials: 47, conversions: 32 },
];

export default function SubscriptionAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await SubscriptionService.getSubscriptionAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Failed to load analytics data</p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const tierData = Object.entries(analytics.subscriptionsByTier).map(([tier, count]) => ({
    name: tier.charAt(0).toUpperCase() + tier.slice(1),
    value: count,
    color: tierColors[tier as keyof typeof tierColors],
  }));

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Monthly Revenue</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(analytics.monthlyRecurringRevenue)}
              </p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+12.5%</span>
            <span className="text-gray-400 ml-1">vs last month</span>
          </div>
        </Card>

        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Subscriptions</p>
              <p className="text-2xl font-bold text-white">{analytics.activeSubscriptions}</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <UserCheck className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+8.2%</span>
            <span className="text-gray-400 ml-1">vs last month</span>
          </div>
        </Card>

        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Churn Rate</p>
              <p className="text-2xl font-bold text-white">{analytics.churnRate}%</p>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg">
              <UserX className="h-6 w-6 text-red-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">-0.8%</span>
            <span className="text-gray-400 ml-1">vs last month</span>
          </div>
        </Card>

        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Conversion Rate</p>
              <p className="text-2xl font-bold text-white">{analytics.conversionRate}%</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Target className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+2.1%</span>
            <span className="text-gray-400 ml-1">vs last month</span>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
              Last 6 months
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#F9FAFB" }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Subscription Tiers Distribution */}
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Subscription Tiers</h3>
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              Current Distribution
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tierData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
              >
                {tierData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Trial Conversion */}
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Trial Conversions</h3>
            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
              Monthly
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#F9FAFB" }}
              />
              <Bar dataKey="trials" fill="#6B7280" name="Trials Started" />
              <Bar dataKey="conversions" fill="#8B5CF6" name="Conversions" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Events</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analytics.recentEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    event.type === "payment_succeeded" ? "bg-green-500" :
                    event.type === "payment_failed" ? "bg-red-500" :
                    event.type === "trial_started" ? "bg-blue-500" :
                    event.type === "canceled" ? "bg-yellow-500" : "bg-gray-500"
                  }`} />
                  <div>
                    <p className="text-white text-sm font-medium">
                      {event.type.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                    <p className="text-gray-400 text-xs">User {event.userId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs">
                    {new Intl.DateTimeFormat("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }).format(event.createdAt)}
                  </p>
                  {event.data.amount && (
                    <p className="text-green-400 text-xs font-medium">
                      {formatCurrency(event.data.amount / 100)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Average Revenue Per User</p>
            <p className="text-3xl font-bold text-white mt-2">
              {formatCurrency(analytics.averageRevenuePerUser)}
            </p>
            <p className="text-green-400 text-sm mt-1">+5.2% vs last month</p>
          </div>
        </Card>

        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Trial to Paid Conversion</p>
            <p className="text-3xl font-bold text-white mt-2">
              {analytics.trialToConversionRate}%
            </p>
            <p className="text-green-400 text-sm mt-1">+3.1% vs last month</p>
          </div>
        </Card>

        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Total Users</p>
            <p className="text-3xl font-bold text-white mt-2">{analytics.totalUsers}</p>
            <p className="text-blue-400 text-sm mt-1">+18 new this week</p>
          </div>
        </Card>
      </div>
    </div>
  );
}