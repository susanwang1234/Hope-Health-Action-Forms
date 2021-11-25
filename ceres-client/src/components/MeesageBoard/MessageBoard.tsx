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
            content: "fkd jfdd dsdsa dhasdusd dasuds sudgsafd adsdhf dfad9s dudhsa saud9hsduc fuee fdds dwfeud  asdqud sdgfa dsdsag9sad asdsa9dsd sad9s dasdasds9d sd 9sd sad9 sad asf",
            createdAt: "12/23/2021",
            author: "alireza ahmadi"
        },
        {
            content: "fkd jfdd dsdsa dhasdusd dasuds sudgsafd adsdhf dfad9s dudhsa saud9hsduc fuee fdds dwfeud  asdqud sdgfa dsdsag9sad asdsa9dsd sad9s dasdasds9d sd 9sd sad9 sad asf dlfajba dfbas hkasbd ",
            createdAt: "12/23/2021",
            author: "alireza ahmadi"
        },
        {
            content: "fkd jfdd dsdsa dhasdusd dasuds sudgsafd adsdhf dfad9s dudhsa saud9hsduc fuee fdds dwfeud  asdqud sdgfa dsdsag9sad asdsa9dsd sad9s dasdasds9d sd 9sd sad9 sad asf",
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
        <div>
            <header className="nav-header">
                <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
                <img src={logo} alt="Logo" className="logo" />
            </header>
            <div className = "message-board">
                <Sidebar show={showNav} />
                <ul>
                    {
                    messages.map(message => {
                        return<li className="message">
                            <div>
                                {message.content}
                            </div>
                            <div className="message-footer">
                                <div>Posted by: {message.author}</div>
                                <div className="px-3">{message.createdAt}</div>
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
