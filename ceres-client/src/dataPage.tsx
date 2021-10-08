import React from 'react';
import './App.css';
import ReportElement from './components/ReportElement';
import ReportData from './components/ReportData'

let dummyDataObjects = [{date: "sdasdas", employee: "fdfdsdf", randomss: "datar"},
                        {date: "gggggg", employee: "bitch", randomss:"adsdas"}];

function dataPage(){
    return(
        <div>
            <ul className="reportsList">
                {dummyDataObjects.map((report,index) =><ReportElement data={report} 
                onClick ={() => handleClick(index)}/>)}
            </ul>
            <ReportData data={dummyDataObjects[1]}/>
        </div>
    )
}
function handleClick(index: number) {
    console.log("hthis call is from daddy");
}
export default dataPage;
