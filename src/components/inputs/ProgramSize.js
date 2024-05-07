import React from 'react';

function ProgramSize({ programSize, onChange }) {
    return (
        <div>
            <label className="light">Введите объем программы с указанием единицы измерения объема информации</label>
            <div className="item" data-title="Пример: 400 Кб">
            <input
                required
                type="text"
                value={programSize}
                onChange={onChange}
                placeholder="Объем программы"
                maxLength={20}
            />
            </div>
        </div>
    );
}

export default ProgramSize;