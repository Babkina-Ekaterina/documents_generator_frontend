import React, { useState, useRef } from "react";

function ProgramFiles({ onFilesSelect }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    onFilesSelect(files);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <label className="light">Выберите основную папку с исходным кодом программы (src)</label>
      <input 
        type="file" 
        multiple
        style={{display:'none'}}
        ref={fileInputRef}
        onChange={handleFileChange}
        webkitdirectory=""
        directory=""
      />
      <button type="button" className="files" onClick={handleButtonClick}>Выбрать папку</button>
      {selectedFiles.length > 0 && (
        <div style={{ textAlign: 'center' }}>
          <label>Выбранные файлы:</label>
          
            {selectedFiles.map((file, index) => (
              <div className="file" key={index}>{file.name}</div>
            ))}
          
        </div>
      )}
    </div>
  );
}

export default ProgramFiles;