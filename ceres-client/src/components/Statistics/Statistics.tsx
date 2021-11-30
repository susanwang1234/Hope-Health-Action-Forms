import './Statistics.css';
import '../../App.css';
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import httpService from '../../services/httpService';
import Plot from 'react-plotly.js';

const MONTHS = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

const StatisticsDashboard = () => {
  document.body.style.backgroundColor = '#f5f5f5';
  const [showNav, setShowNav] = useState(false);
  const [dataForPlots, setDataForPlots] = useState<any>([]);
  const [questionLabels, setQuestionLabels] = useState([]);
  const [plotIndex, setPlotIndex] = useState(0);
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState(0);
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const url = `/dataviz/2?startMonth=${startMonth}&startYear=${startYear}&endMonth=${endMonth}&endYear=${endYear};`
    try {
      const response = await httpService.get(url);
      setDataForPlots(response.data.plotData);
      setQuestionLabels(response.data.questionLabels);
    } catch (error: any) {
      console.log('Error: Unable to fetch from', url);
    }
  }

  // function resetDateFilter() {
  //   setStartMonth('');
  //   setStartYear(0);
  //   setEndMonth('');
  //   setEndYear(0);
  //   // fetchData();
  // }

  const radioButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPlotIndex(+value);
  }
  
  return (
    <div className="App">
      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <Sidebar show={showNav}></Sidebar>
      <div className="outer-container">
      <div className="dashboard-title">
          Rehab Statistics
        </div>
      <div className="statistics-dashboard-container">
        <div className="left-container">
          {/* <div className="card question-list"> */}
            <ul className="questionMenu">
              {questionLabels.map((label, index) => <li><input className="radio-button" name="selected" type="radio" value={index} onChange={radioButtonHandler}></input>{label}</li>)}
            </ul>
          {/* </div> */}
        </div>
        {/* <div className="right-container"> */}
          {/* <div className="plot"> */}
            {dataForPlots[0] &&
            <Plot
              className="right-container"
              data={[
                {
                  x: dataForPlots[plotIndex].x,
                  y: dataForPlots[plotIndex].y,
                  type: 'scatter',
                  mode: 'lines+markers',
                },

              ]}
              layout={ {title: questionLabels[plotIndex] } }
            />}
          {/* </div> */}
        {/* </div> */}
      </div>
        {/* <div className="date-filter">
          From
          <select defaultValue="" onChange={event => setStartMonth(event.target.value)}>
            <option className="placeholder" value="" disabled>Start Month</option>
            {MONTHS.map(month => <option value={month}>{month}</option>)}
          </select>
          <input onChange={event => setStartYear(+event.target.value)} type="number" min="1970" max="3000" placeholder="Start Year"></input>
          To
          <select defaultValue="" onChange={event => setEndMonth(event.target.value)}>
            <option className="placeholder" value="" disabled>End Month</option>
            {MONTHS.map(month => <option>{month}</option>)}
          </select>
          <input id="startYear" value={startYear} onChange={event => setEndYear(+event.target.value)} type="number" min="1970" max="3000" placeholder="End Year"></input>
          <button onClick={fetchData}>Search</button>
          <button>Reset</button>
        </div> */}
        {/* <div className="card question-list">
          <ul className="questionMenu">
            {questionLabels.map((label, index) => <li><input className="radio-button" name="selected" type="radio" value={index} onChange={radioButtonHandler}></input>{label}</li>)}
          </ul>
        </div> */}
        {/* <div className="plot">
          {dataForPlots[0] &&
          <Plot
            data={[
              {
                x: dataForPlots[plotIndex].x,
                y: dataForPlots[plotIndex].y,
                type: 'scatter',
                mode: 'lines+markers',
              },

            ]}
            layout={ {title: questionLabels[plotIndex] } }
          />} */}
        {/* </div> */}
        </div>
      </div>
    // {/* </div> */}
  )
}

export default StatisticsDashboard;