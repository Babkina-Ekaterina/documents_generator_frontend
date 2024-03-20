import React from 'react';

function Number({ index, number, onChange }) {
    const handleChange = (event) => {
        const inputNumber = event.target.value;
        if (/^\d{0,6}$/.test(inputNumber)) {
            onChange(event);
        }
    };

    return (
        <div key={index} className="item" data-title="Пример: 010203">
            <label className="light">Введите номер паспорта автора</label>
            <input
                required
                type="text"
                name="number"
                value={number}
                onChange={handleChange}
                placeholder="Номер паспорта"
                minLength={6}
                maxLength={6}
            />
        </div>
    );
}

export default Number;
