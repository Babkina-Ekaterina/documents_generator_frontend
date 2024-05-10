import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';

function DateOfIssue({ index, dateOfIssue, onChange }) {
    const dobParts = dateOfIssue.split('.');
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
        onChange({ target: { name: 'dateOfIssue', value: formattedDate } });
    };

    return (
        <div key={index}>
            <label className="light">Введите дату выдачи паспорта автора</label>
            <div className="item" data-title="Пример: 22.11.2019">
                <Calendar
                    required
                    name="dateOfIssue"
                    value={selectedDate}
                    onChange={handleDateChange}
                    placeholder="Дата выдачи паспорта"
                    dateFormat="dd.mm.yy"
                    showOtherMonths={false}
                />
            </div>
        </div>
    );
}

export default DateOfIssue;