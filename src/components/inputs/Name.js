import React from 'react';

function Name({ index, name, onChange }) {
  return (
    <div key={index} className="item" data-title="Пример: Иванов Иван Иванович">
      <label className="light">Введите фамилию, имя, отчество автора без сокращений</label>
      <input
        required
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        placeholder="ФИО"
        maxLength={50}
      />
    </div>
  );
}

export default Name;