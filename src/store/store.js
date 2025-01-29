import { create } from 'zustand';

const useUserStore = create((set) => ({
  name: JSON.parse(sessionStorage.getItem('userData'))?.nickName || null, // sessionStorage에서 nickName을 가져오기
  setName: (newName) => {
    set({ name: newName });
  },
}));

export default useUserStore;
