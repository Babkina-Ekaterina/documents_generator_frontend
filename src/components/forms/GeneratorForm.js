import axios from 'axios';
import { useState } from "react";
import ProgramName from '../inputs/ProgramName';
import Annotation from '../inputs/Annotation';
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

  const [isLoading, setIsLoading] = useState(false);

  const save = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    document.body.style.cursor = 'wait';
    try {
      const formData = new FormData();
      formData.append('userDataDto', JSON.stringify({
        programName, annotation, language, programSize,
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

      let totalSize = 0;
      programFiles.forEach(programFile => {
        totalSize += programFile.size;
      });

      const MAX_FILE_SIZE = 10485760;

      if (totalSize > MAX_FILE_SIZE) {
        alert("Общий объем файлов превышает максимально допустимый размер.\nРазделите файлы программы на 2 или более частей." +
          " Выбирая папку, относящуюся к каждой части, повторите генерацию несколько раз. Затем Вы можете совместить несколько листингов в один." +
          "\nВы также можете не выбирать полновесные папки.");
        setIsLoading(false);
        return;
      }

      programFiles.forEach(programFile => {
        formData.append("programFiles", programFile);
      });

      /*       const response = await axios.post("https://documents-generator-backend.onrender.com/api/documents/generate",
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
              }); */

      const response = await axios.post("http://localhost:8080/api/documents/generate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          auth: {
            username: "user",
            password: "123"
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
    } finally {
      document.body.style.cursor = 'default';
      setIsLoading(false);
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

        <h1>Генерация документов для отдела защиты интеллектуальной собственности ВГУ</h1>

        <h3>Данный генератор документов призван устранить ручное заполнение документов, снизить вероятность ошибок,
          ускорить процесс согласования документов и улучшить общую эффективность отдела защиты интеллектуальной собственности.</h3>
        <h3>С помощью данного генератора можно получить следующие документы:
          <div style={{ textAlign: 'center' }}>

            <div className="file">&#8226; Листинг;</div>
            <div className="file">&#8226; Реферат;</div>
            <div className="file">&#8226; Согласие на обработку персональных данных;</div>
            <div className="file">&#8226; Согласие на указание сведений об авторе в заявлении 
            на государственную регистрацию программы для ЭВМ или базы данных;</div>
            <div className="file">&#8226; Обоснование рекомендации от факультета;</div>
            <div className="file">&#8226; Памятка авторам с перечнем необходимых документов.</div>

          </div></h3>

        <h3>Для получения всех необходимых документов внимательно заполните каждое поле формы.
          Во избежание трудностей следуйте инструкциям и обращайте внимание на примеры заполнения полей.</h3>

        <fieldset>
          <legend><span className="number">1</span> Информация о проекте</legend>
          <ProgramName programName={programName} onChange={handleProgramNameChange} />
          <Annotation annotation={annotation} onChange={handleAnnotationChange} />
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

        <button disabled={isLoading} type="submit">Сгенерировать документы</button>
      </form>
    </div>
  );
}

export default GeneratorForm;