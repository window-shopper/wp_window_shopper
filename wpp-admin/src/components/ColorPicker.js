import React from 'react';
import ColorPicker from 'material-ui-color-picker';

export default function ColorP(props) {
  return (
    <ColorPicker
      {...props}
      inputProps={{
        style: {
          border: 'none', outline: 'none', boxShadow: 'none', paddingLeft: 0,
        },
        ...props.inputProps,
      }}
    />
  );
}
