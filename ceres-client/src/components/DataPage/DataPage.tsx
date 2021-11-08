import React from 'react';
import '../../App.css';
import './dataPage.css';
import ReportElement from '../ReportElement';
import ReportData from '../ReportData';

class DataPage extends React.Component<any[], any> {
  constructor(props: any[]) {
    super(props);
    this.state = {
      isLoaded: false,
      reports: [
        {
          id: 1,
          currDate: '2021-10-04T20:53:15.000Z',
          bedsAvailable: 19,
          bedDays: 434,
          patientDays: 377,
          hospitalised: 17,
          discharged: 2,
          selfDischarges: 1,
          deathsBefore48: 1,
          deathsAfter48: 0,
          daysHospitalised: 334,
          referrals: 0,
          transfers: 0,
          stays: 13,
          admissions: 4,
          outpatients: 16
        },
        {
          id: 2,
          currDate: '2021-10-05T07:44:04.000Z',
          bedsAvailable: 22,
          bedDays: 435,
          patientDays: 378,
          hospitalised: 17,
          discharged: 2,
          selfDischarges: 1,
          deathsBefore48: 1,
          deathsAfter48: 0,
          daysHospitalised: 335,
          referrals: 0,
          transfers: 0,
          stays: 13,
          admissions: 4,
          outpatients: 16
        }
      ],
      displayingData: null,
      indexOfSelectedReport: null
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="flex">
          <div className=" data-list border-black font-bold text-center p-4 m-6 row-span-3 bg-gray-300 relative rounded">
            <h4 className="text-center">Submitted Reports</h4>
            <ul className="list-of-reports">
              {this.state.reports.map((report: any, index: number) => (
                <ReportElement data={report} onClick={() => this.handleClick(index)} />
              ))}
            </ul>
            <button className=" button bg-green-400 text-white hover:bg-green-200 w-80">Add Report</button>
          </div>
          <ReportData data={this.state.displayingData} />
        </div>
      </React.Fragment>
    );
  }
  handleClick(index: number): void {
    this.setState({ displayingData: this.state.reports[index], indexOfSelectedReport: index });
  }
}

export default DataPage;
