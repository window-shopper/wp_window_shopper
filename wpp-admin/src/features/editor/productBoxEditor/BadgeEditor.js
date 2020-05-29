import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TextFieldElement from '../TextFieldElement';
import {
  selectState,
  setBadge,
} from '../editorSlice';

export function BadgeEditor() {
  const { badge } = useSelector(selectState);

  if (!badge.showBadge) {
    return (
      <Typography
        align="center"
        variant="body2"
        color="textSecondary"
        component="p"
      >
        A badge was not selected for this template!
      </Typography>
    );
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <TextFieldElement disabled={!badge.showBadge} item={badge} setItem={setBadge} label="Text" keyName="text" />
    </div>
  );
}
