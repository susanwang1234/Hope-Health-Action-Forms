import './RehabForm.css';
import Navbar from '../Navbar/Navbar';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, Nav } from 'react-bootstrap';
import JSONfile from './rehabForm.json';
import {useState, useEffect} from 'react';
import Element from './Elements';

console.log('JSONfile', JSONfile)

function RehabForm() {
  
  // Citation: https://medium.com/swlh/how-to-generate-dynamic-form-from-json-with-react-5d70386bb38b
  const [elements, setElements] = useState<any | null>(null);
  useEffect(() => { 
    return setElements(JSONfile[0]);
  },[])
  const {fields, page_label} : any = elements ?? {}


  function changeSaved() {
    alert('Changes saved.');
  }

  return(
    <main>
        <Navbar/>
        <div>
          <div className="grey-blocks-form">
            <Form.Label column="lg" >{page_label}</Form.Label>
            <form>
              {fields ? fields.map((field : any, i : any) => <Element key={i} field={field} />) : null}
              <div className="button-form">
                <Button variant="primary" href="/dashboard" onClick={changeSaved}>
                  Save
                </Button>{' '}
              </div>
            </form>
          </div>
        </div>
    </main>
    );
  }    

export default RehabForm;
