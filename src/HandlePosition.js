import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function HandlePositionPopover(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    
  };

  const id = open ? 'simple-popover' : undefined;

  return (
      props.handlePosition !== null ? 
        <div>
          <Typography variant="overline">
            @{props.seconds.toFixed(1)} seconds
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
