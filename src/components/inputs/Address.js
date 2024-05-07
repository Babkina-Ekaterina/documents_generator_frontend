import React from 'react';

function Address({ index, address, onChange }) {
  return (
    <div key={index}>
      <label className="light">Введите адрес места жительства автора:
        почтовый индекс, страна, (аббревиатура страны), населенный пункт, улица, дом, квартира</label>
      <div className="item" data-title="Пример: 395042, Российская Федерация (RU), г. Воронеж, ул. Ленина, д.100, кв.9">
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
    </div>
  );
}

export default Address;