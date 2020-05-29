import React from 'react';
import { useSelector } from 'react-redux';
import SliderElement from './SliderElement';
import SelectElement from './SelectElement';
import SwitchElement from './SwitchElement';
import ColorPickerElement from './ColorPickerElement';
import TooltipWrapper from '../TooltipWrapper';
import {
  setCta1,
  setCta2,
  selectState,
} from '../editorSlice';

export function CtaEditor({ cta, setCta }) {
  return (
    <div
      style={{
        width: '100%', display: 'flex', flexDirection: 'column',
      }}
    >
      <TooltipWrapper label="Makes the Button a clickable link element. You will be able to define the URL for each Product Box individually in the Product Box Editor.">
        <SwitchElement item={cta} setItem={setCta} label="Link" keyName="hasLink" />
      </TooltipWrapper>
      <SliderElement
        min={4}
        noMarks
        max={36}
        keyName="fontSize"
        item={cta}
        setItem={setCta}
        label="Font Size (px)"
        valueLabelDisplay
      />
      <SwitchElement item={cta} setItem={setCta} label="Full Width" keyName="fullWidth" />
      {!cta.fullWidth && (
      <SelectElement
        item={cta}
        setItem={setCta}
        label="Align"
        keyName="alignSelf"
        options={['left', 'center', 'right']}
        optionLabels={['left', 'center', 'right']}
      />
      )}
      <SelectElement
        item={cta}
        setItem={setCta}
        label="Corner Rounding"
        keyName="borderRadius"
        options={[0, 5, 10, 30]}
        optionLabels={['None', 'barely round', 'round', 'extra round']}
      />
      <ColorPickerElement item={cta} setItem={setCta} label="Color" keyName="backgroundColor" />
      <ColorPickerElement item={cta} setItem={setCta} label="Hover Color" keyName="hoverColor" />
      <ColorPickerElement item={cta} setItem={setCta} label="Text Color" keyName="color" />
      <ColorPickerElement item={cta} setItem={setCta} label="Text Hover Color" keyName="textHoverColor" />
      <SwitchElement keyName="hasBorder" setItem={setCta} item={cta} label="Border" />
      {cta.hasBorder
      && (
        <>
          <SelectElement
            label="Border Thickness"
            item={cta}
            setItem={setCta}
            keyName="borderThickness"
            options={[0, 2, 5]}
            optionLabels={['None', 'thin', 'thick']}
          />
          <ColorPickerElement keyName="borderColor" setItem={setCta} item={cta} label="Border Color" />
        </>
      )}
    </div>
  );
}

export function Cta1Editor() {
  const { cta1 } = useSelector(selectState);
  return <CtaEditor cta={cta1} setCta={setCta1} />;
}
export function Cta2Editor() {
  const { cta2 } = useSelector(selectState);
  return <CtaEditor cta={cta2} setCta={setCta2} />;
}
