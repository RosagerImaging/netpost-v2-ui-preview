import {
  User,
  Subscription,
  BillingInfo,
  UsageMetrics,
  SubscriptionEvent,
  SubscriptionAnalytics,
  UserWithSubscription,
  SystemHealth,
  SubscriptionTier,
  SubscriptionStatus
} from "@/lib/types/subscription";

// Mock data generator for development
function generateMockUser(id: string): UserWithSubscription {
  const tiers: SubscriptionTier[] = ["free", "beta", "pro", "enterprise"];
  const statuses: SubscriptionStatus[] = ["active", "inactive", "canceled", "past_due", "trialing"];

  const user: UserWithSubscription = {
    id,
    email: `user${id}@example.com`,
    name: `User ${id}`,
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000), // Random date within last 90 days
    lastActiveAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random date within last 7 days
    isAdmin: Math.random() < 0.05, // 5% chance of being admin
    lifetimeValue: Math.floor(Math.random() * 1000),
    riskScore: Math.floor(Math.random() * 100),
  };

  // Add subscription for non-free users
  if (Math.random() > 0.3) { // 70% have subscriptions
    const tier = tiers[Math.floor(Math.random() * tiers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    user.subscription = {
      id: `sub_${id}`,
      userId: id,
      tier,
      status,
      currentPeriodStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      cancelAtPeriodEnd: Math.random() < 0.1,
      createdAt: user.createdAt,
      updatedAt: new Date(),
      trialEndsAt: status === "trialing" ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) : undefined,
    };

    user.billingInfo = {
      id: `bill_${id}`,
      userId: id,
      stripeCustomerId: `cus_${Math.random().toString(36).substr(2, 9)}`,
      paymentMethodId: `pm_${Math.random().toString(36).substr(2, 9)}`,
      lastPaymentAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      nextPaymentAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      paymentStatus: Math.random() > 0.1 ? "paid" : "failed",
      billingEmail: user.email,
    };

    user.usageMetrics = {
      userId: id,
      period: new Date().toISOString().slice(0, 7), // YYYY-MM
      apiCalls: Math.floor(Math.random() * 1000),
      storageUsed: Math.floor(Math.random() * 500),
      itemsCreated: Math.floor(Math.random() * 100),
      crossListings: Math.floor(Math.random() * 50),
      aiGeneratedDescriptions: Math.floor(Math.random() * 80),
      photoEnhancements: Math.floor(Math.random() * 60),
      features: {
        inventory_management: Math.floor(Math.random() * 200),
        cross_listing: Math.floor(Math.random() * 50),
        ai_descriptions: Math.floor(Math.random() * 80),
        photo_enhancement: Math.floor(Math.random() * 60),
      },
    };
  }

  return user;
}

export class SubscriptionService {
  // User Management
  static async getUsers(
    page: number = 1,
    limit: number = 50,
    filters?: {
      tier?: SubscriptionTier;
      status?: SubscriptionStatus;
      search?: string;
    }
  ): Promise<{ users: UserWithSubscription[]; total: number; hasMore: boolean }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate mock data
    const totalUsers = 247; // Mock total
    const allUsers = Array.from({ length: totalUsers }, (_, i) => generateMockUser((i + 1).toString()));

    // Apply filters
    let filteredUsers = allUsers;

    if (filters?.tier) {
      filteredUsers = filteredUsers.filter(user => user.subscription?.tier === filters.tier);
    }

    if (filters?.status) {
      filteredUsers = filteredUsers.filter(user => user.subscription?.status === filters.status);
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
    }

    // Paginate
    const startIndex = (page - 1) * limit;
    const users = filteredUsers.slice(startIndex, startIndex + limit);

    return {
      users,
      total: filteredUsers.length,
      hasMore: startIndex + limit < filteredUsers.length,
    };
  }

  static async getUserById(id: string): Promise<UserWithSubscription | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return generateMockUser(id);
  }

  static async updateUserSubscription(
    userId: string,
    updates: Partial<Subscription>
  ): Promise<Subscription> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const user = generateMockUser(userId);
    if (!user.subscription) {
      throw new Error("User has no subscription");
    }

    return {
      ...user.subscription,
      ...updates,
      updatedAt: new Date(),
    };
  }

  static async grantBetaAccess(userId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Mock implementation - would update database
    console.log(`Granted beta access to user ${userId}`);
  }

  static async revokeAccess(userId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Mock implementation - would update database
    console.log(`Revoked access for user ${userId}`);
  }

  // Analytics
  static async getSubscriptionAnalytics(): Promise<SubscriptionAnalytics> {
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      totalUsers: 247,
      activeSubscriptions: 186,
      subscriptionsByTier: {
        free: 61,
        beta: 45,
        pro: 128,
        enterprise: 13,
      },
      monthlyRecurringRevenue: 18420,
      churnRate: 3.2,
      conversionRate: 15.8,
      averageRevenuePerUser: 99.03,
      trialToConversionRate: 68.5,
      recentEvents: [
        {
          id: "evt_1",
          userId: "user_123",
          type: "payment_succeeded",
          data: { amount: 9900 },
          createdAt: new Date(Date.now() - 30 * 60 * 1000),
        },
        {
          id: "evt_2",
          userId: "user_456",
          type: "trial_started",
          data: { tier: "pro" },
          createdAt: new Date(Date.now() - 45 * 60 * 1000),
        },
        {
          id: "evt_3",
          userId: "user_789",
          type: "canceled",
          data: { reason: "cost" },
          createdAt: new Date(Date.now() - 60 * 60 * 1000),
        },
      ],
    };
  }

  // System Monitoring
  static async getSystemHealth(): Promise<SystemHealth> {
    await new Promise(resolve => setTimeout(resolve, 600));

    return {
      activeUsers: 147,
      systemLoad: 0.65,
      errorRate: 0.02,
      apiResponseTime: 245,
      billingHealth: {
        successfulPayments: 186,
        failedPayments: 8,
        pendingPayments: 3,
      },
      featureUsage: {
        inventory_management: 1247,
        cross_listing: 856,
        ai_descriptions: 632,
        photo_enhancement: 423,
        marketplace_sync: 345,
      },
      alerts: [
        {
          id: "alert_1",
          type: "warning",
          message: "API response time above 200ms for last 10 minutes",
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
        },
        {
          id: "alert_2",
          type: "info",
          message: "Scheduled maintenance window in 2 hours",
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
        },
      ],
    };
  }

  // Subscription Events
  static async getSubscriptionEvents(
    limit: number = 50,
    offset: number = 0
  ): Promise<SubscriptionEvent[]> {
    await new Promise(resolve => setTimeout(resolve, 400));

    const eventTypes = ["created", "updated", "canceled", "reactivated", "payment_succeeded", "payment_failed", "trial_started", "trial_ended"] as const;

    return Array.from({ length: Math.min(limit, 20) }, (_, i) => ({
      id: `evt_${offset + i + 1}`,
      userId: `user_${Math.floor(Math.random() * 1000)}`,
      type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
      data: {
        amount: Math.floor(Math.random() * 10000),
        tier: ["free", "beta", "pro", "enterprise"][Math.floor(Math.random() * 4)]
      },
      createdAt: new Date(Date.now() - (offset + i) * 60 * 60 * 1000),
    }));
  }
}