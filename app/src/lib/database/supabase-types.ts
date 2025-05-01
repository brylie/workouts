/**
 * TypeScript definitions for Supabase database tables
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      completed_exercises: {
        Row: {
          id: number;
          exercise_id: string;
          completed_at: string;
          user_id: string;
          metrics: {
            sets?: number;
            reps?: number;
            weight?: number;
            time?: number;
            distance?: number;
            resistance?: number;
            speed?: number;
            incline?: number;
            resistance_type?: string;
            calories?: number;
            heart_rate?: number;
            rpe?: number;
          };
        };
        Insert: {
          id?: number;
          exercise_id: string;
          completed_at: string;
          user_id: string;
          metrics: {
            sets?: number;
            reps?: number;
            weight?: number;
            time?: number;
            distance?: number;
            resistance?: number;
            speed?: number;
            incline?: number;
            resistance_type?: string;
            calories?: number;
            heart_rate?: number;
            rpe?: number;
          };
        };
        Update: {
          id?: number;
          exercise_id?: string;
          completed_at?: string;
          user_id?: string;
          metrics?: {
            sets?: number;
            reps?: number;
            weight?: number;
            time?: number;
            distance?: number;
            resistance?: number;
            speed?: number;
            incline?: number;
            resistance_type?: string;
            calories?: number;
            heart_rate?: number;
            rpe?: number;
          };
        };
      };
      stripe_customers: {
        Row: {
          user_id: string;
          stripe_customer_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          stripe_customer_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          stripe_customer_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_subscription_id: string | null;
          stripe_price_id: string | null;
          stripe_product_id: string | null;
          status: string;
          cancel_at_period_end: boolean;
          current_period_start: string | null;
          current_period_end: string | null;
          created_at: string;
          updated_at: string;
          ended_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_subscription_id?: string | null;
          stripe_price_id?: string | null;
          stripe_product_id?: string | null;
          status: string;
          cancel_at_period_end?: boolean;
          current_period_start?: string | null;
          current_period_end?: string | null;
          created_at?: string;
          updated_at?: string;
          ended_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_subscription_id?: string | null;
          stripe_price_id?: string | null;
          stripe_product_id?: string | null;
          status?: string;
          cancel_at_period_end?: boolean;
          current_period_start?: string | null;
          current_period_end?: string | null;
          created_at?: string;
          updated_at?: string;
          ended_at?: string | null;
        };
      };
      pricing_plans: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          features: Json | null;
          stripe_price_id: string | null;
          stripe_product_id: string | null;
          amount: number;
          currency: string;
          interval: string;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          features?: Json | null;
          stripe_price_id?: string | null;
          stripe_product_id?: string | null;
          amount: number;
          currency?: string;
          interval: string;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          features?: Json | null;
          stripe_price_id?: string | null;
          stripe_product_id?: string | null;
          amount?: number;
          currency?: string;
          interval?: string;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
