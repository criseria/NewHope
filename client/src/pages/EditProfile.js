import React from 'react';
import useMyPageData from '../hooks/useMypage';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import './EditProfile.css'
import './commonStyle.css';
import Footer from '../components/Footer';


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
    <div>

      <div className="Edito-container">
        <h1><strong>EditProfile</strong></h1>
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
        <div className='Common-btn'>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button type='button' size="medium" onClick={updateUserInfo}>
              수정
            </Button>
            <Link to='/Mypage' className="MuiButton-root"><Button>취소</Button></Link>
          </ButtonGroup>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default EditProfile;