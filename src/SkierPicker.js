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



export default function SkierPicker(props) {
    const classes = useStyles();
    let i = 0;
    if (props.skiers === undefined || props.skiers == null)
        return <div/>;

    // onDelete={onDelete} onClick={onDelete} 
    // color="primary"

    return (
        <div className={classes.main}>
            <Grid container spacing={1} >
                { props.skiers.map(skier => (
                    <Grid item key={i++}>
                        <Chip label={skier} className={classes.chip} color="default" />
                    </Grid>                    
                ))}
            </Grid>
        </div>
    );
}