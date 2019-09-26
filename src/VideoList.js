import React from 'react';
import axios from 'axios';
import Video from './Video.js'
import Util from './Util.js'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import VideoFilter from './VideoFilter';
import { Typography } from '@material-ui/core';
  
const styles = theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
});

class VideoList extends React.Component {
  constructor(props) {
    super(props);
    const { classes } = props;
    this.classes = classes;
     
    this.filterVideos = this.filterVideos.bind(this);

    // State which does not force render()
    this._isMounted = false;
    this.videos = [];

    // Changing any of this state through setState forces re-render()
    this.state = {
      videos: [],
      dateFilter: null,
      skiersFilter: [],
      error: ''
    }
  }

  getDateString(dateToFormat) {
    var dd = dateToFormat.getDate();
    var mm = dateToFormat.getMonth()+1; //January is 0!
    var yyyy = dateToFormat.getFullYear();
    
    if(dd<10) {
        dd = '0'+dd
    } 
    
    if(mm<10) {
        mm = '0'+mm
    } 
    
    const formatted = yyyy + '-' + mm + '-' + dd;
    return formatted;
  }

  /*
    Example of filters object:
    filters: { date: new Date(), skiers: [ 'Jason', 'John' ] }
  */
  filterVideos(filters) {
    var filtered = [];

    if (filters != undefined && filters != null && filters.date != null) {
      const date = this.getDateString(filters.date);
      filtered = this.videos.filter(v => v.partitionKey === date);
      console.log('filtering videos by date: ' + date + ' count is: ' + filtered.length);
    }
    else {
      filtered = this.videos;
      filters = { date: null, skiers: [] };
      console.log('filtered has: ' + filtered.length);
    }

    this.setState( {
      dateFilter: filters.date,
      skiersFilter: filters.skiers,
      videos: filtered
    } );
  }

  componentDidMount() {
    // Workaround for this: https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component/
    this._isMounted = true;

    var util = new Util();
    var listUrl = util.getBaseUrl() + '/api/list';    

    axios.get(listUrl)
      .then(res => {
        this.videos = res.data;
        if (this._isMounted) {
          this.filterVideos(null);              
        }
      })
      .catch((error) => {
        if (this._isMounted) {
          this.setState({ error: 'Unable to load videos.  ' + error});
        }        
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const classes = this.classes;
    var filteredCount = this.state.videos != null ? this.state.videos.length : 0;
    var totalCount = this.videos != null ? this.videos.length : 0;
    var countString = 'Showing: ' + filteredCount + ' of ' + totalCount;
    console.log('render... ' + countString);

    return (
      <React.Fragment>
        <VideoFilter videos={this.state.videos} filterCallback={this.filterVideos} />
        <Typography variant="h5" color="error">{this.state.error}</Typography>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            { this.state.videos.map(video => (
                <Video video={video} key={video.eTag+video.rowKey} />
            ))}
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(VideoList);