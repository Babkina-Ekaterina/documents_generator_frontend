import React from 'react';

function Language({ language, onChange }) {
  return (
    <div>
      <label className="light">Введите язык программирования, который использовался при разработке</label>
      <div className="item" data-title="Пример: Java">
        <input
          required
          type="text"
          value={language}
          onChange={onChange}
          placeholder="Язык программирования"
          maxLength={20}
        />
      </div>
    </div>
  );
}

export default Language;