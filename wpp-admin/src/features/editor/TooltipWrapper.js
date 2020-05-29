import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/HelpOutline';
import { grey } from '@material-ui/core/colors';


export default function TooltipWrapper({ children, label }) {
  return (
    <div style={{
      fontSize: 50, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
    }}
    >
      {children}
      <Tooltip arrow title={<span style={{ fontSize: 14 }}>{label}</span>}>
        <div style={{
          position: 'relative', width: 27, height: 25, marginLeft: 12,
        }}
        >
          <HelpIcon style={{
            color: grey[500], position: 'absolute', top: 10, left: 0,
          }}
          />
        </div>
      </Tooltip>
    </div>
  );
}
