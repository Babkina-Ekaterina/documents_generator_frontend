import React from 'react';

function FullAuthors({ fullAuthors, onChange }) {
    return (
        <div>
            <label className="light">Пересислите всех авторов проекта, указывая фамилии, имена и отчества в родительном падеже</label>
            <div className="item" data-title="Пример: Иванова Ивана Ивановича, Петрова Петра Петровича">
                <textarea
                    required
                    type="text"
                    value={fullAuthors}
                    onChange={onChange}
                    placeholder="ФИО в родительном падеже"
                    maxLength={900}
                />
            </div>
        </div>
    );
}

export default FullAuthors;