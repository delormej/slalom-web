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

export default function DatePicker(props) {
  console.log('Setting date to: ' + props.date);
  const filterCallback = props.filterCallback;
  const [selectedDate, setSelectedDate] = useState(props.date);

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
