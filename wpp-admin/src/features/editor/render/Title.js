import React from 'react';
import { hideLink, evalTextDecoration } from './eval';
import config from '../../../config';

const containerStyle = (template) => ({
  width: '90%',
  margin: 'auto',
  textAlign: template.title.textAlign,
});

const linkStyle = (template) => ({
  width: '100%',
  textDecoration: evalTextDecoration(template.title),
  cursor: template.title.hasLink ? 'pointer' : 'auto',
  color: template.title.color,
});

const spanStyle = (template) => ({
  fontSize: template.title.fontSize,
  marginTop: 2,
  marginBottom: 2,
  wordWrap: 'break-word',
  color: template.title.color,
});

export default function ({ template, style }) {
  const { title, item } = template;
  const { linkNoFollow, linkNewTab } = template.item;
  return (
    <div
      className={`${config.name}_title_wrapper`}
      style={{ ...containerStyle(template), ...style }}
    >
      <a
        style={linkStyle(template)}
        rel={linkNoFollow && 'nofollow'}
        target={linkNewTab && '_blank'}
        href={title.hasLink && !hideLink(template) ? item.link : undefined}
        className={`${config.name}_title_link`}
      >
        {title.htmlTag === 'h2' && <h2 className={`${config.name}_title`} style={spanStyle(template)}>{title.text}</h2>}
        {title.htmlTag === 'h3' && <h3 className={`${config.name}_title`} style={spanStyle(template)}>{title.text}</h3>}
        {title.htmlTag === 'h4' && <h4 className={`${config.name}_title`} style={spanStyle(template)}>{title.text}</h4>}
        {title.htmlTag === 'h5' && <h5 className={`${config.name}_title`} style={spanStyle(template)}>{title.text}</h5>}
        {title.htmlTag === 'h6' && <h6 className={`${config.name}_title`} style={spanStyle(template)}>{title.text}</h6>}
      </a>
    </div>
  );
}
