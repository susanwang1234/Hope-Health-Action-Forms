import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import '../../App.css';
import httpService from '../../services/httpService';
import { UserContext } from '../../UserContext';

const ReportData = (props: any) => {
  const [fetchedFormEntries, setFetchedFormEntries] = useState<any[]>([]);
  const [formEntries, setFormEntries] = useState<any[]>([]);
  const [empltyFields, setEmptyFields] = useState<number[]>([]);
  const [editStatus, setEditStatus] = useState(false);
  const [userDepartment, setUserDepartment] = useState();
  const userContext = useContext(UserContext);

  useEffect(() => {
    const url = `/form-responses/${props.data.id}`;
    const response1: any = httpService
      .get(url)
      .then((response) => {
        console.log(response);
        setFetchedFormEntries(response.data);
        setFormEntries(response.data);
      })
      .catch((error: any) => {
        console.log('Error: Unable to fetch from ' + url);
      });
    const respones2: any = httpService
      .get('/department')
      .then((response) => {
        console.log(response);
        const departments = response;
        const userDepartmentEntry = departments.find((entry: any) => entry.id == userContext.user?.departmentId);
        setUserDepartment(userDepartmentEntry[0].name);
      })
      .catch((error: any) => {
        console.log('Error: Unable to fetch from /department');
      });
  }, []);

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
    const empltyFildsIndexes: number[] = [];
    const values = Object.values(dataObj);
    for (let i = 0; i < values.length; i++) {
      if (values[i] === '') {
        empltyFildsIndexes.push(i);
      }
    }
    setEmptyFields(empltyFildsIndexes);
  };

  const handleSubmission = (event: any) => {
    event.preventDefault();

    if (validateEntries(formEntries)) {
      const PUTEntries = createArrayEntriesToPut(formEntries);
      const formId: Number = props.data.id;
      httpService
        .put(`/form-responses/${formId}`, PUTEntries)
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

  const updateButton = (
    <button form="daForm" className="update-button">
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
    <button className="export-button" onClick={() => exportToCsv(props.data.id)}>
      Export as CSV
    </button>
  );

  const exportAsPdfButton = (
    <button className="export-button" onClick={() => exportToPdf(props.data.id)}>
      Export as PDF
    </button>
  );

  if (props.data === null) {
    return <p className="m-60 font-bold text-xl">Select a report from the list</p>;
  } else {
    return (
      <div className="displaying-form">
        {editStatus === true ? <h2 className="edit-title">Edit Mode</h2> : <></>}
        <div className="data-header">
          <p className="date px-3 text-gray-500 pt-4">Date: {makeDateShort(props.data.createdAt)}</p>
          <p className="report-id px-3 text-gray-500 pt-4">Report ID: {props.data.id}</p>
        </div>
        <p className="mx-3 font-bold text-center pb-6 text-lg pt-2">{userDepartment} Department's report</p>
        <form id={'daForm'} className="displaying-form-elements" onSubmit={handleSubmission}>
          {formEntries.map(
            (entry: any, index: number) =>
              entry.label !== 'departmentId' &&
              entry.label !== 'createdAt' && (
                <div className="pb-3">
                  <label className="mx-3">{entry.label}</label>
                  <br></br>
                  <input key={index} className={'input-box mx-3'} type="text" value={entry.response} readOnly={!editStatus} onChange={(event) => changeEntry(index, event)}></input>
                </div>
              )
          )}
        </form>
        <div className="report-data-buttons">
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
export default ReportData;

function makeDateShort(date: string): string {
  return date.length > 10 ? date.substring(0, 10) : date;
}

function validateEntries(dataEntries: any): boolean {
  for (let i = 0; i < dataEntries.length; i++) {
    if (dataEntries[i].response === '') {
      return false;
    }
  }
  return true;
}

function createArrayEntriesToPut(rawArray: any[]): any[] {
  let proccesedEntries = [];
  for (let i = 0; i < rawArray.length; i++) {
    proccesedEntries[i] = {
      id: parseInt(rawArray[i].id),
      departmentQuestionId: parseInt(rawArray[i].departmentQuestionId),
      response: parseInt(rawArray[i].response)
    };
  }
  return proccesedEntries;
}

async function exportToCsv(formId: number): Promise<void> {
  try {
    const res = await httpService.get(`/form/${formId}/export-as-csv`);
    const csvContent = 'data:text/csv;charset=utf-8,' + res.data;
    const filename = res.headers['content-disposition'].split('=')[1].replaceAll('"', '');
    const encodedUri = encodeURI(csvContent);
    downloadFile(encodedUri, filename);
  } catch (error: any) {
    toast.error('There was an error downloading the CSV.');
  }
}

async function exportToPdf(formId: number): Promise<void> {
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
}

function downloadFile(href: any, filename: string) {
  const link = document.createElement('a');
  link.setAttribute('href', href);
  link.setAttribute('download', filename);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
