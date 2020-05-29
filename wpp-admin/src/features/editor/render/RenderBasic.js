import React from 'react';
import { evalBorder } from './eval';
import Ad from './Ad';
import Badge from './Badge';
import Image from './Image';
import Title from './Title';
import Description from './Description';
import CallToAction from './CallToAction';
import config from '../../../config';

const containerStyle = (template) => ({
  justifyContent: 'space-between',
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  border: evalBorder(template.item),
  borderRadius: template.item.borderRadius,
  padding: '4%',
  backgroundColor: template.item.backgroundColor,
  boxShadow: template.item.boxShadow ? '0px 4px 2px -3px rgba(0,0,0,0.2), 0px 3px 3px 0px rgba(0,0,0,0.14), 0px 2px 6px 0px rgba(0,0,0,0.12)' : 'none',
});

export default function RenderBasic({ template }) {
  return (
    <div className={`${config.name}_basic`} style={containerStyle(template)}>
      <Badge template={template} />
      <Image style={{ margin: '10px auto' }} template={template} />
      <Title style={{ margin: '5px auto' }} template={template} />
      <Description style={{ margin: '8px auto' }} template={template} />
      <CallToAction style={{ marginTop: 13 }} ctaKeyName="cta1" template={template} />
      <Ad template={template} />
    </div>
  );
}
