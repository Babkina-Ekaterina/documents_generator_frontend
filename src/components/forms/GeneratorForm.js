import axios from 'axios';
import { useState } from "react";
import ProgramName from '../inputs/ProgramName';
import Annotation from '../inputs/Annotation';
import Implement from '../inputs/Implement';
import Language from '../inputs/Language';
import ProgramSize from '../inputs/ProgramSize';
import Faculty from '../inputs/Faculty';
import FullAuthors from '../inputs/FullAutors';
import Reason from '../inputs/Reason';
import ProgramType from '../inputs/ProgramType';
import AuthorForm from './AuthorForm';
import ProgramFiles from '../inputs/ProgramFiles';

function GeneratorForm() {
  const [programName, setProgramName] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [implement, setImplement] = useState("");
  const [language, setLanguage] = useState("");
  const [programSize, setProgramSize] = useState("");
  const [selectedOption, setSelectedOption] = useState("computerProgram");
  const [faculty, setFaculty] = useState("");
  const [fullAuthors, setFullAuthors] = useState("");
  const [reason, setReason] = useState("");
  const [programFiles, setProgramFiles] = useState([new File([], "empty_file.txt", { type: "text/plain" })]);

  const [authors, setAuthors] = useState([{
    name: "", address: "",
    series: "", number: "", dateOfIssue: "", citizenship: "",
    dateOfBirth: "", issuedBy: "", description: "", selectedNameOption: "name"
  }]);

  const save = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('userDataDto', JSON.stringify({
        programName, annotation, implement, language, programSize,
        names: authors.map(author => author.name),
        addresses: authors.map(author => author.address),
        series: authors.map(author => author.series),
        numbers: authors.map(author => author.number),
        datesOfIssue: authors.map(author => author.dateOfIssue),
        issuedBys: authors.map(author => author.issuedBy),
        datesOfBirth: authors.map(author => author.dateOfBirth),
        citizenships: authors.map(author => author.citizenship),
        descriptions: authors.map(author => author.description),
        computerProgramCheckbox: selectedOption === "computerProgram",
        databaseCheckbox1: selectedOption === "database1",
        databaseCheckbox2: selectedOption === "database2",
        nameCheckboxes: authors.map(author => author.selectedNameOption === "name"),
        anonymousCheckboxes: authors.map(author => author.selectedNameOption === "anonymous"),
        pseudoNameCheckboxes: authors.map(author => author.selectedNameOption === "pseudoName"),
        faculty, fullAuthors, reason
      }));

      programFiles.forEach(programFile => {
        formData.append("programFiles", programFile);
      });

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      console.log(programFiles);
      const response = await axios.post("http://localhost:8080/api/documents/generate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          auth: {
            username: process.env.REACT_APP_USERNAME,
            password: process.env.REACT_APP_PASSWORD
          },
          responseType: 'blob'
        });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute("download", "Документы.zip");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("В ходе генерации возникла ошибка.");
    }
  };


  const addAuthor = () => {
    setAuthors([...authors, {
      name: "", address: "",
      series: "", number: "", dateOfIssue: "", citizenship: "",
      dateOfBirth: "", issuedBy: "", description: "", selectedNameOption: "name"
    }]);
  };
  const deleteAuthor = (index) => {
    if (authors.length > 1) {
      const newAuthors = [...authors];
      newAuthors.splice(index, 1);
      setAuthors(newAuthors);
    }
  };
  const handleAuthorChange = (index, fieldName, value) => {
    const newAuthors = [...authors];
    newAuthors[index][fieldName] = value;
    setAuthors(newAuthors);
  };

  const handleProgramNameChange = (event) => {
    setProgramName(event.target.value);
  };
  const handleAnnotationChange = (event) => {
    setAnnotation(event.target.value);
  };
  const handleImplementChange = (event) => {
    setImplement(event.target.value);
  };
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  const handleProgramSizeChange = (event) => {
    setProgramSize(event.target.value);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleFacultyChange = (event) => {
    setFaculty(event.target.value);
  };
  const handleFullAuthorsChange = (event) => {
    setFullAuthors(event.target.value);
  };
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };
  const handleFilesSelect = (files) => {
    setProgramFiles(files);
  };


  return (
    <div>
      <form onSubmit={save}>

        <h1> Генерация документов для отдела защиты интеллектуальной собственности ВГУ </h1>

        <h3>Данный генератор документов призван устранить ручное заполнение документов, снизить вероятность ошибок,
          ускорить процесс согласования документов и улучшить общую эффективность отдела защиты интеллектуальной собственности</h3>
        <h3>С помощью данного генератора можно получить следующие документы: листинг, реферат, согласие на обработку
          персональных данных, согласие на использование сведений об авторе, указанных в заявлении, обоснование рекомендации от факультета</h3>
        <h3>Для получения всех необходимых документов внимательно заполните каждое поле формы.
          Во избежание трудностей следуйте инструкциям и обращайте внимание на примеры заполнения полей</h3>

        <fieldset>
          <legend><span className="number">1</span> Информация о проекте</legend>
          <ProgramName programName={programName} onChange={handleProgramNameChange} />
          <Annotation annotation={annotation} onChange={handleAnnotationChange} />
          <Implement implement={implement} onChange={handleImplementChange} />
          <Language language={language} onChange={handleLanguageChange} />
          <ProgramSize programSize={programSize} onChange={handleProgramSizeChange} />
          <ProgramFiles onFilesSelect={handleFilesSelect} />
          <ProgramType selectedOption={selectedOption} onChange={handleOptionChange} />
        </fieldset>

        <fieldset>
          <legend><span className="number">2</span> Информация об авторах</legend>
          <button type="button" className="author" onClick={addAuthor}>Добавить автора</button>
          <button type="button" className="author" onClick={deleteAuthor}>Удалить автора</button>
          {authors.map((author, index) => (
            <AuthorForm
              key={index}
              index={index}
              author={author}
              onChange={handleAuthorChange}
            />
          ))}
        </fieldset>

        <fieldset>
          <legend><span className="number">3</span> Дополнительная информация</legend>
          <Faculty faculty={faculty} onChange={handleFacultyChange} />
          <FullAuthors fullAuthors={fullAuthors} onChange={handleFullAuthorsChange} />
          <Reason reason={reason} onChange={handleReasonChange} />
        </fieldset>

        <button type="submit">Сгенерировать документы</button>
      </form>
    </div>
  );
}

export default GeneratorForm;