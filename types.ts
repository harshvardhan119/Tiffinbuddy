
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  PROVIDER = 'PROVIDER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  type: 'veg' | 'non-veg' | 'vegan';
}

export interface Menu {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  lunch: Meal[];
  dinner: Meal[];
}

export interface MealPlan {
  id: string;
  name: string;
  price: number; // per month
  description: string;
  type: 'weekly' | 'monthly';
}

export interface TiffinProvider {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  rating: number;
  reviews: Review[];
  menu: Menu[];
  plans: MealPlan[];
  coverImage: string;
  isVerified: boolean;
}

export enum OrderStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  OUT_FOR_DELIVERY = 'Out for Delivery',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
}

export interface Order {
  id: string;
  userId: string;
  providerId: string;
  planId: string;
  status: OrderStatus;
  startDate: string;
  endDate: string;
  totalAmount: number;
}

export interface GeminiMealSuggestion {
  planTitle: string;
  justification: string;
  suggestedTiffins: {
    providerName: string;
    planName: string;
    reason: string;
  }[];
}
