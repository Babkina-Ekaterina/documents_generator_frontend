import React from 'react';

function Citizenship({ index, citizenship, onChange }) {
    return (
        <div key={index}>
            <label className="light">Введите страну гражданства автора</label>
            <div className="item" data-title="Пример: РФ">
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
        </div>
    );
}

export default Citizenship;