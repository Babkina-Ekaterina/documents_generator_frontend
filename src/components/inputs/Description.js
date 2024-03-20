import React from 'react';

function Description({ index, description, onChange }) {
    return (
        <div key={index} className="item" data-title="Пример: Разработан алгоритм реализации 
        метода линейной регрессии на основе метода Хольта; осуществлена его программная реализация.">
            <label className="light">Кратко опишите творческий вклад автора при с
                оздании регистрируемой программы для ЭВМ или базы данных</label>
            <textarea
                required
                type="text"
                name="description"
                value={description}
                onChange={onChange}
                placeholder="Краткое описание вклада автора"
                maxLength={150}
            />
        </div>

    );
}

export default Description;