export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bypass_attempts: {
        Row: {
          attempted: boolean
          created_at: string
          id: string
          tier_number: number
          user_id: string
        }
        Insert: {
          attempted?: boolean
          created_at?: string
          id?: string
          tier_number: number
          user_id: string
        }
        Update: {
          attempted?: boolean
          created_at?: string
          id?: string
          tier_number?: number
          user_id?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          certificate_id: string
          created_at: string
          id: string
          issued_at: string
          recipient_email: string
          recipient_name: string
          user_id: string
        }
        Insert: {
          certificate_id: string
          created_at?: string
          id?: string
          issued_at?: string
          recipient_email: string
          recipient_name: string
          user_id: string
        }
        Update: {
          certificate_id?: string
          created_at?: string
          id?: string
          issued_at?: string
          recipient_email?: string
          recipient_name?: string
          user_id?: string
        }
        Relationships: []
      }
      course_progress: {
        Row: {
          cfu_answers: Json
          completed_sections: string[]
          course_id: string
          created_at: string
          id: string
          is_completed: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          cfu_answers?: Json
          completed_sections?: string[]
          course_id: string
          created_at?: string
          id?: string
          is_completed?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          cfu_answers?: Json
          completed_sections?: string[]
          course_id?: string
          created_at?: string
          id?: string
          is_completed?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      discussion_posts: {
        Row: {
          anonymous_identifier: string | null
          author_name: string
          content: string
          created_at: string
          id: string
          is_anonymous: boolean
          is_flagged: boolean
          is_hidden: boolean
          post_type: Database["public"]["Enums"]["post_type"]
          updated_at: string
          upvotes: number
        }
        Insert: {
          anonymous_identifier?: string | null
          author_name?: string
          content: string
          created_at?: string
          id?: string
          is_anonymous?: boolean
          is_flagged?: boolean
          is_hidden?: boolean
          post_type: Database["public"]["Enums"]["post_type"]
          updated_at?: string
          upvotes?: number
        }
        Update: {
          anonymous_identifier?: string | null
          author_name?: string
          content?: string
          created_at?: string
          id?: string
          is_anonymous?: boolean
          is_flagged?: boolean
          is_hidden?: boolean
          post_type?: Database["public"]["Enums"]["post_type"]
          updated_at?: string
          upvotes?: number
        }
        Relationships: []
      }
      discussion_replies: {
        Row: {
          anonymous_identifier: string | null
          author_name: string
          content: string
          created_at: string
          id: string
          is_anonymous: boolean
          is_flagged: boolean
          is_hidden: boolean
          post_id: string
          upvotes: number
        }
        Insert: {
          anonymous_identifier?: string | null
          author_name?: string
          content: string
          created_at?: string
          id?: string
          is_anonymous?: boolean
          is_flagged?: boolean
          is_hidden?: boolean
          post_id: string
          upvotes?: number
        }
        Update: {
          anonymous_identifier?: string | null
          author_name?: string
          content?: string
          created_at?: string
          id?: string
          is_anonymous?: boolean
          is_flagged?: boolean
          is_hidden?: boolean
          post_id?: string
          upvotes?: number
        }
        Relationships: [
          {
            foreignKeyName: "discussion_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "discussion_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discussion_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "discussion_posts_public"
            referencedColumns: ["id"]
          },
        ]
      }
      discussion_upvotes: {
        Row: {
          created_at: string
          id: string
          post_id: string | null
          reply_id: string | null
          voter_identifier: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id?: string | null
          reply_id?: string | null
          voter_identifier: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string | null
          reply_id?: string | null
          voter_identifier?: string
        }
        Relationships: [
          {
            foreignKeyName: "discussion_upvotes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "discussion_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discussion_upvotes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "discussion_posts_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discussion_upvotes_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "discussion_replies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discussion_upvotes_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "discussion_replies_public"
            referencedColumns: ["id"]
          },
        ]
      }
      post_moderation: {
        Row: {
          created_at: string
          id: string
          is_flagged: boolean
          moderated_at: string | null
          notes: string | null
          post_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_flagged?: boolean
          moderated_at?: string | null
          notes?: string | null
          post_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_flagged?: boolean
          moderated_at?: string | null
          notes?: string | null
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_moderation_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "discussion_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_moderation_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "discussion_posts_public"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          display_name: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          email: string
          id: string
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          all_courses_completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          all_courses_completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          all_courses_completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      discussion_posts_public: {
        Row: {
          author_name: string | null
          content: string | null
          created_at: string | null
          id: string | null
          is_anonymous: boolean | null
          is_flagged: boolean | null
          is_hidden: boolean | null
          post_type: Database["public"]["Enums"]["post_type"] | null
          updated_at: string | null
          upvotes: number | null
        }
        Insert: {
          author_name?: string | null
          content?: string | null
          created_at?: string | null
          id?: string | null
          is_anonymous?: boolean | null
          is_flagged?: boolean | null
          is_hidden?: boolean | null
          post_type?: Database["public"]["Enums"]["post_type"] | null
          updated_at?: string | null
          upvotes?: number | null
        }
        Update: {
          author_name?: string | null
          content?: string | null
          created_at?: string | null
          id?: string | null
          is_anonymous?: boolean | null
          is_flagged?: boolean | null
          is_hidden?: boolean | null
          post_type?: Database["public"]["Enums"]["post_type"] | null
          updated_at?: string | null
          upvotes?: number | null
        }
        Relationships: []
      }
      discussion_replies_public: {
        Row: {
          author_name: string | null
          content: string | null
          created_at: string | null
          id: string | null
          is_anonymous: boolean | null
          is_flagged: boolean | null
          is_hidden: boolean | null
          post_id: string | null
          upvotes: number | null
        }
        Insert: {
          author_name?: string | null
          content?: string | null
          created_at?: string | null
          id?: string | null
          is_anonymous?: boolean | null
          is_flagged?: boolean | null
          is_hidden?: boolean | null
          post_id?: string | null
          upvotes?: number | null
        }
        Update: {
          author_name?: string | null
          content?: string | null
          created_at?: string | null
          id?: string | null
          is_anonymous?: boolean | null
          is_flagged?: boolean | null
          is_hidden?: boolean | null
          post_id?: string | null
          upvotes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "discussion_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "discussion_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discussion_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "discussion_posts_public"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      check_user_votes: {
        Args: { p_voter_identifier: string }
        Returns: {
          target_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      verify_certificate: {
        Args: { p_certificate_id: string }
        Returns: {
          certificate_id: string
          created_at: string
          issued_at: string
          recipient_name: string
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "user"
      post_type: "question" | "concern" | "excitement"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      post_type: ["question", "concern", "excitement"],
    },
  },
} as const
