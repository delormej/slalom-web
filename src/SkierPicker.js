import React from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

function onDelete() {
}

const useStyles = makeStyles(theme => ({
    main: {
        margin: '10px 0 0 0',
    },
    chip: {
      marginRight: theme.spacing(0),
    },
    filterTitle: {
        color: 'rgba(0, 0, 0, 0.54)'
    }
})); 

export default function SkierPicker() {
    const classes = useStyles();

    return (
        <div className={classes.main}>
            <Grid container spacing={1} justify="left">
                <Grid item>
                    <Chip label="John" onDelete={onDelete} onClick={onDelete} className={classes.chip} color="primary" />
                </Grid>
                <Grid item>
                    <Chip label="Kenny" onDelete={onDelete} onClick={onDelete} className={classes.chip} color="primary" />
                </Grid>
                <Grid item>
                    <Chip label="Jason" onDelete={onDelete} onClick={onDelete} className={classes.chip} color="primary" />
                </Grid>
                <Grid item>
                    <Chip label="Chet" onClick={onDelete} className={classes.chip} color="default" />
                </Grid>
                <Grid item>
                    <Chip label="John" onDelete={onDelete} onClick={onDelete} className={classes.chip} color="primary" />
                </Grid>
                <Grid item>
                    <Chip label="Kenny" onDelete={onDelete} onClick={onDelete} className={classes.chip} color="primary" />
                </Grid>
                <Grid item>
                    <Chip label="Jason" onDelete={onDelete} onClick={onDelete} className={classes.chip} color="primary" />
                </Grid>
                <Grid item>
                    <Chip label="Chet" onClick={onDelete} className={classes.chip} color="default" />
                </Grid>                
            </Grid>
        </div>
    );
}