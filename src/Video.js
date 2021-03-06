import React from 'react';
import getBaseUrl from './Util.js';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import VideoHeader from './VideoHeader';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ShareIcon from '@material-ui/icons/Share';
import Drawer from '@material-ui/core/Drawer';
import VideoNotes from './VideoNotes';
import ShareVideoUrl from './ShareVideoUrl';

const styles = theme => ({
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
    position: 'relative',
  },
  cardMedia: {
    paddingTop: '0', // 16:9
    height: '160px'
  },
  cardContent: {
    flexGrow: 1,
  },
  overlay: {
    position: 'absolute',
      top: '75px',
      right: '7px',
      color: 'black',
      backgroundColor: 'white'    
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
  filter: {
    paddingTop: theme.spacing(6),
  },
  courseAndSpeed: {
    paddingBottom: theme.spacing(3),
  },
  starredVideo: {
    color: '#e1ad01',
  },
  unStarredVideo: {
  },
  drawer: {
    backgroundColor: "black",
  }
});

class Video extends React.Component { 

  constructor(props) {
    super(props);
    const { classes } = props;
    this.classes = classes;
    this.videoRef = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleVideoNotesClose = this.handleVideoNotesClose.bind(this);
    this.saveClick = this.saveClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.starClick = this.starClick.bind(this);
    this.DeleteButton = this.DeleteButton.bind(this);
    this.SaveButton = this.SaveButton.bind(this);
    this.openChartDrawer = this.openChartDrawer.bind(this);
    this.closeChartDrawer = this.closeChartDrawer.bind(this);
    this.handleSetOffset = this.handleSetOffset.bind(this);
    this.handleShareClick = this.handleShareClick.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.closeShare = this.closeShare.bind(this);
    this.getShareUrl = this.getShareUrl.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    
    this.baseUrl = getBaseUrl();
    this.imageApiUrl = this.baseUrl + '/api/image';

    // Set defaults for text values if null.
    this.props.video.skier = this.props.video.skier || '';
    this.props.video.notes = this.props.video.notes || '';

    // Using spread operator to promote video object properties to be
    // shallow properties of state.  React doesn't repaint if deep nested
    // properties are changed.
    this.state = { ...this.props.video, 
      isChartDrawerOpen: false, 
      isVideoNotesOpen: this.props.autoPlay, 
      isShareVideoUrlOpen: false, 
      dirty: false };
  }

  handleSelected() {
    this.props.onSelected(this.props.id);    
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      dirty: true
    });
  }

  handleVideoNotesClose(notes, cancelled) {
    if (!cancelled) {
      this.setState({isVideoNotesOpen: false, dirty: false, notes: notes}, 
        this.save);
    }
    else {
      this.setState({isVideoNotesOpen: false});
    }
  };

  handleSetOffset(offset) {
    console.log("Setting offset to: " + offset);
    this.setState( { centerLineDegreeOffset: offset }, 
      this.save);
  }

  handleShareClick() {
    this.setState({ isShareVideoUrlOpen: true },
      this.handleSelected());
  }

  handlePlayClick() {
    this.setState({isVideoNotesOpen: true},
      this.handleSelected());
  }
  
  closeShare() {
    this.setState({ isShareVideoUrlOpen: false });
  }

  saveClick(event) {
    this.save();
    this.setState({dirty: false});
  }

  deleteClick(event) {
    this.setState(
      {markedForDelete: !this.state.markedForDelete},
      this.save
    );
  }

  starClick(event) {
    this.setState(
      {starred: !this.state.starred},
      this.save
    );    
  }

  save() {
    // todo this needs to be refactored
    var video = { ...this.state };
    delete video.dirty;     // Remove internal dirty flag from the object.
    delete video.isVideoNotesOpen;
    delete video.isChartDrawerOpen;

    const json = JSON.stringify(video);
    var updateUrl = this.baseUrl + '/api/updatevideo';
    console.log('Saving video' + updateUrl + ':\n' + json);

    axios.post(updateUrl, json) 
      .then(res => {
        console.log('Updated');
      })
      .catch((error) => {
        if (this._isMounted) {
          this.setState({ error: 'Unable to update video. ' + error});
        }        
      });
  }

  getImageUrl() {
    var imageUrl = this.imageApiUrl 
      + '/' + this.state.partitionKey + '/' + this.state.rowKey 
      + '?cl=' + this.state.centerLineDegreeOffset;
    
    return imageUrl;
  }

  getVideoUrl() {
      return this.state.hotUrl || this.state.url;
  }

  getThumnailUrl() {
      return this.state.thumbnailUrl;
  }

  getShareUrl() {
    //"http://localhost:3000/?skier=John&key=2020-05-18/GOPR2449_ts.MP4";
    const host = window.location.origin;
    const skier = this.state.skier;
    const key = this.state.partitionKey;
    const video = this.state.rowKey;
    return `${host}?skier=${skier}&key=${key}/${video}`;
  }

  getImageFilename(url) {
    var lastSlash = url.lastIndexOf('/') + 1;
    return url.substring(lastSlash);
  }

  SaveButton() {
    if (this.state.dirty)
      return (
        <Button onClick={this.saveClick} 
          variant="contained" color="primary">
          Save
      </Button>);
    else
      return <span/>;
  }

  // Renders a delete button based on current state.
  DeleteButton() {
    if (this.state.markedForDelete)
    return <button onClick={this.deleteClick}>Undo Delete</button>;
    else
      return <button onClick={this.deleteClick}>Delete</button>;
  }

  openChartDrawer() {
    this.setState({isChartDrawerOpen: true},
      this.handleSelected());
  }

  closeChartDrawer() {
    this.setState({isChartDrawerOpen: false});
    console.log("Closed drawer");
  }
  
  render() {
    const video = this.state;  
    const classes = this.classes;

    if (video.thumbnailUrl === null || video.jsonUrl === null)
      return null;

    return (
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card} raised={this.props.isSelected}>
          <VideoHeader video={video} onDeleteClick={this.deleteClick} />
          <CardMedia 
              className={classes.cardMedia}
              image={video.thumbnailUrl}
              title={"Video Thumbnail: " + this.getImageFilename(video.thumbnailUrl)}>
            <IconButton className={classes.overlay} title="Play Video"
              onClick={this.handlePlayClick}>
              <PlayArrowIcon />
            </IconButton>
            <VideoNotes 
              notes={this.state.notes} 
              open={this.state.isVideoNotesOpen} 
              video={video}
              videoUrl={this.getVideoUrl()}
              onClose={this.handleVideoNotesClose}
              onSetOffset={this.handleSetOffset} /> 
          </CardMedia> 
          <CardContent className={classes.cardContent}>
              <Grid container spacing={0} className={classes.courseAndSpeed}>
                  <Grid item xs={9}>
                      <Typography>
                          {video.courseName}
                      </Typography>             
                  </Grid>
                  <Grid item xs={3}>
                      <Typography align="right">
                          {video.boatSpeedMph}&nbsp;mph
                      </Typography>             
                  </Grid>
              </Grid>
              <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          required
                          id={this.state.rowKey}
                          name="skier"
                          label="Skier name"
                          fullWidth
                          autoComplete="fname"
                          value={this.state.skier} 
                          onChange={this.handleInputChange} 
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <InputLabel htmlFor="ropeLengthM">Rope Length</InputLabel>
                      <Select
                          fullWidth
                          value={this.state.ropeLengthM} 
                          onChange={this.handleInputChange}
                          inputProps={{
                              name: 'ropeLengthM',
                              id: 'ropeLengthM',
                          }}>
                          <MenuItem value={15}>15' Off</MenuItem>
                          <MenuItem value={22}>22' Off</MenuItem>
                          <MenuItem value={28}>28' Off</MenuItem>
                          <MenuItem value={32}>32' Off</MenuItem>
                          <MenuItem value={35}>35' Off</MenuItem>
                          <MenuItem value={38}>38' Off</MenuItem>
                      </Select>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <TextField
                          id="notes"
                          name="notes"
                          label="Notes"
                          fullWidth
                          multiline
                          rows="4"
                          value={this.state.notes} 
                          onChange={this.handleInputChange} 
                          className={classes.textField}
                      />                    
                  </Grid>
              </Grid>
          </CardContent>
          <Drawer anchor='right' open={this.state.isChartDrawerOpen} onClose={this.closeChartDrawer}>
              <img alt="Chart" className={classes.drawer} src={this.getImageUrl()} />
          </Drawer> 
          <CardActions>
              <this.SaveButton />
              <IconButton disabled={video.courseName === null} aria-label="Analysis" title="Analysis" onClick={() => this.openChartDrawer()}>
                <InsertChartIcon>
                </InsertChartIcon>
              </IconButton>
              <IconButton aria-label="Starred" title="Starred" onClick={() => this.starClick()}>
                <StarIcon className={this.state.starred ? classes.starredVideo : classes.unStarredVideo} />
              </IconButton> 
              <IconButton aria-label="Share" title="Share" onClick={this.handleShareClick}>
                <ShareIcon />
              </IconButton> 
          </CardActions>
          <ShareVideoUrl open={this.state.isShareVideoUrlOpen} 
            onClose={this.closeShare} 
            videoUrl={this.getShareUrl()} />
      </Card>
    </Grid>
    );
  }
}

export default withStyles(styles)(Video);