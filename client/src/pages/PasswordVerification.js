import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetcher } from '../utils/fetcher';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import './commonStyle.css';

const PasswordVerification = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordVerification = async () => {
    try {
      if (!password) {
        alert('비밀번호를 입력해주세요.');
        return;
      }

      setIsLoading(true);

      // fetcher를 사용하여 서버에 비밀번호 확인 요청을 보냅니다.
      const res = await fetcher('post', '/auth/passwordVerification', { userPassword: password });

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
      <div className='Common-container'>
        <h1>비밀번호 확인</h1>
        <TextField
          helperText="Please enter your Password"
          id="demo-helper-text-misaligned"
          label="비밀번호"
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <div className='Common-btn'>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button type="submit" size="medium" onClick={handlePasswordVerification} disabled={isLoading}>
              확인
            </Button>
            <Link to='/Mypage' className="MuiButton-root"><Button>취소</Button></Link>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default PasswordVerification;