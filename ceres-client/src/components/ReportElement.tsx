import React from 'react';
const ReportElement = (props: any) => {
    return (
      <React.Fragment>
        <li className="report-in-list">
          <p className="m-auto">
            {makeDateShort(props.data.curr_date)}
          </p>
          <button className="report-view-button font-bold text-white px-3" onClick={() => props.onClick()}>
            View
          </button>
        </li>
      </React.Fragment>
    );
}
export default ReportElement;

function makeDateShort(date: string) : string{
  if(date.length > 10){
    const subDate = date.substring(0, 10) 
    return subDate;
  }
  else{
    return date;
  }
}