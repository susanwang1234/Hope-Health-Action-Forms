import React from 'react';
import './App.css';
import ReportElement from './components/ReportElement';
import ReportData from './components/ReportData'

class dataPage extends React.Component <any[], any>{
    constructor(props: any[]){
        super(props);
        this.state = {reports: [{date: "sdasdas", employee: "fdfdsdf", randomss: "datar"},
                     {date: "gggggg", employee: "bitch", randomss:"adsdas"}], displayingData: null
                    };
    }
    render(){
        return(
            <div>
                <ul className="reportsList">
                    {this.state.reports.map((report: any,index: number) =><ReportElement data={report} 
                    onClick ={() => this.handleClick(index)}/>)}
                </ul>
                <ReportData data={this.state.displayingData}/>
            </div>
        );
    }
    handleClick(index: number) : void{
        this.setState({displayingData: this.state.reports[index]});
    }
}
export default dataPage;
