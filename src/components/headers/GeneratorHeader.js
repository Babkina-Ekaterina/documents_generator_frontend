import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import Modal from "../modals/Modal";

const GeneratorHeader = ({ isAuthorized, name, handleLogout }) => {
    const navigate = useNavigate();
    const [showConfirmationDelete, setShowConfirmationDelete] = useState(false);
    const [showConfirmationLogout, setShowConfirmationLogout] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteProfile = async () => {
        setIsLoading(true);
        document.body.style.cursor = "wait";
        try {
            await new Promise(resolve => setTimeout(resolve, 10000));
            const authorId = localStorage.getItem("authorId");
            await axios.get(process.env.REACT_APP_SERVER_URL + "/author/delete?authorId=" + authorId,
                {
                    auth: {
                        username: process.env.REACT_APP_USERNAME,
                        password: process.env.REACT_APP_PASSWORD
                    }
                }
            );

            navigate("/");
            handleLogout();
        } catch (err) {
            alert("Ошибка при удалении профиля.");
        } finally {
            document.body.style.cursor = "default";
            setIsLoading(false);
        }
    };

    const handleShowConfirmationDelete = () => {
        setShowConfirmationDelete(true);
    };
    const handleHideConfirmationDelete = () => {
        setShowConfirmationDelete(false);
    };
    const handleShowConfirmationLogout = () => {
        setShowConfirmationLogout(true);
    };
    const handleHideConfirmationLogout = () => {
        setShowConfirmationLogout(false);
    };

    return (
        <div className="header">
            {isAuthorized ? (
                <>
                    <button className="header_button" disabled>{name}</button>
                    <button className="header_button" onClick={handleShowConfirmationLogout}>Выйти</button>
                    <button className="header_button" onClick={handleShowConfirmationDelete}>Удалить профиль</button>
                    {showConfirmationDelete && (
                        <Modal>
                            <div className="modal_container">
                                <h3>Вы уверены, что хотите удалить профиль? Это действие нельзя будет отменить.</h3>
                                <div className="modal_buttons">
                                    <button className="yes" disabled={isLoading} onClick={handleDeleteProfile}>Да</button>
                                    <button className="cancel" disabled={isLoading} onClick={handleHideConfirmationDelete}>Отмена</button>
                                </div>
                            </div>
                        </Modal>
                    )}

                    {showConfirmationLogout && (
                        <Modal>
                            <div className="modal_container">
                                <h3>Вы уверены, что хотите выйти из профиля?</h3>
                                <div className="modal_buttons">
                                    <button className="yes" disabled={isLoading} onClick={handleLogout}>Да</button>
                                    <button className="cancel" disabled={isLoading} onClick={handleHideConfirmationLogout}>Отмена</button>
                                </div>
                            </div>
                        </Modal>
                    )}
                </>
            ) : (
                <>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <button className="header_button">Войти</button>
                    </Link>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                        <button className="header_button">Зарегистрироваться</button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default GeneratorHeader;