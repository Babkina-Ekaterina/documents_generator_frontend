import React from 'react';

function Description({ index, description, onChange }) {
    return (
        <div key={index}>
            <label className="light">Кратко опишите творческий вклад автора при создании регистрируемой программы для ЭВМ или базы данных</label>
            <div className="item" data-title="Пример: Разработка алгоритма генерации документов, сопутствующих 
        государственной регистрации объектов интеллектуальной собственности и осуществление его программной реализации.">
                <textarea
                    required
                    type="text"
                    name="description"
                    value={description}
                    onChange={onChange}
                    placeholder="Краткое описание вклада автора"
                    maxLength={180}
                />
            </div>
        </div>

    );
}

export default Description;