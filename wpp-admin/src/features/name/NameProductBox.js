import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '../../components/TextField';
import CategorySelect from './CategorySelect';
import {
  selectState,
  setProductBoxName,
  setShortcode,
} from '../editor/editorSlice';
import * as stepSlice from '../stepper/stepSlice';


export function NameProductBox() {
  const { step } = useSelector(stepSlice.selectState);
  const { productBoxName, shortcode } = useSelector(selectState);
  const dispatch = useDispatch();


  if (step !== 2) return null;
  return (
    <div style={{
      width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '8vh',
    }}
    >
      <Paper style={{ padding: 30, width: 500 }} elevation={1}>
        <Typography variant="h5">Meta Information</Typography>
        <Divider style={{ marginTop: 10, marginBottom: 25 }} />
        <TextField
          inputProps={{ style: { textAlign: 'center' } }}
          fullWidth
          style={{ marginBottom: 20 }}
          onChange={(e) => dispatch(setProductBoxName(e.target.value))}
          value={productBoxName}
          label="Name"
        />
        <CategorySelect />
      </Paper>
    </div>
  );
}
