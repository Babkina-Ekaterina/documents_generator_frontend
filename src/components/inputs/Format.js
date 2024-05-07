import React from 'react';

function Format({ format, onChange }) {
    const formats = ["DOCX (Microsoft Word)",
        "ODT (OpenOffice Writer)"];

    return (
        <div>
            <label className="light">Выберите расширение документов</label>
            <select required value={format} onChange={onChange}>
                <option value="" disabled>Выберите расширение</option>
                {formats.map((formatOption, index) => (
                    <option key={index} value={formatOption}>
                        {formatOption}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Format;