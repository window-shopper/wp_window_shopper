import React from 'react';
import { useSelector } from 'react-redux';
import SliderElement from './SliderElement';
import ColorPickerElement from './ColorPickerElement';
import SelectElement from './SelectElement';
import {
  selectState,
  setDescription,
} from '../editorSlice';

export function DescriptionEditor() {
  const { description } = useSelector(selectState);
  return (
    <div
      style={{
        width: '100%', display: 'flex', flexDirection: 'column',
      }}
    >
      <SelectElement
        keyName="textAlign"
        item={description}
        setItem={setDescription}
        label="Text Align"
        options={['left', 'center', 'right']}
        optionLabels={['left', 'center', 'right']}
      />
      <SliderElement
        noMarks
        min={4}
        max={36}
        keyName="fontSize"
        item={description}
        setItem={setDescription}
        label="Font Size (px)"
        valueLabelDisplay
      />
      <ColorPickerElement item={description} setItem={setDescription} label="Text Color" keyName="color" />
    </div>
  );
}
