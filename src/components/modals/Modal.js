import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children }) => {
    return ReactDOM.createPortal(
        <div className="modal_background">{children}</div>,
        document.getElementById('modal-root')
    );
};

export default Modal;
