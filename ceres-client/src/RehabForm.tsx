import './App.css';
import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col } from 'react-bootstrap';

class RehabForm extends Component {

  changeSaved() {
    alert("Changes saved.");
  }

  render() {
    return (
      <div>

      <div className="grey-blocks-form">
        <Form.Label column="lg">Rehab Monthly Data Collection</Form.Label>

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
        <Button variant="primary" href="/Department-home-page" onClick={this.changeSaved}>Save</Button>{' '}
      </div>

      </div>
      
    );
  }
}

export default RehabForm;
