import React from 'react';
import './App.css';
import NavBar from './components/NavBar'

function Department() {
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
