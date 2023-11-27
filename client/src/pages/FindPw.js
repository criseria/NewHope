import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useEmailVerification from '../hooks/useEmailVerification';
import { fetcher } from '../utils/fetcher';
import { useNavigate } from 'react-router-dom';

function FindPw() {
    const navigate = useNavigate();

    const {
        isVerificationSent,
        isCodeVerified,
        sendVerificationEmail,
        verifyCode,
    } = useEmailVerification();

    const [formData, setFormData] = useState({
        userId: '',
        userEmail: '',
        authCode: '',
        newPassword: '',
    });

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

    const handleResetPassword = async () => {
        if (!formData.newPassword || !isCodeVerified) {
            alert('인증 코드를 확인하고 새로운 비밀번호를 입력해주세요.');
            return;
        }

        try {
            await fetcher('put', '/auth/resetPassword', {
                userId: formData.userId,
                newPassword: formData.newPassword,
            });
            alert('비밀번호가 성공적으로 변경되었습니다.'); 
            navigate('/login');
        } catch (error) {
            console.error('비밀번호 변경 실패:', error);
        }
    };

    return (
        <div className="find-pw">
            <div className="container">
                <form>
                    <h1>비밀번호 찾기</h1>
                    <div className="form-userId">
                        <TextField
                            id="outlined-basic"
                            label="아이디"
                            variant="outlined"
                            type="text"
                            name="userId"
                            value={formData.userId}
                            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                        />
                    </div>
                    <div className="form-email">
                        <TextField
                            id="outlined-basic"
                            label="이메일"
                            variant="outlined"
                            type="text"
                            name="userEmail"
                            value={formData.userEmail}
                            onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                        />
                        <Button
                            type="button"
                            variant="contained"
                            size="medium"
                            onClick={handleSendVerification}
                            disabled={isVerificationSent}
                        >
                            인증 코드
                        </Button>
                    </div>
                    <div className="form-verificationCode">
                        <TextField
                            id="outlined-basic"
                            label="인증 코드"
                            variant="outlined"
                            type="text"
                            name="authCode"
                            value={formData.authCode}
                            onChange={handleVerificationCodeInput}
                        />
                        <Button
                            type="button"
                            variant="contained"
                            color="success"
                            size="medium"
                            onClick={handleVerifyCode}
                            disabled={!isVerificationSent}
                        >
                            인증 확인
                        </Button>
                    </div>
                    <div className="form-newPassword">
                        <TextField
                            id="outlined-basic"
                            label="새로운 비밀번호"
                            variant="outlined"
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        />
                    </div>
                    <Button
                        type="button"
                        variant="contained"
                        size="medium"
                        onClick={handleResetPassword}
                        disabled={!isCodeVerified}
                    >
                        비밀번호 변경
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default FindPw;