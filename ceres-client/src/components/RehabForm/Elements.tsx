import React from "react"
import Numbers from "./FormElements/Numbers";
// Citation: https://medium.com/swlh/how-to-generate-dynamic-form-from-json-with-react-5d70386bb38b
const Element = ({field: {field_type, field_id, field_label,field_value} }: any) : any => {
    switch(field_type) {
        case 'number':
        return (<Numbers
            field_id={field_id}
            field_label={field_label}
            field_value={field_value}
            />)
        default:
            return "Nothing";
    }

}

export default Element