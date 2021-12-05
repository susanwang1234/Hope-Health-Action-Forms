import React from 'react';
import { MONTHS } from '../../utils/timezone';

const ReportElement = (props: any) => {
  return (
    <React.Fragment>
      <li className="report-in-list">
        <p className="m-auto">{makeDateShort(props.data.createdAt)}</p>
        <button className="report-view-button font-bold text-white px-3" onClick={() => props.onClick()}>
          View
        </button>
      </li>
    </React.Fragment>
  );
};
export default ReportElement;

export const makeDateShort = (date: string): string => {
  return MONTHS[parseInt(date.substring(5, 7)) - 1].concat(' ').concat(date.substring(0, 4));
};
