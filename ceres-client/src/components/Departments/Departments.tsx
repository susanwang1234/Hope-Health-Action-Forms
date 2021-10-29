import React, {Component} from 'react';
import DepartmentData from "./Departments.json";
import './Departments.css';
// <button type="submit" className="view_button">View Department</button>

class Departments extends Component {
    render() {
        return (
            <div className="card_container">
                <div className="cards">
                            {DepartmentData.map((DepartmentDetail, index)=>{
                            return <div className="card">
                                        <div className="card_inner">
                                            <h2>{DepartmentDetail.name}</h2>
                                            <button type="submit" className="view_button">View Department</button>
                                        </div>
                                </div>
                       })}
                </div>
            </div>

        )
    }
}

export default Departments