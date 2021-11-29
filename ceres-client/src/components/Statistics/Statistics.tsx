import './Statistics.css';
import '../../App.css';
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import httpService from '../../services/httpService';
import Plot from 'react-plotly.js';

const StatisticsDashboard = () => {
  const [showNav, setShowNav] = useState(false);
  const [dataForPlots, setDataForPlots] = useState<any>([]);
  const [questionLabels, setQuestionLabels] = useState([]);
  const [plotIndex, setPlotIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await httpService.get('/dataviz/2');
    console.log('DATA:', response.data);
    setDataForPlots(response.data.plotData);
    setQuestionLabels(response.data.questionLabels);
  }

  const radioButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log('VALUE:', value)
    setPlotIndex(+value);
  }
  
  return (
    <div className="App">
      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <Sidebar show={showNav}></Sidebar>
      <div className="grid-container">
        <div className="dashboard-title">
          Rehab Statistics
        </div>
        <div className="date-filter">
          Filter Stuff
        </div>
        <div className="card question-list">
          <ul className="questionMenu">
            {questionLabels.map((label, index) => <li><input className="radio-button" name="selected" type="radio" value={index} onChange={radioButtonHandler}></input>{label}</li>)}
          </ul>
        </div>
        <div className="plot">
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
          />}
        </div>
      </div>
    </div>
  )
}

export default StatisticsDashboard;