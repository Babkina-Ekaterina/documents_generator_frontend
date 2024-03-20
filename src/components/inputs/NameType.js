import React from 'react';

function NameType({ index, selectedNameOption, onChange }) {
    return (
        <div key={index}>
            <label className="light">При  публикации сведений о государственной регистрации программы для ЭВМ или базы данных автор просит:</label>
            <div>
                <input
                    type="radio"
                    name={index}
                    value="name"
                    checked={selectedNameOption === "name"}
                    onChange={onChange}
                />
                <label>упоминать его под своим именем</label>
            </div>
            <div>
                <input
                    type="radio"
                    name={index}
                    value="anonymous"
                    checked={selectedNameOption === "anonymous"}
                    onChange={onChange}
                />
                <label>не упоминать его (анонимно)</label>
            </div>
            <div>
                <input
                    type="radio"
                    name={index}
                    value="pseudoName"
                    checked={selectedNameOption === "pseudoName"}
                    onChange={onChange}
                />
                <label>упоминать его под псевдонимом</label>
            </div>
        </div>
    );
}

export default NameType;