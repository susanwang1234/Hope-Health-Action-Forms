import React from 'react';
class ReportElement extends React.Component <any, any>{
    render(){
        return(
            <React.Fragment>
                <li> <a href="#" className="report-in-list" 
                onClick={() => this.props.onClick()}>
                    Date: {this.props.data.curr_date}    ID number: {this.props.data.id}
                </a>
                </li>
            </React.Fragment>
        );
    }
}
export default ReportElement;