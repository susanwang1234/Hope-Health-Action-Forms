
import React from "react";
import './App.css';

function RehabForm() {
    return(
        <div className='grey-blocks-form'>
            <h1 className='header-form'>Rehab Monthly Data Collection</h1>
            Beds avaliable:
            <input type="number" id="beds-avaliable" name="beds-avaliable" min="0" /><br/>

            Bed days:
            <input type="number" id="bed-days" name="bed-days" min="0" /><br/>

            Patient days:
            <input type="number" id="patient-days" name="patient-days" min="0" /><br/>

            Hospitalized:
            <input type="number" id="hospitalized" name="hospitalized" min="0" /><br/>

            Discharged alive:
            <input type="number" id="discharged-alive" name="discharged-alive" min="0" /><br/>
        </div>
    );
}

export default RehabForm;
