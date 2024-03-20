import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';

function DateOfBirth({ index, dateOfBirth, onChange }) {
    const [selectedDate, setSelectedDate] = useState(dateOfBirth);

    const formatDate = (date) => {
        if (date) {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear().toString();
            return `${day}.${month}.${year}`;
        } else {
            return '';
        }
    };

    const handleDateChange = (e) => {
        const selectedDate = e.value;
        const formattedDate = formatDate(selectedDate);
        setSelectedDate(selectedDate);
        onChange({ target: { name: 'dateOfBirth', value: formattedDate } });
    };


    return (
        <div key={index} className="item" data-title="Пример: 11.05.1999">
            <label className="light">Введите дату рождения автора</label>
            <Calendar
                required
                name="dateOfBirth"
                value={selectedDate}
                onChange={handleDateChange}
                placeholder="Дата рождения"
                dateFormat="dd.mm.yy"
                showOtherMonths={false}
            />
        </div>
    );
}

export default DateOfBirth;