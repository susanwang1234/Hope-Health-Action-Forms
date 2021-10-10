import React from 'react';
class ReportElement extends React.Component<any, any> {
  render() {
    return (
      <div>
        <li>
          {' '}
          <a href="#" className="report-in-list" onClick={() => this.props.onClick()}>
            Date: {this.props.data.date} Submitted by: {this.props.data.employee}
          </a>
        </li>
      </div>
    );
  }
}
export default ReportElement;
