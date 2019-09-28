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
    this.filterBySkier = this.filterBySkier.bind(this);
    this.filterByDate = this.filterByDate.bind(this);

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

  getLatestDate(videos) {
    const latest = new Date(Math.max(...videos.map(
      videos=> new Date(videos.recordedTime))));
    console.log('Latest date: ' + latest);
    return latest;
  }

  getSkiers(videos) {
    const distinctSkiers = [...new Set(videos.map(function(v) {
      let skier = '';
      if (v.skier != null && v.skier.trim().length > 0)
        skier = v.skier.trim();  
      else
        skier = 'Not Tagged';
      return skier;  
    }))];

    const skiersFilter = distinctSkiers.map(s => ({ skier: s, selected: false }));
    console.log("skiers: " + skiersFilter.length);
    return skiersFilter;
  }

  filterByDate(date) {
    console.log('filtering by date: ' + date);
    this.filterVideos(date, this.state.skiersFilter);
  }

  filterBySkier(skier) {
    // var count = skiers != null ? skiers.length : 0;
    console.log('filtering by skier: ' + skier);
    const i = this.state.skiersFilter.findIndex(s => s.skier === skier);
    const skierFilter = [...this.state.skiersFilter];
    skierFilter[i].selected = !skierFilter[i].selected;

    this.filterVideos(this.state.dateFilter, skierFilter);
  }

  /*
    date = new Date()
    skiers = [ {skier: 'foo', selected:true}, ... ]
  */
  filterVideos(date, skiers) {
    var filtered = [];
    
    // Filter by date first.
    if (date != null) {
      const formattedDate = this.getDateString(date);
      filtered = this.videos.filter(v => v.partitionKey === formattedDate);
    }
    else {
      filtered = this.videos;
    }
    
    // Then filter for selected skiers.
    const skiersFilter = skiers.filter(s => s.selected);
    if (skiersFilter.length > 0) {
      filtered = filtered.filter(function(v) {
        var filterIn = false;
        skiersFilter.forEach(s => {
          if (s.skier === v.skier) {
            filterIn = true;
            return;
          }
        });
        return filterIn;
      });
    }

    this.setState( {
      dateFilter: date,
      skiersFilter: skiers,
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
          this.filterVideos(
            this.getLatestDate(this.videos), 
            this.getSkiers(this.videos) 
        )}
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
    console.log('skiers count... ' + this.state.skiersFilter.length);

    return (
      <React.Fragment>
        <VideoFilter videos={this.state.videos} 
          date={this.state.dateFilter} 
          skiers={this.state.skiersFilter}
          filterDateCallback={this.filterByDate}
          filterSkierCallback={this.filterBySkier} 
          totalVideos={this.videos != null ? this.videos.length : 0}
          filteredVideos={this.state.videos != null ? this.state.videos.length : 0}
          />
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