import React, {Component} from 'react';
import DepartmentData from "./Departments.json";
import ToDoData from "./ToDo.json";
import './Departments.css';
import { useHistory } from 'react-router-dom';
//source for checkmark icon:https://css.gg/check-o
//source for alert icon: https://css.gg/danger

function Departments(){
    let history = useHistory();

    const onClick = () => {
        history.push('/dashboard');
    };

    function iconChecker(index: number){
        if(ToDoData[index].caseStudy){
            return (
                <div className="checkmark_icon">
                    <div className="checkmark"></div>
                </div>
            );}
        return(
                <div className="alert_icon">
                    <div className="alert"></div>
                </div>
        );
    }
    return (
        <div className="background">
            <div className="card_container">
                <div className="cards">
                        {DepartmentData.map((DepartmentDetail, index)=>{
                            return <div className="card">
                                        <div className="card_inner">
                                            <h2><b>{DepartmentDetail.name}</b></h2>
                                            {iconChecker(index)}
                                        <button type="submit" onClick={onClick} className="view_button">View Department</button>
                                    </div>
                                </div>
                        })}
                </div>
            </div>
        </div>
    )
}
export default Departments