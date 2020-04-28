import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ReactPlayer from 'react-player';
import VideoSpeedSlider from './VideoSpeedSlider';
import {isMobile} from 'react-device-detect';
import Util from './Util';

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

    this.state = { ...this.props, open: this.props.open, videoSpeed: 0.25, videoSeconds: 0 };

    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.onVideoProgress = this.onVideoProgress.bind(this);
    this.setCaretPosition = this.setCaretPosition.bind(this);
    this.onVideoPaused = this.onVideoPaused.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
  };

  getVttPath() {
    const url = this.state.videoUrl;
    let parts = url.split("/");
    let path = parts.slice(parts.length-2).join("/");
    var util = new Util();
    return util.getBaseUrl() + "/api/vtt/" +  path; 
  }

  render() {
    const classes = this.classes;
    const vttPath = this.getVttPath();

    return (
      <Dialog fullWidth={true} maxWidth='md' open={this.state.open??false}  
          aria-labelledby="form-dialog-title">
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
          <VideoSpeedSlider 
            value={this.state.videoSpeed}
            onChange={this.handleSpeedChange} /> : null }
          { !isMobile ? 
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
          : null }
        </DialogContent>
        <DialogActions>
          <Button id="cancelButton" onClick={(e) => this.handleClose("cancel", e)} color="primary">
            { !isMobile ? "Cancel" : "Close" }
          </Button>
          { !isMobile ? 
          <Button id="saveButton" onClick={(e) => this.handleClose("save", e)} color="primary" variant="contained">
            Save
          </Button>
          : null }
        </DialogActions>
      </Dialog>
  );
}
}
export default withStyles(styles)(VideoNotes);