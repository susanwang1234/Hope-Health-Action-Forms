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
              <Calendar onChange={setDate} value={date} selectRange={true} className="responsive-calendar flex-shrink" />
            </div>
          </div>
        );
      }


      return(
          <>
        <div className="align-left">
        <div className="due-content">
          <IoIosCheckmarkCircle className="icon icon-case-study" /> Case Study <br />
          Due Oct 31 2021
        </div>
        <div className="due-content">
          <IoIosAlert className="icon icon-mspp-report" /> Monthly Data Report <br />
          <div className="due-in-red">Due Dec 25 2021</div> <br />
        </div>
      </div>
      <div className="align-right flex">{generateCalendar()}</div>
      </>
      )


}
export default ToDo;