import { useEffect, useState } from 'react';
import httpService from '../../services/httpService';
import '../../App.css';
import './Dashboard.css';
import initialEmployeeOfTheMonth from '../../util/initialEmployeeOfTheMonth.json';
import profilePic from './../../images/gray_person.jpg';

const EmployeeOfTheMonth = () => {
  const [employeeOfTheMonth, setEmployeeOfTheMonthState] = useState(initialEmployeeOfTheMonth);
  const [employeeOfTheMonthImage, setEmployeeOfTheMonthImageState] = useState(profilePic);

  const getEmployeeOfTheMonth = async () => {
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
  };

  const getEmployeeOfTheMonthImage = async (imageId: number) => {
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
  };

  useEffect(() => {
    getEmployeeOfTheMonth();
  }, [setEmployeeOfTheMonthState]);

  return (
    <div className="flex flex-col w-full card-inner">
      <p className="title whitesapce-nowrap">Employee of the Month</p>
      <img src={employeeOfTheMonthImage} alt="profile pic" className="profile-pic"></img>
      <h1 className="text-base sm:text-xl md:text-2xl">Name: {employeeOfTheMonth.name}</h1>
      <h1 className="text-base sm:text-xl md:text-2xl">Department: {employeeOfTheMonth.department}</h1>
      <p className="text-sm sm:text-lg md:text-xl">{employeeOfTheMonth.description}</p>
    </div>
  );
};

export default EmployeeOfTheMonth;
