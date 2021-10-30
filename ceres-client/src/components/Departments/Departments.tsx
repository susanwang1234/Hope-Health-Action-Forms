import React, {Component} from 'react';
import DepartmentData from "./Departments.json";
import ToDoData from "./ToDo.json";
import './Departments.css';
import { useHistory } from 'react-router-dom';
//source for checkmark icon:https://css.gg/check-o
//source for alert icon: https://css.gg/danger
/*
if (DepartmentDetail.name == "Maternity") {
<div className="checkmark_icon">
</div>
}
*/
/*
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
                                                <h4>Case Study</h4>
                                                <div className="alert_icon">
                                                    <div className="alert">
                                                        </div>
                                                </div>
                                                <h4>MSPP Report</h4>
                                            <button type="submit" className="view_button">View Department</button>
                                        </div>
                                </div>
                       })}
                </div>
            </div>

        )
    }
}
*/
function Departments(){
    let history = useHistory();

    const onClick = () => {
        history.push('/dashboard');
    };
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
                                            <h4>Case Study</h4>
                                            <div className="alert_icon">
                                                <div className="alert">
                                                    </div>
                                            </div>
                                            <h4>MSPP Report</h4>
                                        <button type="submit" onClick={onClick} className="view_button">View Department</button>
                                    </div>
                            </div>
                   })}
            </div>
        </div>

    )

}
export default Departments