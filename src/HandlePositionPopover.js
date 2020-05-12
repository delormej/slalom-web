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
          <Typography className={classes.typography}>
            {props.handlePosition?.RopeAngleDegrees.toFixed(1)}
          </Typography>
          <Typography className={classes.typography}>
            {(props.handlePosition.BoatSpeedMps - props.handlePosition.HandleSpeedMps).toFixed(1)}
          </Typography>
      </div>
      : null
  );
}
