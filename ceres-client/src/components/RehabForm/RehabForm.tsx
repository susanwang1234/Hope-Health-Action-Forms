import './RehabForm.css';
import Navbar from '../Navbar/Navbar';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, Nav } from 'react-bootstrap';
import JSONfile from './rehabForm.json';
import { useState, useEffect } from 'react';
import Element from './Elements';
import { FormContext } from './FormContext';

// console.log('JSONfile', JSONfile);

// Citation for dynamic forms, updating JSON fields, the JSON structure, and debugging the console.log output: https://medium.com/swlh/how-to-generate-dynamic-form-from-json-with-react-5d70386bb38b

function RehabForm() {
  const [elements, setElements] = useState<any | null>(null);
  useEffect(() => {
    return setElements(JSONfile[0]);
  }, []);
  const { fields, page_label }: any = elements ?? {}; // ?? is the nullish coalscending operator which checks if the left or right side is null and uses the non-null side, see https://www.javascripttutorial.net/es-next/javascript-nullish-coalescing-operator/

  // Can look at the JSON data values after you press the save button in the console of your browser's developer's tools
  const handleSave = (event: any) => {
    let canSave: boolean = true;

    elements.fields.forEach((field: any) => {
      if (isNaN(field.field_value)) {
        canSave = false;
      }
    });

    if (canSave) {
      alert('Your changes have been saved.');
    } else {
      alert('Error: You have not filled all the required fields.');
    }

    event.preventDefault();

    console.log(elements);
  };

  // Updates JSON values in the form + Can look at JSON data values being updated as you add/change values on your browser's developer's tools
  const handleChange: any = (id: any, event: any) => {
    const newElements = { ...elements };
    newElements.fields.forEach((field: any) => {
      const { field_type, field_id } = field;
      if (id === field_id) {
        switch (field_type) {
          default:
            field['field_value'] = event.target.valueAsNumber;
            break;
        }
      }
      setElements(newElements);
    });
    console.log(elements);
  };

  // var result = (condition) ? (value1) : (value2) is the ternary operator, executes value1 if condition is true, otherwise false, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
  return (
    <FormContext.Provider value={{ handleChange }}>
      <main>
        <div>
          <div className="grey-blocks-form">
            <Form.Label column="lg">{page_label}</Form.Label>
            <form>
              {fields ? fields.map((my_field: any, my_key: any) => <Element key={my_key} field={my_field} />) : null}
              <div className="button-form">
                <Button variant="primary" onClick={(e) => handleSave(e)}>
                  Save
                </Button>{' '}
              </div>
            </form>
          </div>
        </div>
      </main>
    </FormContext.Provider>
  );
}

export default RehabForm;
