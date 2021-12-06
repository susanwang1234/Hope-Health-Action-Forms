import './Statistics.css';
import '../../App.css';
import React, { useContext, useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import httpService from '../../services/httpService';
import Plot from 'react-plotly.js';
import { useParams } from 'react-router';
import { departmentParam } from '../../types/departmentParamType';
import { toast } from 'react-toastify';
import { MONTHS } from '../../utils/timezone';
import { UserContext } from '../../UserContext';
import AuthService from '../../services/authService';
import { Redirect } from 'react-router-dom';

const StatisticsDashboard = () => {
  const userContext = useContext(UserContext);
  const { deptID } = useParams<departmentParam>();
  const [departmentName, setDepartmentName] = useState('');
  document.body.style.backgroundColor = '#f5f5f5';
  const [showNav, setShowNav] = useState(false);
  const [dataForPlots, setDataForPlots] = useState<any>([]);
  const [questionLabels, setQuestionLabels] = useState([]);
  const [plotIndex, setPlotIndex] = useState(0);
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState(0);
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState(0);
  const [isSearching, setSearching] = useState(false);

  useEffect(() => {
    getDepartmentName();
  }, []);

  useEffect(() => {
    fetchData();
  }, [isSearching]);

  const getDepartmentName = async () => {
    const url = `/department/${deptID}`;
    try {
      const response = await httpService.get(url);
      setDepartmentName(response.data.name);
    } catch (error: any) {
      console.log('Error: Unable to fetch from', url);
    }
  };

  const fetchData = async () => {
    if (invalidDateFilter()) {
      return;
    }

    const url = `/dataviz/${deptID}?startMonth=${startMonth}&startYear=${startYear}&endMonth=${endMonth}&endYear=${endYear};`;
    try {
      const response = await httpService.get(url);
      setDataForPlots(response.data.plotData);
      setQuestionLabels(response.data.questionLabels);
      if (plotIndex >= questionLabels.length) setPlotIndex(0);
    } catch (error: any) {
      console.log('Error: Unable to fetch from', url);
    }
    setSearching(false);
  };

  const resetDateFilter = async () => {
    setStartMonth('');
    setStartYear(0);
    setEndMonth('');
    setEndYear(0);
    setSearching(true);
    document.querySelectorAll('input').forEach((input) => (input.value = ''));
    document.querySelectorAll('select').forEach((input) => (input.value = ''));
  };

  const invalidDateFilter = (): boolean => {
    if ((startMonth && !startYear) || (!startMonth && startYear)) {
      toast.error('Please ensure From Month and From Year are both filled in or both not filled in.');
      return true;
    } else if ((endMonth && !endYear) || (!endMonth && endYear)) {
      toast.error('Please ensure To Month and To Year are both filled in or both not filled in.');
      return true;
    }
    return false;
  };

  const radioButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPlotIndex(+value);
  };

  const onClickLogOutHandler = async () => {
    await userContext.logout();
    return <Redirect to="/" />;
  };

  return (
    <div className="App">

      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt="Logo" className="logo" />
        <button type="submit" onClick={onClickLogOutHandler} className="grey-button logout-button top-2% right-2">
          Log Out
        </button>
      </header>
      <Sidebar show={showNav} departmentID={deptID}></Sidebar>
      <div className="global-background ">
      



      <div className="dashboard-title pt-4 w-full">{departmentName} Statistics</div>

      <div className = "parent-div-statistics">

      <div className="date-filter flex flex-col pt-10 pl-16 pr-16">
        <div className="date-from">
          <div className="filter-label">From:</div>
          <select defaultValue="" onChange={(event) => setStartMonth(event.target.value)}>
            <option value="" disabled>
              Month
            </option>
            {MONTHS.map((month: string) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <input className="filter-input" onChange={(event) => setStartYear(+event.target.value)} type="number" min="1970" max="3000" placeholder="Year"></input>
        </div>
        <div className="date-to">
          <div className="filter-label">  To:</div>
          <select defaultValue="" onChange={(event) => setEndMonth(event.target.value)}>
            <option value="" disabled>
              Month
            </option>
            {MONTHS.map((month: string) => (
              <option key={month}>{month}</option>
            ))}
          </select>
          <input className="filter-input" onChange={(event) => setEndYear(+event.target.value)} type="number" min="1970" max="3000" placeholder="Year"></input>
        </div>
        <div className="flex flex-row statistic-buttons">
          <button className="button" onClick={fetchData}>
            Search
          </button>
          <button className="button" onClick={resetDateFilter}>
            Reset
          </button>
        </div>
      </div>

      <div className="outer-container">
        <div className="statistics-dashboard-container">
          <div className="left-container statistics-card">
            <ul className="question-menu">
              {questionLabels.length
                ? questionLabels.map((label, index) => {
                    const question =
                      index === plotIndex ? (
                        <li key={label}>
                          <input className="radio-button" name="question" type="radio" value={index} onChange={radioButtonHandler} checked></input>
                          {label}
                        </li>
                      ) : (
                        <li key={label}>
                          <input className="radio-button" name="question" type="radio" value={index} onChange={radioButtonHandler}></input>
                          {label}
                        </li>
                      );
                    return question;
                  })
                : 'No Questions Found'}
            </ul>
          </div>
          <div className="right-container">
            {dataForPlots[0] ? (
              <Plot
                className="plot statistics-card"
                data={[
                  {
                    x: dataForPlots[plotIndex] ? dataForPlots[plotIndex].x : dataForPlots[0].x,
                    y: dataForPlots[plotIndex] ? dataForPlots[plotIndex].y : dataForPlots[0].y,
                    type: 'scatter',
                    mode: 'lines+markers'
                  }
                ]}
                layout={{ title: questionLabels[plotIndex], autosize: true}}
                config = {{responsive:true}}
              />
            ) : (
              <Plot data={[{ x: [], y: [] }]} layout={{}} />
            )}
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
  
};

export default StatisticsDashboard;
