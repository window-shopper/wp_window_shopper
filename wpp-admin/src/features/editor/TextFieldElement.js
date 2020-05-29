import React from 'react';
import { useDispatch } from 'react-redux';
import TextField from '../../components/TextField';

const style = {
  marginTop: 20, marginBottom: 20, marginLeft: 5, marginRight: 5,
};

export default function TextFieldElement({
  item, setItem, keyName, label, disabled, textFieldProps,
}) {
  const dispatch = useDispatch();
  return (
    <TextField
      disabled={disabled}
      style={style}
      fullWidth
      value={item[keyName]}
      onChange={(e) => dispatch(setItem({ ...item, [keyName]: e.target.value }))}
      label={label}
      {...textFieldProps}
    />
  );
}
