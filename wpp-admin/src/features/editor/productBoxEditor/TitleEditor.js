import React from 'react';
import { useSelector } from 'react-redux';
import TextFieldElement from '../TextFieldElement';
import {
  selectState,
  setTitle,
} from '../editorSlice';

export function TitleEditor() {
  const { title } = useSelector(selectState);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <TextFieldElement item={title} setItem={setTitle} label="Text" keyName="text" />
    </div>
  );
}
