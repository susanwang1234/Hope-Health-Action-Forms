import React, {Component} from 'react';
import DepartmentData from "./Departments.json";

class Departments extends Component {
    render() {
        return (
            <div>
                {DepartmentData.map((DepartmentDetail, index)=>{
                    return <h2>{DepartmentDetail.id}{DepartmentDetail.name}</h2>
                })}
                <button type="submit" className="view_button">View Department</button>
            </div>
        )
    }
}

export default Departments