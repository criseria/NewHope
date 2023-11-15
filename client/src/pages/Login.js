import React, { useState } from 'react';
import useLogin from '../hooks/useLogin';
import { useAuth } from '../contexts/AuthContext';

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
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
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

export default LoginPage;