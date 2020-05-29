import React from 'react';
import { useSelector } from 'react-redux';
import TextFieldElement from '../TextFieldElement';
import SwitchElement from '../templateEditor/SwitchElement';
import TooltipWrapper from '../TooltipWrapper';
import {
  selectState,
  setItem,
} from '../editorSlice';

export function ItemEditor() {
  const { item } = useSelector(selectState);
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <TooltipWrapper label="All components marked as link elements in this template will have this URL.">
        <TextFieldElement item={item} setItem={setItem} label="URL" keyName="link" />
      </TooltipWrapper>
      <SwitchElement keyName="linkNoFollow" item={item} setItem={setItem} label="Add rel 'nofollow'" />
      <SwitchElement keyName="linkNewTab" item={item} setItem={setItem} label="Open link in new Tab" />
    </div>
  );
}
