import React, { useState, useEffect } from 'react';
import { fetcher } from '../utils/fetcher'
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import useEmailVerification from '../hooks/useEmailVerification';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Register.css';

function Register() {
  const {
    isVerificationSent,
    isCodeVerified,
    sendVerificationEmail,
    verifyCode,
  } = useEmailVerification();

  const [formData, setFormData] = useState({
    userName: '',
    userId: '',
    userPassword: '',
    userEmail: '',
    userPostcode: '',
    userAddress: '',
    userDetailAddress: '',
    userPhoneNum: '',
    authCode: '',
  });

  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSignUpButtonEnabled, setIsSignUpButtonEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsSignUpButtonEnabled(isCodeVerified && formData.userId && formData.authCode);
  }, [isCodeVerified, formData.userId, formData.authCode]);

  const handleVerificationCodeInput = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, authCode: value });
  };

  // 이메일 인증 코드 발송버튼
  const handleSendVerification = async () => {
    if (!formData.userEmail) {
      alert('이메일을 입력해주세요.');
      return;
    }

    try {
      await sendVerificationEmail(formData.userEmail);
    } catch (error) {
      console.error('이메일 발송 실패:', error);
    }
  };

  const handleVerifyCode = () => {
    verifyCode(formData.authCode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === 'userPassword' || name === 'passwordConfirm') {
      validatePassword(formData.userPassword, formData.passwordConfirm);
    } else if (name === 'userEmail') {
      validateEmail(value);
    }
  };

  // 비밀번호 정규식
  const validatePassword = (password, confirmPassword) => {
    const passwordRegex = /^[A-Za-z0-9]{3,13}$/;

    if (!password.match(passwordRegex)) {
      setPasswordError('비밀번호는 4~12자리 사이의 영문과 숫자로 이루어져야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  // 이메일 정규식
  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!email.match(emailRegex)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }
  };

  // 도로명주소 api
  const handleComplete = (data) => {
    const selectedAddress = data.address;
    const selectedPostcode = data.zonecode;

    setFormData({
      ...formData,
      userPostcode: selectedPostcode,
      userAddress: selectedAddress,
    });

    setIsPostcodeOpen(false);
  };

  const handleAddressSearch = () => {
    setIsPostcodeOpen(true);
  };

  // 아이디 중복 검사 
  const handleIdCheck = async () => {
    try {
      const res = await fetcher('post', '/auth/checkDuplicate', { userId: formData.userId });

      if (res && res.duplicate) {
        alert('이미 등록된 아이디입니다.');
        setIsSignUpButtonEnabled(false);
      } else {
        alert('사용 가능한 아이디입니다.');
      }
    } catch (error) {
      console.error('중복 체크 오류:', error);
      setIsSignUpButtonEnabled(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) {
      alert('비밀번호 형식이 올바르지 않습니다.');
    } else if (emailError) {
      alert('이메일 형식이 올바르지 않습니다.');
    } else if (!formData.userName) {
      alert('이름을 입력해주세요.');
    } else if (!formData.userId) {
      alert('아이디를 입력해주세요.');
    } else if (!formData.userPassword) {
      alert('비밀번호를 입력해주세요.');
    } else if (!formData.userEmail) {
      alert('이메일을 입력해주세요.');
    } else if (!formData.authCode || !isCodeVerified) {
      alert('이메일 인증을 완료해주세요.');
    } else if (!formData.userAddress) {
      alert('주소를 입력해주세요.');
    } else if (!formData.userPhoneNum) {
      alert('핸드폰 번호를 입력해주세요.');
    } else {
      try {
        const res = await fetcher('post', '/auth/register', {
          ...formData,
          userPassword: formData.userPassword,
        });
        console.log(res);
        alert('회원가입이 완료되었습니다.');
        navigate('/');
      } catch (error) {
        console.error('회원가입 실패 : ', error);
        alert('서버 오류로 회원가입에 실패했습니다.');
      }
    }
  };

  return (
    <div className='register'>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>NewHope 계정 만들기</h1>
          <div className="form-id">
            <TextField
              id="demo-helper-text-misaligned"
              label="아이디"
              type='text'
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
            />
            <Button type="button" color='success' variant="contained" size="medium" onClick={handleIdCheck}>
              중복 체크
            </Button>
          </div>
          <p></p>
          <div className="form-group">
            <TextField
              id="demo-helper-text-misaligned"
              label="비밀번호"
              type='password'
              name="userPassword"
              value={formData.userPassword}
              onChange={handleInputChange}
            />
            <p></p>
            <span style={{ color: 'red' }}>{passwordError}</span>
          </div>
          <p></p>
          <div className="form-group">
            <TextField
              id="demo-helper-text-misaligned"
              label="이름"
              type='text'
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
            />
          </div>
          <p></p>
          <div className="form-email">
            <TextField
              id="demo-helper-text-misaligned"
              label="이메일"
              type='text'
              name="userEmail"
              value={formData.userEmail}
              onChange={handleInputChange}
            />
            <span style={{ color: 'red' }}>{emailError}</span>
            <Button type="button" variant="contained" size="medium" onClick={handleSendVerification} disabled={isVerificationSent}>
              인증 코드
            </Button>

          </div>
          <div className="form-verificationCode">
            <TextField
              id="demo-helper-text-misaligned"
              label="인증 코드"
              type='text'
              name="verificationCode"
              value={formData.verificationCode}
              onChange={handleVerificationCodeInput}
            />
            <Button type="button" variant="contained" color='success' size="medium" onClick={handleVerifyCode} disabled={!isVerificationSent}>
              인증 확인
            </Button>
          </div>
          <p></p>
          <div>
            <div className='form-postcode'>
              <TextField
                id="demo-helper-text-misaligned"
                label="우편번호"
                type='text'
                name="postcode"
                value={formData.userPostcode}
                readOnly
              />
              <Button type="button" variant="contained" size="medium" onClick={handleAddressSearch}>
                주소 검색
              </Button>
            </div>
            {isPostcodeOpen && (
              <div className="modal">
                <div className="modal-content">
                  <DaumPostcode onComplete={handleComplete} />
                  <button onClick={() => setIsPostcodeOpen(false)}>닫기</button>
                </div>
              </div>
            )}
            <div className='form-address'>
              <TextField
                id="demo-helper-text-misaligned"
                label="주소"
                type='text'
                name="userAddress"
                value={formData.userAddress}
                readOnly
              />
              <TextField
                id="demo-helper-text-misaligned"
                label="상세주소"
                type='text'
                name="userDetailAddress"
                value={formData.userDetailAddress}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <p></p>
          <div className="form-group">
            <TextField
              id="demo-helper-text-misaligned"
              label="핸드폰번호"
              type='text'
              name="userPhoneNum"
              value={formData.userPhoneNum}
              onChange={handleInputChange}
            />
          </div>
          <p></p>
          <Button type="submit" variant="contained" size="medium" disabled={!isSignUpButtonEnabled}>
            회원가입
          </Button>

        </form>
      </div>
    </div>
  );
}

export default Register;