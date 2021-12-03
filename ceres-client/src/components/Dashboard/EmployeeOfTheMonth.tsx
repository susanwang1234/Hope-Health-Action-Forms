import { useEffect, useState } from 'react';
import httpService from '../../services/httpService';
import '../../App.css';
import './Dashboard.css';
import initialEmployeeOfTheMonth from './initialEmployeeOfTheMonth.json';
import profilePic from './../../images/gray_person.jpg';
import React from 'react';


const EmployeeOfTheMonth = () => {
  const [employeeOfTheMonth, setEmployeeOfTheMonthState] = useState(initialEmployeeOfTheMonth);
  const [employeeOfTheMonthImage, setEmployeeOfTheMonthImageState] = useState(profilePic);

  async function getEmployeeOfTheMonth() {
    const url = '/employee-of-the-month';
    try {
      const response = await httpService.get(url);
      const { data } = response;
      const retrievedEmployeeOfTheMonth = data[0];
      setEmployeeOfTheMonthState(retrievedEmployeeOfTheMonth);
      await getEmployeeOfTheMonthImage(retrievedEmployeeOfTheMonth.imageId);
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  }

  async function getEmployeeOfTheMonthImage(imageId: number) {
    const url = `/image/${imageId}`;
    try {
      await httpService
        .get(url, {
          responseType: 'blob'
        })
        .then((res) => {
          setEmployeeOfTheMonthImageState(URL.createObjectURL(res.data));
        });
    } catch (error: any) {
      console.log('Error: Unable to fetch from ' + url);
    }
  }

  useEffect(() => {
    getEmployeeOfTheMonth();
  }, [setEmployeeOfTheMonthState]);

  return (
    <div className="flex flex-col w-full card-inner">
      <img src={employeeOfTheMonthImage} alt="profile pic" className="profile-pic"></img>
      <h1 className="text-base sm:text-xl md:text-2xl">Name: {employeeOfTheMonth.name}</h1>
      <h1 className="text-base sm:text-xl md:text-2xl">Department: {employeeOfTheMonth.department}</h1>
      <p className="text-sm sm:text-lg md:text-xl">{employeeOfTheMonth.description}</p>
    </div>
  );
};

export default EmployeeOfTheMonth;
