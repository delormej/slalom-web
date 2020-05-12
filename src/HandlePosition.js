import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';

export default function HandlePositionPopover(props) {

  return (
      props.handlePosition !== null ? 
        <div>
          <Typography variant="overline">
            @{props.seconds} seconds
          </Typography><br/>
          <Typography variant="caption">
            Rope Angle: {props.handlePosition?.RopeAngleDegrees.toFixed(1)}
          </Typography><br/>
          <Typography variant="caption">
            Rope Rad/S: {props.handlePosition?.RopeSwingSpeedRadS.toFixed(1)}
          </Typography><br/>          
          <Typography variant="caption">
            Relative Speed (mps): {(props.handlePosition.HandleSpeedMps - props.handlePosition.BoatSpeedMps).toFixed(1)}
          </Typography>
      </div>
      : null
  );
}
