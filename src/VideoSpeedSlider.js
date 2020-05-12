import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import SpeedIcon from '@material-ui/icons/Speed';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

export default function VideoSpeedSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0.25);
  const onChange = props.onChange;

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Slider 
            value={value} 
            min={0.25}
            max={1.0}
            step={0.25}
            valueLabelDisplay="auto"
            onChange={handleChange} 
            aria-labelledby="range-slider" />
        </Grid>
        <Grid item>
          <SpeedIcon />
        </Grid>
      </Grid>
    </div>
  );
}
