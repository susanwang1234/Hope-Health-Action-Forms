import React, { ReactNode } from 'react';

class DataReport extends React.Component <any,any>{
    constructor(props: any){
        super(props);
        this.state = {
            keys: Object.keys(props.data),
            values: Object.values(props.data),
            pairs: [],
        }
        for(let i = 0; i < this.state.keys.length; i++){
            let pair = [this.state.keys[i],this.state.values[i]]
            this.state.pairs.push(pair);
            console.log(this.state.keys)
        }
    };
    render(){
        return(
            <table>
                {this.state.pairs.map((pair: string[]) =>
                 <tr>
                     {pair.map((item: string) =>
                      <td>
                          {item}
                      </td>
                      )}
                </tr>
                )}
            </table>
        )
    }
    
}
export default DataReport;