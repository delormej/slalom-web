import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
      toolbarButtons: {
    marginLeft: "auto",
    marginRight: -12
  },
  icon: {
    marginRight: theme.spacing(2),
  },  
  donateButton: {     
  }
}));

export default function Album() {
  const classes = useStyles();
  
  return (  
      <AppBar position="static">
        <Toolbar className={classes.appBar}>
          <img src="waterskiierd2.png" alt="3 Season Ski logo" width="60" height="60" className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            3 Season Ski Club
          </Typography>
          <span className={classes.toolbarButtons}>
            <Button className={classes.donateButton} color="inherit">Donate</Button>
          </span>
        </Toolbar>
      </AppBar>
  )
}