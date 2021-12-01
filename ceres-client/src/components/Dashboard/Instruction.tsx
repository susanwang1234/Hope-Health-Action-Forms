import './Dashboard.css';
import { IoIosInformationCircle } from 'react-icons/io';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { render } from '@testing-library/react';
import { useState } from 'react';

/*
Citations:
    https://react-bootstrap.github.io/components/alerts/
    https://css-tricks.com/quick-css-trick-how-to-center-an-object-exactly-in-the-center/
    https://stackoverflow.com/questions/7130397/how-do-i-make-a-div-full-screen
    https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device
*/

const Instruction = () => {
    function isMobileOrTablet() : boolean {
        let isMobileOrTablet = window.matchMedia("only screen and (max-width: 1024px)").matches;
        return isMobileOrTablet;
      }
    
      const instructions = (event: any) => {
        if(isMobileOrTablet()) {
          alert(
            'Here is how you get points:\n\n Each department will receive a point for completing and submitting their MSPP data for the month on time. \n\n Each department will receive a point everytime they submit a new case study. \n\n The Employee of the Month will receive 3 points for the department they reside in.'
          );
        }
        else{
          render(<AlertDismissible />);
        }
      };
     
      
      function AlertDismissible() {
        const [show, setShow] = useState(true);
        
        return (
          <>
          <div id="blurry-background" style={{background:"rgba(255,255,255,0.5)", width:"100%", height:"100%", position: "absolute", top: 0, left: 0}}></div>
            <Alert show={show} variant="light" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <Alert.Heading>
                <h1 className="text-center">How to get points?</h1>
              </Alert.Heading>
              <p>
                Each department will receive a point for completing and submitting their MSPP data for the month on time.
                <br />
                <br /> Each department will receive a point everytime they submit a new case study.
                <br />
                <br /> The Employee of the Month will receive 3 points for the department they reside in.
              </p>
              <div className="d-flex justify-content-end">
                <Button onClick={() => {setShow(false); document.getElementById('blurry-background')!.remove();}} variant="outline-dark">
                  Close
                </Button>
              </div>
            </Alert>
          </>
        );
      }

      return(
        <>
        <IoIosInformationCircle onClick={(instructionButtonEvent) => instructions(instructionButtonEvent)} />
        </>
      )

      

}
export default Instruction;