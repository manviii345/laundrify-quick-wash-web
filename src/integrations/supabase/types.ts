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
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          hostel_name: string | null
          id: string
          phone: string | null
          room_number: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          hostel_name?: string | null
          id: string
          phone?: string | null
          room_number?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          hostel_name?: string | null
          id?: string
          phone?: string | null
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
    }
    Enums: {
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
    },
  },
} as const
