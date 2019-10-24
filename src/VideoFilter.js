import React from 'react';
import Container from '@material-ui/core/Container';
import DatePicker from './DatePicker';
import SkierPicker from './SkierPicker';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    filter: {
        paddingTop: theme.spacing(6),
      },
    videoCount: {
        marginLeft: '30px',
    },
}));      

function ShowVideoCount(props) {
    const classes = useStyles();

    if (props.loading === true) {
      return (
        <div className={classes.videoCount}>
            <CircularProgress />
            <Typography variant="caption" 
                    color="textSecondary" 
                    className={classes.videoCount}>
                Loading...
            </Typography>                        
        </div>
      )
    }  
    else {
      return (
        <Typography variant="caption" 
                color="textSecondary" 
                className={classes.videoCount}>
            Showing {props.filteredVideos} of {props.totalVideos} Videos
        </Typography>          
      )
    }
}

export default function VideoFilter(props) {
    const classes = useStyles();
  
    return (
        <Container maxWidth="md" className={classes.filter}>
            <Paper>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <DatePicker date={props.date} 
                            videos={props.videos} 
                            filterCallback={props.filterDateCallback} 
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <SkierPicker skiers={props.skiers} 
                            videos={props.videos} 
                            filterCallback={props.filterSkierCallback} 
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <ShowVideoCount loading={props.loading} 
                            filteredVideos={props.filteredVideos} 
                            totalVideos={props.totalVideos} />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}