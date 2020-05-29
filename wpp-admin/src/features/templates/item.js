import React from 'react';
import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {
  setReset,
  setStartEdit,
  setPreviewInfoKind,
} from '../editor/editorSlice';
import {
  selectPreview,
  selectSelectedIndex,
} from '../previews/previewSlice';
import config from '../../config';

const useStyles = makeStyles(({
  root: {
    width: 340,
    marginLeft: '4%',
    marginRight: '4%',
    marginTop: 30,
    marginBottom: 30,
  },
  media: {
    // backgroundColor: grey[100],
    height: 225,
  },
  description: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  action: {
    justifyContent: 'flex-end',
    height: 60,
  },
}));

export function Item({
  title, template, children, showShortcode, clickAll, index,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedIndex = useSelector(selectSelectedIndex);
  const isSelected = index === selectedIndex;

  const wide = template.previewInfo.kind === 1;

  return (
    <Card
      style={{ cursor: clickAll ? 'pointer' : 'auto' }}
      onClick={() => {
        if (!clickAll) return;
        if (isSelected) {
          dispatch(selectPreview(-1));
        } else {
          dispatch(setReset());
          dispatch(selectPreview(index));
          dispatch(setStartEdit(template));
        }
      }}
      elevation={2}
      className={classes.root}
    >
      <CardMedia
        className={classes.media}
      >
        <div style={{
          position: 'relative', height: 225, marginLeft: wide ? '-50%' : '-15%', width: wide ? '200%' : '130%', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <div style={{
            position: 'absolute', width: '100%', height: '100%', backgroundColor: 'trnasparent', zIndex: 1,
          }}
          />
          <div style={{ transform: 'scale(0.35)' }} dangerouslySetInnerHTML={{ __html: template.innerHTML }} />
        </div>
      </CardMedia>
      <Divider />
      <CardContent className={classes.description}>
        <Typography align="left" gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography style={{ maxHeight: 84 }} align="left" variant="body2" color="textSecondary" component="p">
          Last Modified:
          {' '}
          {template.lastModified ? config.formatDate(new Date(template.lastModified)) : config.formatDate(new Date(template.createdAt))}
        </Typography>
      </CardContent>
      <CardActions style={{ paddingTop: 12, display: 'flex', justifyContent: 'space-between' }} className={classes.action}>
        <div style={{ paddingLeft: 8 }}>
          {/* template.propagating
          && (
            <CallSplitIcon style={{ color: 'rgba(0, 0, 0, 0.4)' }} />
          ) */}
        </div>
        <div style={{ display: 'flex' }}>
          {children}
        </div>
      </CardActions>
    </Card>
  );
}
