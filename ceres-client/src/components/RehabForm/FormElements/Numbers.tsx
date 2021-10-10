import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, Nav } from 'react-bootstrap';
import '../RehabForm.css';
import { FormContext } from '../FormContext';

// Citation: https://medium.com/swlh/how-to-generate-dynamic-form-from-json-with-react-5d70386bb38b

const Numbers = ({ my_field_id, my_field_label, my_field_placeholder, my_field_value, my_field_mandatory }: any) => {
  const { handleChange }: any = useContext(FormContext);

  let heading: any = { my_field_label };
  if (my_field_mandatory === true) {
    heading = (
      <>
        {my_field_label} <div className="required">(Required)</div>
      </>
    );
  }

  return (
    <div>
      <Row>
        <Form.Label column lg={2}>
          {heading}
        </Form.Label>
        <Col>
          <Form.Control
            className="width-20-percent"
            size="sm"
            type="number"
            id="number-entry"
            name="number-entry"
            min="0"
            placeholder={my_field_placeholder ? my_field_placeholder : ''}
            value={my_field_value}
            onInput={(event: any) => handleChange(my_field_id, event)}
          />
        </Col>
      </Row>
      <br />
    </div>
  );
};

export default Numbers;
