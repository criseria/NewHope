import React, { useState } from 'react';
import useLogin from '../hooks/useLogin';
import { useAuth } from '../contexts/AuthContext';
import '../pages/Login.css';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Footer from '../components/Footer';

function LoginPage() {
  const Login = useLogin();
  const auth = useAuth();


  const [userId, setUserid] = useState("");
  const [Password, setPassword] = useState("");

  const onIdHandler = (event) => {
    setUserid(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    console.log('userId', userId);
    console.log('Password', Password);

    let body = {
      userId: userId,
      userPassword: Password,
    }

    // 그리고 useLogin의 loginUser를 호출할 때 useAuth를 전달
    await Login.loginUser(auth, body);
  }

  return (
    <div>

      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        width: '100%', height: '100vh'
      }}>
        <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
          <div className='login-container'>
            <h1>로그인하세요</h1>
            <label className='text'>다양한 봉사활동티켓을 구매 할 수 있어요!</label>
            <div className='input-id'>
              <TextField
                helperText="Please enter your Id"
                id="demo-helper-text-misaligned"
                label="아이디"
                type='text'
                value={userId}
                onChange={onIdHandler}
              />
            </div>
            <p></p>
            <div className='input-pw'>
              <TextField
                helperText="Please enter your Password"
                id="demo-helper-text-misaligned"
                label="비밀번호"
                type='password'
                value={Password}
                onChange={onPasswordHandler}
              />
            </div>
            <br />
            <div className='login_btn'>
              <Button type="submit" variant="contained" size="medium">
                Login
              </Button>
            </div>

            <label className='label-text'>NewHope가 처음이신가요? <Link to='/register'>회원가입</Link></label>
            <ButtonGroup variant="text" aria-label="text button group">
              <Link to='/FindId'><Button>아이디찾기</Button></Link>
              <Link to='/FindPw'><Button>비밀번호찾기</Button></Link>
            </ButtonGroup>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default LoginPage;