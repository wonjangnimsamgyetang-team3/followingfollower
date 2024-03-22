export type Todo = {
  todoId: string;
  nickname: string;
  title: string;
  contents: string;
  start: Date;
  end: Date;
  likeCount: number;
  created_at: string;
};

export type Edit = {
  isEdit: boolean;
  setIsEdit: (boolean: boolean) => void;
};

export type UserData = {
  avatar?: string;
  nickname: string;
  contents: string;
  id?: number;
  uid?: string;
  email: string;
};

export interface UserInfo {
  nickname: string;
  contents: string;
  email: string;
}

// nickname: userInfo.nickname,
export type UserEmail = {
  userEmail: string;
};

export type TabName = {
  myTodos: string;
  likeTodos: string;
};

export type userTodo = {
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
  email: string;
};
