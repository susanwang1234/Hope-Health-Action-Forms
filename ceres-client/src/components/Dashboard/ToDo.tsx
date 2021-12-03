import './Dashboard.css';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { IoIosAlert } from 'react-icons/io';
import { IoIosCheckmarkCircle } from 'react-icons/io';

/*
  Citations:
  https://blog.logrocket.com/react-calendar-tutorial-build-customize-calendar/
*/

const ToDo = () => {

    const [date, setDate]: any = useState(new Date());

    function generateCalendar() {
        return (
          <div className="app">
            <div className="calendar-container">
              <Calendar onChange={setDate} value={date} selectRange={true} className="responsive-calendar" />
            </div>
          </div>
        );
      }


      return(
        <div className="flex sm:flex-row flex-col">
          <div className="align-left">
            <div className="due-content">
              <div className="flex whitespace-nowrap w-full justify-center sm:justify-start"><IoIosCheckmarkCircle className="icon icon-case-study" /> <span>Case Study</span></div>
              <p className="ml-10 whitespace-nowrap">Due Oct 31 2021</p>
            </div>
            <div className="due-content mt-6">
              <div className="flex text-left w-full justify-center sm:justify-start"><IoIosAlert className="icon icon-mspp-report" /> <span>Monthly Data Report</span></div>
              <p className="due-in-red ml-10 whitespace-nowrap">Due Dec 25 2021</p>
            </div>
          </div>
          <div className="align-center justify-center sm:align-right sm:justify-end w-full flex">{generateCalendar()}</div>
      </div>
      )


}
export default ToDo;