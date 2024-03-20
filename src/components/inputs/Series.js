import React from 'react';

function Series({ index, series, onChange }) {
    const handleChange = (event) => {
        const inputSeries = event.target.value;
        if (/^\d{0,4}$/.test(inputSeries)) {
            onChange(event);
        }
    };

    return (
        <div key={index} className="item" data-title="Пример: 2020">
            <label className="light">Введите серию паспорта автора</label>
            <input
                required
                type="text"
                name="series"
                value={series}
                onChange={handleChange}
                placeholder="Серия паспорта"
                minLength={4}
                maxLength={4}
            />
        </div>
    );
}

export default Series;