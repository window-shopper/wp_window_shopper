import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SelectElement from './SelectElement';
import SwitchElement from './SwitchElement';
import ColorPickerElement from './ColorPickerElement';
import SliderElement from './SliderElement';
import {
  setWidth,
} from '../../previews/previewSlice';
import {
  selectState,
  setItem,
} from '../editorSlice';


export function ItemEditor() {
  const dispatch = useDispatch();
  const { item } = useSelector(selectState);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <SliderElement
        min={item.minWidth}
        max={1000}
        step={20}
        keyName="maxWidth"
        item={item}
        setItem={setItem}
        label="Maximum Width (px)"
        valueLabelDisplay
        onChange={(newWidth) => dispatch(setWidth(newWidth))}
      />
      <SliderElement
        min={180}
        max={item.maxWidth}
        step={20}
        keyName="minWidth"
        item={item}
        setItem={setItem}
        label="Minimum Width (px)"
        valueLabelDisplay
        onChange={(newWidth) => dispatch(setWidth(newWidth))}
      />
      <SelectElement
        item={item}
        setItem={setItem}
        label="Corner Rounding"
        keyName="borderRadius"
        options={[0, 2, 5, 10]}
        optionLabels={['None', 'barely round', 'round', 'extra round']}
      />
      <ColorPickerElement keyName="backgroundColor" setItem={setItem} item={item} label="Background Color" />
      <SwitchElement keyName="boxShadow" setItem={setItem} item={item} label="Shadow" />
      <SwitchElement keyName="hasBorder" setItem={setItem} item={item} label="Border" />
      {item.hasBorder
      && (
        <>
          <SelectElement
            label="Border Thickness"
            item={item}
            setItem={setItem}
            keyName="borderThickness"
            options={[0, 2, 5]}
            optionLabels={['None', 'thin', 'thick']}
          />
          <ColorPickerElement keyName="borderColor" setItem={setItem} item={item} label="Border Color" />
        </>
      )}
      <SwitchElement keyName="showWatermark" setItem={setItem} item={item} label="Show Watermark" />
    </div>
  );
}
