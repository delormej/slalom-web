import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ContainerLogs from './ContainerLogs';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));

export default function AdminConsole() {
    const classes = useStyles();

    return (
        <Paper>
            <Button variant="contained" color="secondary" className={classes.button}>
                Delete All
            </Button>
            <ContainerLogs />
        </Paper>
    );
}