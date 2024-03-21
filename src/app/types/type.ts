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
