import './Statistics.css';
import '../../App.css';
import { useState, useEffect } from 'react';
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
  
  return (
    <div className="App">
      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <Sidebar show={showNav}></Sidebar>
      {/* <div className="card"> */}
        <ul className="questionMenu">
          {questionLabels.map(label => <li>{label}</li>)}
        </ul>
      {/* </div> */}
      <button onClick={() => {
        const maxIndex = dataForPlots.length - 1;
        setPlotIndex(plotIndex + 1 > maxIndex ? 0 : plotIndex + 1)
      }}>Click me!</button>
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
  )
}

export default StatisticsDashboard;