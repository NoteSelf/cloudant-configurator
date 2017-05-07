import React from 'react';
import TextField from 'material-ui/TextField';
import { FormField } from 'react-form'

const wrappedField = ({field, ...props}) => {
  return (
    <FormField field={field}>
      {({ setValue, getValue, setTouched }) => {
        return (
          <TextField
            value={getValue()}
            onChange={e => setValue(e.target.value)}
            onBlur={() => setTouched()}
            {...props}
          />
        )
      }}
    </FormField>
  )
}

wrappedField.displayName = 'TextField'
export default wrappedField;