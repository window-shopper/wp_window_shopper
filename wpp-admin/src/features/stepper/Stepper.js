import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import SaveButton from './SaveButton';

import {
  selectState,
  nextStep, previousStep,
} from './stepSlice';
import * as editorSlice from '../editor/editorSlice';
import {
  selectSelectedIndex,
} from '../previews/previewSlice';
import {
  selectCurrentPage,
} from '../../routerSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    // position: 'fixed',
    top: 0,
    right: 0,
    backgroundColor: 'white',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  stepper: {
    width: '80%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  buttons: {
    position: 'fixed',
    display: 'flex',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    // padding: theme.spacing(2),
    width: '100%',
    paddingBottom: 20,
    bottom: 0,
    right: 0,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

let originalOnWindowUnload;

export function CreationStepper(props) {
  useEffect(() => {
    originalOnWindowUnload = window.onbeforeunload;
    window.onbeforeunload = () => 'Do you really want to leave?';
  }, []);
  useEffect(() => () => {
    window.onbeforeunload = originalOnWindowUnload;
  }, []);
  const { children } = props;
  const editorState = useSelector(editorSlice.selectState);
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { last, first, step } = useSelector(selectState);
  const selectedPreviewIndex = useSelector(selectSelectedIndex);
  let labels;
  let relevantID;
  if (currentPage === 'create_new_template') {
    labels = ['Layout', 'Customize', 'Name'];
    relevantID = editorState.templateID;
  } else if (currentPage === 'create_new_product_box') {
    labels = ['Template', 'Content', 'Name'];
    relevantID = editorState.productBoxID;
  }


  return (
    <>
      <div>
        {children}
        <div style={{ width: '100%', height: 60 }} />
      </div>
      <div className={classes.buttons}>
        <div style={{ flex: 1 }} />
        <div
          style={{
            marginRight: '3%', borderRadius: 50, flex: 3, border: '2px solid rgba(17, 82, 147, 0.11)',
          }}
          className={classes.root}
        >
          <Stepper activeStep={step} className={classes.stepper}>
            {labels.map((label) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        <div style={{
          margin: '0 10px',
          padding: '0 25px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 50,
          border: '2px solid rgba(17, 82, 147, 0.11)',
          marginRight: '3%',
        }}
        >
          <div>
            <div style={{ display: 'flex' }}>
              <Button
                disabled={first || (relevantID && step === 1)}
                onClick={() => dispatch(previousStep())}
                className={classes.button}
              >
                Back
              </Button>
              {last
                ? (
                  <SaveButton disabled={editorState.templateName === '' || editorState.shortcode === ''} />
                )
                : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch(nextStep());
                    }}
                    className={classes.button}
                    disabled={selectedPreviewIndex === -1 && step === 0}
                  >
                    Next
                  </Button>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
