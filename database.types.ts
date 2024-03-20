export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      test: {
        Row: {
          contents: string | null;
          id: number;
          title: string;
        };
        Insert: {
          contents?: string | null;
          id?: number;
          title: string;
        };
        Update: {
          contents?: string | null;
          id?: number;
          title?: string;
        };
        Relationships: [];
      };
      TodoList: {
        Row: {
          contents: string | null;
          created_at: string;
          end: string;
          file: string | null;
          likeCount: number | null;
          liked: boolean | null;
          nickname: string | null;
          start: string;
          title: string;
          todoId: string;
        };
        Insert: {
          contents?: string | null;
          created_at?: string;
          end?: string | null;
          file?: string | null;
          likeCount?: number | null;
          liked?: boolean | null;
          nickname?: string | null;
          start?: string | null;
          title?: string | null;
          todoId?: string;
        };
        Update: {
          contents?: string | null;
          created_at?: string;
          end?: string | null;
          file?: string | null;
          likeCount?: number | null;
          liked?: boolean | null;
          nickname?: string | null;
          start?: string | null;
          title?: string | null;
          todoId?: string;
        };
        Relationships: [];
      };
      usersAccounts: {
        Row: {
          avatar: string | null;
          contents: string | null;
          id: number;
          nickname: string | null;
          uid: string;
          userEmail: string | null;
        };
        Insert: {
          avatar?: string | null;
          contents?: string | null;
          id?: number;
          nickname?: string | null;
          uid?: string;
          userEmail?: string | null;
        };
        Update: {
          avatar?: string | null;
          contents?: string | null;
          id?: number;
          nickname?: string | null;
          uid?: string;
          userEmail?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_usersAccounts_userId_fkey";
            columns: ["userEmail"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
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
};
