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

export type Edit = {
  isEdit: boolean;
  setIsEdit: (boolean: boolean) => void;
};

export type UserData = {
  avatar?: string | undefined;
  nickname: string | undefined;
  contents: string | undefined;
  id?: number;
  email: string | undefined;
};

export interface UserInfo {
  nickname: string | undefined;
  contents: string;
  avatar?: string | undefined;
  email: string | undefined;
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
