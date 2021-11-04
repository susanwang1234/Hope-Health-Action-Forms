import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, Nav } from 'react-bootstrap';
import '../Forms.css';
import { FormContext } from '../FormContext';

// Citation: https://medium.com/swlh/how-to-generate-dynamic-form-from-json-with-react-5d70386bb38b

function createHeading(my_field_label: any, my_field_mandatory: any) {
  let heading: any = { my_field_label };

  if (my_field_mandatory === true) {
    heading = (
      <>
        {my_field_label} <div className="required"> (Required)</div>
      </>
    );
  } else {
    heading = <>{my_field_label}</>;
  }

  return heading;
}

function getClassName(my_field_value: any, my_field_mandatory: any) {
  let numberClassName = 'width-20-percent';
  if (my_field_value === null && my_field_mandatory == true) {
    numberClassName = numberClassName + ' field-invalid-border';
  }
  return numberClassName;
}

const Numbers = ({ my_field_id, my_field_label, my_field_placeholder, my_field_value, my_field_mandatory }: any) => {
  const { handleChange }: any = useContext(FormContext);

  let heading = createHeading(my_field_label, my_field_mandatory);

  let numberClassName = getClassName(my_field_value, my_field_mandatory);

  return (
    <div>
        <Form.Label column lg={2}>
          {heading}
        </Form.Label>
        <Form.Control
          className={numberClassName}
          size="sm"
          type="number"
          id="number-entry"
          name="number-entry"
          min="0"
          max="9999999999"
          maxLength={10}
          placeholder={my_field_placeholder ? my_field_placeholder : ''}
          value={parseInt(my_field_value, 10)}
          onInput={(event: any) => {
            let onInputEvent = event.target;
            if (onInputEvent.maxLength < onInputEvent.value.length) {
              onInputEvent.value = onInputEvent.value.slice(0, onInputEvent.maxLength);
            }
            handleChange(my_field_id, event);
          }}
        />
      <br />
    </div>
  );
};

export default Numbers;
