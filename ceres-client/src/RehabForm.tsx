import './App.css';

function RehabForm() {
  return (
    <div className="grey-blocks-form">
      <h1 className="title-form">Rehab Monthly Data Collection</h1>
      <label className="margin-left-50px">Beds avaliable: </label>
      <input className="margin-bottom-25px" type="number" id="beds-avaliable" name="beds-avaliable" min="0" />
      <br />

      <label className="margin-left-50px">Bed days: </label>
      <input className="margin-bottom-25px" type="number" id="bed-days" name="bed-days" min="0" />
      <br />

      <label className="margin-left-50px">Patient days: </label>
      <input className="margin-bottom-25px" type="number" id="patient-days" name="patient-days" min="0" />
      <br />

      <label className="margin-left-50px">Hospitalized: </label>
      <input className="margin-bottom-25px" type="number" id="hospitalized" name="hospitalized" min="0" />
      <br />

      <label className="margin-left-50px">Discharged alive: </label>
      <input className="margin-bottom-25px" type="number" id="discharged-alive" name="discharged-alive" min="0" />
      <br />
    </div>
  );
}

export default RehabForm;
