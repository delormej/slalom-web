import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { HubConnectionBuilder } from '@microsoft/signalr';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  connectHub();

  return (
    <div className={classes.root}>
        <Snackbar open={open} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info">
            {message}
            </Alert>
        </Snackbar>
    </div>
  );
}
