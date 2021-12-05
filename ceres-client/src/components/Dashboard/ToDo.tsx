import './Dashboard.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
import { currMonth, currMonthLastDate, currMonthLastDay, MONTHS } from '../../util/timezone';
import initialToDoStatus from '../../util/initialToDoStatus.json';
import { useParams } from 'react-router-dom';
import { departmentParam } from '../../types/departmentParamType';
import httpService from '../../services/httpService';
import { ToDoStatus } from '../../models/toDoStatus';

const ToDo = () => {
  const { deptID } = useParams<departmentParam>();
  const [toDo, setToDoState] = useState(initialToDoStatus);
  const ERROR_CODE = -1;

  const getDepartmentId = (toDoStatus: ToDoStatus[], currentDepartment: number) => {
    for (let index in toDoStatus) {
      if (toDoStatus[index].departmentId === currentDepartment) return index;
    }
    return ERROR_CODE;
  };

  const getToDoStatus = async () => {
    const url = '/to-do';
    try {
      const response = await httpService.get(url);
      setToDoState(response.data[getDepartmentId(response.data, parseInt(deptID))]);
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  };

  const iconChecker = (isComplete: number) => {
    if (isComplete > 0) {
      return (
        <div className="checkmark-icon">
          <div className="checkmark"></div>
        </div>
      );
    }
    return (
      <div className="alert-icon">
        <div className="alert"></div>
      </div>
    );
  };

  useEffect(() => {
    getToDoStatus();
  }, [setToDoState]);

  const generateCalendar = () => {
    return (
      <div className="app">
        <div className="calendar-container">
          <Calendar value={currMonthLastDate} selectRange={true} className="responsive-calendar flex-shrink" />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="align-left">
        <p className="inside-text">{iconChecker(toDo?.caseStudies)}Case Study</p>
        <p className="text-indent">
          Due on {MONTHS[currMonth]} {currMonthLastDay}
        </p>
        <p className="inside-text">{iconChecker(Number(toDo?.dataForm))}Data Form</p>
        <p className="text-indent">
          Due on {MONTHS[currMonth]} {currMonthLastDay}
        </p>
      </div>
      <div className="align-right flex">{generateCalendar()}</div>
    </>
  );
};
export default ToDo;
