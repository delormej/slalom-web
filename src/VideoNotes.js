import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
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
}));

export default function VideoNotes(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [videoSpeed, setVideoSpeed] = useState(0.25);
  const [videoNotes, setVideoNotes] = useState("");

  let videoSeconds = 0;

  const handleNotesChange = (event) => {
    setVideoNotes(event.target.value);
  };

  const handleSpeedChange = (event) => {
    setVideoSpeed(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onVideoProgress = (progress) => {
    videoSeconds = progress.playedSeconds;
  };

  const setCaretPosition = (elemId, caretPos) => {
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

  const onVideoPaused = () => {
    console.log("Paused at: " + videoSeconds);
    console.log("Notes were..." + videoNotes);
    var notes = videoNotes + "\n@" + videoSeconds + " --> ";
    setVideoNotes(notes);
    setCaretPosition("videoNotes", notes.length - 1);
  };

  return (
    <div>
      <Dialog fullWidth={true} maxWidth='xl' open={open} onClose={handleClose} 
          aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Video Notes</DialogTitle>
        <DialogContent>
          <ReactPlayer 
                playbackRate={videoSpeed}
                url={props.videoUrl} 
                onProgress={onVideoProgress}
                onPause={onVideoPaused}
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
                value={videoSpeed}
                onChange={handleSpeedChange}
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
            value={videoNotes}
            onChange={handleNotesChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
