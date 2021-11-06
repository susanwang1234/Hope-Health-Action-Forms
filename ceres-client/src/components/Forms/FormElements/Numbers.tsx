import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, Nav } from 'react-bootstrap';
import '../Forms.css';
import { FormContext } from '../FormContext';

// Citation: https://medium.com/swlh/how-to-generate-dynamic-form-from-json-with-react-5d70386bb38b

function createHeading(fieldLabel: any, fieldMandatory: any) {
  let heading: any = { fieldLabel };

  if (fieldMandatory === true) {
    heading = (
      <>
        {fieldLabel} <div className="required"> (Required)</div>
      </>
    );
  } else {
    heading = <>{fieldLabel}</>;
  }

  return heading;
}

function getClassName(fieldValue: any, fieldMandatory: any) {
  let numberClassName = 'width-20-percent';
  if (fieldValue === null && fieldMandatory == true) {
    numberClassName = numberClassName + ' field-invalid-border';
  }
  return numberClassName;
}

const Numbers = ({ fieldID, fieldLabel, fieldPlaceholder, fieldValue, fieldMandatory }: any) => {
  const { handleChange }: any = useContext(FormContext);

  let heading = createHeading(fieldLabel, fieldMandatory);

  let numberClassName = getClassName(fieldValue, fieldMandatory);

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
          placeholder={fieldPlaceholder ? fieldPlaceholder : ''}
          value={parseInt(fieldValue, 10)}
          onInput={(event: any) => {
            let onInputEvent = event.target;
            if (onInputEvent.maxLength < onInputEvent.value.length) {
              onInputEvent.value = onInputEvent.value.slice(0, onInputEvent.maxLength);
            }
            handleChange(fieldID, event);
          }}
        />
      <br />
    </div>
  );
};

export default Numbers;
