import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, Nav } from 'react-bootstrap';
import '../RehabForm.css'

// Citation: https://medium.com/swlh/how-to-generate-dynamic-form-from-json-with-react-5d70386bb38b

const Numbers = ({ field_id, field_label, field_value } : any) => {
  return (
    <div>
      <Row>
        <Form.Label column lg={2}>
          {field_label}
        </Form.Label>
        <Col>
          <Form.Control className="width-20-percent" size="sm" type="number" id="number-entry" name="number-entry" min="0" />
        </Col>
      </Row>
      <br />
    </div>
  );
};

export default Numbers;
