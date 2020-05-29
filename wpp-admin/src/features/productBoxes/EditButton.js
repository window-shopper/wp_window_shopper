import React from 'react';
import { indigo } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import {
  setStartEdit,
} from '../editor/editorSlice';
import {
  goTo,
} from '../../routerSlice';
import {
  setCustomize,
} from '../stepper/stepSlice';
import {
  selectPreview,
} from '../previews/previewSlice';

export default function EditButton({
  index, template, page, hideLabel,
}) {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(selectPreview(index));
    dispatch(setStartEdit(template));
    dispatch(goTo({ page }));
    dispatch(setCustomize());
  };
  if (hideLabel) {
    return (
      <IconButton style={{ color: indigo[300] }} size="small" onClick={onClick}>
        <EditIcon />
      </IconButton>
    );
  }
  return (
    <Button
      onClick={onClick}
      startIcon={<EditIcon />}
      size="small"
      color="primary"
    >
      Edit
    </Button>
  );
}
