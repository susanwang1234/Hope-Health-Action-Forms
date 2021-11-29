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
      {dataForPlots[0] &&
      <Plot
        data={[
          {
            x: dataForPlots[0].x,
            y: dataForPlots[0].y,
            type: 'scatter',
            mode: 'lines+markers',
          },

        ]}
        layout={ {title: questionLabels[0] } }
      />}
    </div>
  )
}

export default StatisticsDashboard;