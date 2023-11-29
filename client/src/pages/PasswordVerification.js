import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetcher } from '../utils/fetcher';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const PasswordVerification = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordVerification = async () => {
    try {
      setIsLoading(true);

      // fetcher를 사용하여 서버에 비밀번호 확인 요청을 보냅니다.
      const res = await fetcher('post', '/auth/passwordVerification', { userPassword: password });

      // 비밀번호가 일치하면 '/Mypage/edit' 페이지로 이동
      if (res.message === "비밀번호 확인 성공") {
        navigate('/Mypage/edit');
      } else {
        setError(res.message || '비밀번호 확인 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setError(error.message || '비밀번호 확인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>비밀번호 확인</h2>
        {/* <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        /> */}
        <TextField
          helperText="Please enter your Password"
          id="demo-helper-text-misaligned"
          label="비밀번호"
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      <Button type="submit" variant="contained" size="medium" onClick={handlePasswordVerification} disabled={isLoading}>
        확인
      </Button>
      {/* <button onClick={handlePasswordVerification} disabled={isLoading}>
        확인
      </button> */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Link to="/Mypage">돌아가기</Link>
    </div>
  );
};

export default PasswordVerification;