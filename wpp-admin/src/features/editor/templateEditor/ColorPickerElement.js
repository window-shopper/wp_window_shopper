import React from 'react';
import { useDispatch } from 'react-redux';
import ColorPicker from '../../../components/ColorPicker';

export default function ColorPickerElement({
  item, setItem, keyName, label,
}) {
  const dispatch = useDispatch();
  return (
    <div style={{
      paddingTop: 15, width: '100%', marginTop: 0, marginBottom: 15,
    }}
    >
      <ColorPicker
        name="color"
        fullWidth
        label={label}
        defaultValue="#000"
        value={item[keyName]}
        inputProps={{ value: item[keyName] }}
        onChange={(color) => dispatch(setItem({ ...item, [keyName]: color }))}
      />
    </div>
  );
}
