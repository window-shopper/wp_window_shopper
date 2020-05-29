import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {
  setWidth,
  selectResponsiveCheckWidth,
} from '../previews/previewSlice';
import {
  selectState,
} from './editorSlice';


export default function WidthSlider() {
  const { item } = useSelector(selectState);
  const responsiveCheckWidth = useSelector(selectResponsiveCheckWidth);
  const dispatch = useDispatch();
  return (
    <div style={{ width: 205, margin: 'auto', marginTop: '7vh' }}>
      <Typography style={{ textAlign: 'center' }} gutterBottom>
        Check Responsiveness
      </Typography>
      <Slider
        min={item.minWidth}
        max={item.maxWidth}
        value={responsiveCheckWidth}
        onChange={(_, newWidth) => dispatch(setWidth(newWidth))}
        aria-labelledby="continuous-slider"
      />
    </div>
  );
}
