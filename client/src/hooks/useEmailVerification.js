import { useState } from 'react';
import { fetcher } from '../utils/fetcher';

const useEmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);


  const generateVerificationCode = () => {
    const generatedCode = Math.floor(100000 + Math.random() * 900000);
    setVerificationCode(generatedCode.toString());
  };

  const sendVerificationEmail = async (email) => {
    try {
      const res = await fetcher('post', '/auth/sendVerificationEmail', { email });

      if (res.ok) {
        const serverVerificationCode = res.authNum;
        setVerificationCode(serverVerificationCode);
        setIsVerificationSent(true);
        setIsCodeSent(true);
      } else {
        console.error('서버에서 인증 코드를 받아오지 못했습니다.');
        alert('이메일 발송에 실패했습니다.');
      }
    } catch (error) {
      console.error('이메일 발송 오류:', error);
      alert('이메일 발송 중 오류가 발생했습니다.');
    }
  };

  const verifyCode = (enteredCode) => {
    console.log("Entered Code:", enteredCode);
    console.log("Stored Code:", verificationCode);

    // 사용자가 입력한 코드와 저장된 코드 비교
    if (enteredCode == verificationCode) {
      setIsCodeVerified(true);
      alert("인증이 완료되었습니다.");
    } else {
      alert("인증이 실패했습니다. 올바른 인증 번호를 입력해주세요.");
    }
  };

  return {
    verificationCode,
    isVerificationSent,
    isCodeVerified,
    generateVerificationCode,
    sendVerificationEmail,
    verifyCode,
  };
};

export default useEmailVerification;