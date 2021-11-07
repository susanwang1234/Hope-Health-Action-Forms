import './CaseStudySubmit.css';
import { useHistory } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import logo from '../../images/navlogo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import Sidebar from '../Sidebar/Sidebar';
import gray_person from '../../images/gray_person.jpg';
/*
Citation: https://www.kindacode.com/article/react-typescript-handling-select-onchange-event/
*/

const CaseStudySubmit = () => {
  let history = useHistory();
  const onClick = () => {};
  const userContext = useContext(UserContext);
  const [showNav, setShowNav] = useState(false);
  const [selectedOption, setSelectedOption] = useState<String>();
  const [caseStudyType, setCaseStudyType] = useState({
    types: []
  });
  const [caseStudyQuestions, setCaseStudyQuestions] = useState({
    questions: []
  });
  async function getQuestions(selectedOption: String | undefined) {
    const url = 'http://localhost:8080/case-study-questions/' + selectedOption;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('Fetched questions: ' + data);
      setCaseStudyQuestions({
        questions: data
      });
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  }
  useEffect(() => {
    getTypeData();

    async function getTypeData() {
      const url = 'http://localhost:8080/case-study-types';
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Fetched types: ' + data);
        setCaseStudyType({
          types: data
        });
      } catch (error: any) {
        console.log('Error: Unable to fetch from ' + url);
      }
    }
  }, [setCaseStudyType]);

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    getQuestions(value);
  };

  console.log('Username (Case Study) is ', userContext.user?.role);
  console.log('Department (Case Study) is ', userContext.user?.department);
  return (
    <div className="casestudy-background">
      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt="Logo" className="logo" />
        <button className="logout-button">Log Out</button>
      </header>
      <Sidebar show={showNav} />
      <div className="flex w-full flex-col h-screen justify-center items-center">
        <div className="flex flex-col w-8/12 shadow-2xl h-8/12 border p-8 bg-white">
          <h1 className="text-center">Current Case Study</h1>
          <div className="flex flex-col justify-around">
            <h2 className="mb-4">Type of Case Study</h2>
            <select className="minimal" onChange={selectChange}>
              <option selected disabled>
                --Select a Case Study type--
              </option>
              {caseStudyType.types.map((Types: any, index: any) => {
                return <option value={Types.id}>{Types.name}</option>;
              })}
            </select>
            <h2>{selectedOption}</h2>

            <div className = "photo">
              <h2 className="mb-4">Upload Photo</h2>
              <div>
                <div className = "person_image float-left">
                  <img src={gray_person} alt="Person" />
                </div>
                <div className = "float-left">
                  <input type="checkbox" />
                  <p>This person has given permission to share their story <br/>and photo in HHA communications, including online platforms.</p>
                  <input type="file" />
                </div>
              </div>
            </div>
            <h2>Questions for Type</h2>
            
            {caseStudyQuestions.questions.map((Questions: any, index: any) => {
              return (
                <div className="inside-text-case-study">
                  <h2 className="questions">{Questions.label}</h2>
                  <input placeholder="Type here..."></input>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudySubmit;

function value(value: any): void {
  throw new Error('Function not implemented.');
}
