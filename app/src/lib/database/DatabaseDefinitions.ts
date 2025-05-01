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
          created_at: string | null;
          updated_at: string | null;
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
          created_at?: string | null;
          updated_at?: string | null;
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
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      stripe_customers: {
        Row: {
          user_id: string;
          stripe_customer_id: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          user_id: string;
          stripe_customer_id: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          user_id?: string;
          stripe_customer_id?: string;
          created_at?: string | null;
          updated_at?: string | null;
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
          cancel_at_period_end: boolean | null;
          current_period_start: string | null;
          current_period_end: string | null;
          created_at: string | null;
          updated_at: string | null;
          ended_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_subscription_id?: string | null;
          stripe_price_id?: string | null;
          stripe_product_id?: string | null;
          status: string;
          cancel_at_period_end?: boolean | null;
          current_period_start?: string | null;
          current_period_end?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          ended_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_subscription_id?: string | null;
          stripe_price_id?: string | null;
          stripe_product_id?: string | null;
          status?: string;
          cancel_at_period_end?: boolean | null;
          current_period_start?: string | null;
          current_period_end?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          ended_at?: string | null;
        };
      };
      // Include other tables from your database here
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
  };
}
