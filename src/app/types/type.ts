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
// export type UserEmail = {
//   userEmail: string;
// };

export type TabName = {
  myTodos: string;
  likeTodos: string;
};
