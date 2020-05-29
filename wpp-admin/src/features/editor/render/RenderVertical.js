import React from 'react';
import Badge from './Badge';
import Ad from './Ad';
import config from '../../../config';
import { evalBorder } from './eval';
import Image from './Image';
import Title from './Title';
import Description from './Description';
import CallToAction from './CallToAction';

const containerStyle = (template) => ({
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexWrap: 'wrap',
  border: evalBorder(template.item),
  borderRadius: template.item.borderRadius,
  backgroundColor: template.item.backgroundColor,
  boxShadow: template.item.boxShadow ? '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)' : 'none',
});

const leftHandStyle = {
  minWidth: 290,
  padding: '1%',
  display: 'flex',
  alignItems: 'center',
  flex: 1,
};
const rightHandStyle = {
  minWidth: 260,
  padding: '2% 1%',
  paddingTop: '1%',
  marginBottom: 5,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

export default function RenderVertical({ template }) {
  return (
    <div className={`${config.name}_simple`} style={containerStyle(template)}>
      <Badge template={template} />
      <div style={leftHandStyle}>
        <Image style={{ margin: '10px auto' }} template={template} />
      </div>
      <div style={rightHandStyle}>
        <Title style={{ margin: '5px auto', marginBottom: 0 }} template={template} />
        <Description style={{ margin: '18px auto', marginTop: 10 }} template={template} />
        <CallToAction
          style={{ paddingLeft: '2%', paddingRight: '2%' }}
          ctaKeyName="cta1"
          template={template}
        />
      </div>
      <Ad template={template} />
    </div>
  );
}
