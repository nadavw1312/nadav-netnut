import { BillingCycle } from "@constants/enums";

export interface Plan {
  name: string;
  pricePerMonth: number;
  pricePerYear: number;
  icon: string;
}

export interface AddOn {
  name: string;
  description: string;
  pricePerMonth: number;
  pricePerYear: number;
}

export interface RegisterPlanFormData {
  name: string;
  email: string;
  phone: string;
  plan:  null | Plan;
  billingCycle: BillingCycle;
  addOns: AddOn[];
}