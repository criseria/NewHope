import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useEmailVerification from '../hooks/useEmailVerification';
import { fetcher } from '../utils/fetcher';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/FindId.css';

function FindId() {
    const {
        isVerificationSent,
        isCodeVerified,
        sendVerificationEmail,
        verifyCode,
    } = useEmailVerification();

    const [formData, setFormData] = useState({
        userEmail: '',
        authCode: '',
    });

    const navigate = useNavigate();



    const handleVerificationCodeInput = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, authCode: value });
    };

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

    const showUserId = async () => {
        if (!isCodeVerified) {
            alert('인증 코드를 다시 확인해주세요.');
            return;
        }

        try {
            const data = { userEmail: formData.userEmail };
            const response = await fetcher('post', '/auth/findId', data);

            if (response.ok) {
                alert(`아이디 찾기 성공! 해당 이메일에 등록된 아이디: ${response.userId}`);
                navigate('/login')
            } else {
                alert('아이디를 찾는 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('아이디 찾기 오류:', error);
            alert('서버 오류로 아이디 찾기에 실패했습니다.');
        }
    };

    return (
        <div>
            <div className="find_id">
                <form>
                    <h1>아이디 찾기</h1>
                    <div className="form-email">
                        <TextField
                            id="demo-helper-text-misaligned"
                            label="이메일"
                            type='text'
                            name="userEmail"
                            value={formData.userEmail}
                            onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                        />
                        <Button type="button" variant="contained" size="medium" onClick={handleSendVerification} disabled={isVerificationSent}>
                            인증 코드
                        </Button>
                    </div>
                    <div className="form-verificationCode">
                        <TextField
                            id="demo-helper-text-misaligned"
                            label="인증 코드"
                            type='text'
                            name="authCode"
                            value={formData.authCode}
                            onChange={handleVerificationCodeInput}
                        />
                        <Button type="button" variant="contained" color='success' size="medium" onClick={handleVerifyCode} disabled={!isVerificationSent}>
                            인증 확인
                        </Button>
                    </div>
                    <div className='form-showId'>
                        <Button type="button" variant="contained" size="medium" onClick={showUserId} disabled={!isCodeVerified}>
                            아이디 찾기
                        </Button>
                        <p></p>
                        <Link to='/'>Home</Link>
                        <Link to='/FindPw'>비밀번호 찾기</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FindId;