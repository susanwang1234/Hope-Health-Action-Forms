import React, { ReactNode } from 'react';
import '../App.css';


class DataReport extends React.Component <any,any>{
    render(){
        if(this.props.data === null){
            return(<p className="m-60 font-bold text-xl">Select a report from the list</p>);
        }else{
            let keys = Object.keys(this.props.data);
            let values: string[] = Object.values(this.props.data);
            let pairs: string[][] = [];
            for(let i = 0; i < keys.length; i++){
                let pair:string[] = [keys[i],values[i]];
                pairs.push(pair);
            }
            return(
                <div className="m-6">
                    <table className="table-fixed bg-gray-100">
                        {pairs.map((pair: string[]) =>
                        <tr>
                            {pair.map((item: string) =>
                            <td>
                                {item}
                            </td>
                            )}
                        </tr>
                        )}
                    </table>
                    <button className="bg-blue-400 text-white py-2 px-4 hover:bg-blue-200 w-40"
                    onClick={() => console.log("edit")}>
                        Edit
                    </button>
                </div>
            );
        }
    }
}
export default DataReport;
