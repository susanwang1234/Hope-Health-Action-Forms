import React, { useEffect, useState } from 'react';
import '../../App.css';
import './dataPage.css';
import ReportElement from '../ReportElement';
import ReportData from '../ReportData';
import NavBar from '../../components/Navbar/Navbar';



const DataPage = () => {
      const [isLoaded, setIsLoaded] = useState(false);
      const [reports, setReports] = useState([
        {
        "id": 2,
        "curr_date": "2024-11-05T07:44:04.000Z",
        "beds_available": 22,
        "bed_days": 435,
        "patient_days": 378,
        "hospitalised": 17,
        "discharged": 2,
        "self_discharges": 1,
        "deaths_before_48": 1,
        "deaths_after_48": 0,
        "days_hospitalised": 335,
        "referrals": 0,
        "transfers": 0,
        "stays": 13,
        "admissions": 4,
        "outpatients": 16
        }, {
        "id": 2,
        "curr_date": "2021-10-05T07:44:04.000Z",
        "beds_available": 22,
        "bed_days": 435,
        "patient_days": 378,
        "hospitalised": 17,
        "discharged": 2,
        "self_discharges": 1,
        "deaths_before_48": 1,
        "deaths_after_48": 0,
        "days_hospitalised": 335,
        "referrals": 0,
        "transfers": 0,
        "stays": 13,
        "admissions": 4,
        "outpatients": 16
        }, {
        "id": 2,
        "curr_date": "2010-10-05T07:44:04.000Z",
        "beds_available": 24,
        "bed_days": 43,
        "patient_days": 3148,
        "hospitalised": 17,
        "discharged": 2,
        "self_discharges": 1,
        "deaths_before_48": 1,
        "deaths_after_48": 0,
        "days_hospitalised": 335,
        "referrals": 0,
        "transfers": 0,
        "stays": 13,
        "admissions": 4,
        "outpatients": 16
      }
    ]);
    const [displayingData, setDisplayingData] = useState<any>(null);
    const [indexOfSelectedReport, setindexOfSelectedReport] = useState<any>(null);
    const [editStatus,setEditStatus] = useState(false);

    const changeEntry = (index: number, event: any) => {
      let eventValue: string = event.target.value;
      let pattern = /\d/g;
      let proccesedValue = eventValue.match(pattern)
      if (proccesedValue === null) {
        proccesedValue = [""];
      }
      if(proccesedValue.length < 7){
      let keys = Object.keys(displayingData)
      setDisplayingData({...displayingData, [keys[index]]: proccesedValue?.join("")});
      }
    }

    function handleClick(index: any): void {
      setDisplayingData(reports[index])
      setindexOfSelectedReport(index)
      setEditStatus(false);
    }

    const switchEditMode = (value: boolean): void => {
      setDisplayingData(reports[indexOfSelectedReport])
      setEditStatus(value);
    }

    //2
    // useEffect (() => {
    //   const url = 'http://localhost:8080/rehab_report/get/rehab_report';
    //   const response: any = fetch(url)
    //   .then(response => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     setIsLoaded(false);
    //     console.log('Error: Unable to fetch from ' + url);
    //     throw response;
    //     })
    //   .then(data => {
    //     setIsLoaded(true);
    //     setReports(data);
    //   })
    // })

    //1
  //   useEffect (() => {
  //     const url = 'http://localhost:8080/rehab_report/get/rehab_report';
  //     try{
  //     const response: any = fetch(url)
  //     .then(response => {
  //         return response.json();
  //       })
  //     .then(data => {
  //       setIsLoaded(true);
  //       setReports(data);
  //     })
  //   }catch(error){
  //     console.log(error);
  //   }
  // })
    return (
      <React.Fragment>
        <NavBar />
        <div className="flex">
          <div className=" data-list border-black font-bold text-center p-4 m-6 row-span-3 bg-gray-300 relative rounded">
            <h4 className="text-center">Submitted Reports</h4>
            <ul className="list-of-reports">
              {reports.map((report: any, index: number) => (
                <ReportElement data={report} onClick={() => handleClick(index)} />
              ))}
            </ul>
            <button className="button add-report-button text-white w-80">Add Report</button>
          </div>
          <ReportData changeEntry={changeEntry} data={displayingData} editStatus={editStatus} setEditStatus={switchEditMode} />
        </div>
      </React.Fragment>
    );
  }

export default DataPage;
