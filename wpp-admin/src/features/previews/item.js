import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Check from '@material-ui/icons/Check';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectPreview,
  selectSelectedIndex,
} from './previewSlice';
import {
  setReset,
  setPreviewInfoKind,
} from '../editor/editorSlice';

const useStyles = makeStyles(({
  root: {
    width: 340,
    marginLeft: '4%',
    marginRight: '4%',
    marginTop: 30,
    marginBottom: 30,
  },
  media: {
    backgroundColor: 'rgba(17, 82, 147, 0.11)',
    // backgroundColor: theme.palette.divider,
    height: 225,
  },
  description: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  action: {
    justifyContent: 'flex-end',
  },
}));

export function Item({
  previewInfo, index,
}) {
  const selectedIndex = useSelector(selectSelectedIndex);
  const isSelected = selectedIndex === index;
  const {
    el, title,
  } = previewInfo;
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card
      style={{ cursor: 'pointer' }}
      onClick={() => {
        if (isSelected) {
          dispatch(selectPreview(-1));
        } else {
          dispatch(setReset());
          dispatch(selectPreview(index));
          dispatch(setPreviewInfoKind(index));
        }
      }}
      elevation={2}
      className={classes.root}
    >
      <CardMedia
        className={classes.media}
      >
        <div style={{
          height: 225, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
        >
          {el}
        </div>
      </CardMedia>
      <CardContent className={classes.description}>
        <Typography align="left" gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
      </CardContent>
      <CardActions className={classes.action}>
        {isSelected
          ? (
            <Button
              startIcon={<Check />}
              onClick={() => dispatch(selectPreview(-1))}
              variant="contained"
              color="primary"
              size="small"
            >
              Selected
            </Button>
          )
          : (
            <Button
              onClick={() => {
                dispatch(setReset());
                dispatch(selectPreview(index));
                dispatch(setPreviewInfoKind(index));
              }}
              size="small"
              color="primary"
            >
              Select
            </Button>
          )}
      </CardActions>
    </Card>
  );
}
