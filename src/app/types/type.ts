// export interface UserData {
//   nickname: string;
//   contents: string;
//   avatar: string;
//   id: string;
//   uid: string;
//   email: string;
// }

export type UserData = {
  avatar?: string | undefined;
  nickname: string;
  contents: string;
  id?: string | undefined;
  uid?: string | undefined;
  email: string | undefined;
};

export interface UserInfo {
  nickname: string;
  contents: string;
}

// nickname: userInfo.nickname,
