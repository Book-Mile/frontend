import { create } from 'zustand';

const useUserStore = create((set) => ({
  name: JSON.parse(sessionStorage.getItem('userData'))?.nickName || null, // sessionStorage에서 nickName을 가져오기
  setName: (newName) => {
    set({ name: newName });
  },
  accessToken: null, // 초기값
  setAccessToken: token => set({ accessToken: token }),
  accessToken: JSON.parse(sessionStorage.getItem('userData'))?.accessToken || null,
}));

export default useUserStore;