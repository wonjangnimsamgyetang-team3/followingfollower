import { UserInfo } from "os";
import { create, SetState } from "zustand";
import { persist } from "zustand/middleware";
import defaultImg from "@/assets/profile.png";
import { UserData } from "../types/type";

// interface USER {
//   userEmail: string;
//   nickname: string;
//   avatar: string;
//   contents: string;
// }

interface USER {
  token: string | undefined;
}
interface State {
  like: number;
  increaseLike: () => void;
  removeAllLikes: () => void;
  userInfo: USER | null;
  addUser: (UserInfo: USER) => void;
  removeUser: () => void;
  // MyPage-ProfileImage.tsx
  defaultImg: string;
  selectFile: string;
  userAccount: Partial<UserData>;
  activeCategory: string;
  setSelectFile: (selectImg: string) => void;
  setDefaultImg: (selectImg: string) => void;
  setUserAccount: (newUserData: Partial<UserData>) => void;
  setCategory: (payload: string) => void;
}

const initialState = {
  like: 0,
  userInfo: null,
  activeCategory: "내가 할 일",
  userAccount: {
    avatar: "",
    nickname: "보라돌이",
    contents: "눈사람만들래?",
    id: "",
    uid: "asde234j23-4we2webdk512k-12m0-5adpib",
    email: "tj2033428@naver.com",
  },
};

const useStoreState = create<State>((set) => ({
  ...initialState,
  increaseLike: () => set((state) => ({ like: state.like + 1 })),
  removeAllLikes: () => set({ like: 0 }),
  addUser: (userInfo: USER) => set((state) => ({ ...state, userInfo })),
  removeUser: () => set((state) => ({ ...state, userInfo: null })),
  // MyPage-ProfileImage.tsx
  defaultImg: defaultImg.src,
  selectFile: defaultImg.src,
  userAccount: { nickname: "", contents: "", email: "", uid: "", avatar: "" },
  // activeCategory: initialState.activeCategory,
  setSelectFile: (selectImg: string) =>
    set((prev) => ({ ...prev, selectFile: selectImg })),
  setDefaultImg: (selectImg: string) =>
    set((prev) => ({ ...prev, defaultImg: selectImg })),
  setUserAccount: (newUserData: Partial<UserData>) =>
    set(() => ({
      userAccount: newUserData,
    })),
  setCategory: (category: string) => set({ activeCategory: category }),
}));

export default useStoreState;
