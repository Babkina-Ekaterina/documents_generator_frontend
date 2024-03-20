import React from 'react';

function ProgramName({ programName, onChange }) {
  return (
    <div className="item" data-title="Пример: Система генерации документов государственной регистрации">
      <label className="light">Введите название программы для ЭВМ (или базы данных)</label>
      <textarea
        required
        type="text"
        value={programName}
        onChange={onChange}
        placeholder="Название проекта"
        maxLength={160}
      />
    </div>

  );
}

export default ProgramName;