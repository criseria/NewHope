import React from 'react';
import useMyPageData from '../hooks/useMypage';
import { Link } from 'react-router-dom';

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
      <h2>회원정보 수정 화면 입니다.</h2>
      <label>
        이름:
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
      </label>
      <label>
        이메일:
        <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
      </label>
      <label>
        우편번호:
        <input type="text" value={userPostcode} onChange={(e) => setUserPostcode(e.target.value)} />
      </label>
      <label>
        주소:
        <input type="text" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
      </label>
      <label>
        상세주소:
        <input type="text" value={userDetailAddress} onChange={(e) => setUserDetailAddress(e.target.value)} />
      </label>
      <label>
        핸드폰번호:
        <input type="text" value={userPhoneNum} onChange={(e) => setUserPhoneNum(e.target.value)} />
      </label>
      <button onClick={updateUserInfo}>수정</button>
      <Link to={'/Mypage'}>돌아가기</Link>
    </div>
  );
};

export default EditProfile;