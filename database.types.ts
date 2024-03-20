// export type Json =
//   | string
//   | number
//   | boolean
//   | null
//   | { [key: string]: Json | undefined }
//   | Json[];

// export interface Database {
//   public: {
//     Tables: {
//       movies: {
//         Row: {
//           // the data expected from .select()
//           id: number;
//           name: string;
//           data: Json | null;
//         };
//         Insert: {
//           // the data to be passed to .insert()
//           id?: never; // generated columns must not be supplied
//           name: string; // `not null` columns with no default must be supplied
//           data?: Json | null; // nullable columns can be omitted
//         };
//         Update: {
//           // the data to be passed to .update()
//           id?: never;
//           name?: string; // `not null` columns are optional on .update()
//           data?: Json | null;
//         };
//       };
//     };
//   };
// }

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
          end: string | null;
          file: string | null;
          likeCount: number | null;
          liked: boolean | null;
          nickname: string | null;
          start: string | null;
          title: string | null;
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
            foreignKeyName: 'public_usersAccounts_userId_fkey';
            columns: ['userEmail'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
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

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
