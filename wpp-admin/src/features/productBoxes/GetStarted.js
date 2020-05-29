import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import navigate from '../drawer/navigate';

export default function GetStarted({ text, page }) {
  const dispatch = useDispatch();
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '85%',
      paddingTop: 250,
    }}
    >
      <Typography style={{ color: 'grey' }} variant="h5">
        Get started by creating your first
        {' '}
        {text}
        !
      </Typography>
      <Button
        onClick={() => navigate(page, dispatch)}
        style={{ width: 200, margin: 30 }}
        variant="contained"
        color="primary"
      >
        Get Started
      </Button>
    </div>
  );
}
