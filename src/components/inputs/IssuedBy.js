import React from 'react';

function IssuedBy({ index, issuedBy, onChange }) {
    return (
        <div key={index} className="item" data-title="Пример: ГУ МВД России по Воронежской области">
            <label className="light">Укажите, кем выдан паспорт автора (наименование органа, выдавшего паспорт)</label>
            <textarea
                required
                type="text"
                name="issuedBy"
                value={issuedBy}
                onChange={onChange}
                placeholder="Кем выдан паспорт"
                maxLength={90}
            />
        </div>
    );
}

export default IssuedBy;