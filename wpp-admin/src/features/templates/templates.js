import React from 'react';
import Check from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../api';
import GetStarted from '../productBoxes/GetStarted';
import { routes } from '../../consts';
import DeleteButton from '../productBoxes/DeleteButton';
import DataLoader from '../productBoxes/DataLoader';
import { Item } from './item';
import previewInfo from '../previews/previewInfo';
import {
  setStartEdit,
  setReset,
} from '../editor/editorSlice';
import {
  selectPreview,
  selectSelectedIndex,
} from '../previews/previewSlice';
import {
  goTo,
} from '../../routerSlice';
import {
  setCustomize,

  selectState,
} from '../stepper/stepSlice';


const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export function Templates({ selectable }) {
  const { step } = useSelector(selectState);
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedIndex = useSelector(selectSelectedIndex);
  if (selectable && step !== 0) return null;
  return (
    <div className={classes.root}>
      <DataLoader displayOnLoad="LOADING" apiMethod={api.getTemplates}>
        {(templates, refetch) => (templates.length > 0
          ? templates.map((template, i) => (
            <Item
              index={i}
              key={i}
              template={template}
              title={template.templateName}
              el={previewInfo[template.previewInfo.kind].el}
              clickAll={selectable}
            >
              { !selectable && (
              <>
                <DeleteButton type="template" refetch={refetch} id={template.templateID} />
                <Button
                  onClick={() => {
                    dispatch(selectPreview(i));
                    dispatch(setStartEdit(template));
                    dispatch(goTo({ page: routes.create_new_template }));
                    dispatch(setCustomize());
                  }}
                  startIcon={<EditIcon />}
                  size="small"
                  color="primary"
                >
                  Edit
                </Button>
              </>
              )}
              {selectable && i === selectedIndex && (
              <Button
                startIcon={<Check />}
                onClick={() => dispatch(selectPreview(-1))}
                variant="contained"
                color="primary"
                size="small"
              >
                Selected
              </Button>
              )}
              {selectable && i !== selectedIndex && (
              <Button
                onClick={() => {
                  dispatch(setReset());
                  dispatch(selectPreview(i));
                  dispatch(setStartEdit(template));
                }}
                size="small"
                color="primary"
              >
                Select
              </Button>
              )}
            </Item>
          ))
          : (
            <GetStarted
              page={routes.create_new_template}
              text="Template"
            />
          ))}
      </DataLoader>
    </div>
  );
}
