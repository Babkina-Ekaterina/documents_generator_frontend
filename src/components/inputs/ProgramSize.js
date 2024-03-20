import React from 'react';

function ProgramSize({ programSize, onChange }) {
    return (
        <div className="item" data-title="Пример: 400 Кб">
            <label className="light">Введите объем программы с указанием единицы измерения объема информации</label>
            <input
                required
                type="text"
                value={programSize}
                onChange={onChange}
                placeholder="Объем программы"
                maxLength={20}
            />
        </div>
    );
}

export default ProgramSize;