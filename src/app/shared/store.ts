import { create, SetState } from "zustand";
import defaultImg from "@/assets/profile.png";

interface State {
  like: number;
  increaseLike: () => void;
  removeAllLikes: () => void;
  // MyPage-ProfileImage.tsx
  defaultImg: string;
  selectFile: string;
}

const useStoreState = create<State>((set) => ({
  like: 0,
  increaseLike: () => set((state) => ({ like: state.like + 1 })),
  removeAllLikes: () => set({ like: 0 }),
  // MyPage-ProfileImage.tsx
  defaultImg: defaultImg.src,
  selectFile: defaultImg.src,
}));

export default useStoreState;
