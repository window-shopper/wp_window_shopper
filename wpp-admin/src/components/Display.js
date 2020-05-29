import React from 'react';
import Button from '@material-ui/core/Button';

export default function Display({ template, close }) {
  const previewKind = template.previewInfo.kind;
  let containerStyle;
  let style;
  if (previewKind === 1) {
    containerStyle = { width: 600 };
    style = {};
  } else {
    containerStyle = { width: 330 };
    style = {};
  }

  return (
    <div style={containerStyle}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div style={{
          position: 'absolute', width: '100%', height: '100%', backgroundColor: 'trnasparent', zIndex: 1,
        }}
        />
        <div style={{ ...style, transform: 'scale(0.80)' }} dangerouslySetInnerHTML={{ __html: template.innerHTML }} />
      </div>
      <Button
        style={{ margin: 'auto', width: '100%' }}
        onClick={close}
        size="small"
        color="primary"
      >
        Close
      </Button>
    </div>
  );
}
