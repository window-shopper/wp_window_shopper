import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useDispatch } from 'react-redux';

const style = {
  marginTop: 13, marginBottom: 13, marginLeft: 5, marginRight: 5,
};

export default function SwitchElement({
  item, setItem, label, keyName,
}) {
  const dispatch = useDispatch();
  return (
    <FormControlLabel
      style={{
        ...style, marginBottom: 18, marginLeft: -5, marginTop: 18,
      }}
      control={(
        <Switch
          color="primary"
          checked={item[keyName]}
          onChange={() => dispatch(setItem({ ...item, [keyName]: !item[keyName] }))}
        />
        )}
      label={label}
    />
  );
}
