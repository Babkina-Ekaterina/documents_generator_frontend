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
import AuthorFieldset from '../fieldsets/AuthorFieldset';
import ProgramFiles from '../inputs/ProgramFiles';
import Format from '../inputs/Format';
import Modal from '../modals/Modal';

const GeneratorForm = ({ name, address, series, number, dateOfIssue, citizenship, dateOfBirth, issuedBy }) => {
  const [programName, setProgramName] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [language, setLanguage] = useState("");
  const [programSize, setProgramSize] = useState("");
  const [selectedOption, setSelectedOption] = useState("computerProgram");
  const [faculty, setFaculty] = useState("");
  const [fullAuthors, setFullAuthors] = useState("");
  const [reason, setReason] = useState("");
  const [format, setFormat] = useState("");
  const [programFiles, setProgramFiles] = useState([]);

  const [authors, setAuthors] = useState([{
    name: name, address: address,
    series: series, number: number, dateOfIssue: dateOfIssue, citizenship: citizenship,
    dateOfBirth: dateOfBirth, issuedBy: issuedBy, description: "", selectedNameOption: "name"
  }]);

  const [isLoading, setIsLoading] = useState(false);

  const [showConfirmationEdit, setShowConfirmationEdit] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const handleEdit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    document.body.style.cursor = "wait";
    try {
      const firstAuthor = authors[0];
      const authorId = localStorage.getItem("authorId");

      await axios.post(process.env.REACT_APP_SERVER_URL + "/author/edit?authorId=" + authorId,
        {
          name: firstAuthor.name,
          dateOfBirth: firstAuthor.dateOfBirth,
          address: firstAuthor.address,
          citizenship: firstAuthor.citizenship,
          series: firstAuthor.series,
          number: firstAuthor.number,
          dateOfIssue: firstAuthor.dateOfIssue,
          issuedBy: firstAuthor.issuedBy
        },
        {
          auth: {
            username: process.env.REACT_APP_USERNAME,
            password: process.env.REACT_APP_PASSWORD
          }
        }
      );

      setShowConfirmationEdit(false);
      window.location.reload();
    } catch (err) {
      alert("В ходе изменения данных возникла ошибка.");
    } finally {
      document.body.style.cursor = "default";
      setIsLoading(false);
    }
  };

  const save = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    document.body.style.cursor = "wait";
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
        faculty, fullAuthors, reason, format
      }));

      let totalSize = 0;
      programFiles.forEach(programFile => {
        totalSize += programFile.size;
      });

      const MAX_FILE_SIZE = 5e+7;

      if (totalSize > MAX_FILE_SIZE) {
        alert("Общий объем файлов превышает максимально допустимый размер.\nРазделите файлы программы на 2 или более частей." +
          " Выбирая папку, относящуюся к каждой части, повторите генерацию несколько раз. Затем Вы можете совместить несколько листингов в один." +
          "\nВы также можете не выбирать полновесные папки.");
        setIsLoading(false);
        return;
      }

      if (programFiles.length === 0) {
        programFiles.push(new File([], "empty_file.txt", { type: "text/plain" }));
      }

      programFiles.forEach(programFile => {
        formData.append("programFiles", programFile);
      });

      const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/documents/generate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          auth: {
            username: process.env.REACT_APP_USERNAME,
            password: process.env.REACT_APP_PASSWORD
          },
          responseType: "blob"
        });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Документы.zip");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      if (isEdited) {
        handleShowConfirmationEdit();
      }
    } catch (err) {
      alert("В ходе генерации возникла ошибка.");
    } finally {
      document.body.style.cursor = "default";
      setIsLoading(false);
    }
  };

  const handleShowConfirmationEdit = () => {
    setShowConfirmationEdit(true);
  };
  const handleHideConfirmationEdit = () => {
    setShowConfirmationEdit(false);
  };


  const addAuthor = () => {
    if (authors.length < 30) {
      setAuthors([...authors, {
        name: "", address: "",
        series: "", number: "", dateOfIssue: "", citizenship: "",
        dateOfBirth: "", issuedBy: "", description: "", selectedNameOption: "name"
      }]);
    } else {
      alert("Достигнуто максимальное количество авторов.");
    }
  }

  const deleteAuthor = (index) => {
    if (authors.length > 1) {
      const newAuthors = [...authors];
      newAuthors.pop();
      setAuthors(newAuthors);
    } else {
      alert("Должен быть как минимум 1 автор.");
    }
  };
  const handleAuthorChange = (index, fieldName, value) => {
    const newAuthors = [...authors];
    newAuthors[index][fieldName] = value;
    setAuthors(newAuthors);
    const isAuthorized = localStorage.getItem("isAuthorized");
    if (isAuthorized === process.env.REACT_APP_IS_AUTH && index === 0 && 
      fieldName !== "description" && fieldName !== "selectedNameOption") {
      setIsEdited(true);
    }
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
  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };
  const handleFilesSelect = (files) => {
    setProgramFiles(files);
  };


  return (
    <div>
      <form onSubmit={save}>

        <h1>Генерация документов для отдела защиты интеллектуальной собственности ВГУ</h1>

        {localStorage.getItem("isAuthorized") !== process.env.REACT_APP_IS_AUTH && (
          <h2 style={{ color: "rgb(100, 137, 172)" }}>
            Создайте профиль или войдите в существующий, чтобы сохранить данные для повторного автоматического заполнения формы.
          </h2>
        )}

        <h3>Данный генератор документов призван устранить ручное заполнение документов, снизить вероятность ошибок,
          ускорить процесс согласования документов и улучшить общую эффективность отдела защиты интеллектуальной собственности.</h3>
        <h3>С помощью данного генератора можно получить следующие документы:
          <div style={{ textAlign: "center" }}>

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

        <h3>Если Вы используете данный генератор с мобильного устройства, выберите версию для
          ПК в настройках сайта. Это обеспечит корректное скачивание документов.</h3>

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
            <AuthorFieldset
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
          <Format format={format} onChange={handleFormatChange} />
        </fieldset>

        <button disabled={isLoading} type="submit">Сгенерировать документы</button>
      </form>

      {showConfirmationEdit && (
        <Modal>
          <div className="modal_container">
            <h3>Вы хотите изменить данные в профиле?</h3>
            <div className="modal_buttons">
              <button className="yes" disabled={isLoading} onClick={handleEdit}>Да</button>
              <button className="cancel" disabled={isLoading} onClick={handleHideConfirmationEdit}>Отмена</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default GeneratorForm;