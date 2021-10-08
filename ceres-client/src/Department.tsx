import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';

function Department() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={renderDepartment} />
        <NavBar />
        <Route path="/Department-home-page" component={renderDepartment} />
      </Switch>
      <div className="min-h-screen">
        <div className="grid grid-cols-3 gap-4 h-screen p-6">
          <div className="text-lg font-bold text-center p-4 mx-6 row-span-3 bg-gray-300 relative rounded">
            Case Studies
            <div className="flex flex-col items-center">
              <button
                className="font-bold text-white py-2 px-4 border-0 hover:bg-blue-800 bg-blue-400 
                         w-9/12 absolute bottom-4 rounded-full"
              >
                Current Case Study
              </button>
              <button
                className="font-bold text-white my-6 py-2 px-4 border-0 hover:bg-green-800 bg-green-400 
                        w-9/12 absolute bottom-12 rounded-full"
              >
                + Add Case Study
              </button>
            </div>
          </div>
          <div className="text-center mx-6 row-span-3 p-4 bg-gray-300 rounded">Reports</div>
          <div className="text-center mx-6 bg-gray-300 p-4 rounded">Employee of the Month</div>
          <div className="text-center mx-6 row-span-2 p-4 bg-gray-300 rounded">Leaderboard</div>
        </div>
      </div>
    </Router>
  );
}

function renderDepartment() {
  return <NavBar />;
}

function CaseStudy() {
  return (
    <div>
      <h1 className="text-center mx-6 row-span-3 bg-gray-300 rounded">Case Studies</h1>
    </div>
  );
}

function CaseStudy() {
  return (
    <div>
      <h1>Case Studies</h1>
    </div>
  );
}

function dataPreview() {
  return (
    <div className="text-center mx-6 row-span-3 bg-gray-300 rounded">
      <h1>Current statistics</h1>
      <button>Department Data</button>
      <button>Edit Data</button>
      <button>Add New Data</button>g
    </div>
  );
}

function EmployeeOfTheMonth() {
  return (
    <div className="text-center mx-6 bg-gray-300 rounded">
      <h1>Employee of the Month</h1>
    </div>
  );
}

function LeaderBoard() {
  return (
    <div className="text-center mx-6 row-span-2 bg-gray-300 rounded">
      <h1>Leaderboard</h1>
    </div>
  );
}
export default Department;
