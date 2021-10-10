import React from 'react';
import './App.css';
import ReportElement from './components/ReportElement';
import ReportData from './components/ReportData'

class dataPage extends React.Component <any[], any>{
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
        
          }],
                      displayingData: null,
                      indexOfSelectedReport: null
                    };
    }
    render(){
        return(
            <div>
                <ul className="report-list">
                    {this.state.reports.map((report: any,index: number) =><ReportElement data={report} 
                    onClick ={() => this.handleClick(index)}/>)}
                </ul>
                <ReportData data={this.state.displayingData}/>
            </div>
        );
    }
    handleClick(index: number) : void{
        this.setState({displayingData: this.state.reports[index],
                        indexOfSelectedReport: index});
    }
}
export default dataPage;
