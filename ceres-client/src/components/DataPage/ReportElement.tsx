import React from 'react';
const ReportElement = (props: any) => {
    return (
      <React.Fragment>
        <li className="report-in-list">
          <p className="m-auto">
            {makeDateShort(props.data.createdAt)}
          </p>
          <button className="report-view-button font-bold text-white px-3" onClick={() => props.onClick()}>
            View
          </button>
        </li>
      </React.Fragment>
    );
}
export default ReportElement;

function makeDateShort(date: string): string {
  return date.length > 10 ? date.substring(0, 10) : date;
}
