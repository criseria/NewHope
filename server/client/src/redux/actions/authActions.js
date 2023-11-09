import axios from 'axios';

// 액션 유형 정의
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// 로그인 액션 생성자
export const login = (body) => {

    return (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });

        axios
            .post("http://localhost:8080/login", body)
            .then((response) => {
                console.log('로그인 성공:', response);
                dispatch({ type: LOGIN_SUCCESS, payload: response.data });

            })
            .catch((error) => {
                console.error('로그인 실패:', error);
                dispatch({ type: LOGIN_FAILURE, payload: error.response.data });
            });
    };
};