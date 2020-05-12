import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';
import VideoSpeedSlider from './VideoSpeedSlider';
import {isMobile} from 'react-device-detect';
import getBaseUrl from './Util';
import axios from 'axios';
import HandlePosition from './HandlePosition';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  notesGrid: {
    flexGrow: 1
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="subtitle2">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

class VideoNotes extends React.Component {
  constructor(props) {
    super(props);
    const { classes } = props;
    this.classes = classes;

    this.state = { ...this.props, 
      open: this.props.open, 
      videoSpeed: 0.25, 
      videoSeconds: 0, 
      handlePosition: null, 
      handleSeconds: 0 };

    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.onVideoProgress = this.onVideoProgress.bind(this);
    this.setCaretPosition = this.setCaretPosition.bind(this);
    this.onVideoPaused = this.onVideoPaused.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getHandlePosition = this.getHandlePosition.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open});
    this.setState({notes: nextProps.notes});
  }

  handleNotesChange(event) {
    this.setState({ notes: event.target.value });
  };

  handleSpeedChange(newValue) {
    this.setState({ videoSpeed: newValue });
  };

  handleClose(id, event) {
    this.setState( {open: false} );
    this.state.onClose(this.state.notes, (id === "cancel"));
  };

  onVideoProgress(progress) {
    this.setState({videoSeconds: progress.playedSeconds});
  };

  setCaretPosition(elemId, caretPos) {
    var elem = document.getElementById(elemId);

    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
  }

  onVideoPaused() {
    var seconds = this.state.videoSeconds.toFixed(1);
    var notes = this.state.notes + "\n[@" + seconds + " seconds] ";
    this.setState( {notes: notes} );
    this.setCaretPosition("videoNotes", notes.length);
    this.getHandlePosition(seconds);
  };

  getVttPath() {
    const url = this.state.videoUrl;
    let parts = url.split("/");
    let path = parts.slice(parts.length-2).join("/");
    return getBaseUrl() + "/api/vtt/" +  path; 
  }

  getHandlePosition(seconds) {
    const handleUrl = getBaseUrl() + "/api/handle/" + seconds + "/" +
      this.state.video.partitionKey + "/" + this.state.video.rowKey;
    console.log("Requesting: " + handleUrl);
    axios.get(handleUrl)
    .then(res => {
      const handleSeconds = seconds;
      if (res.status !== 200) {
        console.log(handleUrl + " error:", res);
        throw new Error("Error response attempting to get handle.");
      }

      console.log("got this: ", res.data, "seconds: ", handleSeconds);
      this.setState( { handlePosition: res.data, handleSeconds: handleSeconds } );
    })
    .catch((error) => {
    });
  }

  render() {
    const classes = this.classes;
    const vttPath = this.getVttPath();

    return (
      <Dialog fullWidth={true} maxWidth='md' open={this.state.open??false}  
          aria-labelledby="form-dialog-title">
        <DialogTitle id="customized-dialog-title" onClose={(e) => this.handleClose("cancel", e)}>
          {this.state.video.rowKey}
        </DialogTitle>            
        <DialogContent>
          <ReactPlayer 
                playbackRate={this.state.videoSpeed}
                url={this.state.videoUrl} 
                onProgress={this.onVideoProgress}
                onPause={this.onVideoPaused}
                volume={0} muted={true} width="100%" height="100%" 
                controls={true} playing={true} 
                config={{ file: {
                  attributes: {
                    crossOrigin: 'anonymous'
                  },                  
                  tracks: [
                    {kind: 'subtitles', src: vttPath, default:true},
                  ]
                }}}
           />
          { !isMobile ? 
          <div className={classes.notesGrid}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
                <VideoSpeedSlider 
                  value={this.state.videoSpeed}
                  onChange={this.handleSpeedChange} /> 
                <HandlePosition open={true} 
                  handlePosition={this.state.handlePosition} 
                  seconds={this.state.handleSeconds} 
                  clOffset={this.state.video.centerLineDegreeOffset} />
            </Grid>
            <Grid item xs={9}>
              <TextField
                autoFocus
                margin="dense"
                id="videoNotes"
                label="Video Notes"
                type="text"
                fullWidth
                multiline
                rows="8"            
                className={classes.textField}
                value={this.state.notes}
                onChange={this.handleNotesChange}
              /> 
            </Grid>
          </Grid>
          </div>
          : null }
        </DialogContent>
        <DialogActions>
          { !isMobile ? 
          <Button id="saveButton" onClick={(e) => this.handleClose("save", e)} color="primary">
            Save
          </Button>
          : null }
        </DialogActions>
      </Dialog>
  );
}
}
export default withStyles(styles)(VideoNotes);