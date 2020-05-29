import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function SimpleSnackbar({
  shortcode, open, handleClose,
}) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
      message="Shortcode was copied to Clipboard!"
      action={(
        <>
          <IconButton size="small" aria-label="close" color="inherit">
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
        )}
    />
  );
}
