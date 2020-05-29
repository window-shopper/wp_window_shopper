import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function CircularIndeterminate() {
  return (
    <div style={{
      width: '85%', marginTop: 280, display: 'flex', justifyContent: 'center',
    }}
    >
      <CircularProgress />
    </div>
  );
}
