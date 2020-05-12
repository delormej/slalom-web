import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  input: {
    width: 55,
  },    
}));

export default function HandlePositionPopover(props) {
  const classes = useStyles();
  const [clOffset, setClOffset] = useState();

  useEffect( () => {
    setClOffset(props.handlePosition?.RopeAngleDegrees.toFixed(1));
  });

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
            Relative Speed (mps): {(props.handlePosition.HandleSpeedMps - props.handlePosition.BoatSpeedMps).toFixed(1)}
          </Typography><br/>
          <Typography variant="caption">
            Center Line Offset: {props.clOffset}&deg;
          </Typography>
          <p/>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Input
                className={classes.input}
                value={clOffset}
                margin="dense"
                /*onChange={handleInputChange}
                onBlur={handleBlur}*/
                inputProps={{
                  step: 0.1,
                  min: -90,
                  max: 90,
                  type: 'number'
                }}
              />
            </Grid>
            <Grid item xs>
              <Button color="secondary" size="small" disabled={true} /*onClick={handleSetOffset}*/>
                SET OFFSET
              </Button>              
            </Grid>
          </Grid>          
      </div>
      : null
  );
}
