export interface Todo {
  todoId: string;
  nickname: string;
  title: string;
  contents: string;
  start: Date;
  end: Date;
  likeCount: number;
  created_at: string;
}
export interface UserData {
  avatar?: string;
  nickname: string;
  contents: string;
  id?: string | null;
  uid?: string;
  email?: string;
}

// export type UserInfo {
//   userData: UserData[];
// }
