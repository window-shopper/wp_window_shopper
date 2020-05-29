import React from 'react';
import { useSelector } from 'react-redux';
import TextFieldElement from '../TextFieldElement';
import TooltipWrapper from '../TooltipWrapper';
import {
  selectState,
  setDescription,
} from '../editorSlice';

export function DescriptionEditor() {
  const { description } = useSelector(selectState);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <TooltipWrapper label="The description has HTML enabled. Try using it with e.g. <b>Hello World</b>!">
        <div />
      </TooltipWrapper>
      <TextFieldElement
        item={description}
        setItem={setDescription}
        label="Text"
        keyName="text"
        textFieldProps={{
          multiline: true,
          rows: 7,
          variant: 'outlined',
        }}
      />
    </div>
  );
}
