import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import api from '../../../../api';
import config from '../../../../config';

const Center = ({ children, column }) => (
  <div style={{
    width: '100%', display: 'flex', justifyContent: 'center', padding: 30, flexDirection: column ? 'column' : 'row', alignItems: 'center',
  }}
  >
    {children}
  </div>
);

const TryAgainError = ({ refetch }) => (
  <Center column>
    <Typography>
      Sorry, something went wrong!
    </Typography>
    <Button style={{ margin: 7 }} onClick={refetch} color="primary" variant="contained">Try Again</Button>
  </Center>
);


export default function DataLoader({ children }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const refetch = () => {
    setLoading(true);
    setTimeout(() => {
      api.getImages()
        .then((_data) => {
          setData(_data);
          setError(false);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
        });
    }, config.mockTimeout);
  };

  const triggerError = (err) => {
    console.log(err);
    setError(true);
  };

  const triggerLoading = () => {
    setLoading(true);
  };

  useEffect(refetch, []);


  if (loading) {
    return <Center><CircularProgress /></Center>;
  }
  if (error) return <TryAgainError refetch={refetch} />;
  return children(data, refetch, triggerLoading, triggerError);
}
