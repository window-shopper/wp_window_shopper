import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Loading from '../Loading';
import config from '../../config';


function Error({ refetch }) {
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
        Sorry, something went wrong! Please try again.
      </Typography>
      <Button
        onClick={refetch}
        style={{ width: 200, margin: 30 }}
        variant="outlined"
        color="primary"
      >
        Reload
      </Button>
    </div>
  );
}

export default function DataLoader({ apiMethod, children }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const refetch = () => {
    setLoading(true);
    setTimeout(() => {
      apiMethod()
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

  useEffect(refetch, []);

  if (loading) return <Loading />;
  if (error) return <Error refetch={refetch} />;
  return children(data, refetch);
}
