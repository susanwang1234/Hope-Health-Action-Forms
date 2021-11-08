import { useState } from 'react';
import '../../App.css';
import '../DataPage/DataPage';
import ReportData from '../DataPage/ReportData';

const SubmitPage = () => {
  const [report, setReport] = useState([
    {
      id: 2,
      curr_date: '2024-11-05T07:44:04.000Z',
      beds_available: 22,
      bed_days: 435,
      patient_days: 378,
      hospitalised: 17,
      discharged: 2,
      self_discharges: 1,
      deaths_before_48: 1,
      deaths_after_48: 0,
      days_hospitalised: 335,
      referrals: 0,
      transfers: 0,
      stays: 13,
      admissions: 4,
      outpatients: 16
    }
  ]);
  const changeEntry = (index: number, event: any) => {
    let eventValue: string = event.target.value;
    let pattern = /\d/g;
    let proccesedValue = eventValue.match(pattern);
    if (proccesedValue === null) {
      proccesedValue = [''];
    }
    if (proccesedValue.length < 7) {
      let keys = Object.keys(report);
      setReport({ ...report, [keys[index]]: proccesedValue?.join('') });
    }
  };
  const handleSubmission = (url: string, event: any) => {
    console.log('submit');
  };
  return (
    <div>
      <ReportData
        changeEntry={changeEntry}
        data={report[0]}
        editStatus={true}
        setEditStatus={() => {
          return true;
        }}
        submitFunc={handleSubmission}
      />
    </div>
  );
};
export default SubmitPage;
