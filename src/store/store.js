import { create } from 'zustand';

const useUserStore = create((set) => ({
  name: JSON.parse(sessionStorage.getItem('userData'))?.nickName || null,
  setName: (newName) => set({ name: newName }),
  
  accessToken: JSON.parse(sessionStorage.getItem('userData'))?.accessToken || null,
  setAccessToken: (token) => set({ accessToken: token }), 
}));

export default useUserStore;
