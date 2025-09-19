export type SubscriptionTier = "free" | "beta" | "pro" | "enterprise";

export type SubscriptionStatus = "active" | "inactive" | "canceled" | "past_due" | "trialing";

export type PaymentStatus = "paid" | "pending" | "failed" | "refunded";

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: Date;
  lastActiveAt: Date;
  isAdmin: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
  trialEndsAt?: Date;
  metadata?: Record<string, any>;
}

export interface BillingInfo {
  id: string;
  userId: string;
  stripeCustomerId?: string;
  paymentMethodId?: string;
  lastPaymentAt?: Date;
  nextPaymentAt?: Date;
  paymentStatus: PaymentStatus;
  billingEmail: string;
  billingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface UsageMetrics {
  userId: string;
  period: string; // YYYY-MM format
  apiCalls: number;
  storageUsed: number; // in MB
  itemsCreated: number;
  crossListings: number;
  aiGeneratedDescriptions: number;
  photoEnhancements: number;
  features: Record<string, number>; // Feature usage counts
}

export interface SubscriptionEvent {
  id: string;
  userId: string;
  type: "created" | "updated" | "canceled" | "reactivated" | "payment_succeeded" | "payment_failed" | "trial_started" | "trial_ended";
  data: Record<string, any>;
  createdAt: Date;
}

export interface SubscriptionAnalytics {
  totalUsers: number;
  activeSubscriptions: number;
  subscriptionsByTier: Record<SubscriptionTier, number>;
  monthlyRecurringRevenue: number;
  churnRate: number;
  conversionRate: number;
  averageRevenuePerUser: number;
  trialToConversionRate: number;
  recentEvents: SubscriptionEvent[];
}

export interface UserWithSubscription extends User {
  subscription?: Subscription;
  billingInfo?: BillingInfo;
  usageMetrics?: UsageMetrics;
  lifetimeValue: number;
  riskScore: number; // 0-100, higher = more likely to churn
}

export interface SystemHealth {
  activeUsers: number;
  systemLoad: number;
  errorRate: number;
  apiResponseTime: number;
  billingHealth: {
    successfulPayments: number;
    failedPayments: number;
    pendingPayments: number;
  };
  featureUsage: Record<string, number>;
  alerts: Array<{
    id: string;
    type: "error" | "warning" | "info";
    message: string;
    timestamp: Date;
  }>;
}