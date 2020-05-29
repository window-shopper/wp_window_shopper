import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Item } from './item';
import previewInfo from './previewInfo';
import {
  selectState,
} from '../stepper/stepSlice';

const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export function Previews() {
  const classes = useStyles();
  const { step } = useSelector(selectState);

  if (step !== 0) return null;
  return (
    <div className={classes.root}>
      {Object.values(previewInfo).slice(0, 2).map((previewInfo, i) => <Item key={i} previewInfo={previewInfo} index={i} />) }
    </div>
  );
}
