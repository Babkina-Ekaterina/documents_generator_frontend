import React from 'react';

function ProgramName({ programName, onChange }) {
  return (
    <div>
      <label className="light">Введите наименование программы для ЭВМ (или базы данных)</label>
      <div className="item" data-title="Пример: Система генерации документов государственной регистрации">
        <textarea
          required
          type="text"
          value={programName}
          onChange={onChange}
          placeholder="Название проекта"
          maxLength={160}
        />
      </div>
    </div>

  );
}

export default ProgramName;