import React from 'react';
import ReactDOM from 'react-dom';

export class dataTable extends React.Component{
    constructor(props: number){
        super(props);
        this.state = {
            tags: Array(props),
            values: Array(props)
        }
    }
    render(){
        return(
            <div className = "box"> 
                <button></button>
            </div>
        )
    }
} 