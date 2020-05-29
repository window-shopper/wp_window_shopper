import React from 'react';
import clsx from 'clsx';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useSelector, useDispatch } from 'react-redux';
import navigate from '../drawer/navigate';
import savePropagating from './savePropagating';
import { routes } from '../../consts';
import config from '../../config';
import { selectState } from '../editor/editorSlice';
import {
  selectCurrentPage,
} from '../../routerSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function CircularIntegration({ disabled }) {
  const classes = useStyles();
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  const state = useSelector(selectState);
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => () => {
    clearTimeout(timer.current);
  }, []);

  let goToPage;
  let fetchParameter;
  let shoudlPatch = false;
  if (currentPage === routes.create_new_product_box) {
    goToPage = routes.product_boxes;
    fetchParameter = 'productbox';
    shoudlPatch = Boolean(state.productBoxID);
  }
  if (currentPage === routes.create_new_template) {
    goToPage = routes.templates;
    fetchParameter = 'template';
    shoudlPatch = Boolean(state.templateID);
  }

  const handleButtonClick = () => {
    if (!loading) {
      setLoading(true);
      setSuccess(false);
      setTimeout(async () => {
        const err = await savePropagating(state, fetchParameter, state.propagating, shoudlPatch);
        setLoading(false);
        if (err) {
          setSuccess(false);
          setError(true);
          return;
        }
        setSuccess(true);
        navigate(goToPage, dispatch);
      }, 300);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Tooltip arrow open={error} title="Sorry, something went wrong! Please try again.">
          <Button
            variant="contained"
            color={error ? 'secondary' : 'primary'}
            className={buttonClassname}
            disabled={loading || disabled}
            startIcon={<SaveIcon />}
            onClick={handleButtonClick}
          >
            Save
          </Button>
        </Tooltip>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}
