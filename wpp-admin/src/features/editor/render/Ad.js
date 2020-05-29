import React from 'react';


export default function ({ template }) {
  return (
    <div style={{ height: 3, marginTop: 5 }}>
      <div style={{
        position: 'absolute',
        right: 5,
        bottom: 1,
        fontSize: 10,
        lineHeight: '12px',
        color: 'rgba(0,0,0, 0.4)',
      }}
      >
        {template.item.showWatermark && (
        <a
          href={undefined}
          rel="nofollow"
          style={{ textDecoration: 'none', color: 'rgba(0,0,0, 0.4)' }}
        >
          made with WPWS
        </a>
        )}
      </div>
    </div>
  );
}
