import React, { ReactNode } from 'react';
import '../App.css';

class DataReport extends React.Component<any, any> {
  render() {
    if (this.props.data === null) {
      return <p className="m-60 font-bold text-xl">Select a report from the list</p>;
    } else {
      let keys = Object.keys(this.props.data);
      let values: string[] = Object.values(this.props.data);
      let pairs: string[][] = [];
      for (let i = 0; i < keys.length; i++) {
        let pair: string[] = [keys[i], values[i]];
        pairs.push(pair);
      }
      return (
        <div className="displaying-form">
          <p className="mx-3 font-bold text-center">form for department X date Y</p>
          <form className="displaying-form-elements">
            {pairs.map((pair: string[]) => (
              <div>
                <label className="mx-3">{pair[0]}</label>
                <br></br>
                <input className="input-box mx-3" type = "text" value = {pair[1]} readOnly></input>
              </div>
            
            ))}
          </form>
          <button className=" edit-button" onClick={() => console.log('edit')}>
            Edit
          </button>
        </div>
      );
    }
  }
}
export default DataReport;
