import React from 'react';

function Login({ login, onChange }) {
    return (
        <div>
            <input
                required
                type="text"
                value={login}
                onChange={onChange}
                placeholder="Логин"
                maxLength={55}
            />
        </div>
    );
}

export default Login;