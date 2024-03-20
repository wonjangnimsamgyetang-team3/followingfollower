import { UserInfo } from "os";
import { create, SetState } from "zustand";
import { persist } from "zustand/middleware";

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
}

const initialState = {
  like: 0,
  userInfo: null,
};

const useStoreState = create<State>((set) => ({
  ...initialState,
  increaseLike: () => set((state) => ({ like: state.like + 1 })),
  removeAllLikes: () => set({ like: 0 }),
  addUser: (userInfo: USER) => set((state) => ({ ...state, userInfo })),
  removeUser: () => set((state) => ({ ...state, userInfo: null })),
}));

export default useStoreState;
