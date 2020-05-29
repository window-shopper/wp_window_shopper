import React from 'react';
import { useSelector } from 'react-redux';
import SwitchElement from './SwitchElement';
import TooltipWrapper from '../TooltipWrapper';
import {
  selectState,
  setImage,
} from '../editorSlice';

export function ImageEditor() {
  const { image } = useSelector(selectState);
  return (
    <div
      style={{
        width: '100%', display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ marginLeft: -6, marginBottom: 5 }}>
        <TooltipWrapper label="Makes the Image a clickable link element. You will be able to define the URL for each Product Box individually in the Product Box Editor.">
          <SwitchElement item={image} setItem={setImage} label="Link" keyName="hasLink" />
        </TooltipWrapper>
      </div>
    </div>
  );
}
