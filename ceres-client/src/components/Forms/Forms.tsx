import './Forms.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
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

  return (
    <FormContext.Provider value={{ handleChange }}>
      <main>
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
