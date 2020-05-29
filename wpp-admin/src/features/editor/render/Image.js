import React from 'react';
import { hideLink } from './eval';
import config from '../../../config';

const imgHeight = (image) => {
  if (image.objectFit === 'scale-down') {
    return 'unset';
  }
  return 280 * (image.width / 100);
};

const imageStyle = (template) => ({
  objectFit: template.image.objectFit,
  width: '100%',
  height: imgHeight(template.image),
  margin: 'auto',
});

const linkStyle = (template) => ({
  margin: 'auto',
  width: `${template.image.width}%`,
  height: imgHeight(template.image),
  cursor: template.image.hasLink ? 'pointer' : 'auto',
});


export default function ({ template, style }) {
  const { linkNoFollow, linkNewTab } = template.item;
  return (
    <a
      className={`${config.name}_image_link`}
      href={template.image.hasLink && !hideLink(template) ? template.item.link : undefined}
      rel={linkNoFollow && 'nofollow'}
      target={linkNewTab && '_blank'}
      style={{ ...linkStyle(template), ...style }}
    >
      <img
        className={`${config.name}_image`}
        alt={template.image.alt}
        src={template.image.url}
        style={imageStyle(template)}
      />
    </a>
  );
}
