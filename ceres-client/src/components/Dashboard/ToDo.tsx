import './Dashboard.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
import { currMonth, currMonthLastDate, currMonthLastDay, MONTHS } from '../../utils/timezone';
import initialToDoStatus from '../../utils/initialToDoStatus.json';
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

  const getToDoStatus = async () => {
    const url = '/to-do';
    try {
      const response = await httpService.get(url);
      setToDoState(response.data[getDepartmentId(response.data, parseInt(deptID))]);
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  };

  useEffect(() => {
    getToDoStatus();
  }, [setToDoState]);

  const generateCalendar = () => {
    return (
      <div className="app">
        <div className="calendar-container">
          <Calendar value={currMonthLastDate} selectRange={true} className="responsive-calendar" />
        </div>
      </div>
    );
  };
      return(
        <div className="flex sm:flex-row flex-col">
          <div className="align-left">
            <div className="due-content">
              <div className="flex whitespace-nowrap w-full justify-center sm:justify-start">  <p >{iconChecker(toDo.caseStudies)}Case Study</p></div>
              <p className="ml-10 whitespace-nowrap"> Due on {MONTHS[currMonth]} {currMonthLastDay}</p>
            </div>
            <div className="due-content mt-6">
              <div className="flex text-left w-full justify-center sm:justify-start"> <p>{iconChecker(Number(toDo.dataForm))}Data Form</p></div>
              <p className="due-in-red ml-10 whitespace-nowrap">Due on {MONTHS[currMonth]} {currMonthLastDay}</p>
            </div>
          </div>
          <div className="align-center justify-center sm:align-right sm:justify-end w-full flex">{generateCalendar()}</div>
      </div>
      )
  
  };

 
export default ToDo;
