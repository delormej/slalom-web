import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ReactPlayer from 'react-player';

const styles = theme => ({
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
});

class VideoNotes extends React.Component {
  constructor(props) {
    super(props);
    const { classes } = props;
    this.classes = classes;

    this.state = {
      videoSpeed: 0.25,
      videoSeconds: 0,
      videoNotes: "",
      open: true,
    }

    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.onVideoProgress = this.onVideoProgress.bind(this);
    this.setCaretPosition = this.setCaretPosition.bind(this);
    this.onVideoPaused = this.onVideoPaused.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleNotesChange(event) {
    this.setState({ videoNotes: event.target.value });
  };

  handleSpeedChange(event) {
    this.setState({ videoSpeed: event.target.value });
  };

  handleClose() {
    this.setState( {open: false} );
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
    console.log("onVideoPaused() notes: " + this.state.videoNotes);
    console.log("onVideoPaused() seconds: " + this.state.videoSeconds);
    var notes = this.state.videoNotes + "\n@" + this.state.videoSeconds + " --> ";
    this.setState( {videoNotes: notes} );
    this.setCaretPosition("videoNotes", notes.length);
  };

  render() {
    const classes = this.classes;
    return (
    <div>
      <Dialog fullWidth={true} maxWidth='xl' open={this.state.open} onClose={this.handleClose} 
          aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Video Notes</DialogTitle>
        <DialogContent>
          <ReactPlayer 
                playbackRate={this.state.videoSpeed}
                url={this.props.videoUrl} 
                onProgress={this.onVideoProgress}
                onPause={this.onVideoPaused}
                volume={0} muted={true} width="100%" height="100%" 
                controls={true} playing={true} 
                config={{ file: {
                  tracks: [
                    {kind: 'subtitles', src: 'http://localhost:3001/notes.vtt', default:true},
                  ]
                }}}
           />
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="video-speed">Video Speed</InputLabel>
              <Select
                autoFocus
                value={this.state.videoSpeed}
                onChange={this.handleSpeedChange}
                inputProps={{
                  name: 'video-speed',
                  id: 'video-speed',
                }}
              >
                <MenuItem value={0.25}>0.25</MenuItem>
                <MenuItem value={0.5}>0.50</MenuItem>
                <MenuItem value={1.0}>1.0</MenuItem>
              </Select>
            </FormControl>
          </form>
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
            value={this.state.videoNotes}
            onChange={this.handleNotesChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
}
export default withStyles(styles)(VideoNotes);