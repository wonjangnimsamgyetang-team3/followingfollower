export type Todo = {
  todoId: string;
  nickname: string;
  title: string;
  contents: string;
  start: Date;
  end: Date;
  likeCount: number;
  created_at: string;
  liked: boolean;
};

export type Edit = {
  isEdit: boolean;
  setIsEdit: (boolean: boolean) => void;
};

export type UserData = {
  avatar?: string;
  nickname: string | undefined;
  contents?: string | undefined;
  id?: string;
  email: string;
};

export interface UserInfo {
  nickname: string;
  contents: string;
  avatar?: string;
  email: string;
}

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

export type Image = {
  image: string | Blob | File | Uint8Array | ArrayBuffer;
};

export type followType = string[] | null;
