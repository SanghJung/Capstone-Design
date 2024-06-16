import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ROUTES} from '../Routes'
import styled from 'styled-components'
import axios from "axios";


export const Login = () => {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        let body = {
            loginId : loginId,
            password : password
        };

        try {
            const response = await axios.post('http://localhost:8080/login', body, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials : true
            });
            const token = response.headers['authorization'].split(' ')[1];
            localStorage.setItem('token', token);
            alert('로그인 성공');
            navigate(ROUTES.CREATE_COURSE_NAME);
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('로그인 실패');
        }

    }
    const onUserIdHandler = (e) => {
        setLoginId(e.currentTarget.value);
    }
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    }

    return (
        <StyledContainer>
            <StyledLoginForm onSubmit={handleLogin}>
                <StyledLogo>Picknic.</StyledLogo>
                <div>로그인</div>
                <StyledInput type = "text" placeholder="아이디를 입력하세요" onChange={onUserIdHandler}></StyledInput>
                <StyledInput type = "password" placeholder="비밀번호를 입력하세요" onChange={onPasswordHandler}></StyledInput>
                <StyledLoginBtn type="submit"> 로그인 </StyledLoginBtn>
                <StyleSignUpBtn> 회원가입 </StyleSignUpBtn>
            </StyledLoginForm>
        </StyledContainer>
    )
}

const StyledInput = styled.input`
    border: 1.5px solid rgb(220, 220, 220);
    width: 100%;
    height: 3.5rem;
    padding: 1rem;
    border-radius: 5px;
    margin-bottom: 0.5rem;
`;

const StyledLoginBtn = styled.button`
    background-color: rgb(255, 192, 203);
    border: none;
    color: #ffffff;
    border-radius: 5px;
    height: 3.5rem;
    margin-bottom: 0.5rem;
`;

const StyleSignUpBtn = styled.button`
    background-color: #ffffff;
    border: 1.5px solid rgb(255, 192, 203);
    color: rgb(255, 192, 203);
    border-radius: 5px;
    height: 3.5rem;
    margin-bottom: 0.5rem;
`;

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
`;

const StyledLogo = styled.div`
    font-family: 'Pacifico', cursive;
    color: rgb(255, 140, 160);
    text-align: center;
    margin-bottom: 50px;
    font-size: 3rem;
    font-weight: 3000;
`;

const StyledLoginForm = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: #ffffff;
    padding: 70px;
    width: 30%;
    height: 60%;
    border-radius: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;