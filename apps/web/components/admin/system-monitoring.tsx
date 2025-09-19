"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@repo/ui";
import { Badge } from "@repo/ui";
import { Button } from "@repo/ui";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Activity,
  Server,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  CreditCard,
  Users,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Bell,
  XCircle,
  Database,
} from "lucide-react";
import { SubscriptionService } from "@/lib/services/subscription-service";
import { SystemHealth } from "@/lib/types/subscription";

// Mock real-time data
const performanceData = [
  { time: "00:00", responseTime: 230, load: 0.45, errors: 2 },
  { time: "04:00", responseTime: 185, load: 0.32, errors: 1 },
  { time: "08:00", responseTime: 340, load: 0.78, errors: 5 },
  { time: "12:00", responseTime: 280, load: 0.65, errors: 3 },
  { time: "16:00", responseTime: 245, load: 0.58, errors: 2 },
  { time: "20:00", responseTime: 195, load: 0.42, errors: 1 },
];

const usageLimitsData = [
  { feature: "API Calls", used: 8520, limit: 10000, percentage: 85.2 },
  { feature: "Storage", used: 745, limit: 1000, percentage: 74.5 },
  { feature: "Bandwidth", used: 156, limit: 200, percentage: 78.0 },
  { feature: "AI Requests", used: 2340, limit: 3000, percentage: 78.0 },
];

export default function SystemMonitoring() {
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchSystemHealth = async () => {
    try {
      const data = await SubscriptionService.getSystemHealth();
      setSystemHealth(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to fetch system health:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemHealth();
    const interval = setInterval(fetchSystemHealth, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!systemHealth) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Failed to load system health data</p>
      </div>
    );
  }

  const getHealthStatus = (value: number, threshold: number, inverse = false) => {
    const isHealthy = inverse ? value < threshold : value > threshold;
    return {
      status: isHealthy ? "healthy" : "warning",
      color: isHealthy ? "text-green-400" : "text-yellow-400",
      icon: isHealthy ? CheckCircle : AlertTriangle,
    };
  };

  const featureUsageData = Object.entries(systemHealth.featureUsage).map(([feature, usage]) => ({
    name: feature.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    value: usage,
  }));

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* System Status Overview */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-white">System Health Dashboard</h2>
          <p className="text-gray-400 text-sm">Last updated: {formatTime(lastUpdated)}</p>
        </div>
        <Button
          onClick={fetchSystemHealth}
          variant="outline"
          size="sm"
          className="border-gray-700 text-gray-300"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-white">{systemHealth.activeUsers}</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+12</span>
            <span className="text-gray-400 ml-1">last hour</span>
          </div>
        </Card>

        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">System Load</p>
              <p className="text-2xl font-bold text-white">{(systemHealth.systemLoad * 100).toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Server className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            {systemHealth.systemLoad > 0.8 ? (
              <>
                <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-yellow-500">High load</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">Normal</span>
              </>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Response Time</p>
              <p className="text-2xl font-bold text-white">{systemHealth.apiResponseTime}ms</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Zap className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            {systemHealth.apiResponseTime > 500 ? (
              <>
                <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-red-500">Slow</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">Fast</span>
              </>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Error Rate</p>
              <p className="text-2xl font-bold text-white">{(systemHealth.errorRate * 100).toFixed(2)}%</p>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            {systemHealth.errorRate > 0.05 ? (
              <>
                <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-red-500">Elevated</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">Normal</span>
              </>
            )}
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Performance Metrics</h3>
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              Last 24 hours
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#F9FAFB" }}
              />
              <Line
                type="monotone"
                dataKey="responseTime"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Response Time (ms)"
              />
              <Line
                type="monotone"
                dataKey="load"
                stroke="#8B5CF6"
                strokeWidth={2}
                name="System Load"
                yAxisId="right"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Feature Usage */}
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Feature Usage</h3>
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
              Today
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={featureUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#F9FAFB" }}
              />
              <Bar dataKey="value" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Billing Health & Usage Limits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Billing Health */}
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Billing Health</h3>
            <CreditCard className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-white">Successful Payments</span>
              </div>
              <span className="text-2xl font-bold text-green-400">
                {systemHealth.billingHealth.successfulPayments}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-white">Failed Payments</span>
              </div>
              <span className="text-2xl font-bold text-red-400">
                {systemHealth.billingHealth.failedPayments}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span className="text-white">Pending Payments</span>
              </div>
              <span className="text-2xl font-bold text-yellow-400">
                {systemHealth.billingHealth.pendingPayments}
              </span>
            </div>

            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Success Rate</span>
                <span className="text-green-400 font-medium">
                  {(
                    (systemHealth.billingHealth.successfulPayments /
                      (systemHealth.billingHealth.successfulPayments +
                        systemHealth.billingHealth.failedPayments)) *
                    100
                  ).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${
                      (systemHealth.billingHealth.successfulPayments /
                        (systemHealth.billingHealth.successfulPayments +
                          systemHealth.billingHealth.failedPayments)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Usage Limits */}
        <Card className="p-6 bg-gray-900 border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Usage Limits</h3>
            <Database className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {usageLimitsData.map((item) => (
              <div key={item.feature} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{item.feature}</span>
                  <span className="text-gray-400 text-sm">
                    {item.used.toLocaleString()} / {item.limit.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.percentage > 90
                          ? "bg-red-500"
                          : item.percentage > 75
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      item.percentage > 90
                        ? "text-red-400"
                        : item.percentage > 75
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* System Alerts */}
      <Card className="p-6 bg-gray-900 border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">System Alerts</h3>
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-gray-400" />
            <Badge className="bg-red-500/10 text-red-400 border-red-500/20">
              {systemHealth.alerts.length} Active
            </Badge>
          </div>
        </div>

        {systemHealth.alerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-400">No active alerts</p>
            <p className="text-gray-500 text-sm">All systems are operating normally</p>
          </div>
        ) : (
          <div className="space-y-3">
            {systemHealth.alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.type === "error"
                    ? "bg-red-500/10 border-red-500"
                    : alert.type === "warning"
                    ? "bg-yellow-500/10 border-yellow-500"
                    : "bg-blue-500/10 border-blue-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {alert.type === "error" && <XCircle className="h-5 w-5 text-red-500" />}
                    {alert.type === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                    {alert.type === "info" && <CheckCircle className="h-5 w-5 text-blue-500" />}
                    <div>
                      <p className="text-white font-medium">{alert.message}</p>
                      <p className="text-gray-400 text-sm">
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        }).format(alert.timestamp)}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}