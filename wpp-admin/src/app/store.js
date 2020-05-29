import { configureStore } from '@reduxjs/toolkit';
import stepSlice from '../features/stepper/stepSlice';
import previewReducer from '../features/previews/previewSlice';
import editorReducer from '../features/editor/editorSlice';
import activeEditorSlice from '../features/editor/activeEditorSlice';
import routerReducer from '../routerSlice';

const store = configureStore({
  reducer: {
    router: routerReducer,
    step: stepSlice,
    preview: previewReducer,
    editor: editorReducer,
    activeEditor: activeEditorSlice,
  },
});

export default store;
