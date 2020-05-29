import React from 'react';
import config from '../../../config';
import { evalTextDecoration } from './eval';

const containerStyle = (template) => ({
  width: '90%',
  margin: '0px auto',
  textAlign: template.caption.textAlign,
  textDecoration: evalTextDecoration(template.caption),
});

const spanStyle = {
  fontSize: 28,
  wordWrap: 'break-word',
};


export default function ({ template, style }) {
  const { caption } = template;
  return (
    <div
      className={`${config.name}_caption`}
      style={{ ...containerStyle(template), ...style }}
    >
      <span style={spanStyle}>{caption.text}</span>
    </div>
  );
}
