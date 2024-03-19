import { create, SetState } from 'zustand';

interface State {
  like: number;
  increaseLike: () => void;
  removeAllLikes: () => void;
}

const useStoreState = create<State>((set) => ({
  like: 0,
  increaseLike: () => set((state) => ({ like: state.like + 1 })),
  removeAllLikes: () => set({ like: 0 }),
}));

export default useStoreState;
