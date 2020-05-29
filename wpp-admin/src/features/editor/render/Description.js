import React from 'react';
import config from '../../../config';

const paragraphStyle = (template) => ({
  margin: 'auto',
  textAlign: template.description.textAlign,
  fontSize: template.description.fontSize,
  wordWrap: 'break-word',
  width: '100%',
  padding: '0 3%',
  color: template.description.color,
  boxSizing: 'border-box',
});

export default function Description({ template, style }) {
  return (
    <p
      className={`${config.name}_description`}
      style={{ ...paragraphStyle(template), ...style }}
      dangerouslySetInnerHTML={{ __html: template.description.text }}
    />
  );
}
