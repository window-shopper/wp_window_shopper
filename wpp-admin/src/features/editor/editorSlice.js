import { createSlice } from '@reduxjs/toolkit';
import defaultInnerHTML from './defaultInnerHTML';

export const initialState = {
  innerHTML: defaultInnerHTML,
  containerElementID: '',
  propagating: true,
  templateID: '',
  productBoxID: '',
  price: 0,
  createdAt: 0,
  lastModified: 0,
  category: '',
  templateName: 'My First Template',
  productBoxName: 'My First Product Box',
  previewInfo: {
    kind: 0,
  },
  item: {
    showWatermark: true,
    maxWidth: 500,
    minWidth: 280,
    hasBorder: true,
    borderColor: '#148bff',
    borderThickness: 5,
    borderRadius: 0,
    link: '',
    backgroundColor: '#ffffff',
    boxShadow: false,
    linkNoFollow: true,
    linkNewTab: true,
  },
  badge: {
    showBadge: false,
    backgroundColor: '#1d5ef9',
    color: '#ffffff',
    text: 'Disclaimer Text!',
    size: 28,
  },
  cta1: {
    backgroundColor: '#148bff',
    color: '#ffffff',
    textHoverColor: '#148bff',
    text: 'Call To Action',
    borderRadius: 0,
    hasLink: true,
    hoverColor: '#0d285e',
    hasBorder: false,
    borderColor: '#7195EF',
    borderThickness: 5,
    fullWidth: true,
    alignSelf: 'center',
    fontSize: 20,
  },
  cta2: {
    backgroundColor: '#1d5ef9',
    color: '#ffffff',
    text: 'Call To Action (2)',
    borderRadius: 0,
    hasLink: true,
    hoverColor: '#0d285e',
    hasBorder: false,
    borderColor: '#7195EF',
    borderThickness: 5,
    fullWidth: true,
    alignSelf: 'center',
    fontSize: 20,
  },
  title: {
    text: 'An Interesing Title',
    hasLink: true,
    isUnderlined: true,
    textAlign: 'center',
    color: '#333333',
    fontSize: 28,
    htmlTag: 'h3',
  },
  description: {
    textAlign: 'center',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    color: '#333333',
    fontSize: 15,
  },
  caption: {
    text: 'A Captivating Caption',
    isUnderlined: false,
    textAlign: 'center',
  },
  image: {
    hasLink: true,
    objectFit: 'scale-down',
    width: 95,
    url: '/wp-content/plugins/wp_window_shopper/wpp-admin/build/example_image.jpg',
    alt: '',
  },
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setItem: (state, action) => {
      state.item = action.payload;
    },
    setTitle: (state, action) => {
      const textHasChanged = action.payload.text !== state.title.text;
      const isNewProductBoxCreate = !state.productBoxID;
      if (isNewProductBoxCreate && textHasChanged) {
        state.productBoxName = action.payload.text;
      }
      state.title = action.payload;
    },
    setCta1: (state, action) => {
      state.cta1 = action.payload;
    },
    setCta2: (state, action) => {
      state.cta2 = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setCaption: (state, action) => {
      state.caption = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setBadge: (state, action) => {
      state.badge = action.payload;
    },
    setShortcode: (state, action) => {
      state.shortcode = action.payload;
    },
    setTemplateName: (state, action) => {
      state.templateName = action.payload;
    },
    setProductBoxName: (state, action) => {
      state.productBoxName = action.payload;
    },
    setPreviewInfoKind: (state, action) => {
      state.previewInfo.kind = action.payload;
      if (action.payload === 1) {
        state.item.maxWidth = 640;
        state.image.objectFit = 'cover';
      }
    },
    setInnerHTML: (state, action) => {
      state.innerHTML = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPropagating: (state, action) => {
      state.propagating = action.payload;
    },
    setReset: (state) => {
      Object.keys(state).forEach((key) => {
        state[key] = initialState[key];
      });
    },
    setStartEdit: (state, action) => {
      Object.keys(state).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const {
  setTemplateName, setShortcode, setPropagating, setBadge,
  setItem, setTitle, setImage, setCaption, setDescription, setCta2, setCta1,
  setReset, setProductBoxName, setPreviewInfoKind, setStartEdit, setInnerHTML, setCategory,
} = editorSlice.actions;

export const selectState = (state) => state.editor;
export const selectTemplateName = (state) => state.editor.templateName;
export const selectProductBoxName = (state) => state.editor.productBoxName;
export const selectShortcode = (state) => state.editor.shortcode;

export default editorSlice.reducer;
