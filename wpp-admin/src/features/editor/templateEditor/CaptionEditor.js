import React from 'react';
import { useSelector } from 'react-redux';
import SwitchElement from './SwitchElement';
import SelectElement from './SelectElement';
import {
  selectState,
  setCaption,
} from '../editorSlice';

export function CaptionEditor() {
  const { caption } = useSelector(selectState);

  return (
    <div
      style={{
        width: '100%', display: 'flex', flexDirection: 'column',
      }}
    >
      <SwitchElement keyName="isUnderlined" item={caption} setItem={setCaption} label="Underlined" />
      <SelectElement
        keyName="textAlign"
        item={caption}
        setItem={setCaption}
        label="Text Align"
        options={['left', 'center', 'right']}
        optionLabels={['left', 'center', 'right']}
      />
    </div>
  );
}
