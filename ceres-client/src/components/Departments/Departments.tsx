import React, {Component, useState} from 'react';
import DepartmentData from "./Departments.json";
import ToDoData from "./ToDo.json";
import './Departments.css';
import { useHistory } from 'react-router-dom';
import logo from '../../images/navlogo.png';
//source for checkmark icon:https://css.gg/check-o
//source for alert icon: https://css.gg/danger

function Departments(){

    let history = useHistory();
    const onClick = () => {
        history.push('/dashboard');
    };

    function iconChecker(isComplete: boolean){
        if(isComplete){
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
        <div className="ul">
            <img src={logo} className="logo"></img>
            <button type="submit" className="logout_button">Log Out</button>
            <button type="submit" className="admin_button">Admin Options</button>
        <div className="background">
            <div className="card_container">
                <div className="cards">
                        {DepartmentData.map((DepartmentDetail, index)=>{
                            return <div className="card">
                                        <div className="card_inner">
                                            <h2><b>{DepartmentDetail.name}</b></h2>
                                            <div className="text">{iconChecker(ToDoData[index].caseStudy)}Case Study</div>
                                            <div className="text">{iconChecker(ToDoData[index].mspp)}MSPP Report</div>
                                        <button type="submit" onClick={onClick} className="view_button">View Department</button>
                                    </div>
                                </div>
                        })}
                </div>
            </div>
        </div>
      </div>
    )
}
export default Departments