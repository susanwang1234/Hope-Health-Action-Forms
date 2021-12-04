import './Dashboard.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ToDoStatus } from '../../models/toDoStatus';
import { currDate } from './util/timezone';
import { useState, useEffect } from 'react';
import httpService from '../../services/httpService';

const ToDo = () => {
  const [toDo, setToDoState] = useState<any>({
    toDoReminders: []
  });

  const getToDoStatus = async () => {
    const url = '/to-do';
    try {
      const response = await httpService.get(url);
      setToDoState({
        toDoReminders: response.data
      });
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
          <Calendar value={currDate} selectRange={true} className="responsive-calendar flex-shrink" />
        </div>
      </div>
    );
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

  return (
    <>
      <div className="align-left">
        {/* {iconChecker(toDo.toDoReminders[0].caseStudies)} Hello */}
        {/* <p className="inside-text">{iconChecker(toDo.toDoReminders[0].caseStudies)}Case Study</p> */}
        {/* <p className="inside-text">{iconChecker(toDoState.toDoReminders[0].dataForm)}MSPP Report</p> */}
      </div>
      <div className="align-right flex">{generateCalendar()}</div>
    </>
  );
};
export default ToDo;
