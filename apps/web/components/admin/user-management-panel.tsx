"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@repo/ui";
import { Button } from "@repo/ui";
import { Input } from "@repo/ui";
import { Select } from "@repo/ui";
import { Badge } from "@repo/ui";
import { Table } from "@repo/ui";
import {
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  Mail,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
} from "lucide-react";
import { SubscriptionService } from "@/lib/services/subscription-service";
import {
  UserWithSubscription,
  SubscriptionTier,
  SubscriptionStatus,
} from "@/lib/types/subscription";

const tierColors = {
  free: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  beta: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  pro: "bg-green-500/10 text-green-400 border-green-500/20",
  enterprise: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const statusColors = {
  active: "bg-green-500/10 text-green-400 border-green-500/20",
  inactive: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  canceled: "bg-red-500/10 text-red-400 border-red-500/20",
  past_due: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  trialing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const statusIcons = {
  active: CheckCircle,
  inactive: XCircle,
  canceled: XCircle,
  past_due: AlertTriangle,
  trialing: Clock,
};

export default function UserManagementPanel() {
  const [users, setUsers] = useState<UserWithSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState<SubscriptionTier | "all">("all");
  const [statusFilter, setStatusFilter] = useState<SubscriptionStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const filters: any = {};
      if (tierFilter !== "all") filters.tier = tierFilter;
      if (statusFilter !== "all") filters.status = statusFilter;
      if (searchTerm) filters.search = searchTerm;

      const result = await SubscriptionService.getUsers(currentPage, 50, filters);

      if (currentPage === 1) {
        setUsers(result.users);
      } else {
        setUsers(prev => [...prev, ...result.users]);
      }

      setTotalUsers(result.total);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchUsers();
  }, [searchTerm, tierFilter, statusFilter]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchUsers();
    }
  }, [currentPage]);

  const handleGrantBetaAccess = async (userId: string) => {
    try {
      await SubscriptionService.grantBetaAccess(userId);
      fetchUsers(); // Refresh the data
    } catch (error) {
      console.error("Failed to grant beta access:", error);
    }
  };

  const handleRevokeAccess = async (userId: string) => {
    try {
      await SubscriptionService.revokeAccess(userId);
      fetchUsers(); // Refresh the data
    } catch (error) {
      console.error("Failed to revoke access:", error);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="p-6 bg-gray-900 border-gray-800">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="flex gap-4">
            <Select value={tierFilter} onValueChange={(value) => setTierFilter(value as any)}>
              <option value="all">All Tiers</option>
              <option value="free">Free</option>
              <option value="beta">Beta</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </Select>

            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="trialing">Trialing</option>
              <option value="past_due">Past Due</option>
              <option value="canceled">Canceled</option>
              <option value="inactive">Inactive</option>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span>Showing {users.length} of {totalUsers} users</span>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filters active: {[tierFilter !== "all", statusFilter !== "all", searchTerm].filter(Boolean).length}</span>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="bg-gray-900 border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-4 text-gray-300 font-medium">User</th>
                <th className="text-left p-4 text-gray-300 font-medium">Subscription</th>
                <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                <th className="text-left p-4 text-gray-300 font-medium">Usage</th>
                <th className="text-left p-4 text-gray-300 font-medium">LTV</th>
                <th className="text-left p-4 text-gray-300 font-medium">Risk</th>
                <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const StatusIcon = user.subscription?.status ? statusIcons[user.subscription.status] : XCircle;

                return (
                  <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-white font-medium">{user.name}</p>
                            {user.isAdmin && (
                              <Shield className="h-4 w-4 text-yellow-500" title="Admin" />
                            )}
                          </div>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                          <p className="text-gray-500 text-xs">
                            Joined {formatDate(user.createdAt)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      {user.subscription ? (
                        <div className="space-y-1">
                          <Badge className={tierColors[user.subscription.tier]}>
                            {user.subscription.tier.toUpperCase()}
                          </Badge>
                          {user.subscription.trialEndsAt && (
                            <p className="text-xs text-gray-400">
                              Trial ends {formatDate(user.subscription.trialEndsAt)}
                            </p>
                          )}
                        </div>
                      ) : (
                        <Badge className={tierColors.free}>FREE</Badge>
                      )}
                    </td>

                    <td className="p-4">
                      {user.subscription ? (
                        <div className="flex items-center gap-2">
                          <StatusIcon className="h-4 w-4" />
                          <Badge className={statusColors[user.subscription.status]}>
                            {user.subscription.status.replace("_", " ").toUpperCase()}
                          </Badge>
                        </div>
                      ) : (
                        <Badge className={statusColors.inactive}>NO SUBSCRIPTION</Badge>
                      )}
                    </td>

                    <td className="p-4">
                      {user.usageMetrics ? (
                        <div className="text-sm">
                          <p className="text-white">{user.usageMetrics.apiCalls} API calls</p>
                          <p className="text-gray-400">{user.usageMetrics.itemsCreated} items</p>
                          <p className="text-gray-400">{user.usageMetrics.storageUsed}MB storage</p>
                        </div>
                      ) : (
                        <span className="text-gray-500">No usage data</span>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="text-sm">
                        <p className="text-white font-medium">
                          {formatCurrency(user.lifetimeValue)}
                        </p>
                        <p className="text-gray-400 text-xs">lifetime value</p>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            user.riskScore < 30
                              ? "bg-green-500"
                              : user.riskScore < 70
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        />
                        <span className="text-sm text-gray-300">{user.riskScore}%</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleGrantBetaAccess(user.id)}
                          className="border-green-600 text-green-400 hover:bg-green-600/10"
                        >
                          <UserPlus className="h-3 w-3 mr-1" />
                          Grant Beta
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRevokeAccess(user.id)}
                          className="border-red-600 text-red-400 hover:bg-red-600/10"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Revoke
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-gray-400 hover:text-white"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto" />
            <p className="text-gray-400 mt-2">Loading users...</p>
          </div>
        )}

        {hasMore && !loading && (
          <div className="p-4 border-t border-gray-800 text-center">
            <Button
              onClick={() => setCurrentPage(prev => prev + 1)}
              variant="outline"
              className="border-gray-700 text-gray-300"
            >
              Load More Users
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}