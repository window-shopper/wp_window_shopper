import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../api';
import { routes } from '../../consts';
import ProductBoxesTable from './ProductBoxesTable';
import DataLoader from './DataLoader';
import GetStarted from './GetStarted';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export function ProductBoxes() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DataLoader displayOnLoad="LOADING" apiMethod={api.getProductBoxes}>
        {(productBoxes, refetch) => (productBoxes.length > 0
          ? <ProductBoxesTable refetch={refetch} productBoxes={productBoxes} />
          : <GetStarted page={routes.create_new_product_box} text="Product Box" />)}
      </DataLoader>
    </div>
  );
}
