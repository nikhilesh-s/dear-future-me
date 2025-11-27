export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      accomplishments: {
        Row: {
          id: string
          content: string
          delete_key?: string
          created_at: string
        }
        Insert: {
          id?: string
          content: string
          delete_key?: string
          created_at?: string
        }
        Update: {
          id?: string
          content?: string
          delete_key?: string
          created_at?: string
        }
      }
      thanksgiving_gratitude: {
        Row: {
          id: string
          content: string
          delete_key?: string | null
          created_at: string
        }
        Insert: {
          id?: string
          content: string
          delete_key?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          content?: string
          delete_key?: string | null
          created_at?: string
        }
      }
      letters: {
        Row: {
          id: string
          text: string
          created_at: string
        }
        Insert: {
          id?: string
          text: string
          created_at?: string
        }
        Update: {
          id?: string
          text?: string
          created_at?: string
        }
      }
      vision_boards: {
        Row: {
          id: string
          icons: Json
          created_at: string
        }
        Insert: {
          id?: string
          icons: Json
          created_at?: string
        }
        Update: {
          id?: string
          icons?: Json
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          name: string | null
          email: string | null
          phone: string | null
          notifications_enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string | null
          email?: string | null
          phone?: string | null
          notifications_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          phone?: string | null
          notifications_enabled?: boolean
          updated_at?: string
        }
      }
      journals: {
        Row: {
          journal_id: string
          user_id: string
          entry_date: string
          title: string | null
          content: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          journal_id?: string
          user_id: string
          entry_date?: string
          title?: string | null
          content: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          journal_id?: string
          user_id?: string
          entry_date?: string
          title?: string | null
          content?: string
          is_public?: boolean
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          testimonial_id: string
          user_id: string | null
          testimonial_content: string
          author_name: string | null
          is_approved: boolean
          created_at: string
        }
        Insert: {
          testimonial_id?: string
          user_id?: string | null
          testimonial_content: string
          author_name?: string | null
          is_approved?: boolean
          created_at?: string
        }
        Update: {
          testimonial_id?: string
          user_id?: string | null
          testimonial_content?: string
          author_name?: string | null
          is_approved?: boolean
        }
      }
      feedback: {
        Row: {
          feedback_id: string
          submitted_at: string
          feedback_content: string
          category: string
          email: string | null
        }
        Insert: {
          feedback_id?: string
          submitted_at?: string
          feedback_content: string
          category?: string
          email?: string | null
        }
        Update: {
          feedback_id?: string
          submitted_at?: string
          feedback_content?: string
          category?: string
          email?: string | null
        }
      }
      letter_counts: {
        Row: {
          id: string
          copy_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          copy_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          copy_count?: number
          updated_at?: string
        }
      }
    }
    Functions: {
      increment_letter_count: {
        Args: Record<PropertyKey, never>
        Returns: void
      }
    }
  }
}
