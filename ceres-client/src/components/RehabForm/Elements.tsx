import React from 'react';
import Numbers from './FormElements/Numbers';
// Citation: https://medium.com/swlh/how-to-generate-dynamic-form-from-json-with-react-5d70386bb38b
const Element = ({ field: { field_type, field_id, field_label, field_placeholder, field_value, field_mandatory } }: any): any => {
  switch (field_type) {
    case 'number':
      return <Numbers my_field_id={field_id} my_field_label={field_label} my_field_value={field_value} my_field_placeholder={field_placeholder} my_field_mandatory={field_mandatory} />;
    default:
      return null;
  }
};

export default Element;
