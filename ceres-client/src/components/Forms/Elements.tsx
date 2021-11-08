import React from 'react';
import Numbers from './FormElements/Numbers';

// Citation: https://medium.com/swlh/how-to-generate-dynamic-form-from-json-with-react-5d70386bb38b

const Element = ({ field: { fieldType, fieldID, fieldLabel, fieldPlaceholder, fieldValue, fieldMandatory } }: any): any => {
  switch (fieldType) {
    case 'number':
      return <Numbers fieldID={fieldID} fieldLabel={fieldLabel} fieldValue={fieldValue} fieldPlaceholder={fieldPlaceholder} fieldMandatory={fieldMandatory} />;
    default:
      return null;
  }
};

export default Element;
