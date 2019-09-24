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

export default function Album() {
    const classes = useStyles();
  
    return (
        <Container maxWidth="md" className={classes.filter}>
            <Paper>
                <Grid container spacing={2}>
                    <Grid item xs={6}><DatePicker /></Grid>
                    <Grid item xs={6}><SkierPicker /></Grid>
                    <Grid item xs={12}>
                        <Typography variant="h7" color="textSecondary" className={classes.videoCount}>
                            655 Videos
                        </Typography>
                    </Grid>                    
                </Grid>
            </Paper>
        </Container>
    )
}