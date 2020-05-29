import {
  goTo,
} from '../../routerSlice';
import {
  setActiveEditor,
} from '../editor/activeEditorSlice';
import {
  setReset,
} from '../editor/editorSlice';
import {
  reset,
} from '../stepper/stepSlice';
import {
  selectPreview,
} from '../previews/previewSlice';

export default (page, dispatch) => {
  dispatch(goTo({ page }));
  dispatch(setReset());
  dispatch(reset());
  dispatch(selectPreview(-1));
  dispatch(setActiveEditor(0));
};
