import React, { useState } from 'react';
import { fetcher } from '../utils/fetcher';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const DeleteAccount = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {logout} = useAuth();

  const handleDeleteAccount = async () => {
    try {
      const res = await fetcher('delete', '/auth/Mypage/DeleteAccount', { userPassword: password });

      console.log(res);
      alert('탈퇴가 완료되었습니다.');
      document.cookie = 'dkfjdkfjaksfjddksjf3232=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      sessionStorage.clear();
      logout();
      navigate('/');
    } catch (error) {
      console.log('회원 탈퇴 중 에러 발생', error);
    }
  };

  return (
    <div>
      <h2>회원탈퇴 페이지 입니다.</h2>
      <label>
        비밀번호:
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleDeleteAccount}>회원탈퇴</button>
      <Link to={'/Mypage'}>돌아가기</Link>
    </div>
  );
};

export default DeleteAccount;