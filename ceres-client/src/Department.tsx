import React from 'react';
import './App.css';
import NavBar from './components/NavBar'

function Department() {
<<<<<<< HEAD
  return (
    <div className="min-h-screen">
      <div className="mt-8 grid grid-cols-3 gap-4 h-screen p-6">
        <div className="text-center mx-6 row-span-3 bg-gray-300 rounded">Case Studies</div>
        <div className="text-center mx-6 row-span-3 bg-gray-300 rounded">Reports</div>
        <div className="text-center mx-6 bg-gray-300 rounded">Employee of the Month</div>
        <div className="text-center mx-6 row-span-2 bg-gray-300 rounded">Leaderboard</div>
      </div>
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

function Report() {
  return (
    <div>
      <h1>Reports</h1>
    </div>
  );
}

function EmployeeOfTheMonth() {
  return (
    <div>
      <h1>Employee of the Month</h1>
    </div>
  );
}

function LeaderBoard() {
  return (
    <div>
      <h1>Leaderboard</h1>
    </div>
  );
}

export default Department;
=======
    return(
    <NavBar/>
    )
}

function CaseStudy() {
    return(
        <div>
            <h1 className="text-center mx-6 row-span-3 bg-gray-300 rounded">Case Studies</h1>
        </div>
    );
}

function dataPreview() {
    return(
        <div className="text-center mx-6 row-span-3 bg-gray-300 rounded">
            <h1>Current statistics</h1>
            <button>Department Data</button>
            <button>Edit Data</button>
            <button>Add New Data</button>g 
        </div>
    );
}

function EmployeeOfTheMonth() {
    return(
        <div className="text-center mx-6 bg-gray-300 rounded">
            <h1>Employee of the Month</h1>
        </div>
    );
}

function LeaderBoard() {
    return(
        <div className="text-center mx-6 row-span-2 bg-gray-300 rounded">
            <h1>Leaderboard</h1>
        </div>
    );
}
export default Department; 
>>>>>>> 19-create-dataPreview-component
