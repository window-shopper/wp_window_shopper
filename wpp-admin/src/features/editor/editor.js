import React, { useState, useRef, useEffect } from 'react';
import useComponentSize from '@rehooks/component-size';
import { useSelector, useDispatch } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useWindowSize from './useWindowSize';
import WidthSlider from './WidthSlider';
import previewInfo from '../previews/previewInfo';
import { render } from './render/render';
import templateEditors from './templateEditor/editors';
import productBoxEditors from './productBoxEditor/editors';
import {
  setActiveEditor,
  selectActiveEditor,
} from './activeEditorSlice';
import {
  selectState,
} from './editorSlice';
import {
  setWidth,
  selectResponsiveCheckWidth,
  selectSelectedIndex,
} from '../previews/previewSlice';
import * as stepSlice from '../stepper/stepSlice';

export default function Editor({ editorKind }) {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();
  const activeTemplateEditor = useSelector(selectActiveEditor);
  const selectedTemplateIndex = useSelector(selectSelectedIndex);
  const responsiveCheckWidth = useSelector(selectResponsiveCheckWidth);
  const editorState = useSelector(selectState);
  const { step } = useSelector(stepSlice.selectState);
  const ref = useRef(null);
  const renderSize = useComponentSize(ref);
  useEffect(() => {
    dispatch(setWidth(editorState.item.maxWidth));
  }, []);
  const preview = previewInfo[editorState.previewInfo.kind];
  if (step !== 1 || !preview || selectedTemplateIndex === -1) {
    return null;
  }

  let editors;
  if (editorKind === 'template') {
    editors = templateEditors;
  } else {
    editors = productBoxEditors;
  }

  let scrollableStyle = {};
  if (windowSize.height - renderSize.height < 300) {
    scrollableStyle = { maxHeight: windowSize.height - 270, overflowY: 'scroll' };
  }
  if (windowSize.width - responsiveCheckWidth < 700) {
    scrollableStyle = { ...scrollableStyle, maxWidth: windowSize.width - 650 - 30, overflowX: 'scroll' };
  } else {
    scrollableStyle = { ...scrollableStyle };
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{
        position: 'fixed', alignSelf: 'center', paddingRight: 'calc(133px + 15%)',
      }}
      >
        <div ref={ref} style={{ ...scrollableStyle }}>
          <div
            style={{
              width: responsiveCheckWidth,
              margin: 'auto',
              minHeight: '60vh',
              overflowY: 'show',
              marginTop: '3%',
            }}
    // prevent link clicks
            onClick={(e) => e.preventDefault()}
          >
            {render(editorState)}
          </div>
        </div>
        <WidthSlider />
      </div>
      <div style={{ width: 'calc(170px + 15%)', alignSelf: 'flex-end', padding: 30 }}>
        {editors.filter((editor) => preview.info[editor.selector]).map((editor, i) => (
          <ExpansionPanel
            key={i}
            expanded={i === activeTemplateEditor}
            onChange={() => {
              if (i === activeTemplateEditor) {
                dispatch(setActiveEditor(-1));
              } else {
                dispatch(setActiveEditor(i));
              }
            }}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{editor.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {editor.component}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    </div>
  );
}
