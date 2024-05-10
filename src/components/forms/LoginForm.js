import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Login from '../inputs/Login';
import Password from '../inputs/Password';

const RegisterForm = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const save = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        document.body.style.cursor = "wait";
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/author/login",
                {
                    login, password
                },
                {
                    auth: {
                        username: process.env.REACT_APP_USERNAME,
                        password: process.env.REACT_APP_PASSWORD
                    }
                });


            localStorage.setItem("isAuthorized", process.env.REACT_APP_IS_AUTH);
            localStorage.setItem("authorId", response.data);
            navigate("/");


        } catch (err) {
            if (err.code === AxiosError.ERR_NETWORK) {
                alert("Ошибка сервера");
            } else if (err.response.status === 400) {
                alert("Неверный логин или пароль.");
            } else {
                alert("В ходе авторизации возникла ошибка.");
            }
        } finally {
            document.body.style.cursor = "default";
            setIsLoading(false);
        }
    };

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    return (
        <div>
            <form onSubmit={save}>
                <h1>Вход в профиль</h1>

                <h3>Войдите в свой профиль, чтобы сохранить данные для повторного автоматического заполнения формы.</h3>

                <Login login={login} onChange={handleLoginChange} />
                <Password password={password} onChange={handlePasswordChange} />

                <button disabled={isLoading} type="submit">Войти</button>

                <Link to="/register" style={{ textDecoration: 'none' }}>
                    <div style={{ textAlign: "center" }}>
                        <div className="login_or_register">Зарегистрироваться</div>
                    </div>
                </Link>
            </form>
        </div>
    );
};

export default RegisterForm;
