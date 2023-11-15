import { useEffect, useState } from 'react';
import { fetcher } from '../utils/fetcher';
import { useNavigate } from 'react-router-dom';

const useMyPageData = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPhoneNum, setUserPhoneNum] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetcher('get', '/auth/Mypage', { withCredentials: true });
        setUserName(userData.userName);
        setUserEmail(userData.userEmail);
        setUserAddress(userData.userAddress);
        setUserPhoneNum(userData.userPhoneNum);
      } catch (error) {
        console.log('유저데이터를 가져오는데 실패', error);
      }
    };

    fetchUserData();
  }, []);

  const updateUserInfo = async () => {
    try {
      await setUserName(userName);
      await setUserEmail(userEmail);
      await setUserAddress(userAddress);
      await setUserPhoneNum(userPhoneNum);
      // 서버로 수정된 정보를 전송
      const updatedData = await fetcher('put', '/auth/Mypage/editProfile', {
        userName,
        userEmail,
        userAddress,
        userPhoneNum
      }, { withCredentials: true });

      alert('회원정보가 수정되었습니다.');
      navigate('/Mypage');
      console.log(updatedData); // 서버로부터의 응답을 출력 또는 처리
    } catch (error) {
      console.log('유저데이터를 업데이트하는데 실패', error);
    }
  };

  return {
    userName,
    userEmail,
    userAddress,
    userPhoneNum,
    setUserName,
    setUserEmail,
    setUserAddress,
    setUserPhoneNum,
    updateUserInfo
  };
};

export default useMyPageData;