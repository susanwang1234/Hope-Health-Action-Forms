import './Forms.css';
import Navbar from '../Navbar/Navbar';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, Nav } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Element from './Elements';
import { FormContext } from './FormContext';
import JSONfile from './jsonForms/rehabForm.json';
import '../../App.css';
import ToggleSwitch from './ToggleSwitch'

// console.log('JSONfile', JSONfile);

// Citation for dynamic forms, updating JSON fields, the JSON structure, and debugging the console.log output: https://medium.com/swlh/how-to-generate-dynamic-form-from-json-with-react-5d70386bb38b

function Forms() {
  const [elements, setElements] = useState<any | null>(null);
  useEffect(() => {
    return setElements(JSONfile[0]);
  }, []);
  const { fields, page_label }: any = elements ?? {};

  const handleSave = (event: any) => {
    let can_submit: boolean = true;
    elements.fields.forEach((field: any) => {
      if (field.field_value === null && field.field_mandatory) {
        can_submit = false;
      }
    });

    if (can_submit) {
      alert('Your changes have been saved.');
    } else {
      alert('Error: You have not filled all the required fields.');
    }

    event.preventDefault();

    console.log(elements);
  };

  //Updates the key field_value in the JSON object
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


  const getMonthAndTitle: any = (part_of_title: any) => {
    //Citation: https://www.w3schools.com/jsref/jsref_getmonth.asp
    const month = new Array();
    month[0] = "JANUARY";
    month[1] = "FEBRUARY";
    month[2] = "MARCH";
    month[3] = "APRIL";
    month[4] = "MAY";
    month[5] = "JUNE";
    month[6] = "JULY";
    month[7] = "AUGUST";
    month[8] = "SEPTEMBER";
    month[9] = "OCTOBER";
    month[10] = "NOVEMBER";
    month[11] = "DECEMBER";

    const month_index = new Date().getMonth();
    let nameOfMonth = month[month_index];
    return nameOfMonth + " " + part_of_title;
  };

  return (
    <FormContext.Provider value={{ handleChange }}>
      <main>
        <Navbar />
        <React.Fragment>
        <ToggleSwitch label="MSPP Data only" />
      </React.Fragment>
        <div>
          <div className="blocks-form">
          <div className="title-form"><Form.Label column="lg">{getMonthAndTitle(page_label)}</Form.Label></div>
            <Form>
              {fields ? fields.map((my_field: any, my_key: any) => <Element key={my_key} field={my_field} />) : null}
              <div className="button-form">
                <button className="view-cancel-form-button" onClick={(e) => {e.preventDefault(); window.location.href='/dashboard';}}>
                  Cancel
                </button>
                <button className="view-submit-form-button" onClick={(e) => handleSave(e)}>
                  Submit
                </button>
              </div>
            </Form>
          </div>

        </div>
      </main>
    </FormContext.Provider>
    
  );
}

export default Forms;
