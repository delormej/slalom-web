import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import Avatar from '@material-ui/core/Avatar';
import { format, parseISO } from 'date-fns'

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },    
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    section1: {
      margin: theme.spacing(3, 2),
    },  
    section2: {
      margin: theme.spacing(2),
    },
    avatar: {
      backgroundColor: 'green',
    },  
    avatarMissing: {
      backgroundColor: 'lightgrey',
    },
    avatarDeleted: {
        backgroundColor: 'red',
    },
    filter: {
      paddingTop: theme.spacing(6),
    },
    courseAndSpeed: {
      paddingBottom: theme.spacing(3),
    }
  }));

function getDateString(date) {
  // format: 2019-09-20T17:06:57Z
  const formattedDate = format(parseISO(date), 'PPP');
  return formattedDate;
}

function getTimeString(date) {
  const formattedDate = format(parseISO(date), 'p');
  return formattedDate;  
}

function SkierAvatar(props) {
  const classes = useStyles();
  const skier = props.skier;
  const deleted = props.deleted;
  var avatarStyle, avatarText;

  if (skier != null && skier.length >= 2) {
    avatarStyle = classes.avatar;
    avatarText = skier.slice(0,2);
  } 
  else {
    avatarStyle = classes.avatarMissing;
    avatarText = '-';
  }
  if (deleted) {
      avatarStyle = classes.avatarDeleted;
  }

  return (
    <Avatar className={avatarStyle}>
      {avatarText}
    </Avatar>  
  );
}

export default function VideoHeader(props) {
  const video = props.video;
  const deleted = props.video.markedForDelete;
  const label = deleted ? "undo delete" : "delete";

  return (
    <CardHeader
      title={getTimeString(video.recordedTime)}
      subheader={getDateString(video.recordedTime)}
      avatar={
          <SkierAvatar skier={video.skier} deleted={video.markedForDelete} />
      }                    
      action={
        <IconButton aria-label={label} onClick={() => props.onDeleteClick()} title={label}>
          {deleted ? <RestoreFromTrashIcon /> : <DeleteIcon /> }
        </IconButton>
      }>                    
    ]
  </CardHeader>  
  );
}