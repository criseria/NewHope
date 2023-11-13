import { create } from 'zustand';
import axios from "axios";

const useLogin = create((set) => ({
  loading: false,
  user: null,
  error: null,
  loginUser: async (body) => {
    set({ loading: true });
    try {
      const response = await axios.post("http://localhost:8080/auth/login", body);
      console.log('로그인 성공:', response);
      set({ loading: false, user: response.data, error: null });
    } catch (error) {
      console.error('로그인 실패:', error);
      set({ loading: false, user: null, error: error.response.data });
    }
  },
}));

export default useLogin;