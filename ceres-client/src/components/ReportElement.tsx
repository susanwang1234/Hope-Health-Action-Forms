import React from 'react';
class ReportElement extends React.Component <any, any>{
    render(){
        return(
            <div>
                <p>Date: {this.props.data.date}     Submitted by: {this.props.data.employee}</p>
            </div>
        );
    }
}
export default ReportElement;