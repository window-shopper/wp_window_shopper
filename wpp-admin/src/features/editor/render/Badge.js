import React from 'react';
import config from '../../../config';

const badgeStyle = (template) => ({
  overflow: 'hidden',
  lineHeight: `${template.badge.size}px`,
  fontWeight: 'bold',
  fontSize: 14 + ((template.badge.size - 28) / 2),
  height: template.badge.size,
  position: 'absolute',
  zIndex: 1,
  left: -9 - (template.item.hasBorder ? template.item.borderThickness : 0),
  top: -9 - (template.badge.size - 28) - (template.item.hasBorder ? template.item.borderThickness : 0),
  backgroundColor: template.badge.backgroundColor,
  color: template.badge.color,
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
  paddingLeft: 7 + ((template.badge.size - 28) / 1.5),
  paddingRight: 7 + ((template.badge.size - 28) / 1.5),
});

const triangleStyle = (template) => ({
  position: 'absolute',
  width: 0,
  zIndex: 0,
  top: 14 - (template.item.hasBorder ? template.item.borderThickness : 0),
  left: -8 + ((template.item.hasBorder ? template.item.borderThickness : 0) * -1),
  height: 0,
  borderTop: '5px solid transparent',
  borderRight: '8px solid rgb(85, 85, 85)',
  borderBottom: '6px solid transparent',
});


export default function ({ template }) {
  if (!template.badge.showBadge) return null;
  return (
    <>
      <div
        className={`${config.name}_badge`}
        style={badgeStyle(template)}
      >
        {template.badge.text}
      </div>
      <div style={triangleStyle(template)} />
    </>
  );
}
