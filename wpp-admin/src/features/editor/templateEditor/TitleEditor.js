import React from 'react';
import { useSelector } from 'react-redux';
import SliderElement from './SliderElement';
import ColorPickerElement from './ColorPickerElement';
import SwitchElement from './SwitchElement';
import TooltipWrapper from '../TooltipWrapper';
import SelectElement from './SelectElement';
import {
  selectState,
  setTitle,
} from '../editorSlice';

export function TitleEditor() {
  const { title } = useSelector(selectState);

  return (
    <div
      style={{
        width: '100%', display: 'flex', flexDirection: 'column',
      }}
    >
      <SwitchElement item={title} setItem={setTitle} label="Underlined" keyName="isUnderlined" />
      <TooltipWrapper label="Makes the Title a clickable link element. You will be able to define the URL for each Product Box individually in the Product Box Editor.">
        <SwitchElement item={title} setItem={setTitle} label="Link" keyName="hasLink" />
      </TooltipWrapper>
      <SelectElement
        keyName="htmlTag"
        item={title}
        setItem={setTitle}
        label="HTML Tag"
        options={['h2', 'h3', 'h4', 'h5', 'h6']}
        optionLabels={['h2', 'h3', 'h4', 'h5', 'h6']}
      />
      <SelectElement
        keyName="textAlign"
        item={title}
        setItem={setTitle}
        label="Text Align"
        options={['left', 'center', 'right']}
        optionLabels={['left', 'center', 'right']}
      />
      <SliderElement
        noMarks
        min={4}
        max={36}
        keyName="fontSize"
        item={title}
        setItem={setTitle}
        label="Font Size (px)"
        valueLabelDisplay
      />
      <ColorPickerElement item={title} setItem={setTitle} label="Text Color" keyName="color" />
    </div>
  );
}
