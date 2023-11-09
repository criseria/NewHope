import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from '../redux/actions/authActions';
import { useNavigate } from 'react-router';

function Login() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userId, setUserid] = useState("");
  const [Password, setPassword] = useState("");

  const onIdHandler = (event) => {
    setUserid(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log('userId', userId);
    console.log('Password', Password);

    let body = {
      userId: userId,
      userPassword: Password,
    }
    navigate('/');
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      로그인
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <label>아이디</label>
        <input type='text' value={userId} onChange={onIdHandler} />
        <label>비밀번호</label>
        <input type='password' value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">
          Login
                </button>
      </form>
    </div>
  )
}

export default Login;