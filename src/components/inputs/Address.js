import React from 'react';

function Address({ index, address, onChange }) {
  return (
    <div key={index} className="item" data-title="Пример: Россия, (Ru), 395042, г. Воронеж, ул. Ленина, д. 100, кв. 9">
      <label className="light">Введите адрес места жительства автора:
        страна, (аббревиатура страны), почтовый индекс, населенный пункт, улица, дом, квартира</label>
      <textarea
        required
        type="text"
        name="address"
        value={address}
        onChange={onChange}
        placeholder="Адрес"
        maxLength={120}
      />
    </div>
  );
}

export default Address;