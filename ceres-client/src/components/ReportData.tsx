import React, { ReactNode } from 'react';

class DataReport extends React.Component <any,any>{
    render(){
        if(this.props.data === null){
            return(<p>nothing</p>);
        }else{
            let keys = Object.keys(this.props.data);
            let values: string[] = Object.values(this.props.data);
            let pairs: string[][] = [];
            for(let i = 0; i < keys.length; i++){
                let pair:string[] = [keys[i],values[i]];
                pairs.push(pair);
            }
            return(
                <table>
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
            );
        }
    }
    updateData(){
        this.setState({
                keys: Object.keys(this.props.data),
                values: Object.values(this.props.data),
                pairs: [],
            })
            console.log(this.state.keys.length)
            console.log("dfasdsa");
        for(let i = 0; i < this.state.keys.length; i++){
            let pair = [this.state.keys[i],this.state.values[i]]
            this.state.pairs.push(pair);
        }
    }
    // componentWillReceiveProps(nextProps : any) {
    //     this.setState({ data: nextProps.data });  
    // }
    
}
export default DataReport;