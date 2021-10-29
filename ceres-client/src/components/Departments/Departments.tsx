import React, {Component} from 'react';
import DepartmentData from "./Departments.json";
import ToDoData from "./ToDo.json";
import './Departments.css';
//source:https://css.gg/check-o
/*
                                     if (DepartmentDetail.name == "Maternity") {
                                                <div className="checkmark_icon">
                                                </div>
                                            }
*/

class Departments extends Component {
    render() {
        return (
            <div className="card_container">
                <div className="cards">
                            {DepartmentData.map((DepartmentDetail, index)=>{
                            return <div className="card">
                                        <div className="card_inner">
                                            <h2>{DepartmentDetail.name}</h2>
                                                <div className="checkmark_icon">
                                                    <div className="checkmark">
                                                        </div>
                                                </div>
                                                <div className="alert_icon">
                                                    <div className="alert">
                                                        </div>
                                                </div>
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