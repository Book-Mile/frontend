import { create } from 'zustand';

const useUserStore = create((set) => ({
  name: null,
  setName: (newName) => set({ name: newName }),

  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
}));

export default useUserStore;
