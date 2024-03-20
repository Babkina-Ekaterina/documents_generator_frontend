import React from 'react';

function Language({ language, onChange }) {
  return (
    <div className="item" data-title="Пример: Java">
      <label className="light">Введите язык программирования, который использовался при разработке</label>
      <input
        required
        type="text"
        value={language}
        onChange={onChange}
        placeholder="Язык программирования"
        maxLength={20}
      />
    </div>
  );
}

export default Language;