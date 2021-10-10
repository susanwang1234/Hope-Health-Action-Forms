import './RehabForm.css';
import Navbar from '../Navbar/Navbar';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, Nav } from 'react-bootstrap';
import JSONfile from './rehabForm.json';
import {useState, useEffect} from 'react';
import Element from './Elements';

console.log('JSONfile', JSONfile)

// Citation: https://medium.com/swlh/how-to-generate-dynamic-form-from-json-with-react-5d70386bb38b
//class RehabForm extends Component {
function RehabForm() {
  
  const [elements, setElements] = useState<any | null>(null);
  useEffect(() => { 
    return setElements(JSONfile[0]);
  },[])
  const {fields, page_label} : any = elements ?? {}


  function changeSaved() {
    alert('Changes saved.');
  }

  return(
    <main>
        <Navbar/>
        <div>
          <div className="grey-blocks-form">
            <Form.Label column="lg" >{page_label}</Form.Label>
            <form>
              {fields ? fields.map((field : any, i : any) => <Element key={i} field={field} />) : null}
              <div className="button-form">
                <Button variant="primary" href="/dashboard" onClick={changeSaved}>
                  Save
                </Button>{' '}
              </div>
            </form>
          </div>
        </div>
    </main>
    );
  }

  /*
  render() {
    return (
      <main>
        <Navbar/>
        <div>
          <div className="grey-blocks-form">
            <Form.Label column="lg" >Rehab Monthly Data Collection</Form.Label>
            <Row>
              <Form.Label className="margin-left-50px" column lg={2}>
                Beds avaliable:
              </Form.Label>
              <Col>
                <Form.Control className="width-20-percent" size="sm" type="number" id="beds-avaliable" name="beds-avaliable" min="0" />
              </Col>
            </Row>
            <br />

            <Row>
              <Form.Label className="margin-left-50px" column lg={2}>
                Bed days:
              </Form.Label>
              <Col>
                <Form.Control className="width-20-percent" size="sm" type="number" id="bed-days" name="bed-days" min="0" />
              </Col>
            </Row>
            <br />

            <Row>
              <Form.Label className="margin-left-50px" column lg={2}>
                Patient days:
              </Form.Label>
              <Col>
                <Form.Control className="width-20-percent" size="sm" type="number" id="patient-days" name="patient-days" min="0" />
              </Col>
            </Row>
            <br />

            <Row>
              <Form.Label className="margin-left-50px" column lg={2}>
                Hospitalized:
              </Form.Label>
              <Col>
                <Form.Control className="width-20-percent" size="sm" type="number" id="hospitalized" name="hospitalized" min="0" />
              </Col>
            </Row>
            <br />

            <Row>
              <Form.Label className="margin-left-50px" column lg={2}>
                Discharged alive:
              </Form.Label>
              <Col>
                <Form.Control className="width-20-percent" size="sm" type="number" id="discharged-alive" name="discharged-alive" min="0" />
              </Col>
            </Row>
            <br />
          </div>

          <div className="button-form">
            <Button variant="primary" href="/dashboard" onClick={this.changeSaved}>
              Save
            </Button>{' '}
          </div>
        </div>
      </main>
    );
  }
}
*/

export default RehabForm;
