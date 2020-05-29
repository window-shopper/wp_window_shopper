import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function TextF(props) {
  const inputStyle = props.inputProps ? props.inputProps.style : {};
  return (
    <TextField
      {...props}
      inputProps={{
        style: {
          ...inputStyle, border: 'none', outline: 'none', boxShadow: 'none', backgroundColor: 'transparent',
        },
      }}
    />
  );
}
