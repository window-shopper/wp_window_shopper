import React from 'react';
import { evalBorder } from './eval';
import Ad from './Ad';
import Badge from './Badge';
import Image from './Image';
import Title from './Title';
import CallToAction from './CallToAction';
import config from '../../../config';

const containerStyle = (template) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  border: evalBorder(template.item),
  borderRadius: template.item.borderRadius,
  padding: '4%',
  backgroundColor: template.item.backgroundColor,
  boxShadow: template.item.boxShadow ? '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)' : 'none',
});

export default function RenderSimple({ template }) {
  return (
    <div className={`${config.name}_simple`} style={containerStyle(template)}>
      <Badge template={template} />
      <Image style={{ margin: '10px auto' }} template={template} />
      <Title style={{ margin: '5px auto' }} template={template} />
      <CallToAction style={{ marginTop: 13 }} ctaKeyName="cta1" template={template} />
      <Ad />
    </div>
  );
}
