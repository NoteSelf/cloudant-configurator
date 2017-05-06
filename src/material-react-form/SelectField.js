import React from 'react'
import { FormInput } from 'react-form'
import SelectField from 'material-ui/SelectField';

const SelectFieldWrapped = ({field, ...props}) => {
  return (
    // Use FormInput with a fieldName to get the field's api
    <FormInput field={field}>
    {({ setValue, getValue, setTouched }) => {// FormInput's only child should be a function that provides you the field api and returns valid jsx or a react component
        return (
          <SelectField
            {...props} // Send the rest of your props to React-Select
            value={getValue()} // Set the value to the forms value
            onChange={(event, index, value) => setValue(value)} // On Change, update the form value
            onBlur={() => setTouched()} // And the same goes for touched
          />)}
      }</FormInput>)
}

SelectFieldWrapped.displayName = 'SelectFieldWrapped';

export default SelectFieldWrapped;