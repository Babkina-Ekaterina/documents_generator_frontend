import React from 'react';

function Name({ index, name, onChange }) {
  return (
    <div key={index}>
      <label className="light">Введите фамилию, имя, отчество автора без сокращений</label>
      <div className="item" data-title="Пример: Иванов Иван Иванович">
        <input
          required
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="ФИО"
          maxLength={45}
        />
      </div>
    </div>
  );
}

export default Name;