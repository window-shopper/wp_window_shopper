import { diff } from 'deep-object-diff';
import shortid from 'shortid';
import merge from 'merge';
import api from '../../api';
import { renderToString } from '../editor/render/render';


export default async function savePropagating(state, parameter, propagate, shoudlPatch) {
  let err;
  const setErr = (error) => {
    if (error) console.log(error);
    err = error;
  };

  let { containerElementID } = state;
  if (!containerElementID) {
    containerElementID = shortid.generate();
  }
  let template = { ...state, containerElementID };
  template.innerHTML = renderToString(template);

  let originalTemplate;
  if (parameter === 'template' && propagate && Boolean(template.templateID)) {
    originalTemplate = await api.getTemplate(template.templateID).catch(setErr);
    if (err) {
      return err;
    }
  }

  if (shoudlPatch) {
    template = { ...template, lastModified: new Date().getTime() };
  }
  // so that I can use a single lastModified value for templates and product boxes
  // otherwise a product box would inherit the template's lastModified when created
  if (parameter === 'productbox' && !shoudlPatch) {
    template = { ...template, lastModified: 0 };
  }

  if (shoudlPatch) {
    if (parameter === 'template') {
      api.patchTemplate(template).catch(setErr);
    } else {
      api.patchProductBox(template).catch(setErr);
    }
  } else if (parameter === 'template') {
    api.postTemplate({ ...template, createdAt: new Date().getTime() }).catch(setErr);
  } else {
    api.postProductBox({ ...template, createdAt: new Date().getTime() }).catch(setErr);
  }

  if (err) {
    return err;
  }
  if (!propagate || parameter === 'productbox' || !template.templateID) {
    return false;
  }

  if (!originalTemplate) {
    return true;
  }

  // Since urls of example images should not be propagated on to the product boxes
  template = { ...template, image: { ...template.image, url: originalTemplate.image.url } };
  const templateDiff = diff(originalTemplate, template);

  const productBoxes = await api.getProductBoxesByTemplateID(template.templateID).catch(setErr);
  if (err) {
    return err;
  }

  const updatedProductBoxes = [];
  productBoxes.forEach((productBox) => {
    updatedProductBoxes.push(merge.recursive(productBox, templateDiff));
  });

  updatedProductBoxes.forEach((productBox) => {
    productBox.innerHTML = renderToString(productBox);
  });

  await api.patchProductBoxes(updatedProductBoxes).catch(setErr);
  if (err) {
    return err;
  }

  return false;
}
