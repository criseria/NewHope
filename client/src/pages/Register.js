import React, { useState } from 'react';
import { fetcher } from '../utils/fetcher'
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import './Register.css';

function Register() {

  const [formData, setFormData] = useState({
    userName: '',
    userId: '',
    userPassword: '',
    passwordConfirm: '',
    userEmail: '',
    userPostcode: '',
    userAddress: '',
    userDetailAddress:'',
    userPhoneNum: ''
  });

  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    console.log(formData.userPassword, formData.passwordConfirm);
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === 'userPassword' || name === 'passwordConfirm') {
      validatePassword(formData.userPassword, formData.passwordConfirm);
    } else if (name === 'userEmail') {
      validateEmail(value);
    }

    if (name === 'passwordConfirm' && !value) {
      setPasswordMatchError('비밀번호를 확인해주세요.');
    } else {
      setPasswordMatchError('');
    }
  };

  const validatePassword = (password, confirmPassword) => {
    const passwordRegex = /^[A-Za-z0-9]{3,13}$/;

    if (!password.match(passwordRegex)) {
      setPasswordError('비밀번호는 4~12자리 사이의 영문과 숫자로 이루어져야 합니다.');
    } else {
      setPasswordError('');
    }

    // 비밀번호와 비밀번호 확인 필드가 모두 비어 있지 않고, 값이 다를 때 에러를 표시
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordMatchError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordMatchError('');
    }
  };

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
    } else if (!formData.userAddress) {
      alert('주소를 입력해주세요.');
    } else if (!formData.userPhoneNum) {
      alert('핸드폰 번호를 입력해주세요.');
    } else if (passwordMatchError) {
      alert('비밀번호를 확인해주세요.');
    } else {
      try {
        const res = await fetcher('post', '/auth/register', formData)
        console.log(res)
        alert('회원가입이 완료되었습니다.');
        navigate('/');
      } catch (error) {
        console.error('회원가입 실패 : ', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>이름</label>
          <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} className="form-control" />
        </div>
        <p></p>
        <div className="form-group">
          <label>아이디</label>
          <input type="text" name="userId" value={formData.userId} onChange={handleInputChange} className="form-control" />
        </div>
        <p></p>
        <div className="form-group">
          <label>비밀번호</label>
          <input type="password" name="userPassword" value={formData.userPassword} onChange={handleInputChange} className="form-control" />
          <span style={{ color: 'red' }}>{passwordError}</span>
        </div>
        <p></p>
        <div className="form-group">
          <label>비밀번호 확인</label>
          <input type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleInputChange} className="form-control" />
          <span style={{ color: 'red' }}>{passwordMatchError}</span>
        </div>
        <p></p>
        <div className="form-group">
          <label>이메일</label>
          <input type="text" name="userEmail" value={formData.userEmail} onChange={handleInputChange} className="form-control" />
          <span style={{ color: 'red' }}>{emailError}</span>
        </div>
        <p></p>
        <div className="form-group">
          <label>주소</label>
          <div>
            <button type='button' onClick={handleAddressSearch}>
              주소 검색
            </button>
          </div>
          {isPostcodeOpen && (
            <div className="modal">
              <div className="modal-content">
                <DaumPostcode onComplete={handleComplete} />
                <button onClick={() => setIsPostcodeOpen(false)}>닫기</button>
              </div>
            </div>
          )}
          <input type="text" name="postcode" value={formData.userPostcode} className="form-control" readOnly />
          <input type="text" name="userAddress" value={formData.userAddress} onChange={handleInputChange} className="form-control" />
          <input type="text" name='userDetailAddress' value={formData.userDetailAddress} onChange={handleInputChange} className="form-control" />
        </div>
        <p></p>
        <div className="form-group">
          <label>핸드폰번호</label>
          <input type="text" name="userPhoneNum" value={formData.userPhoneNum} onChange={handleInputChange} className="form-control" />
        </div>
        <p></p>
        <button className="btn btn-warning" style={{ float: 'right' }} type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Register;