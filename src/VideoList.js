import React from 'react';
import axios from 'axios';
import Video from './Video.js'
import getBaseUrl from './Util.js'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import VideoFilter from './VideoFilter';
import { Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import VideoSnackbar from './VideoSnackbar';

const styles = theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  error: {
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(8)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }  
});

const NOT_TAGGED = 'Not Tagged';

class VideoList extends React.Component {
  constructor(props) {
    super(props);
    const { classes } = props;
    this.classes = classes;
     
    this.loadVideos = this.loadVideos.bind(this);
    this.filterVideos = this.filterVideos.bind(this);
    this.filterBySkier = this.filterBySkier.bind(this);
    this.filterByDate = this.filterByDate.bind(this);
    this.filterByStarred = this.filterByStarred.bind(this);
    this.onSelected = this.onSelected.bind(this);

    // State which does not force render()
    this._isMounted = false;
    this.videos = [];

    // Changing any of this state through setState forces re-render()
    this.state = {
      videos: [],
      dateFilter: null,
      skiersFilter: [],
      starredFilter: false,
      loading: false,
      selected: null,
      error: ''
    }
  }

  onSelected(key) {
    console.log("Selected: ", key);
    this.setState( {selected: key} );
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

  getSkierInPath() {
    const field = "skier";
    var href = window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    let name = string ? string[1] : null;
    console.log("Found skier filter in URL: " + name);
    return name;
  }

  getKeyInPath() {
    const field = "key";
    var href = window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    let name = string ? string[1] : null;
    console.log("Found key in URL: " + name);
    return name;
  }

  getDateFromKey(key) {
    const n = key.indexOf('/');
    if (n > 0) {
      let date = key.slice(0, n) + "T12:00:00Z";
      console.log("Date key: ", date);
      return new Date(date);
    }
    else
      return null;
  }

  getSkiers(videos) {
    const distinctSkiers = [...new Set(videos.map(function(v) {
      let skier = '';
      if (v.skier != null && v.skier.trim().length > 0)
        skier = v.skier.trim();  
      else
        skier = NOT_TAGGED;
      return skier;  
    }))];

    const skiersFilter = distinctSkiers.map(s => ({ skier: s, selected: false }));
    console.log("skiers: " + skiersFilter.length);
    return skiersFilter;
  }

  filterByStarred() {
    this.filterVideos(this.state.dateFilter, this.state.skiersFilter, !this.state.starredFilter);
  }

  filterByDate(date) {
    console.log('filtering by date: ' + date);
    this.filterVideos(date, this.state.skiersFilter, this.state.starredFilter);
  }

  filterBySkier(skier) {
    const skierFilter = [...this.state.skiersFilter];
    if (skier != null) {
      console.log('filtering by skier: ' + skier);
      const i = skierFilter.findIndex(s => s.skier === skier);
      skierFilter[i].selected = !skierFilter[i].selected;
    }
    else {
      // Deselect all
      skierFilter.map(s => s.selected = false);
    }
    this.filterVideos(this.state.dateFilter, skierFilter, this.state.starredFilter);
  }

  /*
    date = new Date()
    skiers = [ {skier: 'foo', selected:true}, ... ]
  */
  filterVideos(date, skiers, starred) {
    var filtered = [];
    
    console.log("Filtering... date, skiers, starred:",
      date, skiers, this.state.starredFilter);

    // Filter by starred.
    if (starred)
      filtered = this.videos.filter(v => v.starred === true);
    else 
      filtered = this.videos;

    // Filter by date.
    if (date != null) {
      const formattedDate = this.getDateString(date);
      filtered = filtered.filter(v => v.partitionKey === formattedDate);
    }
    
    // Then filter for selected skiers.
    const skiersFilter = skiers.filter(s => s.selected);
    if (skiersFilter.length > 0) {
      filtered = filtered.filter(function(v) {
        var filterIn = false;
        skiersFilter.forEach(s => {
          if (s.skier === v.skier || 
              (s.skier === NOT_TAGGED && v.skier === '')) {
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
      videos: filtered,
      starredFilter: starred,
      loading: false
    } );
  }

  loadVideos() {
    // Workaround for this: https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component/
    this._isMounted = true;

    var listUrl = getBaseUrl() + '/api/list';    
    console.log("Getting videos from: " + listUrl);

    this.setState({loading: true});

    axios.get(listUrl)
      .then(res => {
        if (res.status !== 200) {
          console.log(listUrl + " error:", res);
          throw new Error("Error response attempting to load videos.");
        }

        if (res.data.length > 0 && res.data[0].partitionKey !== undefined) {
          this.videos = res.data;
          if (this._isMounted) {

            var dateFilter = this.getLatestDate(this.videos);
            var skiersFilter = this.getSkiers(this.videos);

            const filterPathSkier = this.getSkierInPath();
            if (filterPathSkier !== null) {
              const skier = skiersFilter.find(function(value, index) {
                return (value.skier.toLowerCase() === filterPathSkier.toLowerCase())
              });
              if (skier !== undefined) {
                console.log('selected' + skier);
                skier.selected = true;
                dateFilter = null;

                // If a skier is defined, check to see if a specific video was requested.
                var key = this.getKeyInPath();
                if (key !== undefined && key !== null) {
                  this.autoPlayKey = key;
                  const autoPlayDate = this.getDateFromKey(key);
                  if (autoPlayDate) 
                    dateFilter = autoPlayDate;
                }
              }
            }

            this.filterVideos(
              dateFilter, 
              skiersFilter
          )}
        }
        else {
          throw new Error("Video list not returned.");
        }
      })
      .catch((error) => {
        console.log("len", this.videos.length);
        if (this._isMounted) {
          this.setState(
            { 
              error: 'Unable to load videos.  ' + error,
              loading: false 
            });
        }        
      });    
  }
  
  componentDidMount() {
    this.loadVideos();
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
    console.log('starredFilter... ' + this.state.starredFilter);

    function getKey(video) { 
      return video.partitionKey + "/" + video.rowKey; 
    }

    return (
      <React.Fragment>
        <VideoSnackbar forceRefresh={this.loadVideos} />
        <Backdrop className={classes.backdrop} open={this.state.loading}>
          <CircularProgress color="inherit" />
        </Backdrop>        
        <VideoFilter videos={this.state.videos} 
          date={this.state.dateFilter} 
          skiers={this.state.skiersFilter}
          starred={this.state.starredFilter}
          filterDateCallback={this.filterByDate}
          filterSkierCallback={this.filterBySkier} 
          filterStarredCallback={this.filterByStarred}
          totalVideos={this.videos != null ? this.videos.length : 0}
          filteredVideos={this.state.videos != null ? this.state.videos.length : 0}
          loading={this.state.loading}
          />
        <Typography className={classes.error} variant="h5" color="error">{this.state.error}</Typography>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            { this.state.videos.map(video => (
                <Video video={video} 
                  key={getKey(video)} 
                  id={getKey(video)}
                  autoPlay={getKey(video) === this.autoPlayKey} 
                  isSelected={getKey(video) === this.autoPlayKey || getKey(video) === this.state.selected}
                  onSelected={this.onSelected}
                  />
            ))}
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(VideoList);