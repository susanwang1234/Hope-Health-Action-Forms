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
import httpService from '../../services/httpService';
import AuthService from '../../services/authService';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
/*
Citation: https://www.kindacode.com/article/react-typescript-handling-select-onchange-event/
*/
let caseStudy;
const CaseStudySubmit = () => {
  const userContext = useContext(UserContext);
  const [shareImage, setShareImage] = useState('');
  const [checkMark, SetCheckMark] = useState(false);
  const [title, setTitle] = useState('');
  const [showNav, setShowNav] = useState(false);
  const [selectedCaseStudyType, setSelectedCaseStudyType] = useState<string>('Nothing selected');
  const [caseStudyType, setCaseStudyType] = useState({
    types: []
  });
  const [caseStudyQuestions, setCaseStudyQuestions] = useState({
    questions: []
  });

  async function getQuestions(selectedCaseStudyType: string | undefined) {
    const url = `/case-study-questions/${selectedCaseStudyType}`;
    try {
      const response = await httpService.get(url);
      const data = response.data;
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

  const onclickCancel = async (event: any) => {
    event.preventDefault();
    window.location.href = '/case-studies';
  };

  const saveImageForCaseStudy = async (event: any) => {
    if (shareImage.length < 1) {
      toast.error('Image not uploaded!! Please upload the image.');
      return;
    }

    if (!checkMark) {
      toast.error("Check Box isn't marked!! Please mark the checkbox.");
      return;
    }

    const url = '/image';
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append('image', shareImage);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      const storeResponseBody: any = [];
      httpService
        .post(url, formData, config)
        .then((response) => {
          storeResponseBody.push(response.data);
        })
        .then(() => {
          createCaseStudy(storeResponseBody[0][0].id);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const createCaseStudy = async (imageId: number) => {
    caseStudy = {
      caseStudyTypeId: selectedCaseStudyType,
      departmentId: userContext.user?.departmentId,
      userId: userContext.user?.id,
      imageId: imageId,
      title
    };
    const url = `/case-study`;
    httpService
      .post(url, caseStudy)
      .then((response: any) => response.data)
      .then((data: any) => {
        const retrievedCaseStudy = data[0];
        createCaseStudyResponse(retrievedCaseStudy.id, retrievedCaseStudy.caseStudyTypeId);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const createCaseStudyResponse = async (caseStudyId: number, caseStudyTypeId: any) => {
    let caseStudyTypeOptions = [PatientStory, StaffRecognition, TrainingSession, EquipmentReceived, OtherStory];
    let POSTresponses = caseStudyTypeOptions[caseStudyTypeId - 1];
    updateResponse(POSTresponses, false);
    httpService
      .post(`/case-study-responses/${caseStudyId}`, POSTresponses)
      .then((response: any) => response.data)
      .then((data: any) => {
        updateResponse(POSTresponses, true);
        toast.success('New Case Study Submitted', { position: 'top-center', autoClose: 5000 });
        window.location.href = '/case-studies';
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  function updateResponse(selectedCaseStudy: any[], empty: boolean) {
    let elementId;
    for (let index = 0; index < selectedCaseStudy.length; index++) {
      if (!empty) {
        elementId = 'text-area-id-' + index;
        selectedCaseStudy[index].response = (document.getElementById(elementId) as HTMLInputElement).value;
      } else {
        selectedCaseStudy[index].response = '';
      }
    }
  }

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedCaseStudyType(value);
    getQuestions(value);
  };

  const handleChange = (event: any) => {
    const image = event.target.files[0];
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
        <button type="submit" onClick={onClickLogOutHandler} className="grey-button top-2% right-2">
          Log Out
        </button>
      </header>
      <Sidebar show={showNav} />
      <div className="cards-case-study">
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
                <input onChange={() => SetCheckMark(!checkMark)} checked={checkMark} type="checkbox" />
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
            <textarea value={title} onChange={(event) => setTitle(event.target.value)} className="response" placeholder="Type here..."></textarea>
            {caseStudyQuestions.questions.map((Questions: any, index: any) => {
              return (
                <div>
                  <label className="inside-text-case-study">{Questions.label}</label>
                  <textarea id={'text-area-id-' + index} className="response" placeholder="Type response here..."></textarea>
                </div>
              );
            })}
            <button onClick={onclickCancel} className="grey-button bottom-5 left-31">
              Cancel
            </button>
            <button onClick={saveImageForCaseStudy} disabled={selectedCaseStudyType === 'Nothing selected'} className="blue-button bottom-5 right-20">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudySubmit;
