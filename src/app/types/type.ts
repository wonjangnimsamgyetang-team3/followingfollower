// export interface UserData {
//   nickname: string;
//   contents: string;
//   avatar: string;
//   id: string;
//   uid: string;
//   email: string;
// }

export type UserData = {
  avatar?: string;
  nickname: string;
  contents: string;
  id?: string;
  uid?: string;
  email: string;
};

export interface UserInfo {
  nickname: string;
  contents: string;
  email: string;
}

// nickname: userInfo.nickname,
