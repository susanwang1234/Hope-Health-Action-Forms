import './CaseStudies.css';
import '../../App.css';
import { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/navlogo.png';
import photo from './../../images/original_artwork.jpg';

const CaseStudy = () => {
  const userContext = useContext(UserContext);

  console.log('Username (Case Study) is ', userContext.user?.role);
  console.log('Department (Case Study) is ', userContext.user?.department);

  const [showNav, setShowNav] = useState(false);
  document.body.style.backgroundColor = '#f5f5f5';
  return (
    <div className="App">
      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <Sidebar show={showNav} />
      <div className="container">
        <table>
          <tr>
            <td>
              <div className="card">
                <div className="card-inner">
                  <table>
                    <tr>
                      <td>
                        <input className="radio-button" type="radio" value="patient-story"></input>Patient Story
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="radio-button" type="radio" value="staff-recognition"></input>
                        Staff Recognition
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="radio-button" type="radio" value="trailing-session"></input>
                        Trailing Session
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="radio-button" type="radio" value="equipment-received"></input>
                        Equipment Received
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="radio-button" type="radio" value="other"></input>
                        Other
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <button className="button">+ Add Case Study</button>
            </td>
            <td className="column-right">
              <input className="input" type="text" placeholder="Search Case Studies..."></input>

              <div className="case-study-block-container">
                {/* Dynamically insert case study blocks here */}
                <table className="case-study-block">
                  <tr>
                    <td className="case-study-block-image">
                      <img src={photo} width="150px" height="150px"></img>
                    </td>
                    <td className="case-study-block-text">
                      <h1>Title name</h1>
                      <h5>October 28 2021</h5>
                      <p>Case study brief summary describing what they did...dashdhaskjdhashdkjashkdjhaaskjhdkjashdkjashkj dhajhdkjahkdjhajkhdkjashjdhkjashkdjaskhaskjhdkjashdkjashkj dhajhdkjahkdjhajkhdkjashjdhkjashkdjaskhaskjhdkjashdkjashkj dhajhdkjahkdjhajkhdkjashjdhkjashkdjaskhaskjhdkjashdkjashkj dhajhdkjahkdjhajkhdkjashjdhkjashkdjaskhaskjhdkjashdkjashkj dhajhdkjahkdjhajkhdkjashjdhkjashkdjaskhaskjhdkjashdkjashkj dhajhdkjahkdjhajkhdkjashjdhkjashkdjaskhaskjhdkjashdkjashkj dhajhdkjahkdjhajkhdkjashjdhkjashkdjaskhaskjhdkjashdkjashkj dhajhdkjahkdjhajkhdkjashjdhkjashkdjaskhskjhdkjashdkjashkj dhajhdkjahkdjhajkhdkjashjdhkjashkdjaskhdjkashdkahskjdhjkashdkjashjkdhaskhdkahkahdjkashdkjhakjdhakjshdkashdkahkshdakjshdkajshdkjashdkjahkjdhaskjhdaskjhdajkshdkjas</p>
                      <button></button>
                    </td>
                    <td className="case-study-block-button">
                      <button className="button">View</button>
                    </td>
                  </tr>
                </table>
                <table className="case-study-block">
                  <tr>
                    <td>
                      <img src={photo} width="150px" height="150px"></img>
                    </td>
                  </tr>
                </table>
                <table className="case-study-block">
                  <tr>
                    <td>
                      <img src={photo} width="150px" height="150px"></img>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default CaseStudy;
