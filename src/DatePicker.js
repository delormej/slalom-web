import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import HighlightOffOutlineIcon from '@material-ui/icons/HighlightOffOutlined';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';


export default function DatePicker() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const useStyles = makeStyles(theme => ({
    deleteFilter: {
        margin: '8px 0 0 0',
        color: 'rgba(0, 0, 0, 0.54)',
    },    
  }));    

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  function onDelete() {

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
                <HighlightOffOutlineIcon fontSize="medium" className={classes.deleteFilter} />
            </IconButton>
        </Grid>        
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
