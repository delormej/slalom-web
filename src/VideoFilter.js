import React from 'react';
import Container from '@material-ui/core/Container';
import DatePicker from './DatePicker';
import SkierPicker from './SkierPicker';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    filter: {
        paddingTop: theme.spacing(6),
      },
      videoCount: {
        marginLeft: '30px',
      },    
}));      

var filterCallback = null;

function filterByDate(date) {
    console.log('filtering by date: ' + date);
    if (filterCallback != null) {
        filterCallback( { date: date, skiers: [] } );
    }
}

function filterBySkiers(skiers) {
    var count = skiers != null ? skiers.length : 0;
    console.log('filtering by skiiers: ' + count);
}

export default function VideoFilter(props) {
    
    // TODO:
    // Lift state (date, skiers) from filter components to be stored here.
    //
    
    const classes = useStyles();
    filterCallback = props.filterCallback;
  
    return (
        <Container maxWidth="md" className={classes.filter}>
            <Paper>
                <Grid container spacing={2}>
                    <Grid item xs={6}><DatePicker videos={props.videos} filterCallback={filterByDate} /></Grid>
                    <Grid item xs={6}><SkierPicker videos={props.videos} /></Grid>
                    <Grid item xs={12}>
                        <Typography variant="caption" color="textSecondary" className={classes.videoCount}>
                            655 Videos
                        </Typography>
                    </Grid>                    
                </Grid>
            </Paper>
        </Container>
    )
}