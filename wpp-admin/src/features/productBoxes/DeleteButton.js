import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { pink } from '@material-ui/core/colors';
import ListSubheader from '@material-ui/core/ListSubheader';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import deleteItem from './delete';

export default function DeleteButton({
  id, type, refetch, hideLabel, deleteFunc,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let button;
  if (hideLabel) {
    button = (
      <IconButton style={{ color: pink[300] }} size="small" onClick={handleClick}>
        <DeleteIcon />
      </IconButton>
    );
  } else {
    button = (
      <Button onClick={handleClick} startIcon={<DeleteIcon />} size="small" color="secondary">
        Delete
      </Button>
    );
  }

  return (
    <div>
      {button}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ListSubheader style={{ textAlign: 'center' }}>Are You Sure?</ListSubheader>
        <div>
          <Button
            onClick={() => {
              handleClose();
              if (deleteFunc) {
                deleteFunc();
              } else {
                deleteItem(id, type, refetch);
              }
            }}
            startIcon={<DeleteIcon />}
            size="small"
            color="secondary"
            style={{ width: 170 }}
          >
            Yes, Delete!
          </Button>
        </div>
        <div>
          <Button
            onClick={handleClose}
            size="small"
            color="primary"
            style={{ width: 170 }}
          >
            CANCEL
          </Button>
        </div>
      </Menu>
    </div>
  );
}
