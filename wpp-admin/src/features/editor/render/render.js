import React from 'react';
import ReactDOMServer from 'react-dom/server';
import RenderBasic from './RenderBasic';
import RenderVertical from './RenderVertical';
import RenderSimple from './RenderSimple';
import config from '../../../config';
// import RenderMultiAction from './RenderMultiAction';

export const render = (template) => {
  let box;
  switch (template.previewInfo.kind) {
    case 0:
      box = <RenderBasic template={template} />;
      break;
    case 1:
      box = <RenderVertical template={template} />;
      break;
    case 2:
      box = <RenderSimple template={template} />;
      break;
    // case 3:
    //   box = <RenderMultiAction template={template} />;
    //   break;
    default:
      box = <RenderBasic template={template} />;
      break;
  }

  return (
    <div
      style={{
        minWidth: template.item.minWidth, maxWidth: template.item.maxWidth, margin: '0px auto', padding: 5, flex: 1,
      }}
      className={`${config.name}_container ${config.name}_${template.containerElementID}`}
    >
      {box}
    </div>
  );
};


const styleText = (template, ctaKeyName) => `.${config.name}_${template.containerElementID} .${ctaKeyName}_hoverable:hover {background-color: ${template[ctaKeyName].hoverColor} !important; color: ${template[ctaKeyName].textHoverColor} !important;}`;

export const renderToString = (template) => `<script>
  existingStyle = document.getElementById("style_${template.containerElementID}")
  if (!existingStyle) {
    const newStyle = document.createElement("style");
    newStyle.innerHTML = "${`${styleText(template, 'cta1')} ${styleText(template, 'cta2')}`}";
    document.head.append(newStyle);
  };
  </script>
  ${ReactDOMServer.renderToString(render(template))}`;
