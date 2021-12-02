import { GiHamburgerMenu } from 'react-icons/gi';
import AdminSidebar from '../Sidebar/AdminSidebar';
import AuthService from '../../services/authService';
import logo from '../../images/navlogo.png';
import { UserContext } from '../../UserContext';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../CaseStudySubmit/CaseStudySubmit.css';
import httpService from '../../services/httpService';
import { toast } from 'react-toastify';
import gray_person from '../../images/gray_person.jpg';

let employeeOfTheMonth;
const AdminEmployeeOfTheMonth = () => {
    document.body.style.backgroundColor = '#f5f5f5';
    const [showNav, setShowNav] = useState(false);
    const [shareImage, setShareImage] = useState('');
    const userContext = useContext(UserContext);
    const [title, setTitle] = useState<string>('');
    const [announcement, setAnnouncement] = useState<string>('');

    
    const [selectedDepartment, setSelectedDepartment] = useState<string>('Nothing selected');
    const [employeeName, setEmployeeName] = useState<string>('');
    const [employeeDescription, setEmployeeDescription] = useState<string>('');
    const [departmentState, setDepartmentState] = useState({
        departments: []
    });

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
        window.location.href = '/departments';
      };
    
      useEffect(() => {
        getDepartments();
      }, [setDepartmentState]);
    
      const getDepartments = async () => {
        const url = '/department';
        try {
          const response = await httpService.get(url);
          const data = response.data;
          setDepartmentState({
            departments: data
          });
        } catch (error: any) {
          console.log('Error: Unable to fetch from ' + url);
        }
      };
    
      const saveImageForEmployeeOfTheMonth = async (event: any) => {
        if (shareImage.length < 1) {
          toast.error('Image not uploaded!! Please upload the image.');
          return;
        }
        if (employeeName === '' || employeeDescription === '' || selectedDepartment === 'Nothing selected') {
          toast.error('Please fill in all fields.');
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
          httpService.post(url, formData, config).then((response) => {
            createEmployeeOfTheMonth(response.data[0].id);
          });
        } catch (error) {
          console.error(error);
        }
      };
    
      const createEmployeeOfTheMonth = async (imageId: number) => {
        employeeOfTheMonth = {
          imageId: imageId,
          name: employeeName,
          departmentId: selectedDepartment,
          description: employeeDescription
        };
        const url = '/employee-of-the-month/1';
        httpService
          .put(url, employeeOfTheMonth)
          .then(() => {
            toast.success('New Employee of the Month Submitted', { position: 'top-center', autoClose: 5000 });
            window.location.href = '/departments';
          })
          .catch((error: any) => {
            console.log(error);
          });
      };
    
      const handleChange = (event: any) => {
        const image = event.target.files[0];
        if (image === '' || image === undefined) {
          alert(`not an image ,the file is a ${typeof image}`);
          return;
        }
        setShareImage(image);
      };
    
      const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedDepartment(value);
      };

    return(
        <div>
      <header className="nav-header">
        <GiHamburgerMenu className="svg-hamburger" onClick={() => setShowNav(!showNav)} />
        <img src={logo} alt="Logo" className="logo" />
        <button type="submit" onClick={onClickLogOutHandler} className="grey-button top-2% right-2">
          Log Out
        </button>
      </header>
      <div className="flex h-full">
        <AdminSidebar show={showNav} />
      </div>
      <div className="cards-case-study">
        <div className="casestudy-single-card">
          <h2 className="inside-card -mt-10 mb-8">
            <b>Post Announcement</b>
          </h2>
          <div className="announcement">
            <div className="w-full flex flex-col pt-10">
              <label className="inside-text-case-study">Title</label>
              <textarea value={title} onChange={(event) => setTitle(event.target.value)} className="response" placeholder="Type here..."></textarea>
              <label className="inside-text-case-study">Post your announcement here</label>
              <textarea value={announcement} onChange={(event) => setAnnouncement(event.target.value)} className="response" style={{height:"500px"}} placeholder="Type here..."></textarea>
              <button onClick={onclickCancel} className="grey-button bottom-5 left-31">
                Cancel
              </button>
              {/*<button onClick={saveImageForEmployeeOfTheMonth} className="blue-button bottom-5 right-20">*/}
              <button className="blue-button bottom-5 right-20">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );


};
export default AdminEmployeeOfTheMonth;