export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      batches: {
        Row: {
          batch_number: string
          completed_at: string | null
          created_at: string | null
          created_by: string
          drying_started_at: string | null
          id: string
          status: Database["public"]["Enums"]["batch_status"] | null
          total_orders: number | null
          updated_at: string | null
          wash_type: Database["public"]["Enums"]["wash_type"]
          washing_started_at: string | null
        }
        Insert: {
          batch_number: string
          completed_at?: string | null
          created_at?: string | null
          created_by: string
          drying_started_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["batch_status"] | null
          total_orders?: number | null
          updated_at?: string | null
          wash_type: Database["public"]["Enums"]["wash_type"]
          washing_started_at?: string | null
        }
        Update: {
          batch_number?: string
          completed_at?: string | null
          created_at?: string | null
          created_by?: string
          drying_started_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["batch_status"] | null
          total_orders?: number | null
          updated_at?: string | null
          wash_type?: Database["public"]["Enums"]["wash_type"]
          washing_started_at?: string | null
        }
        Relationships: []
      }
      booking_items: {
        Row: {
          booking_id: string
          clothing_type: Database["public"]["Enums"]["clothing_type"]
          id: string
          quantity: number
        }
        Insert: {
          booking_id: string
          clothing_type: Database["public"]["Enums"]["clothing_type"]
          id?: string
          quantity?: number
        }
        Update: {
          booking_id?: string
          clothing_type?: Database["public"]["Enums"]["clothing_type"]
          id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "booking_items_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          barcode_id: string | null
          booking_date: string
          created_at: string | null
          estimated_cost: number | null
          id: string
          laundry_type: Database["public"]["Enums"]["laundry_type"]
          pickup_date: string | null
          pickup_time: string | null
          special_instructions: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          time_slot: string
          total_items: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          barcode_id?: string | null
          booking_date: string
          created_at?: string | null
          estimated_cost?: number | null
          id?: string
          laundry_type: Database["public"]["Enums"]["laundry_type"]
          pickup_date?: string | null
          pickup_time?: string | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          time_slot: string
          total_items?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          barcode_id?: string | null
          booking_date?: string
          created_at?: string | null
          estimated_cost?: number | null
          id?: string
          laundry_type?: Database["public"]["Enums"]["laundry_type"]
          pickup_date?: string | null
          pickup_time?: string | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          time_slot?: string
          total_items?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      laundry_orders: {
        Row: {
          actual_cost: number | null
          batch_id: string | null
          completed_at: string | null
          created_at: string | null
          delivered_at: string | null
          drying_started_at: string | null
          estimated_cost: number | null
          feedback: string | null
          id: string
          laundry_id: string
          pickup_address: string | null
          pickup_date: string | null
          pickup_type: Database["public"]["Enums"]["pickup_type"]
          qr_code: string | null
          special_instructions: string | null
          status: Database["public"]["Enums"]["order_status"] | null
          sticky_note: string | null
          updated_at: string | null
          user_id: string
          wash_type: Database["public"]["Enums"]["wash_type"]
          washing_started_at: string | null
        }
        Insert: {
          actual_cost?: number | null
          batch_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          delivered_at?: string | null
          drying_started_at?: string | null
          estimated_cost?: number | null
          feedback?: string | null
          id?: string
          laundry_id: string
          pickup_address?: string | null
          pickup_date?: string | null
          pickup_type: Database["public"]["Enums"]["pickup_type"]
          qr_code?: string | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          sticky_note?: string | null
          updated_at?: string | null
          user_id: string
          wash_type?: Database["public"]["Enums"]["wash_type"]
          washing_started_at?: string | null
        }
        Update: {
          actual_cost?: number | null
          batch_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          delivered_at?: string | null
          drying_started_at?: string | null
          estimated_cost?: number | null
          feedback?: string | null
          id?: string
          laundry_id?: string
          pickup_address?: string | null
          pickup_date?: string | null
          pickup_type?: Database["public"]["Enums"]["pickup_type"]
          qr_code?: string | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          sticky_note?: string | null
          updated_at?: string | null
          user_id?: string
          wash_type?: Database["public"]["Enums"]["wash_type"]
          washing_started_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_batch"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      order_status_history: {
        Row: {
          changed_by: string
          created_at: string | null
          id: string
          new_status: Database["public"]["Enums"]["order_status"]
          notes: string | null
          order_id: string
          previous_status: Database["public"]["Enums"]["order_status"] | null
        }
        Insert: {
          changed_by: string
          created_at?: string | null
          id?: string
          new_status: Database["public"]["Enums"]["order_status"]
          notes?: string | null
          order_id: string
          previous_status?: Database["public"]["Enums"]["order_status"] | null
        }
        Update: {
          changed_by?: string
          created_at?: string | null
          id?: string
          new_status?: Database["public"]["Enums"]["order_status"]
          notes?: string | null
          order_id?: string
          previous_status?: Database["public"]["Enums"]["order_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "order_status_history_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "laundry_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          hostel_name: string | null
          id: string
          phone: string | null
          phone_verified: boolean | null
          role: Database["public"]["Enums"]["user_role"] | null
          room_number: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          hostel_name?: string | null
          id: string
          phone?: string | null
          phone_verified?: boolean | null
          role?: Database["public"]["Enums"]["user_role"] | null
          room_number?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          hostel_name?: string | null
          id?: string
          phone?: string | null
          phone_verified?: boolean | null
          role?: Database["public"]["Enums"]["user_role"] | null
          room_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_activity: {
        Row: {
          activity_type: string
          created_at: string | null
          description: string | null
          id: string
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_barcode: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_batch_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_laundry_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      batch_status: "created" | "washing" | "drying" | "completed"
      booking_status:
        | "pending"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
      clothing_type:
        | "shirts"
        | "trousers"
        | "jeans"
        | "t_shirts"
        | "dresses"
        | "skirts"
        | "jackets"
        | "underwear"
        | "socks"
        | "bedsheets"
        | "towels"
        | "others"
      laundry_type:
        | "quick_wash"
        | "regular_wash"
        | "delicate_care"
        | "dry_cleaning"
      order_status:
        | "pending"
        | "picked_up"
        | "washing"
        | "drying"
        | "completed"
        | "delivered"
      pickup_type: "self_drop" | "pickup"
      user_role: "admin" | "staff" | "customer"
      wash_type: "normal" | "stain_warm"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      batch_status: ["created", "washing", "drying", "completed"],
      booking_status: [
        "pending",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
      ],
      clothing_type: [
        "shirts",
        "trousers",
        "jeans",
        "t_shirts",
        "dresses",
        "skirts",
        "jackets",
        "underwear",
        "socks",
        "bedsheets",
        "towels",
        "others",
      ],
      laundry_type: [
        "quick_wash",
        "regular_wash",
        "delicate_care",
        "dry_cleaning",
      ],
      order_status: [
        "pending",
        "picked_up",
        "washing",
        "drying",
        "completed",
        "delivered",
      ],
      pickup_type: ["self_drop", "pickup"],
      user_role: ["admin", "staff", "customer"],
      wash_type: ["normal", "stain_warm"],
    },
  },
} as const
