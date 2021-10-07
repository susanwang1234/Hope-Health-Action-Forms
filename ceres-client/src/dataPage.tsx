import React from 'react';
import './App.css';
import ReportElement from './components/ReportElement';

let dummyDataObjects = [{date: "sdasdas", employee: "fdfdsdf"},
                    {date: "gggggg", employee: "bitch"}];

function dataPage(){
    return(
    <ul className="reportsList">
        {dummyDataObjects.map(report =><ReportElement data={report} />)}
    </ul>
    )
}
export default dataPage;
