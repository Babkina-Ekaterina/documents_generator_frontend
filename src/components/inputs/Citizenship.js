import React from 'react';

function Citizenship({ index, citizenship, onChange }) {
    return (
        <div key={index} className="item" data-title="Пример: РФ">
            <label className="light">Введите страну гражданства автора</label>
            <input
                required
                type="text"
                name="citizenship"
                value={citizenship}
                onChange={onChange}
                placeholder="Гражданство"
                maxLength={15}
            />
        </div>
    );
}

export default Citizenship;