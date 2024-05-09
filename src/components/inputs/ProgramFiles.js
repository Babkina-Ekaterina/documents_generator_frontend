import React, { useState, useRef } from "react";

function ProgramFiles({ onFilesSelect }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    onFilesSelect([...selectedFiles, ...files]);
    setSelectedFiles(prevSelectedFiles => [...prevSelectedFiles, ...files]);
  };

  const handleClearButtonClick = () => {
    setSelectedFiles([]);
    onFilesSelect([]);
  };

  const handleFileDelete = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    onFilesSelect(newFiles);
  };

  const handleButtonClick = () => {
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  };

  return (
    <div>
      <label className="light">Выберите основные папки с исходным кодом программы (src). Выбирайте по одной папке за раз</label>
      <input
        type="file"
        multiple
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
        webkitdirectory=""
        directory=""
      />
      <button type="button" className="files" onClick={handleButtonClick}>Добавить папку</button>
      <button type="button" className="files" onClick={handleClearButtonClick}>Удалить все файлы</button>
      {selectedFiles.length > 0 && (
        <div style={{ textAlign: 'center' }}>
          <label>Выбранные файлы:</label>

          {selectedFiles.map((file, index) => (
            <div className="file" key={index}>
              {file.name}
              <button type="button" className="file_delete" onClick={() => handleFileDelete(index)}>X</button>
              </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default ProgramFiles;