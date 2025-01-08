import { User } from '@/types/userType';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUseUserStore {
  user: User | null;
  setUser: (newState: User | null | ((prevState: User | null) => User | null)) => void;
}

const useUserStore = create<IUseUserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (newState) => {
        if (typeof newState === 'function') {
          set((state) => ({ user: newState(state.user) }));
        } else {
          set({ user: newState });
        }
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user }),
    },
  ),
);

export default useUserStore;
