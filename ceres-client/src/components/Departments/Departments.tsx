import DepartmentData from "./Departments.json";
import ToDoData from "./ToDo.json";
import './Departments.css';
import { useHistory } from 'react-router-dom';
import logo from '../../images/navlogo.png';
import { UserContext } from '../../UserContext';
import { useContext } from 'react'
//source for checkmark icon:https://css.gg/check-o
//source for alert icon: https://css.gg/danger

function Departments(){
const userContext = useContext(UserContext);

console.log('Username (Department) is ' , userContext.user?.name)
console.log('Department (Department) is ' , userContext.user?.department)
//var index = userContext.user.index;
//experiment

let history = useHistory();
const onClick = () => {
	userContext.setUser({name: 'Ritika', department: 'new department'})
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
  <><div className="headerbar">
		<img src={logo} className="department_logo"></img>
		<button type="submit" className="logout_button">Log Out</button>
		<button type="submit" className="admin_button">Admin Options</button>
	</div>
	<div className="background">
			<div className="card_container">
				<div className="cards">
					{DepartmentData.map((DepartmentDetail, index) => {
						return <div className="individual_card">
							<div className="inside_card">
								<h2><b>{DepartmentDetail.name}</b></h2>
								<div className="text">{iconChecker(ToDoData[index].caseStudy)}Case Study</div>
								<div className="text">{iconChecker(ToDoData[index].mspp)}MSPP Report</div>
								<button type="submit" onClick={onClick} className="view_department_button">View Department</button>
							</div>
						</div>;
					})}
				</div>
			</div>
		</div></>
  )
}
export default Departments