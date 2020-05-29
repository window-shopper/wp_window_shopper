import React from 'react';
import { useSelector } from 'react-redux';
import TextFieldElement from '../TextFieldElement';
import {
  selectState,
  setCaption,
} from '../editorSlice';

export function CaptionEditor() {
  const { caption } = useSelector(selectState);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <TextFieldElement item={caption} setItem={setCaption} label="Text" keyName="text" />
    </div>
  );
}
