import 'date-fns';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import HighlightOffOutlineIcon from '@material-ui/icons/HighlightOffOutlined';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

function getLatestDate(videos) {
  const latest = new Date(Math.max(...videos.map(videos=> new Date(videos.recordedTime))));
  return latest;
}

export default function DatePicker(props) {
  let date = null;
  const filterCallback = props.filterCallback;

  if (props.videos != null && props.videos.length > 0) {
    date = getLatestDate(props.videos);
    console.log("Latest date is: " + date);
  }

  const [selectedDate, setSelectedDate] = useState(date);

  const useStyles = makeStyles(theme => ({
    deleteFilter: {
        margin: '8px 0 0 0',
        color: 'rgba(0, 0, 0, 0.54)',
    },    
  }));    

  function handleDateChange(date) {
    setSelectedDate(date);
    filterCallback(date);
  }

  function onDelete() {
    handleDateChange(null);
  }

  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="center">
        <Grid item>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label=""
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </Grid>
        <Grid item zeroMinWidth> 
            <IconButton onClick={onDelete}>
                <HighlightOffOutlineIcon className={classes.deleteFilter} />
            </IconButton>
        </Grid>        
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
