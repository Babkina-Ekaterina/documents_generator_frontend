import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';

function DateOfBirth({ index, dateOfBirth, onChange }) {
    const dobParts = dateOfBirth.split('.');
    const year = parseInt(dobParts[2], 10);
    const month = parseInt(dobParts[1], 10) - 1;
    const day = parseInt(dobParts[0], 10);
    const dobDate = new Date(year, month, day);
    
    const [selectedDate, setSelectedDate] = useState(dobDate);

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
        <div key={index}>
            <label className="light">Введите дату рождения автора</label>
            <div className="item" data-title="Пример: 11.05.1999">
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
        </div>
    );
}

export default DateOfBirth;