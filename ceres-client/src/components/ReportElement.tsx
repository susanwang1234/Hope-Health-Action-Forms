import React from 'react';
class ReportElement extends React.Component <any, any>{
    render(){
        return(
            <div>
                <li onClick={() => this.props.onClick()}>
                    Date: {this.props.data.date}     Submitted by: {this.props.data.employee}
                </li>
            </div>
        );
    }
}
export default ReportElement;