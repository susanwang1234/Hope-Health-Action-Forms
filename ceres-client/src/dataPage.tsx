import React from 'react';
import './App.css';
import ReportElement from './components/ReportElement';
import ReportData from './components/ReportData'

class dataPage extends React.Component <any[], any>{
    constructor(props: any[]){
        super(props);
        this.state = {reports: [{date: "1.jan.2020", employee: "Simon Miller", Beds_Available: "345", Bed_Days: "74", Hospitalized: "31", etc:"..."},
                     {date: "1.feb,2020", employee: "cillian murphy", Beds_Available: "135", Bed_Days: "53", Hospitalized: "39", etc:"..."}],
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
