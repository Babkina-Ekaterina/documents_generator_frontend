import React from 'react';

function FullAuthors({ fullAuthors, onChange }) {
    return (
        <div className="item" data-title="Пример: Ивановым Иваном Ивановичем, 
        бакалавром кафедры информационных технологий управления ФГБОУ ВО «ВГУ», 
        и Петровым Петром Петровичем, старшим преподавателем факультета компьютерных наук ФГБОУ ВО «ВГУ»">
            <label className="light">Введите полное описание авторов, включая их ученую степень, должность, звание (при наличии).
                Дополните предложение: "Результат интеллектуальной деятельности разработан ..." (кем?)</label>
            <textarea
                required
                type="text"
                value={fullAuthors}
                onChange={onChange}
                placeholder="Результат интеллектуальной деятельности разработан ..."
                maxLength={290}
            />
        </div>
    );
}

export default FullAuthors;