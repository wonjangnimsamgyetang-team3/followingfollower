import { create, SetState } from "zustand";
import { persist } from "zustand/middleware";
import defaultImg from "@/assets/profile.png";
import { UserData } from "../types/type";

export interface USER {
  avatar: string;
  nickname: string;
  contents: string;
  id: string;
  email: string;
}

interface State {
  like: number;
  increaseLike: () => void;
  removeAllLikes: () => void;
  userInfo: USER;
  addUser: (UserInfo: USER) => void;
  removeUser: () => void;

  // MyPage-ProfileImage.tsx
  defaultImg: string;
  selectFile: string;
  userAccount: Partial<UserData>;
  activeCategory: string;
  setSelectFile: (selectImg: File) => void;
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
    nickname: "",
    contents: "",
    id: 0,
    email: "",
  },
  defaultImg: defaultImg,
  selectFile: defaultImg,
};

const useStoreState = create(
  persist<State>(
    (set, get) => ({
      ...initialState,
      increaseLike: () => set((state) => ({ like: state.like + 1 })),
      removeAllLikes: () => set({ like: 0 }),

      addUser: (userInfo: USER) => set({ userInfo }),
      removeUser: () => set((state) => ({ userInfo: null })),
      // MyPage-ProfileImage.tsx

      setSelectFile: (selectImg: File) =>
        set((prev) => ({ ...prev, selectFile: selectImg })),
      setDefaultImg: (selectImg: string) =>
        set((prev) => ({ ...prev, defaultImg: selectImg })),
      setUserAccount: (newUserData: Partial<UserData>) =>
        set(() => ({
          userAccount: newUserData,
        })),
      setCategory: (category: string) => set({ activeCategory: category }),
    }),
    { name: "loginedUser" }
  )
);

export default useStoreState;
