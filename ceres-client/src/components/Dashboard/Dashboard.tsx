import '../../App.css';
import './Dashboard.css';

import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';

import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import profilePic from './../../images/original_artwork.jpg';
import leaderboard from './../../images/leaderboard.jpg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { IoIosAlert } from 'react-icons/io';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoIosInformationCircle } from 'react-icons/io';
import Chart from "react-google-charts";
import { strictEqual } from 'assert';
import { stringify } from 'querystring';

/* Citations: 
    https://github.com/mustafaerden/react-admin-dashboard
    https://blog.logrocket.com/react-calendar-tutorial-build-customize-calendar/
    https://react-google-charts.com/bar-chart
*/

class Leaderboard {

  public json: any;

  constructor(json: any) {
    try {
      if (Object.keys(json)[0]=='leaderboard') {
        let json_leaderboard = json.leaderboard[0];
        if(Object.keys(json_leaderboard)[0]=='department' && Object.keys(json_leaderboard)[1]=='score') {
          this.json = json;
        }
        else {
          throw "Inside the leaderboard key, there must be a JSON array with 2 keys called 'department' (string type) and 'score' (int type)."
        }
      }
      else {
        throw "JSON syntax must be {'leaderboard': [{'department':'dept1','score',<number>}{'department'...}]} where department is a string and number is an int"
      }
    }
    catch(err){
      console.log(err);
    }
  }

  private getBarData() {
    let departmentBars = [];
    let lengthJSON = Object.keys(this.json.leaderboard).length;
    for(let i=0; i<lengthJSON; i++) {
      let opacityValue = Math.round(1 / (i+1) * 100) / 100;
      let opacityStr = 'opacity: ' + (opacityValue).toString() + ';'
      departmentBars.push([this.json.leaderboard[i].department, this.json.leaderboard[i].score, 'color: #764a90; ' + opacityStr, null])
    }

    let barData = [ 
      [
        'Department',
        'Points',
        { role: 'style' },
        {
          sourceColumn: 0,
          role: 'annotation',
          type: 'string',
          calc: 'stringify',
        },
      ]
    ]
    for(let i=0; i<lengthJSON; i++) {
      barData.push(departmentBars[i])
    }
    return barData
  }

  public generateLeaderboard() {
    let barData = this.getBarData();

    return (
      <div>
      <Chart
      width={'95%'}
      height={'200px'}
      chartType="BarChart"
      loader={<div>Loading Chart</div>}
      data = {barData}
      options={{
        bar: { groupWidth: '95%' },
        legend: { position: 'none' },
      }}
      // For tests
      rootProps={{ 'data-testid': '0' }}
      />
      </div>
      )
    }

}

const Dashboard = () => {
  let history = useHistory();
  const onClick = () => {
    history.push('/case-studies/new');
  };
  const userContext = useContext(UserContext);
  const [showNav, setShowNav] = useState(false);
  const [date, setDate]: any = useState(new Date());



  const instructions = (event: any) => {
    alert(
      'Here is how you get points:\n\n Each department will receive a point for completing and submitting their MSPP data for the month on time. \n\n Each department will receive a point everytime they submit a new case study. \n\n The Employee of the Month will receive 3 points for the department they reside in.'
    );
  };

  function generateCalendar() {
    return (
      <div className="app">
        <div className="calendar-container">
          <Calendar onChange={setDate} value={date} selectRange={true} className="responsive-calendar flex-shrink" />
        </div>
      </div>
    );
  }

  let JSONtext = '{"leaderboard":[' +
                '{"department":"Rehab","score": 1 },' +
                '{"department":"Maternity","score": 5 },' +
                '{"department": "NCIUPaeds","score": 10},' +
                '{"department":"Community Health","score": 4}]}';
  const JSONobj = JSON.parse(JSONtext);
  let DashboardLeaderboard = new Leaderboard(JSONobj);

  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div className="App">
          <header className="nav-header">
            <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
            <img src={logo} alt="Logo" className="logo" />
          </header>
          <Sidebar show={showNav} />
          <div className="dashboard-container">
            <div className="dashboard-cards">
              <div className="card-outer fill-space-left">
                <p className="title">To Do</p>
                <div className="card-inner width-100-percent">
                  <div className="align-left">
                    <div className="due-content">
                      <IoIosCheckmarkCircle className="icon icon-case-study" /> Case Study <br />
                      Due October 31 2021
                    </div>
                    <div className="due-content">
                      <IoIosAlert className="icon icon-mspp-report" /> MSPP Report <br />
                      <div className='due-in-red'>Due October 31 2021</div> <br />
                    </div>
                  </div>
                  <div className="align-right flex">{generateCalendar()}</div>
                </div>

                <p className="title">Leaderboard</p>
                <div className="card-inner width-100-percent">
                  <IoIosInformationCircle className="align-right icon instructions" onClick={(e) => instructions(e)} />
                  {DashboardLeaderboard.generateLeaderboard()}
                </div>
              </div>

              <div className="card-outer fill-space-right">
                <p className="title">Employee of the Month</p>
                <div className="card-inner height-100-percent">
                  <img src={profilePic} alt="profile pic" className="profile-pic"></img>
                  <h1 className="heading-1">Name: Zack Cody</h1>
                  <h1 className="heading-1">Department: Maternity</h1>
                  <p className="text-primary-p employee-paragraph">
                    Zack works in the maternity department at Hope Health Action delivering children. He is so good at delivering children he delivered 300 children this month ALONE. This is why he is
                    employee of the month. Go Zack!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Dashboard;
