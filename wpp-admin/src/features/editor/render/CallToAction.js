import React, { useState } from 'react';
import { hideLink, evalBorder } from './eval';

import config from '../../../config';

const linkStyle = (cta) => ({
  textDecoration: 'none',
  cursor: cta.hasLink ? 'pointer' : 'auto',
});
const buttonStyle = ({
  color, backgroundColor, borderRadius, hoverColor,
  hasBorder, borderThickness, borderColor, fullWidth,
  fontSize, textHoverColor,
}, isHovering) => ({
  borderRadius,
  color: isHovering ? textHoverColor : color,
  backgroundColor: isHovering ? hoverColor : backgroundColor,
  border: evalBorder({ hasBorder, borderThickness, borderColor }),
  justifyContent: 'center',
  justifyItems: 'center',
  margin: 'auto',
  fontSize,
  lineHeight: `${fontSize + 18}px`,
  fontWeight: 'bold',
  wordBreak: 'break-word',
  textAlign: 'center',
  padding: '0 5%',
  display: 'inline-block',
  width: fullWidth ? '100%' : 'unset',
  boxSizing: 'border-box',
});

const containerStyle = ({ fullWidth, alignSelf }) => ({
  width: fullWidth ? '100%' : 'unset',
  textAlign: alignSelf,
});

export default function ({ template, style, ctaKeyName }) {
  const cta = template[ctaKeyName];
  const [isHovering, setHovering] = useState(false);
  const { linkNoFollow, linkNewTab } = template.item;
  return (
    <div
      className={`${config.name}_${ctaKeyName}`}
      style={{ ...containerStyle(cta), ...style }}
    >
      <a
        style={linkStyle(cta)}
        rel={linkNoFollow && 'nofollow'}
        className={`${config.name}_${ctaKeyName}_link`}
        target={linkNewTab && '_blank'}
        href={cta.hasLink && !hideLink(template) ? template.item.link : undefined}
      >
        <div
          onMouseLeave={() => setHovering(false)}
          onMouseEnter={() => setHovering(true)}
          style={buttonStyle(cta, isHovering)}
          className={`${ctaKeyName}_hoverable`}
        >
          {cta.text}
        </div>
      </a>
    </div>
  );
}
