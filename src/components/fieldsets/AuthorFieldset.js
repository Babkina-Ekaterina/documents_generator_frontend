import React from 'react';
import Name from '../inputs/Name';
import Address from '../inputs/Address';
import Series from '../inputs/Series';
import Number from '../inputs/Number';
import IssuedBy from '../inputs/IssuedBy';
import DateOfBirth from '../inputs/DateOfBirth';
import Citizenship from '../inputs/Citizenship';
import DateOfIssue from '../inputs/DateOfIssue';
import Description from '../inputs/Description';
import NameType from '../inputs/NameType';
import DepartmentCode from '../inputs/DepartmentCode';

const AuthorFieldset = ({ index, author, onChange }) => {
  const handleInputChange = (event) => {    
    const { name, value } = event.target;
    if (name === index) {
      onChange(index, "selectedNameOption", value);
    }
    onChange(index, name, value);
  };

  return (
    <div>
      <h3>Автор №{index + 1}</h3>
      <div key={index}>
        <Name index={index} name={author.name} onChange={handleInputChange} />
        <DateOfBirth index={index} dateOfBirth={author.dateOfBirth} onChange={handleInputChange} />
        <Address index={index} address={author.address} onChange={handleInputChange} />
        <Citizenship index={index} citizenship={author.citizenship} onChange={handleInputChange} />
        <Series index={index} series={author.series} onChange={handleInputChange} />
        <Number index={index} number={author.number} onChange={handleInputChange} />
        <DateOfIssue index={index} dateOfIssue={author.dateOfIssue} onChange={handleInputChange} />
        <IssuedBy index={index} issuedBy={author.issuedBy} onChange={handleInputChange} />
        <DepartmentCode index={index} departmentCode={author.departmentCode} onChange={handleInputChange} />
        <Description index={index} description={author.description} onChange={handleInputChange} />
        <NameType index={index} selectedNameOption={author.selectedNameOption} onChange={handleInputChange} />
      </div>
    </div>
  );
}

export default AuthorFieldset;