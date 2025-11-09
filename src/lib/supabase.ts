import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          whatsapp_number: string;
          full_name: string | null;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          whatsapp_number: string;
          full_name?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          whatsapp_number?: string;
          full_name?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          category: 'VPS' | 'RDP' | 'Baremetal';
          name: string;
          description: string | null;
          price_per_month: number;
          specs: Record<string, any>;
          is_active: boolean;
          created_at: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          os_choice: string;
          duration_value: number;
          duration_unit: 'days' | 'months' | 'years';
          total_price: number;
          status: 'pending' | 'provisioning' | 'active' | 'suspended' | 'expired';
          whatsapp_contact: string;
          created_at: string;
          expires_at: string | null;
          updated_at: string;
        };
      };
      invoices: {
        Row: {
          id: string;
          invoice_number: string;
          order_id: string;
          user_id: string;
          amount: number;
          status: 'unpaid' | 'pending_verification' | 'paid';
          created_at: string;
          paid_at: string | null;
        };
      };
      server_credentials: {
        Row: {
          id: string;
          order_id: string;
          ip_address: string | null;
          username: string | null;
          password: string | null;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
};
