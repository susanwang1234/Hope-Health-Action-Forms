import '../../App.css';

const ReportData = (props: any) =>{

  const updateButton = <button form="daForm" className="update-button">Update data</button>
  const cancelButton = <button className="cancel-button" onClick={() => props.setEditStatus(false)}>Cancel</button>
  const editButton = <button className=" edit-button" onClick={() => props.setEditStatus(true)}>Edit</button>
  if (props.data === null) {
    return <p className="m-60 font-bold text-xl">Select a report from the list</p>;
  } else {
    let keys = Object.keys(props.data);
    let values: string[] = Object.values(props.data);
    let pairs: string[][] = [];
    for (let i = 0; i < keys.length; i++) {
      let pair: string[] = [keys[i], values[i]];
      pairs.push(pair);
    }
    return (
      <div className="displaying-form">
        {(props.editStatus === true) ? <h2 className="edit-title">Edit Mode</h2>:<></>}
        <div className="data-header">
          <p className ="px-3 text-gray-500">Date: {makeDateShort(props.data.curr_date)}</p>
          <p className="px-3 text-gray-500">report ID: {props.data.id}</p>
        </div>
        <p className="mx-3 font-bold text-center">form for department X date Y</p>
        <form id={"daForm"} className="displaying-form-elements" onSubmit={props.submitFunc}>
          {pairs.map((pair: string[], index: number) => (
            (pair[0] !== "id" && pair[0] !== "curr_date") && 
            <div key={index}>
              <label className="mx-3">{pair[0]}</label>
              <br></br>
              <input key={index} className={(props.empltyFields.includes(index))?"input-box-empty":"input-box mx-3"} type = "text" value = {pair[1]}
               readOnly={!props.editStatus} onChange={(event) => props.changeEntry(index, event)}></input>
            </div>
          ))}
        </form>
        <div className="report-data-buttons">
          {(props.editStatus === true) ? cancelButton:editButton}
          {props.editStatus === true &&
            updateButton
          }
        </div>
      </div>
    );
  }
}
export default ReportData;

function makeDateShort(date: string) : string{
  if(date.length > 10){
    const subDate = date.substring(0, 10) 
    return subDate;
  }
  else{
    return date;
  }
}