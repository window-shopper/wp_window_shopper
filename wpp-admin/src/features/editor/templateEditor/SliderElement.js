import React from 'react';
import Slider from '@material-ui/core/Slider';
import { useDispatch } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';

const style = {
  marginTop: 14, marginBottom: 5, marginLeft: 5, marginRight: 5,
};

export default function SwitchElement({
  item, setItem, label, keyName, min, max, step, defaultValue, valueLabelDisplay,
  noMarks, onChange,
}) {
  const dispatch = useDispatch();
  return (
    <div style={{ marginTop: 17 }}>
      <InputLabel>{label}</InputLabel>
      <Slider
        style={{
          ...style, marginLeft: -5,
        }}
        defaultValue={defaultValue || 95}
        value={item[keyName]}
        step={step || 1}
        marks={!noMarks}
        min={min || 60}
        max={max || 100}
        valueLabelDisplay={valueLabelDisplay && 'auto'}
        onChange={(_, newWidth) => {
          dispatch(setItem({ ...item, [keyName]: newWidth }));
          if (onChange) {
            onChange(newWidth);
          }
        }}
      />
    </div>
  );
}
