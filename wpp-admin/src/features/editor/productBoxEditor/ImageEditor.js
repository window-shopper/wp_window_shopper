import React from 'react';
import { useSelector } from 'react-redux';
import SliderElement from '../templateEditor/SliderElement';
import SelectElement from '../templateEditor/SelectElement';
import TooltipWrapper from '../TooltipWrapper';
import TextFieldElement from '../TextFieldElement';
import ImageSelectElement from './image/ImageSelectElement';
import {
  selectState,
  setImage,
} from '../editorSlice';

export function ImageEditor() {
  const { image } = useSelector(selectState);
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ paddingLeft: 8 }}>
        <SelectElement
          item={image}
          setItem={setImage}
          label="Image Scaling"
          keyName="objectFit"
          options={['none', 'fill', 'contain', 'cover', 'scale-down']}
          optionLabels={['None', 'fill', 'contain', 'cover', 'scale down']}
        />
        <SliderElement step={5} keyName="width" item={image} setItem={setImage} label="Size" />
      </div>
      <TextFieldElement item={image} setItem={setImage} label="URL" keyName="url" />
      <TooltipWrapper label="If the image cannot be displayed for whatever reason this text will be shown instead.">
        <TextFieldElement item={image} setItem={setImage} label="Alternate Text" keyName="alt" />
      </TooltipWrapper>
      <ImageSelectElement />
    </div>
  );
}
