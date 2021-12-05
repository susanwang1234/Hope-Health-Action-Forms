import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import '../../App.css';
import './MessageBoard.css'
import logo from '../../images/navlogo.png';
import httpService from '../../services/httpService';
import Sidebar from '../Sidebar/Sidebar';
import { departmentParam } from '../../types/departmentParamType';
import { useParams } from 'react-router-dom';


const MessageBoard = () => {
    const [showNav, setShowNav] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const { deptID } = useParams<departmentParam>();

    useEffect(() => {
        const url = `/Messages/${deptID}/`
        const response: any = httpService
      .get(url)
      .then((response) => {
        console.log(response);
        setMessages(response.data);
      })
      .catch((error: any) => {
        console.log('Error: Unable to fetch from ' + url);
      });
    },[])
    return(
        <div className={"ki"}>
            <header className="nav-header">
                <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
                <img src={logo} alt="Logo" className="logo" />
            </header>
            <Sidebar show={showNav} />
            <div className = "message-board">
                <h1 className={"announcements-title"}>Department Announcements</h1>
                <ul className={"message-list"}>
                    {
                        messages.length == 0 ?<h2 className={"no-message"}>No announcements currently available </h2>: messages.map(message => {
                        return<li className="message">
                                {message.messageContent}
                            <div className="message-footer">
                                <div>Posted by: {message.author}</div>
                                <div className="px-3">{makeDateShort(message.createdAt)}</div>
                            </div>
                        </li>
                    })
                    }
                </ul>
            </div>
        </div>
    )
}
export default MessageBoard

function makeDateShort(date: string): string {
    return date.length > 10 ? date.substring(0, 10) : date;
  }