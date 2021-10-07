import React, { ReactNode } from "react";
import {Link} from "react-router-dom"

class NavBar extends React.Component{
    render(){
        return(
            <nav>
                <ul className='nav-links'>
                    <Link to='./Department-home-page'>
                    <li>Department page</li>
                    </Link>
                    <Link to='Department-data'>
                    <li>Data</li>
                    </Link>
                    <li><button>Logout</button></li>
                </ul>
            </nav>
        )
    }
}
export default NavBar