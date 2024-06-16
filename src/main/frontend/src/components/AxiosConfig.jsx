// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080', // 서버 주소
});

// 요청 인터셉터
instance.interceptors.request.use(
    function (config) {
        // 스토리지에서 토큰을 가져온다.
        const token = localStorage.getItem('token');

        // 토큰이 있으면 요청 헤더에 추가한다.
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    function (error) {
        // 요청 오류 처리
        return Promise.reject(error);
    }
);

// 응답 인터셉터
instance.interceptors.response.use(
    function (response) {
        // 응답 데이터가 있는 작업 수행
        return response;
    },
    function (error) {

        if (error.response && error.response.status === 403 || error.response.status === 401) {
            console.error('인증 오류:', error.response.data);
            alert('로그인을 해주세요');
            localStorage.removeItem('token');
            window.location.href = '/login'; // 로그인 페이지로 리다이렉트
            // 여기에 토큰 갱신 또는 로그아웃 로직 추가 가능
        }
        return Promise.reject(error);
    }
);

export default instance;
