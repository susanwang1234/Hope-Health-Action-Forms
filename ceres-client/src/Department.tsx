import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar'

function Department() {
    return(
        <Router>
            <Switch>
                <Route exact path='/' component={renderDepartment}/>
                <NavBar/>
                <Route path='/Department-home-page' component={renderDepartment}/>


            </Switch>
            <div className="min-h-screen">
                <div className="mt-8 grid grid-cols-3 gap-4 h-screen p-6">
                    <div 
                        className="text-lg font-bold text-center mx-6 p-4 row-span-3 bg-gray-300 relative rounded">Case Studies
                        <button className="font-bold text-center text-white mx-6 py-2 px-4 hover:bg-blue-500 bg-blue-400 w-auto absolute bottom-4 left-0 rounded-full">Current Case Study</button>
                        <button className="font-bold text-center text-white mx-6 my-6 py-2 px-4 hover:bg-green-500 bg-green-400 w-auto absolute bottom-12 left-0 rounded-full">+ Add Case Study</button>
                    </div>
                    <div className="text-center mx-6 row-span-3 bg-gray-300 rounded">Reports</div>
                    <div className="text-center mx-6 bg-gray-300 rounded">Employee of the Month</div>
                    <div className="text-center mx-6 row-span-2 bg-gray-300 rounded">Leaderboard</div>
                </div>
            </div>
        </Router>

    )
}

function renderDepartment(){
    return(
        <NavBar/>
    );
}

function CaseStudy() {
    return(
        <div>
            <h1 className= "text-center mx-6 row-span-3 bg-gray-300 rounded">Case Studies</h1>
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