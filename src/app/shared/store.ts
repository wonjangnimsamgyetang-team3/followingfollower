import { create, SetState } from "zustand";
import defaultImg from "@/assets/profile.png";

interface State {
  like: number;
  increaseLike: () => void;
  removeAllLikes: () => void;
  thumnailImg: string;
}

const useStoreState = create<State>((set) => ({
  like: 0,
  increaseLike: () => set((state) => ({ like: state.like + 1 })),
  removeAllLikes: () => set({ like: 0 }),
  thumnailImg: defaultImg.src,
}));

export default useStoreState;
