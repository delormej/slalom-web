import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  logText: {
    whiteSpace: 'pre-line',
    whiteSpace: 'pre-wrap',
    fontSize: theme.typography.pxToRem(12),
    fontFamily: 'Courier New,Courier',
    color: 'white',
    backgroundColor: 'black'
    
  }
}));

export default function ContainerLogs() {
  const classes = useStyles();
  const [containers, setContainers] = useState([]);
  if (containers.length == 0)
    getContainers();

  function getContainers() {

    //const listUrl = "http://dev-ski-jobs.azurewebsites.net/aci/list";
    var accessToken = "";
    const AuthStr = 'Bearer '.concat(accessToken);
    const listUrl = "http://localhost:5000/aci/list";
    axios.get(listUrl,  { headers: { Authorization: AuthStr } })
      .then(res => {
        setContainers(res.data);
      })
      .catch((error) => {
        console.log("getContainers error: " + error);
      });
  }

  function Panel(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [logs, setLogs] = useState("");

    function getLogs() {
        setLogs("loading...");
        console.log("Loading logs for " + props.name);

        const logsUrl = "https://dev-ski-jobs.azurewebsites.net/aci/logs?container=" + props.name;
        axios.get(logsUrl)
          .then(res => {
            setLogs(res.data);
          })
          .catch((error) => {
            console.log("getLogs error: " + error);
          });
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
      <Typography className={classes.heading}>{props.name}</Typography>
      <Typography className={classes.secondaryHeading}>{props.video}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
    <Typography className={classes.logText}>
        Image used:{props.image}<br/>
        {logs}
      </Typography>
    </ExpansionPanelDetails>
  </ExpansionPanel>
    );
  }

  var panels = containers.map( (video) => 
    <Panel key={video.name} {...video} /> 
  );

  return (
    <div className={classes.root}>
      <Typography className={classes.heading}>Count: {containers.length} of 100</Typography>
      {panels}
    </div>
  );
}
