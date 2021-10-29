import './Forms.css';
import Navbar from '../Navbar/Navbar';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, Nav } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Element from './Elements';
import { FormContext } from './FormContext';

import JSONfile from './jsonForms/rehabForm.json';

// console.log('JSONfile', JSONfile);

// Citation for dynamic forms, updating JSON fields, the JSON structure, and debugging the console.log output: https://medium.com/swlh/how-to-generate-dynamic-form-from-json-with-react-5d70386bb38b

function Forms() {
  const [elements, setElements] = useState<any | null>(null);
  useEffect(() => {
    return setElements(JSONfile[0]);
  }, []);
  const { fields, page_label }: any = elements ?? {};


  //example of input (type JSON object) ->
  /* [
      {
        "field_id": "bedsAvaliable",
        "field_label": "Beds avaliable",
        "field_mandatory": true,
        "field_placeholder": 0,
        "field_type": "number",
        "field_value": 0
      },
      {
        "field_id": "bedDays",
        "field_label": "Bed days",
        "field_mandatory": true,
        "field_placeholder": 0,
        "field_type": "number",
        "field_value": 0
      },
      ...
    ]
  You can see the value of the 'fields' key in rehabForm.json (from .../src/components/Forms/jsonForms/)*/

 //example of output of parseJSONElementsForDatabase (type JSON object)  -> { "currDate": "2021-10-05 07:44:04", "bedsAvaliable": 0, "bedDays": 0 ...}
  function parseJSONElementsForDatabase(oldJSONObject : any) {
    //Source which converts JavaScript date format into SQL date format : https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
    let currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');;
    let newJSONObjectString = '{ "currDate": ' + currentDate + ", ";
    let listIndex = 0;
    for(listIndex=0; listIndex<oldJSONObject.length; listIndex++) {
      let endOfStr = ''
      if(listIndex < oldJSONObject.length - 1) {
        endOfStr = ', '
      }
      else {
        endOfStr = ' }'
      }
      newJSONObjectString = newJSONObjectString + '"' + oldJSONObject[listIndex].field_id + '"' + ': '  + oldJSONObject[listIndex].field_value + endOfStr
      
    }
    let newJSONObject = JSON.parse(newJSONObjectString);
    return newJSONObject
  }

  
  const handleSave = (event: any) => {
    let can_submit: boolean = true;
    elements.fields.forEach((field: any) => {
      if (isNaN(field.field_value) && field.field_mandatory) {
        can_submit = false;
      }
    });

    if (can_submit) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      //Passes form data into the database with a POST request
      //CITATION: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      let JSONObjForDatabase = parseJSONElementsForDatabase(elements.fields);
       console.log(JSONObjForDatabase)
      fetch('http://localhost:8080/rehab_report/create/rehab_report', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(JSONObjForDatabase)
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

       
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

  return (
    <FormContext.Provider value={{ handleChange }}>
      <main>
        <Navbar />
        <div>
          <div className="blocks-form">
            <Form.Label column="lg">{page_label}</Form.Label>
            <Form>
              {fields ? fields.map((my_field: any, my_key: any) => <Element key={my_key} field={my_field} />) : null}
              <div className="button-form">
                <Button variant="primary" onClick={(e) => handleSave(e)}>
                  Save
                </Button>{' '}
              </div>
            </Form>
          </div>
        </div>
      </main>
    </FormContext.Provider>
  );
}

export default Forms;
