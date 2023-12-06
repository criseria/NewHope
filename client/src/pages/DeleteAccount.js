import React, { useState } from 'react';
import { fetcher } from '../utils/fetcher';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import './commonStyle.css';

const DeleteAccount = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleDeleteAccount = async () => {
    try {
      if (!password) {
        alert('비밀번호를 입력해주세요.');
        return;
      }

      const res = await fetcher('delete', '/auth/Mypage/DeleteAccount', { userPassword: password });

      if (res.success) {
        alert('탈퇴가 완료되었습니다.');
        document.cookie = 'dkfjdkfjaksfjddksjf3232=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        sessionStorage.clear();
        logout();
        navigate('/');
      } else if (res.error === '비밀번호가 일치하지 않습니다.') {
        alert("비밀번호가 틀렸습니다");
      } else {
        console.log(res);
        alert('회원 탈퇴 중 오류가 발생했습니다');
      }
    } catch (error) {
      console.log('회원 탈퇴 중 에러 발생', error);
      alert('회원 탈퇴 중 오류가 발생했습니다');
    }
  };

  return (
    <div className="Common-container">
      <h2>회원탈퇴 페이지 입니다.</h2>
      <TextField
        helperText="Please enter your Password"
        id="demo-helper-text-misaligned"
        label="비밀번호를 입력해주세요"
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className='Common-btn'>
        <ButtonGroup variant="text" aria-label="text button group">
          <Link className="MuiButton-root"><Button type="submit" size="medium" onClick={handleDeleteAccount}>
            회원탈퇴
          </Button></Link>
          <Link to='/Mypage' className="MuiButton-root"><Button>취소</Button></Link>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default DeleteAccount;