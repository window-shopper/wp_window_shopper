import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { indigo } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Menu from '@material-ui/core/Menu';
import Display from '../../components/Display';

export default function ViewButton({ template }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton style={{ color: indigo[300] }} size="small" onClick={handleClick}>
        <VisibilityIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Display template={template} close={handleClose} />
      </Menu>
    </div>
  );
}
