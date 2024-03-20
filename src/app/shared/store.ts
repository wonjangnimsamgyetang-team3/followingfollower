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
  setSelectFile: (selectImg: string) => void;
  setDefaultImg: (selectImg: string) => void;
  // MyPage-ProfileConetents.tsx
  userAccount: { nickname: string; contents: string; avatar: string };

  setUserAccount: (newUserData: UserData | null) => void;
}

const useStoreState = create<State>((set) => ({
  like: 0,
  increaseLike: () => set((state) => ({ like: state.like + 1 })),
  removeAllLikes: () => set({ like: 0 }),
  // MyPage-ProfileImage.tsx
  defaultImg: defaultImg.src,
  selectFile: defaultImg.src,
  setSelectFile: (selectImg: string) =>
    set((prev) => ({ ...prev, selectFile: selectImg })),
  setDefaultImg: (selectImg: string) =>
    set((prev) => ({ ...prev, defaultImg: selectImg })),
  setUserAccount: (newUserData: UserData) => set({ userAccount: newUserData }),
}));

export default useStoreState;
