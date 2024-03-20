import React from 'react';

function ProgramType({ selectedOption, onChange }) {
    return (
        <div>
            <label className="light">Выберите вид результата интеллектуальной деятельности:</label>
            <div>
                <input
                    type="radio"
                    value="computerProgram"
                    checked={selectedOption === "computerProgram"}
                    onChange={onChange}
                />
                <label>Программа для ЭВМ</label>
            </div>
            <div>
                <input
                    type="radio"
                    value="database1"
                    checked={selectedOption === "database1"}
                    onChange={onChange}
                />
                <label>База данных, государственная регистрация которой осуществляется в соответствии с пунктом 4 статьи 1259 Кодекса</label>
            </div>
            <div>
                <input
                    type="radio"
                    value="database2"
                    checked={selectedOption === "database2"}
                    onChange={onChange}
                />
                <label>База данных, государственная регистрация которой осуществляется в соответствии с пунктом 3 статьи 1334 Кодекса </label>
            </div>
        </div>
    );
}

export default ProgramType;