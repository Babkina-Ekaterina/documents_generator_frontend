import React from 'react';

function Annotation({ annotation, onChange }) {
  return (
    <div className="item" data-title="Пример: программа предназначена для генерации документов 
    для отдела защиты интеллектуальной собственности ВГУ. Областью применения являются дейставия в сфере документооборота.">
      <label className="light">Введите аннотацию к программе для ЭВМ (или базе данных). Вы можете кратко описать, 
      для чего предназначена программа, где она будет использоваться</label>
      <textarea
        required
        type="text"
        value={annotation}
        onChange={onChange}
        placeholder="Аннотация"
        maxLength={350}
      />
    </div>
  );
}

export default Annotation;