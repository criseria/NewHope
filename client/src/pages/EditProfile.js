import React from 'react';
import useMyPageData from '../hooks/useMypage';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EditProfile = () => {
  const {
    userName,
    userEmail,
    userPostcode,
    userAddress,
    userDetailAddress,
    userPhoneNum,
    setUserName,
    setUserEmail,
    setUserPostcode,
    setUserAddress,
    setUserDetailAddress,
    setUserPhoneNum,
    updateUserInfo
  } = useMyPageData();

  return (
    <div className="container">
      <h2>회원정보 수정 화면 입니다.</h2>
      <TextField
        label="이름"
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="이메일"
        type="text"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="우편번호"
        type="text"
        value={userPostcode}
        onChange={(e) => setUserPostcode(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="주소"
        type="text"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="상세주소"
        type="text"
        value={userDetailAddress}
        onChange={(e) => setUserDetailAddress(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="핸드폰번호"
        type="text"
        value={userPhoneNum}
        onChange={(e) => setUserPhoneNum(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" size="medium" onClick={updateUserInfo} style={{ marginTop: '16px' }}>
        수정
      </Button>
      <Link to={'/Mypage'} style={{ marginLeft: '8px' }}>
        돌아가기
      </Link>
    </div>
  );
};

export default EditProfile;