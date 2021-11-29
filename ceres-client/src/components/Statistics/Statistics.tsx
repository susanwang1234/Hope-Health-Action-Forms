import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import httpService from '../../services/httpService';

const StatisticsDashboard = () => {
  const [showNav, setShowNav] = useState(false);
  const [plotData, setPlotData] = useState([]);
  const [questionLabels, setQuestionLabels] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await httpService.get('/dataviz/2');
    console.log('DATA:', response.data);
    setPlotData(response.data.plotData);
    setQuestionLabels(response.data.questionLabels);
  }
  
  return (
    <div className="App">
      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <Sidebar show={showNav}></Sidebar>
    </div>
  )
}

export default StatisticsDashboard;