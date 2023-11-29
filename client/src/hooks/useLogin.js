import { create } from 'zustand';
import { fetcher } from '../utils/fetcher';

const useLogin = create((set) => ({
  loading: false,
  user: null,
  error: null,
  loginUser: async (auth, body) => {
    set({ loading: true });
    try {
      const res = await fetcher('post', '/auth/login', body);
      console.log('로그인 성공:', res);

      // 로그인 성공 시 useAuth 컨텍스트의 login 함수를 호출하여 상태 변경
      auth.login();

      set({ loading: false, user: res.data, error: null });
    } catch (error) {
      console.error('로그인 실패:', error);
      set({ loading: false, user: null, error: error.message });

      if (error.message === '등록되지않은 사용자입니다') {
        alert('등록되지않은 사용자입니다');
      } else {
        alert('비밀번호가 일치하지 않습니다');
      }
    }
  },
}));

export default useLogin;