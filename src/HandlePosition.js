import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  input: {
    width: 60,
  },    
}));

export default function HandlePositionPopover(props) {
  const classes = useStyles();
  const [clOffset, setClOffset] = useState(0);
  
  useEffect( () => {
    if (props.handlePosition !== undefined && props.handlePosition !== null &&
        !isNaN(props.handlePosition.RopeAngleDegrees)) {
      console.log("useEffect:", props.handlePosition.RopeAngleDegrees.toFixed(1) * -1);
      setClOffset(props.handlePosition.RopeAngleDegrees.toFixed(1) * -1);
    }
  }, [props.handlePosition] );

  const handleInputChange = (e) => {
    console.log("input is: " + e.target.value);
    setClOffset(e.target.value);
  };

  const onSetOffset = () => {
    props.onSetOffset(clOffset);
  };

  return (
      props.handlePosition !== null ? 
        <div>
          <Typography variant="overline">
            @{props.seconds} seconds
          </Typography><br/>
          <Typography variant="caption">
            Rope Angle: {props.handlePosition?.RopeAngleDegrees.toFixed(1)}&deg;
          </Typography><br/>
          <Typography variant="caption">
            Rope Rad/S: {props.handlePosition?.RopeSwingSpeedRadS.toFixed(1)}
          </Typography><br/>          
          <Typography variant="caption">
            Relative Speed (mps): {(props.handlePosition?.HandleSpeedMps - props.handlePosition?.BoatSpeedMps).toFixed(1)}
          </Typography><br/>
          <Typography variant="caption">
            Center Line Offset: {props.video.centerLineDegreeOffset}&deg;
          </Typography>
          <p/>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <TextField
                id="clOffset"
                type="number"
                className={classes.input}
                value={clOffset}
                margin="dense"
                onChange={handleInputChange}
                inputProps={{
                  step: 0.1,
                  min: -90,
                  max: 90,
                  type: 'number'
                }}
              />
            </Grid>
            <Grid item xs>
              <Button color="secondary" size="small" disabled={false} onClick={onSetOffset}>
                SET OFFSET
              </Button>              
            </Grid>
          </Grid>          
      </div>
      : null
  );
}
