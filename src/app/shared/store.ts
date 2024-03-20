import { create, SetState } from "zustand";
import defaultImg from "@/assets/profile.png";
import { UserData } from "../types/type";

interface State {
  like: number;
  increaseLike: () => void;
  removeAllLikes: () => void;
  // MyPage-ProfileImage.tsx
  defaultImg: string;
  selectFile: string;
  userAccount: {
    nickname: string;
    contents: string;
    email: string;
    uid: string;
    avatar: string;
  };
  setSelectFile: (selectImg: string) => void;
  setDefaultImg: (selectImg: string) => void;
  setUserAccount: (newUserData: Partial<UserData>) => void;
}

const useStoreState = create<State>((set) => ({
  like: 0,
  increaseLike: () => set((state) => ({ like: state.like + 1 })),
  removeAllLikes: () => set({ like: 0 }),
  // MyPage-ProfileImage.tsx
  defaultImg: defaultImg.src,
  selectFile: defaultImg.src,
  userAccount: { nickname: "", contents: "", email: "", uid: "", avatar: "" },
  setSelectFile: (selectImg: string) =>
    set((prev) => ({ ...prev, selectFile: selectImg })),
  setDefaultImg: (selectImg: string) =>
    set((prev) => ({ ...prev, defaultImg: selectImg })),
  setUserAccount: (newUserData: UserData) =>
    set(() => ({
      userAccount: newUserData,
    })),
}));

export default useStoreState;
