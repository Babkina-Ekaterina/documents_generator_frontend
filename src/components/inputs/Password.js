import React, { useState } from 'react';

function Password({ password, onChange }) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={onChange}
                placeholder="Пароль"
                maxLength={20}
            />
            <button type="button" className="password" onClick={toggleShowPassword}>
                {showPassword ? 'Скрыть' : 'Показать'}
            </button>
        </div>
    );
}

export default Password;