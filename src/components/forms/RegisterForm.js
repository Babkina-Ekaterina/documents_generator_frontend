import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import Name from '../inputs/Name';
import DateOfBirth from '../inputs/DateOfBirth';
import Address from '../inputs/Address';
import Citizenship from '../inputs/Citizenship';
import Series from '../inputs/Series';
import Number from '../inputs/Number';
import DateOfIssue from '../inputs/DateOfIssue';
import IssuedBy from '../inputs/IssuedBy';
import { Link, useNavigate } from "react-router-dom";
import Login from '../inputs/Login';
import Password from '../inputs/Password';
import validator from 'validator';

const RegisterForm = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [series, setSeries] = useState("");
    const [number, setNumber] = useState("");
    const [dateOfIssue, setDateOfIssue] = useState("");
    const [citizenship, setCitizenship] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [issuedBy, setIssuedBy] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const save = async (event) => {
        event.preventDefault();
        if (!validator.isStrongPassword(password, { minSymbols: 0 })) {
            alert("Пароль должен содержать цифры, буквы латинского алфавита верхнего и нижнего регистра и состоять не менее, чем из 8 символов.")
        } else if (password !== passwordCheck) {
            alert("Введенные пароли не совпадают")
        } else {
            setIsLoading(true);
            document.body.style.cursor = "wait";
            try {
                await axios.post(process.env.REACT_APP_SERVER_URL + "/author/register",
                    {
                        login, password, name, dateOfBirth, address, citizenship, series, number, dateOfIssue, issuedBy
                    },
                    {
                        auth: {
                            username: process.env.REACT_APP_USERNAME,
                            password: process.env.REACT_APP_PASSWORD
                        }
                    });

                navigate("/login");

            } catch (err) {
                if (err.code === AxiosError.ERR_NETWORK) {
                    alert("Ошибка сервера");
                } else if (err.response.status === 400) {
                    alert("Данный логин занят. Придумайте другой.");
                } else {
                    alert("В ходе регистрации возникла ошибка.");
                }
            } finally {
                document.body.style.cursor = "default";
                setIsLoading(false);
            }
        }

    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleDateOfBirthChange = (event) => {
        setDateOfBirth(event.target.value);
    };
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handleCitizenshipChange = (event) => {
        setCitizenship(event.target.value);
    };
    const handleSeriesChange = (event) => {
        setSeries(event.target.value);
    };
    const handleNumberChange = (event) => {
        setNumber(event.target.value);
    };
    const handleDateOfIssueChange = (event) => {
        setDateOfIssue(event.target.value);
    };
    const handleIssuedByChange = (event) => {
        setIssuedBy(event.target.value);
    };
    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handlePasswordCheckChange = (event) => {
        setPasswordCheck(event.target.value);
    };


    return (
        <div>
            <form onSubmit={save}>
                <h1>Регистрация</h1>

                <h3>Создайте профиль, чтобы сохранить данные для повторного автоматического заполнения формы.</h3>

                <label className="light">Введите логин для будущего профиля. Логин должен быть уникальным</label>
                <div className="item" data-title="Пример: ivan1999">
                    <Login login={login} onChange={handleLoginChange} />
                </div>

                <label className="light">
                    Введите пароль. Пароль не должен быть простым. Он должен содержать цифры,
                    буквы латинского алфавита верхнего и нижнего регистра и состоять не менее, чем из 8 символов
                </label>
                <div className="item" data-title="Пример: 123GHje1ty">
                    <Password password={password} onChange={handlePasswordChange} />
                </div>

                <label className="light">
                    Повторите пароль
                </label>
                <Password password={passwordCheck} onChange={handlePasswordCheckChange} />

                <Name name={name} onChange={handleNameChange} />
                <DateOfBirth dateOfBirth={dateOfBirth} onChange={handleDateOfBirthChange} />
                <Address address={address} onChange={handleAddressChange} />
                <Citizenship citizenship={citizenship} onChange={handleCitizenshipChange} />
                <Series series={series} onChange={handleSeriesChange} />
                <Number number={number} onChange={handleNumberChange} />
                <DateOfIssue dateOfIssue={dateOfIssue} onChange={handleDateOfIssueChange} />
                <IssuedBy issuedBy={issuedBy} onChange={handleIssuedByChange} />

                <button disabled={isLoading} type="submit">Зарегистрироваться</button>

                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <div style={{ textAlign: "center" }}>
                        <div className="login_or_register">Войти</div>
                    </div>
                </Link>
            </form>
        </div>
    );
};

export default RegisterForm;
