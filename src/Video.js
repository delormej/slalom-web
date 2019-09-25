import React from 'react';
import Util from './Util.js';
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
  filter: {
    paddingTop: theme.spacing(6),
  },
  courseAndSpeed: {
    paddingBottom: theme.spacing(3),
  }
});

class Video extends React.Component { 

  constructor(props) {
    super(props);
    const { classes } = props;
    this.classes = classes;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveClick = this.saveClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.DeleteButton = this.DeleteButton.bind(this);
    this.SaveButton = this.SaveButton.bind(this);

    var util = new Util();
    this.baseUrl = util.getBaseUrl();
    this.imageApiUrl = this.baseUrl + '/api/image?jsonUrl=';

    // Set defaults for text values if null.
    this.props.video.skier = this.props.video.skier || '';
    this.props.video.notes = this.props.video.notes || '';

    // Using spread operator to promote video object properties to be
    // shallow properties of state.  React doesn't repaint if deep nested
    // properties are changed.
    this.state = { ...this.props.video };
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

  save() {
    var video = this.state;
    delete video.dirty;     // Remove internal dirty flag from the object.
    const json = JSON.stringify(video);
    var updateUrl = this.baseUrl + '/api/updatevideo';
    console.log('Saving video' + updateUrl + ':\n' + json);

    axios.post(updateUrl, json) 
      .then(res => {
        console.log('Updated? ' + res);        
      })
      .catch((error) => {
        if (this._isMounted) {
          this.setState({ error: 'Unable to update video. ' + error});
        }        
      });
  }

  getImageUrl() {
    var imageUrl = this.imageApiUrl + this.state.jsonUrl;
    if (this.state.ropeLengthM != null && this.state.ropeLengthM !== "0.0") {
        imageUrl += '&rope=' + this.state.ropeLengthM;
    }
    return imageUrl;
  }

  getVideoUrl() {
      var relativeUrl = './video.html?video=';
      var videoUrl = relativeUrl + this.state.url;
      return videoUrl;
  }

  getThumnailUrl() {
      return this.state.thumbnailUrl;
  }

  SaveButton() {
    if (this.state.dirty)
      return <button onClick={this.saveClick}>Save</button>;
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
  
  render() {
    const video = this.state;  
    const classes = this.classes;

    return (
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <VideoHeader video={video} />
          <CardMedia
              className={classes.cardMedia}
              image={video.thumbnailUrl}
              title="Video Thumbnail"
          />                
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
                          id="skier"
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
                  <Grid item xs={24} sm={12}>
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
          <CardActions>
              <Button size="small" color="primary" onClick={this.saveClick}>
                Save
              </Button>
              <Button size="small" color="secondary">
                Analysis
              </Button>
              <Button size="small" color="secondary">
                Video
              </Button>                    
          </CardActions>
      </Card>
    </Grid>
    );
  }
}

export default withStyles(styles)(Video);