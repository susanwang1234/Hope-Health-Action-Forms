import React from 'react';
import '../../App.css';
import './dataPage.css'
import ReportElement from '../ReportElement';
import ReportData from '../ReportData';
import NavBar from "../../components/Navbar/Navbar";
import { useHistory } from 'react-router-dom';


class DataPage extends React.Component <any[], any>{
    constructor(props: any[]){
        super(props);
        this.state = {reports: [{

            id: 1,
        
            curr_date: "2021-10-04T20:53:15.000Z",
        
            beds_available: 19,
        
            bed_days: 434,
        
            patient_days: 377,
        
            hospitalised: 17,
        
            discharged: 2,
        
            self_discharges: 1,
        
            deaths_before_48: 1,
        
            deaths_after_48: 0,
        
            days_hospitalised: 334,
        
            referrals: 0,
        
            transfers: 0,
        
            stays: 13,
        
            admissions: 4,
        
            outpatients: 16
        
          },
          {

            id: 2,
        
            curr_date: "2019-01-07T20:14:15.000Z",
        
            beds_available: 45,
        
            bed_days: 236,
        
            patient_days: 321,
        
            hospitalised: 3,
        
            discharged: 4,
        
            self_discharges: 0,
        
            deaths_before_48: 1,
        
            deaths_after_48: 1,
        
            days_hospitalised: 211,
        
            referrals: 5,
        
            transfers: 3,
        
            stays: 111,
        
            admissions: 67,
        
            outpatients: 46
        
          },
          {

            id: 3,
        
            curr_date: "2012-04-05T20:14:15.000Z",
        
            beds_available: 9,
        
            bed_days: 472,
        
            patient_days: 63,
        
            hospitalised: 23,
        
            discharged: 65,
        
            self_discharges: 34,
        
            deaths_before_48: 4,
        
            deaths_after_48: 1,
        
            days_hospitalised: 357,
        
            referrals: 7,
        
            transfers: 75,
        
            stays: 333,
        
            admissions: 453,
        
            outpatients: 336
        
          },
          {

            id: 4,
        
            curr_date: "2000-03-12T20:14:15.000Z",
        
            beds_available: 435 ,
        
            bed_days: 23,
        
            patient_days: 3263,
        
            hospitalised: 45,
        
            discharged: 35,
        
            self_discharges: 245,
        
            deaths_before_48: 246,
        
            deaths_after_48: 346,
        
            days_hospitalised: 555,
        
            referrals: 34,
        
            transfers: 234,
        
            stays: 145,
        
            admissions: 436,
        
            outpatients: 245
        
          },
          {

            id: 5,
        
            curr_date: "2014-06-07T20:14:15.000Z",
        
            beds_available: 5,
        
            bed_days: 23,
        
            patient_days: 371,
        
            hospitalised: 16,
        
            discharged: 65,
        
            self_discharges: 46,
        
            deaths_before_48: 57,
        
            deaths_after_48: 47,
        
            days_hospitalised: 345,
        
            referrals: 38,
        
            transfers: 437,
        
            stays: 357,
        
            admissions: 75,
        
            outpatients: 78
        
          },
          {

            id: 6,
        
            curr_date: "2019-01-07T20:14:15.000Z",
        
            beds_available: 45,
        
            bed_days: 236,
        
            patient_days: 321,
        
            hospitalised: 3,
        
            discharged: 4,
        
            self_discharges: 0,
        
            deaths_before_48: 1,
        
            deaths_after_48: 1,
        
            days_hospitalised: 211,
        
            referrals: 5,
        
            transfers: 3,
        
            stays: 111,
        
            admissions: 67,
        
            outpatients: 46
        
          },
          {

            id: 7,
        
            curr_date: "2018-01-07T20:14:15.000Z",
        
            beds_available: 445,
        
            bed_days: 25,
        
            patient_days: 361,
        
            hospitalised: 36,
        
            discharged: 46,
        
            self_discharges: 234,
        
            deaths_before_48: 14,
        
            deaths_after_48: 12,
        
            days_hospitalised: 13,
        
            referrals: 515,
        
            transfers: 235,
        
            stays: 715,
        
            admissions: 643,
        
            outpatients: 45
        
          },
          {

            id: 8,
        
            curr_date: "2017-03-07T20:14:15.000Z",
        
            beds_available: 47,
        
            bed_days: 2337,
        
            patient_days: 21,
        
            hospitalised: 378,
        
            discharged: 44,
        
            self_discharges: 0,
        
            deaths_before_48: 1,
        
            deaths_after_48: 1,
        
            days_hospitalised: 211,
        
            referrals: 5,
        
            transfers: 3,
        
            stays: 111,
        
            admissions: 67,
        
            outpatients: 46
        
          },
          {

            id: 9,
        
            curr_date: "2017-01-07T20:14:15.000Z",
        
            beds_available: 8,
        
            bed_days: 2,
        
            patient_days: 21,
        
            hospitalised: 95,
        
            discharged: 54,
        
            self_discharges: 8,
        
            deaths_before_48: 35,
        
            deaths_after_48: 97,
        
            days_hospitalised: 1,
        
            referrals: 53,
        
            transfers: 68,
        
            stays: 11,
        
            admissions: 87,
        
            outpatients: 36
        
          },
          {

            id: 10,
        
            curr_date: "2019-01-07T20:14:15.000Z",
        
            beds_available: 45,
        
            bed_days: 236,
        
            patient_days: 321,
        
            hospitalised: 3,
        
            discharged: 4,
        
            self_discharges: 0,
        
            deaths_before_48: 1,
        
            deaths_after_48: 1,
        
            days_hospitalised: 211,
        
            referrals: 5,
        
            transfers: 3,
        
            stays: 111,
        
            admissions: 67,
        
            outpatients: 46
        
          },
          {

            id: 11,
        
            curr_date: "2019-01-07T20:14:15.000Z",
        
            beds_available: 45,
        
            bed_days: 236,
        
            patient_days: 321,
        
            hospitalised: 3,
        
            discharged: 4,
        
            self_discharges: 0,
        
            deaths_before_48: 1,
        
            deaths_after_48: 1,
        
            days_hospitalised: 211,
        
            referrals: 5,
        
            transfers: 3,
        
            stays: 111,
        
            admissions: 67,
        
            outpatients: 46
        
          }],
                      displayingData: null,
                      indexOfSelectedReport: null
                    };
    }
    render(){
        return(
            <React.Fragment>
                <NavBar/>
                <div className="flex">
                    <div className=" data-list border-black font-bold text-center p-4 m-6 row-span-3 bg-gray-300 relative rounded">
                        <h4 className="text-center">Submitted Reports</h4>
                        <ul className="list-of-reports">
                            {this.state.reports.map((report: any,index: number) =><ReportElement data={report} 
                            onClick ={() => this.handleClick(index)}/>)}
                        </ul>
                        <button className=" button bg-green-400 text-white hover:bg-green-200 w-80">
                          Add Report
                        </button>
                    </div>
                    <ReportData data={this.state.displayingData}/> 
                </div>
            </React.Fragment>
        );
    }
    handleClick(index: number) : void{
        this.setState({displayingData: this.state.reports[index],
                        indexOfSelectedReport: index});
    }
  }

  export default DataPage