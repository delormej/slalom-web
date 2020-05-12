import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { HubConnectionBuilder } from '@microsoft/signalr';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(4),
      },
    },
  }));

export default function VideoSnackbar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const connectHub = () => {
    const hubConnection = new HubConnectionBuilder()
      .withUrl('https://skipreview.jasondel.com/api/notification/')
      .build();    

    hubConnection.start()
    .then(() => console.log('Connection started!'))
    .catch(err => console.log('Error while establishing connection :('));

    hubConnection.on('sendToAll', (nick, receivedMessage) => {
        console.log('Received message:' + receivedMessage);
        var messageObj = JSON.parse(receivedMessage);
        if (messageObj) {
            const text = 'New video uploaded: ' + messageObj.Video;
            setMessage(text);
            setOpen(true);
        }
    });
  };

  const handleRefresh = (event, reason) => {
    props.forceRefresh();
    setOpen(false);
    setMessage("");
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  connectHub();

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleRefresh}>
              CLICK TO REFRESH
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        } />
    </div>
  );
}
