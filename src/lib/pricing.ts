import type { BillingInterval, Plan } from "@/types/content";

export interface PriceDetails {
  monthly: number;
  yearlyTotal: number;
  savings: number;
}

export function getPrice(plan: Plan, interval: BillingInterval): PriceDetails | null {
  if (plan.price.monthly === null || plan.price.yearly === null) {
    return null;
  }

  const monthly = interval === "yearly" ? plan.price.yearly : plan.price.monthly;
  const yearlyTotal = plan.price.yearly * 12;

  return {
    monthly,
    yearlyTotal,
    savings: plan.price.monthly * 12 - yearlyTotal,
  };
}
