import React from 'react';

function DepartmentCode({ index, departmentCode, onChange }) {
  const handleChange = (event) => {
    let newValue = event.target.value.replace(/[^\d]/g, '');
    if (newValue.length > 3) {
      newValue = newValue.slice(0, 3) + '-' + newValue.slice(3);
    }
    onChange({
      target: {
        name: event.target.name,
        value: newValue,
      },
    });
  };

  return (
    <div key={index}>
      <label className="light">Введите код подразделения, выдавшего паспорт</label>
      <div className="item" data-title="Пример: 350-010">
        <input
          required
          type="text"
          name="departmentCode"
          value={departmentCode}
          onChange={handleChange}
          placeholder="Код подразделения"
          minLength={7}
          maxLength={7}
        />
      </div>
    </div>
  );
}

export default DepartmentCode;