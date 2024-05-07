import React from 'react';

function IssuedBy({ index, issuedBy, onChange }) {
    return (
        <div key={index}>
            <label className="light">Укажите, кем выдан паспорт автора (наименование органа, выдавшего паспорт)</label>
            <div className="item" data-title="Пример: ГУ МВД России по Воронежской области">
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
        </div>
    );
}

export default IssuedBy;