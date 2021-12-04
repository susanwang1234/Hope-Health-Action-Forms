import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import '../../App.css';
import './MessageBoard.css'
import logo from '../../images/navlogo.png';
import httpService from '../../services/httpService';
import Sidebar from '../Sidebar/Sidebar';


const MessageBoard = () => {
    const [showNav, setShowNav] = useState(false);
    const [messages, setMessages] = useState<any[]>([
        {
            content: "Good evening everyone, this is a friendly reminder that tommorow he have our monthly meeting at 6:00 pm. try to be on time before all snacks are gone. looking forward too seeing you all!",
            createdAt: "12/23/2021",
            author: "alireza ahmadi"
        },
        {
            content: "We support and stand by @HaitiCancerCenter in their fight aigains cancer! #go_away_cancer ",
            createdAt: "12/23/2021",
            author: "alireza ahmadi"
        },
        {
            content: "fkd jfdd dsdsa dhasdusd dasuds sudgsafd adsdhf dfad9s dudhsa saud9hsduc fuee fdds dwfeud  asdqud sdgfa dsdsag9sad asdsa9dsd sad9s dasdasds9d sd 9sd sad9 sad asf",
            createdAt: "12/23/2021",
            author: "alireza ahmadi"
        },
        {
            content: "Good evening everyone, this is a friendly reminder that tommorow he have our monthly meeting at 6:00 pm. try to be on time before all snacks are gone. looking forward too seeing you all!",
            createdAt: "12/23/2021",
            author: "alireza ahmadi"
        },
        {
            content: "Good evening everyone, this is a friendly reminder that tommorow he have our monthly meeting at 6:00 pm. try to be on time before all snacks are gone. looking forward too seeing you all!",
            createdAt: "12/23/2021",
            author: "alireza ahmadi"
        }
    ]);

    useEffect(() => {
        const url = "./Messages"
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
                    messages.map(message => {
                        return<li className="message">
                                {message.content}
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