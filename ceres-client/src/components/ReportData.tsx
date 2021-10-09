import React, { ReactNode } from 'react';
import '../App.css';

class DataReport extends React.Component<any, any> {
  render() {
    if (this.props.data === null) {
      return <p>select from the list</p>;
    } else {
      let keys = Object.keys(this.props.data);
      let values: string[] = Object.values(this.props.data);
      let pairs: string[][] = [];
      for (let i = 0; i < keys.length; i++) {
        let pair: string[] = [keys[i], values[i]];
        pairs.push(pair);
      }
      return (
        <div>
          <table>
            {pairs.map((pair: string[]) => (
              <tr>
                {pair.map((item: string) => (
                  <td>{item}</td>
                ))}
              </tr>
            ))}
          </table>
          <button className="edit-button" onClick={() => console.log('edit')}>
            Edit
          </button>
        </div>
      );
    }
  }
  updateData() {
    this.setState({
      keys: Object.keys(this.props.data),
      values: Object.values(this.props.data),
      pairs: []
    });
    console.log(this.state.keys.length);
    console.log('dfasdsa');
    for (let i = 0; i < this.state.keys.length; i++) {
      let pair = [this.state.keys[i], this.state.values[i]];
      this.state.pairs.push(pair);
    }
  }
  // componentWillReceiveProps(nextProps : any) {
  //     this.setState({ data: nextProps.data });
  // }
}
export default DataReport;
