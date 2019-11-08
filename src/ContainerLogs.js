import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function ContainerLogs() {
  const classes = useStyles();
  const [containers, setContainers] = useState([]);
  if (containers.length == 0)
    getContainers();

  function getContainers() {
    setTimeout(() => {
      var c = [ {name: 'aci-2'}, {name: 'aci-3'}, {name: 'aci-4'}];
      setContainers(c);
    }, 1400);
  }

  function Panel(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [logs, setLogs] = useState("");

    function getLogs() {
      setLogs("loading...");
      setTimeout(() => {
        var logs = "logs for " + props.container;
        setLogs(logs);
      }, 2000);
    }
  
    function onExpansionChange()
    {
      setExpanded(!expanded);
      if (logs === "")
        getLogs(); 
    }

    return (
    <ExpansionPanel expanded={expanded} onChange={onExpansionChange}>
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
    >
      <Typography className={classes.heading}>{props.container}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Typography>
        {props.container + "... " + logs}
      </Typography>
    </ExpansionPanelDetails>
  </ExpansionPanel>
    );
  }

  var panels = containers.map( (k) => <Panel key={k.name} container={k.name} /> );

  return (
    <div className={classes.root}>
      {panels}
    </div>
  );
}
