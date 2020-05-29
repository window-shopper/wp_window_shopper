import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import BorderInnerIcon from '@material-ui/icons/BorderInner';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HelpIcon from '@material-ui/icons/Help';
import WebIcon from '@material-ui/icons/Web';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import navigate from './navigate';
import { routes } from '../../consts';
import {
  selectStep,
} from '../stepper/stepSlice';

import {
  selectCurrentPage,
} from '../../routerSlice';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflowY: 'hidden',
  },
  drawer: {
    width: 240,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


const confirmNavigation = () => window.confirm('Changes may not be saved. Do you wish to continue regardless?');

export function SideDrawer(props) {
  const currentPage = useSelector(selectCurrentPage);
  const currentStep = useSelector(selectStep);
  const confirmRequired = currentStep === 1 || currentStep === 2;
  const dispatch = useDispatch();
  const { children } = props;
  const classes = useStyles();
  const [hovered, setHovered] = useState(false);
  const collapsed = !hovered && (currentPage === routes.create_new_product_box || currentPage === routes.create_new_template);


  const drawer = (
    <div style={{ width: drawerWidth }}>
      <div className={classes.toolbar}>
        <img src="/wp-content/plugins/wp_window_shopper/wpp-admin/build/wpws_icon.png" style={{ width: 40, marginLeft: -18, marginRight: 15 }} alt="wpws_icon" />
        <Typography
          style={{
            opacity: collapsed ? 0 : 1,
            transition: 'opacity 0.2s linear',
            transitionDelay: '0.1s',
            fontSize: 20,
          }}
          variant="h5"
        >
          Window Shopper
        </Typography>
      </div>
      <Divider />
      <List subheader={(
        <ListSubheader style={{
          opacity: collapsed ? 0 : 1, transition: 'opacity 0.2s linear', transitionDelay: '0.1s',
        }}
        >
          Product Boxes
        </ListSubheader>
)}
      >
        <ListItem
          selected={currentPage === routes.product_boxes}
          button
          onClick={() => {
            if (confirmRequired) {
              const confirmed = confirmNavigation();
              if (!confirmed) return;
            }
            navigate(routes.product_boxes, dispatch);
          }}
        >
          <ListItemIcon><WebIcon /></ListItemIcon>
          <ListItemText primary="Product Boxes" />
        </ListItem>
        <ListItem
          selected={currentPage === routes.create_new_product_box}
          button
          onClick={() => {
            if (confirmRequired) {
              const confirmed = confirmNavigation();
              if (!confirmed) return;
            }
            navigate(routes.create_new_product_box, dispatch);
          }}
        >
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary="Create New" />
        </ListItem>
      </List>
      <Divider />
      <List subheader={(
        <ListSubheader style={{
          opacity: collapsed ? 0 : 1, transition: 'opacity 0.2s linear', transitionDelay: '0.1s',
        }}
        >
          Templates
        </ListSubheader>
      )}
      >
        <ListItem
          selected={currentPage === routes.templates}
          button
          onClick={() => {
            if (confirmRequired) {
              const confirmed = confirmNavigation();
              if (!confirmed) return;
            }
            navigate(routes.templates, dispatch);
          }}
        >
          <ListItemIcon><BorderInnerIcon /></ListItemIcon>
          <ListItemText primary="Templates" />
        </ListItem>
        <ListItem
          selected={currentPage === routes.create_new_template}
          button
          onClick={() => {
            if (confirmRequired) {
              const confirmed = confirmNavigation();
              if (!confirmed) return;
            }
            navigate(routes.create_new_template, dispatch);
          }}
        >
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary="Create New" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          selected={currentPage === routes.help}
          button
          onClick={() => {
            if (confirmRequired) {
              const confirmed = confirmNavigation();
              if (!confirmed) return;
            }
            navigate(routes.help, dispatch);
          }}
        >
          <ListItemIcon><HelpIcon /></ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div
        style={{
          height: '100vh',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          transitionProperty: 'width, min-width',
          transitionDuration: '0.3s',
          width: collapsed ? 55 : drawerWidth,
          minWidth: 55,
          overflow: 'hidden',
          backgroundColor: 'white',
          position: 'fixed',
          zIndex: 10,
        }}
        onMouseLeave={() => setHovered(false)}
        onMouseEnter={() => setHovered(true)}
      >
        {drawer}
      </div>
      <div
        style={{
          height: '100vh',
          transitionProperty: 'width, min-width',
          transitionDuration: '0.3s',
          width: collapsed ? 55 : drawerWidth,
          minWidth: collapsed ? 55 : drawerWidth,
          overflow: 'hidden',
        }}
      />
      { children }
    </div>
  );
}
