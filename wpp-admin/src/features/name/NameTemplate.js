import React from 'react';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '../../components/TextField';
import {
  selectState,
  setTemplateName,
  setPropagating,
} from '../editor/editorSlice';
import { selectStep } from '../stepper/stepSlice';

const style = {
  marginTop: 10, marginBottom: 10, marginLeft: 5, marginRight: 5,
};

export function NameTemplate() {
  const step = useSelector(selectStep);
  const { templateName, propagating, templateID } = useSelector(selectState);
  const dispatch = useDispatch();

  if (step !== 2) return null;
  return (
    <div style={{
      width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '8vh',
    }}
    >
      <Paper style={{ padding: 30, width: 500 }} elevation={1}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5">
            Meta Information
          </Typography>
          {/* propagating && <CallSplitIcon style={{ color: 'rgba(0, 0, 0, 0.4)' }} /> */}
        </div>
        <Divider style={{ marginTop: 10, marginBottom: 25 }} />
        <TextField
          inputProps={{ style: { textAlign: 'center' } }}
          fullWidth
          style={{ marginBottom: 20 }}
          onChange={(e) => dispatch(setTemplateName(e.target.value))}
          value={templateName}
          label="Name"
        />
        {/* !templateID
      && (
      <>
        <FormControlLabel
          style={{ ...style, marginBottom: 7, marginLeft: -5 }}
          control={(
            <Switch
              color="primary"
              checked={propagating}
              onChange={() => dispatch(setPropagating(!propagating))}
            />
        )}
          label="Global Template*"
        />
        <Typography
          style={{ width: '90%', opacity: 0.7 }}
          align="left"
          variant="body2"
          color="textSecondary"
          component="p"
        >
          *A Global Template retains
          {' '}
          <b>control</b>
          {' '}
          over it&apos;s
          {' '}
          Product Boxes. All future
          {' '}
          <b>changes</b>
          {' '}
          to a Global Template will be applied to the all Product Boxes built on top of it,
          allowing you to make adjustments to hundreds of Product Boxes with only one click.
        </Typography>
      </>
      ) */ }
      </Paper>
    </div>
  );
}
