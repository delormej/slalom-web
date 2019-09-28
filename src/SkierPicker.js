import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';

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
    const [allSkiers, setAllSkiers] = useState(true);
    const filterBySkier = props.filterCallback;
    let i = 0; 
        
    function onSkierClick(skier) {
        if (allSkiers)
            setAllSkiers(false);
        filterBySkier(skier);
    }

    function onSelectAllSkiersClick() {
        if (!allSkiers) 
            filterBySkier(null); 
        setAllSkiers(!allSkiers);
    }


    return (
        <div className={classes.main}>
            <FormControlLabel
                value="start"
                control={
                    <Switch color="primary" 
                        onClick={onSelectAllSkiersClick}
                    />
                }
                checked={allSkiers}
                label="All Skiers"
                labelPlacement="end"
            />            
            <Grid container spacing={1} >
                { props.skiers.map(s => (
                    <Grid item key={i++}>
                        <Chip label={s.skier} 
                            onClick={() => onSkierClick(s.skier)} 
                            className={classes.chip} color={s.selected ? "primary" : "default"} />
                    </Grid>
                    ))}
            </Grid>
        </div>
    );
}