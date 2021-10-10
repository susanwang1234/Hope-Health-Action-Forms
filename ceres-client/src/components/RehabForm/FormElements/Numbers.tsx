import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, Nav } from 'react-bootstrap';
import '../RehabForm.css'
import { FormContext } from "../FormContext";

// Citation: https://medium.com/swlh/how-to-generate-dynamic-form-from-json-with-react-5d70386bb38b

const Numbers = ({ my_field_id, my_field_label, my_field_placeholder, my_field_value } : any) => {
  const {handleChange} : any = useContext(FormContext)
  return (
    <div>
      <Row>
        <Form.Label column lg={2}>
          {my_field_label}
        </Form.Label>
        <Col>
          <Form.Control className="width-20-percent" size="sm" type="number" id="number-entry" name="number-entry" min="0" placeholder={my_field_placeholder?my_field_placeholder:''} 
          value={my_field_value}  onChange={event=>handleChange(my_field_id,event)}/>
        </Col>
      </Row>
      <br />
    </div>
  );
};

export default Numbers;
