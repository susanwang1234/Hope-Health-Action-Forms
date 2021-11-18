import './CaseStudySubmit.css';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import logo from '../../images/navlogo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import Sidebar from '../Sidebar/Sidebar';
import gray_person from '../../images/gray_person.jpg';
import httpService from '../../services/httpService';
import { PatientStory } from '../../models/patientStory';
import { StaffRecognition } from '../../models/staffRecognition';
import { TrainingSession } from '../../models/trainingSession';
import { EquipmentReceived } from '../../models/equipmentReceived';
import { OtherStory } from '../../models/otherStory';
import AuthService from '../../services/authService';
import { useHistory, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
/*
Citation: https://www.kindacode.com/article/react-typescript-handling-select-onchange-event/
*/
let body;
let responseType;
const CaseStudySubmit = () => {
  const userContext = useContext(UserContext);
  const [shareImage, setShareImage] = useState('');
  const [checkMark, SetCheckMark] = useState(false);
  const [title, setTitle] = useState('');
  const [showNav, setShowNav] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>();
  const [caseStudyType, setCaseStudyType] = useState({
    types: []
  });
  const [caseStudyQuestions, setCaseStudyQuestions] = useState({
    questions: []
  });
  async function getQuestions(selectedOption: String | undefined) {
    const url = `/case-study-questions/${selectedOption}`;
    try {
      const response = await httpService.get(url);
      const data = response.data;
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
      const url = `/case-study-types`;
      try {
        const response = await httpService.get(url);
        const data = response.data;
        console.log('Fetched types: ' + data);
        setCaseStudyType({
          types: data
        });
      } catch (error: any) {
        console.log('Error: Unable to fetch from ' + url);
      }
    }
  }, [setCaseStudyType]);

  const onClickLogOutHandler = async () => {
    const data = await AuthService.logout();
    if (data.success) {
      userContext.setUser(null);
      userContext.setIsAuthenticated(false);
    }
    return <Redirect to="/" />;
  };

  const onclickCancel = async(e:any) => {
    e.preventDefault();
    window.location.href = '/case-studies';
  }

  const createCaseStudy = async (imageId: number) => {
    body = {
      caseStudyTypeId: selectedOption,
      departmentId: userContext.user?.departmentId,
      userId: userContext.user?.id,
      imageId: imageId,
      title
    };
    try {
      await fetch('http://localhost:8080/case-study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data[0].id);
          console.log('CaseStudyTypeId: ', data[0].caseStudyTypeId);
          createCaseStudyResponse(data[0].id, data[0].caseStudyTypeId);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const saveImageForCaseStudy = async (e: any) => {
    if(!checkMark)
    {
      toast.error("Check Box isn't marked!! Please mark the checkbox.");
      return;
    }

    if(shareImage.length < 1)
    {
      toast.error("Image not uploaded!! Please upload the image.");
      return;
    }
    
    const url = 'http://localhost:8080/image';
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append('image', shareImage);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      const storeResponseBody: any = [];
      axios
        .post(url, formData, config)
        .then((response) => {
          storeResponseBody.push(response.data);
        })
        .then(() => {
          createCaseStudy(storeResponseBody[0][0].id);
        });
    } catch (error) {
      console.error();
    }
  };

  const createCaseStudyResponse = async (caseStudyId: number, caseStudyTypeId: any) => {
    responseType = [PatientStory, StaffRecognition, TrainingSession, EquipmentReceived, OtherStory];
    try {
      await fetch('http://localhost:8080/case-study-responses/' + caseStudyId, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(responseType[caseStudyTypeId - 1])
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Test', data);
        });
    } catch (error) {
      console.log(error);
    }

    toast.success("New Case Study Submitted", {position: "top-center", autoClose: 5000});
    window.location.href = '/case-studies';
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    getQuestions(value);
  };


  const handleChange = (e: any) => {
    const image = e.target.files[0];
    if (image === '' || image === undefined) {
      alert(`not an image ,the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  return (
    <div className="casestudy-background">
      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt="Logo" className="logo" />
        <button type="submit" onClick={onClickLogOutHandler} className="grey-button top-2% right-2">Log Out</button>
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
                <input onChange = {() => SetCheckMark(!checkMark)} checked = {checkMark} type="checkbox" />
                <p>
                  This person has given permission to share their story <br />
                  and photo in HHA communications, including online platforms.
                </p>
                <input type="file" accept="image/jpg, image/jpeg, image/png" name="image" id="file" onChange={handleChange} />
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
            <button onClick={onclickCancel} className="grey-button bottom-5 left-31">Cancel</button>
            <button onClick={saveImageForCaseStudy} className="blue-button bottom-5 right-20">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudySubmit;
