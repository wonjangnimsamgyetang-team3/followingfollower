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
          imageFile: string;
          likeCount: number | null;
          liked: boolean | null;
          nickname: string | null;
          start: string;
          title: string;
          todoId: string;
          liketest: string[];
          email?: string;
        };
        Insert: {
          contents?: string | null;
          created_at?: string;
          end?: string | null;
          imageFile?: string;
          likeCount?: number | null;
          liked?: boolean | null;
          nickname?: string | null;
          start?: string | null;
          title?: string | null;
          todoId?: string;
          liketest: string[];
          email?: string;
        };
        Update: {
          contents?: string | null;
          created_at?: string;
          end?: string | null;
          imageFile?: string;
          likeCount?: number | null;
          liked?: boolean | null;
          nickname?: string | null;
          start?: string | null;
          title?: string | null;
          todoId?: string;
          liketest?: string[];
          email?: string;
        };
        Relationships: [];
      };
      usersAccounts: {
        Row: {
          avatar: string;
          contents: string | null;
          id: number;
          nickname: string | null;
          uid: string;
          email: string;
        };
        Insert: {
          avatar?: string | null;
          contents?: string | null;
          id?: number;
          nickname?: string | null;
          uid?: string;
          email?: string;
        };
        Update: {
          avatar?: string | null;
          contents?: string | null;
          id?: number;
          nickname?: string | null;
          uid?: string;
          email?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_usersAccounts_userId_fkey';
            columns: ['userEmail'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
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
