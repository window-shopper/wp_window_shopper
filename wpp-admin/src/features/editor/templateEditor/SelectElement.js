import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch } from 'react-redux';

export default function SwitchElement({
  item, setItem, label, keyName, options, optionLabels,
}) {
  const dispatch = useDispatch();
  return (
    <FormControl style={{ width: '100%', marginTop: 18, marginBottom: 18 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={item[keyName]}
        onChange={(e) => dispatch(setItem({ ...item, [keyName]: e.target.value }))}
      >
        {options.map((option, i) => (
          <MenuItem
            value={option}
          >
            {optionLabels[i]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
