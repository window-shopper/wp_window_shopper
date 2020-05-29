import React from 'react';
import { useSelector } from 'react-redux';
import SliderElement from './SliderElement';
import ColorPickerElement from './ColorPickerElement';
import SwitchElement from './SwitchElement';
import {
  selectState,
  setBadge,
} from '../editorSlice';
import TooltipWrapper from '../TooltipWrapper';

export function BadgeEditor() {
  const { badge } = useSelector(selectState);
  return (
    <div
      style={{
        width: '100%', display: 'flex', flexDirection: 'column',
      }}
    >
      <TooltipWrapper label="You will be able to edit the 'Disclaimer Text!' of your badge during Product Box creation.">
        <SwitchElement keyName="showBadge" item={badge} setItem={setBadge} label="Show Badge" />
      </TooltipWrapper>
      {badge.showBadge && (
        <>
          <SliderElement min={20} max={40} step={2} keyName="size" item={badge} setItem={setBadge} label="Size" />
          <ColorPickerElement keyName="backgroundColor" setItem={setBadge} item={badge} label="Color" />
          <ColorPickerElement keyName="color" setItem={setBadge} item={badge} label="Text Color" />
        </>
      )}
    </div>
  );
}
