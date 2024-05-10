import React from 'react';
import '../styles/form.css';
import RegisterForm from '../components/forms/RegisterForm';
import LoginAndRegisterHeader from '../components/headers/LoginAndRegisterHeader';
import { useState, useEffect } from 'react';
import Modal from '../components/modals/Modal';
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const isAuthorized = localStorage.getItem("isAuthorized");
        if (isAuthorized) {
            setShowConfirmation(true);
        }
    }, []);

    const handleHideConfirmation = () => {
        setShowConfirmation(false);
        navigate("/");
    };

    const handleLogout = () => {
        localStorage.clear();
        setShowConfirmation(false);
    };

    return (
        <div>
            <LoginAndRegisterHeader />
            <RegisterForm />

            {showConfirmation && (
                <Modal>
                    <div className="modal_container">
                        <h3>Вы уже вошли в профиль под именем «{localStorage.getItem("username")}». Хотите выйти из профиля?</h3>
                        <div className="modal_buttons">
                            <button className="yes" onClick={handleLogout}>Да</button>
                            <button className="cancel" onClick={handleHideConfirmation}>Отмена</button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>

    );
}

export default RegisterPage;