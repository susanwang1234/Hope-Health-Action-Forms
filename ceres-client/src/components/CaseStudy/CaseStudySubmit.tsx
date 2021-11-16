import './CaseStudySubmit.css';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import logo from '../../images/navlogo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import Sidebar from '../Sidebar/Sidebar';
import gray_person from '../../images/gray_person.jpg';
import { PatientStory } from '../../models/patientStory';
import { StaffRecognition } from '../../models/staffRecognition';
import { TrainingSession } from '../../models/trainingSession';
import { EquipmentReceived } from '../../models/equipmentReceived';
import { OtherStory } from '../../models/otherStory';
/*
Citation: https://www.kindacode.com/article/react-typescript-handling-select-onchange-event/
*/
let body;
let response;
const CaseStudySubmit = () => {
  const userContext = useContext(UserContext);
  const [title, setTitle] = useState('');
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

  const createCaseStudy = async () => {
    body = {
      caseStudyTypeId: selectedOption,
      departmentId: userContext.user?.departmentId,
      userId: userContext.user?.id,
      title
    };
    try {
      await fetch('http://localhost:8080/case-studies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data[0].id);
          createCaseStudyResponse(data[0].id, data[0].caseStudyTypeId);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const createCaseStudyResponse = async (data: any, caseStudyTypeId: any) => {
    response = [PatientStory, StaffRecognition, TrainingSession, EquipmentReceived, OtherStory];
    try {
      await fetch('http://localhost:8080/case-study-responses/' + data, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(response[caseStudyTypeId - 1])
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Test', data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    getQuestions(value);
  };

  const [shareImage, setShareImage] = useState('');

  const handleChange = (e: any) => {
    const image = e.target.files[0];
    if (image === '' || image === undefined) {
      alert(`not an image ,the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  if (userContext.user?.username != null) {
    console.log('(Case Study Submit Page)  Username is ', userContext.user?.username);
    console.log('(Case Study Submit Page) ID is ', userContext.user?.id);
    console.log('(Case Study Submit Page) Department Id is ', userContext.user?.departmentId);
    console.log('(Case Study Submit Page) Role ID is ', userContext.user?.roleId);
  }

  return (
    <div className="casestudy-background">
      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt="Logo" className="logo" />
        <button className="grey-button top-2% right-2">Log Out</button>
      </header>
      <Sidebar show={showNav} />
      <div className="cards-casestudy">
        <div className="casestudy-single-card">
          <h2 className="inside-card -mt-10 mb-8">
            <b>Current Case Study</b>
          </h2>
          <p className="inside-text-case-study">Type of Case Study</p>
          <select className="minimal" onChange={selectChange}>
            <option selected disabled>
              --Select a Case Study type--
            </option>
            {caseStudyType.types.map((Types: any, index: any) => {
              return <option value={Types.id}>{Types.name}</option>;
            })}
          </select>
          <div className="photo">
            <p className="inside-text-case-study">Upload Photo</p>
            <div>
              <div className="person_image float-left">
                <img src={shareImage ? URL.createObjectURL(shareImage) : gray_person} alt="Person" />
              </div>
              <div className="float-left pl-10">
                <input type="checkbox" />
                <p>
                  This person has given permission to share their story <br />
                  and photo in HHA communications, including online platforms.
                </p>
                <input type="file" accept="image/gif, image/png, image/jpeg, image/png" name="image" id="file" onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col pt-10">
            <label className="inside-text-case-study">Title of Case Study?</label>
            <textarea value={title} onChange={(e) => setTitle(e.target.value)} className="response" placeholder="Type here..."></textarea>
            {caseStudyQuestions.questions.map((Questions: any, index: any) => {
              return (
                <div>
                  <label className="inside-text-case-study">{Questions.label}</label>
                  <textarea className="response" placeholder="Type here..."></textarea>
                </div>
              );
            })}
            <button className="grey-button bottom-5 left-31">Cancel</button>
            <button onClick={createCaseStudy} className="blue-button bottom-5 right-20">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudySubmit;
