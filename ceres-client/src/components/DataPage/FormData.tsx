import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import '../../App.css';
import { Department } from '../../models/department';
import httpService from '../../services/httpService';
import { useParams } from 'react-router-dom';
import { departmentParam } from '../../types/departmentParamType';
import { makeDateShort } from './FormElement';

const FormData = (props: any) => {
  const { deptID } = useParams<departmentParam>();
  const [fetchedFormEntries, setFetchedFormEntries] = useState<any[]>([]);
  const [formEntries, setFormEntries] = useState<any[]>([]);
  const [emptyFields, setEmptyFields] = useState<number[]>([]);
  const [editStatus, setEditStatus] = useState(false);
  const [userDepartment, setUserDepartment] = useState('');
  const ERROR_CODE = -1;

  const getDepartmentId = (department: Department[], currentDepartment: number) => {
    for (let index in department) {
      if (department[index].id === currentDepartment) return index;
    }
    return ERROR_CODE;
  };

  const getFormResponsesByDepartmentId = async () => {
    const url = `/form-responses/${props.data.id}`;
    try {
      const response = await httpService.get(url);
      const data = response.data;
      setFetchedFormEntries(data);
      setFormEntries(data);
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  };

  const getDepartment = async () => {
    const url = '/department';
    try {
      const response = await httpService.get(url);
      const data = response.data;
      setUserDepartment(data[getDepartmentId(data, parseInt(deptID))].name);
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  };

  useEffect(() => {
    getFormResponsesByDepartmentId();
    getDepartment();
  }, [props]);

  const changeEntry = (index: number, event: any) => {
    let eventValue: string = event.target.value;
    let pattern = /\d/g;
    let proccesedValue = eventValue.match(pattern);
    if (proccesedValue === null) {
      proccesedValue = [''];
    }
    if (proccesedValue.length < 7) {
      let clonedEntries = [...formEntries];
      let changedEntry = { ...formEntries[index], response: proccesedValue?.join('') };
      clonedEntries[index] = changedEntry;
      setFormEntries(clonedEntries);
    }
  };

  const markEmptyfields = (dataObj: any): void => {
    const emptyFieldsIndexes: number[] = [];
    const values = Object.values(dataObj);
    for (let i = 0; i < values.length; i++) {
      if (values[i] === '') {
        emptyFieldsIndexes.push(i);
      }
    }
    setEmptyFields(emptyFieldsIndexes);
  };

  const validateEntries = (dataEntries: any): boolean => {
    for (let i = 0; i < dataEntries.length; i++) {
      if (dataEntries[i].response === '') {
        return false;
      }
    }
    return true;
  };

  const handleSubmission = (event: any) => {
    event.preventDefault();

    if (validateEntries(formEntries)) {
      const putEntries = createArrayEntriesToPut(formEntries);
      const formId: Number = props.data.id;
      httpService
        .put(`/form-responses/${formId}`, putEntries)
        .then((response: any) => response.data)
        .then((data: any) => console.log(data))
        .catch((error) => {
          console.error('Error:', error);
        });
      setEditStatus(false);
    } else {
      markEmptyfields(formEntries);
      alert('All fields are required. please fill them up!');
    }
  };

  const createArrayEntriesToPut = (rawArray: any[]): any[] => {
    let proccesedEntries = [];
    for (let i = 0; i < rawArray.length; i++) {
      proccesedEntries[i] = {
        id: parseInt(rawArray[i].id),
        departmentQuestionId: parseInt(rawArray[i].departmentQuestionId),
        response: parseInt(rawArray[i].response)
      };
    }
    return proccesedEntries;
  };

  const exportToCsv = async (formId: number): Promise<void> => {
    try {
      const res = await httpService.get(`/form/${formId}/export-as-csv`);
      const csvContent = 'data:text/csv;charset=utf-8,' + res.data;
      const filename = res.headers['content-disposition'].split('=')[1].replaceAll('"', '');
      const encodedUri = encodeURI(csvContent);
      downloadFile(encodedUri, filename);
    } catch (error: any) {
      toast.error('There was an error downloading the CSV.');
    }
  };

  const exportToPdf = async (formId: number): Promise<void> => {
    try {
      const res = await httpService.get(`/form/${formId}/export-as-pdf`, { responseType: 'arraybuffer' });
      const filename = res.headers['content-disposition'].split('=')[1];
      const file = [res.data];
      const blob = new Blob(file, { type: 'application/pdf' });
      const href = window.URL.createObjectURL(blob);
      downloadFile(href, filename);
    } catch (error: any) {
      toast.error('There was an error downloading the PDF.');
    }
  };

  const downloadFile = (href: any, filename: string) => {
    const link = document.createElement('a');
    link.setAttribute('href', href);
    link.setAttribute('download', filename);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateButton = (
    <button form="data-form" className="update-button">
      Update data
    </button>
  );

  const cancelButton = (
    <button
      className="cancel-button"
      onClick={() => {
        setFormEntries(fetchedFormEntries);
        setEditStatus(false);
      }}
    >
      Cancel
    </button>
  );

  const editButton = (
    <button className="edit-button" onClick={() => setEditStatus(true)}>
      Edit
    </button>
  );

  const exportAsCsvButton = (
    <button className="edit-button" onClick={() => exportToCsv(props.data.id)}>
      Export as CSV
    </button>
  );

  const exportAsPdfButton = (
    <button className="edit-button" onClick={() => exportToPdf(props.data.id)}>
      Export as PDF
    </button>
  );

  if (props.data === null) {
    return <p className="m-60 font-bold text-xl">Select a form from the list</p>;
  } else {
    return (
      <div className="displaying-form">
        {editStatus === true ? <h2 className="edit-title">Edit Mode</h2> : <></>}
        <div className="data-header">
          <p className="px-3 text-gray-500">Form Dated: {makeDateShort(props.data.createdAt)}</p>
        </div>
        <p className="mx-3 font-bold text-center">{userDepartment} Department's Data Form</p>
        <form id={'data-form'} className="displaying-form-elements" onSubmit={handleSubmission}>
          {formEntries.map(
            (entry: any, index: number) =>
              entry.label !== 'departmentId' &&
              entry.label !== 'createdAt' && (
                <div>
                  <label className="mx-3">{entry.label}</label>
                  <br></br>
                  <input key={index} className={'input-box mx-3'} type="text" value={entry.response} readOnly={!editStatus} onChange={(event) => changeEntry(index, event)}></input>
                </div>
              )
          )}
        </form>
        <div className="form-data-buttons">
          {editStatus === true ? cancelButton : editButton}
          <div className="export-buttons">
            {!editStatus && exportAsCsvButton}
            {!editStatus && exportAsPdfButton}
          </div>
          {editStatus === true && updateButton}
        </div>
      </div>
    );
  }
};
export default FormData;
