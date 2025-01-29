import { create } from 'zustand';

const useUserStore = create((set) => ({
  name: null,
  setName: (newName) => set({ name: newName }),
}));

export default useUserStore;
