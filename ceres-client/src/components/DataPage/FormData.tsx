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
  const state = {
    configButton: 1
  };
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

  const putFormResponsesByFormId = async (formId: number, editedResponses: any, isSubmitted: boolean) => {
    const url = `/form-responses/${formId}`;
    try {
      await httpService.put(url, editedResponses);
      toast.success('Data Form has been '.concat(isSubmitted ? 'submitted!' : 'saved!'), { position: 'top-center', autoClose: 5000 });
    } catch (error: any) {
      console.log('Error: Unable to put to ' + url);
    }
  };

  const putFormSubmittedStatus = async (formId: number, isSubmitted: boolean) => {
    const url = `/form/${formId}`;
    try {
      await httpService.put(url, { isSubmitted: isSubmitted });
    } catch (error: any) {
      console.log('Error: Unable to put to ' + url);
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

  const submitFormEntries = () => {
    if (validateEntries(formEntries)) {
      const formResponses = createArrayEntriesToPut(formEntries);
      const formId: number = props.data.id;
      const isSubmitted: boolean = true;
      putFormResponsesByFormId(formId, formResponses, isSubmitted);
      putFormSubmittedStatus(formId, isSubmitted);
      updateResponses(formResponses);
      setEditStatus(false);
    } else {
      markEmptyfields(formEntries);
      toast('Please fill in all fields!');
    }
  };

  const saveFormEntries = () => {
    const formResponses = createArrayEntriesToPut(formEntries);
    const formId: number = props.data.id;
    const isSubmitted: boolean = false;
    putFormResponsesByFormId(formId, formResponses, isSubmitted);
    putFormSubmittedStatus(formId, isSubmitted);
    updateResponses(formResponses);
    setEditStatus(false);
  };

  const updateResponses = (formResponses: any[]) => {
    for (let i = 0; i < formEntries.length; i++) {
      formEntries[i].response = formResponses[i].response;
      fetchedFormEntries[i].response = formResponses[i].response;
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

  const createArrayEntriesToPut = (formResponses: any[]): any[] => {
    let proccesedEntries = [];
    for (let i = 0; i < formResponses.length; i++) {
      proccesedEntries[i] = {
        id: parseInt(formResponses[i].id),
        departmentQuestionId: parseInt(formResponses[i].departmentQuestionId),
        response: formResponses[i].response === '' ? '' : parseInt(formResponses[i].response)
      };
    }
    return proccesedEntries;
  };

  const handleSubmission = (event: any) => {
    event.preventDefault();
    switch (state.configButton) {
      case 1:
        submitFormEntries();
        break;
      case 2:
        saveFormEntries();
        break;
      default:
        toast.error('Error code '.concat(ERROR_CODE.toString()));
    }
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

  const submitButton = (
    <button form="data-form" onClick={() => (state.configButton = 1)} className="submit-button">
      Submit data
    </button>
  );

  const saveButton = (
    <button form="data-form" onClick={() => (state.configButton = 2)} className="save-button">
      Save data
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
          <div>{editStatus === true ? cancelButton : editButton}</div>
          <div>
            {!editStatus && exportAsCsvButton}
            {!editStatus && exportAsPdfButton}
          </div>
          <div>
            {editStatus === true && submitButton}
            {editStatus === true && saveButton}
          </div>
        </div>
      </div>
    );
  }
};

export default FormData;
