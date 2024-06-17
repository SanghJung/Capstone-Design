import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import axios from "axios";
import {ROUTES} from "../Routes";


export const SignUp = () => {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault();

        let body = {
            loginId : loginId,
            password : password,
            nickname : nickname
        };

        try {
            const response= await axios.post('http://localhost:8080/signUp', body, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials : true
            });
            alert('회원가입 성공');
            navigate(ROUTES.LOGIN);

        } catch (error) {
            console.error('회원가입이 실패했습니다.:', error);
            alert("회원가입이 실패했습니다.");
        }
    }

    const onLoginIdHandler = (e) => {
        setLoginId(e.currentTarget.value);
    }
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    }

    const onNicknameHandler = (e) => {
        setNickname(e.currentTarget.value);
    }
    return (
        <StyledContainer>
            <StyledLoginForm onSubmit = {handleSignUp}>
                <StyledLogo>Picknic.</StyledLogo>
                <div>회원가입</div>
                <StyledInput type = "text" placeholder="이름을 입력하세요" onChange={onNicknameHandler}></StyledInput>
                <StyledInput type = "text" placeholder="아이디를 입력하세요" onChange={onLoginIdHandler}></StyledInput>
                <StyledInput type = "password" placeholder="비밀번호를 입력하세요" onChange={onPasswordHandler}></StyledInput>
                <StyleSignUpBtn type = "submit"> 회원가입 </StyleSignUpBtn>
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