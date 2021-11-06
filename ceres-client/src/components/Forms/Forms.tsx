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
import ToggleSwitch from './ToggleSwitch';

// console.log('JSONfile', JSONfile);

// Citation for dynamic forms, updating JSON fields, the JSON structure, and debugging the console.log output: https://medium.com/swlh/how-to-generate-dynamic-form-from-json-with-react-5d70386bb38b

function Forms() {
  const [elements, setElements] = useState<any | null>(null);
  useEffect(() => {
    return setElements(JSONfile[0]);
  }, []);
  const { fields, pageLabel }: any = elements ?? {};

  const handleSave = (event: any) => {
    let canSubmit: boolean = true;
    elements.fields.forEach((field: any) => {
      if (field.fieldValue === null && field.fieldMandatory) {
        canSubmit = false;
      }
    });

    if (canSubmit) {
      alert('Your changes have been saved.');
    } else {
      alert('Error: You have not filled all the required fields.');
    }

    event.preventDefault();

    console.log(elements);
  };

  //Updates the key fieldValue in the JSON object
  const handleChange: any = (id: any, event: any) => {
    const newElements = { ...elements };
    newElements.fields.forEach((field: any) => {
      const { fieldType, fieldID } = field;
      if (id === fieldID) {
        switch (fieldType) {
          default:
            field['fieldValue'] = event.target.valueAsNumber;
            break;
        }
      }
      setElements(newElements);
    });
    console.log(elements);
  };

  const getMonthAndTitle: any = (partOfTitle: any) => {
    //Citation: https://www.w3schools.com/jsref/jsref_getmonth.asp
    const month = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    const month_index = new Date().getMonth();
    let nameOfMonth = month[month_index];
    return nameOfMonth + ' ' + partOfTitle;
  };

/*
  class DataPage extends React.Component<any[], any> {
    constructor(props: any[]) {
      super(props);
      this.state = {
        isLoaded: false,
        reports: [],
        displayingData: null,
        indexOfSelectedReport: null
      };
    }
    async componentDidMount() {
      const url = 'http://localhost:8080/rehab_report/get/rehab_report';
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Fetched Rehab Reports are: ' + data);
        this.setState({
          isLoaded: true,
          reports: data
        });
      } catch (error) {
        console.log('Error: Unable to fetch from ' + url);
        this.setState({
          isLoaded: true,
          error
        });
      }
    }
  }

  class DataReport extends React.Component<any, any> {
    render(){
      let keys = Object.keys(this.props.data);
      let values: string[] = Object.values(this.props.data);
      let pairs: string[][] = [];
      for (let i = 0; i < keys.length; i++) {
        let pair: string[] = [keys[i], values[i]];
        pairs.push(pair);
      }

    }



  }*/
  
  
  return (
    <FormContext.Provider value={{ handleChange }}>
      <main>
        <Navbar />
        <div className="outer-block">
          <ToggleSwitch label="MSPP Data only" />
          <div className="blocks-form">
            <div className="title-form">
              <Form.Label column="lg">{getMonthAndTitle(pageLabel)}</Form.Label>
            </div>
            <Form>
              <div className="scroll-box">{fields ? fields.map((field: any, key: any) => <Element key={key} field={field} />) : null}</div>
              <div className="button-form">
                <button
                  className="view-cancel-form-button"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/dashboard';
                  }}
                >
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
