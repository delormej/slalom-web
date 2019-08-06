import React from 'react';
import axios from 'axios';
import Video from './Video.js'
import Util from './Util.js'
import { throwStatement } from '@babel/types';

  
export default class VideoList extends React.Component {
  constructor(props) {
    super(props);
      
    // State which does not force render()
    this._isMounted = false;
    this.onlyShowToday = true;
    this.videos = [];

    // Changing any of this state through setState forces re-render()
    this.state = {
      videos: [],
      skiers: [],
      onlyShowToday: this.onlyShowToday,
      error: ''
    }

    this.todaysVideosOnClick = this.todaysVideosOnClick.bind(this);
  }

  videoListHeader() {
    var filterLink = '';
    var title = '';
    var count = this.state.videos.length;

    // Check if there was an error loading the data.
    if (count == 0 && this.state.error != '') {
      return (
        <div>
          <h3>Error!</h3>
          {this.state.error}
        </div>
      )
    }

    if (this.state.onlyShowToday) {
      filterLink = 'Show All Videos';
      title = 'Today\'s Videos (' + this.getDateString() + ')';
    } 
    else {
      filterLink = 'Show Only Today\'s Videos';
      title = 'All Videos';
    }

    return (
      <div>
        <h1>
        {title}
        </h1>
        <h3>
        Count: { count }, <a href="#" onClick={this.todaysVideosOnClick}>{filterLink}</a>
        <br/>
      </h3>        
      </div>
    )
  }

  // getDistinctSkiers(videos) {
  //   // TODO: Get this dynamically from the list.
  //   this.setState({ skiers: ['Jason', 'John', 'Chet', 'Karl', 'Jack'] });
  // }

  getDateString() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    if(dd<10) {
        dd = '0'+dd
    } 
    
    if(mm<10) {
        mm = '0'+mm
    } 
    
    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }

  filterVideos() {
    console.log('filtering videos, onlyShowToday==' + this.onlyShowToday)
    var filtered = [];

    if (this.onlyShowToday) {
      const date = this.getDateString();
      filtered = this.videos.filter(v => v.partitionKey === date);
    }
    else {
      filtered = this.videos;
    }

    this.setState( {
      onlyShowToday: this.onlyShowToday,
      videos: filtered
    } );
  }

  todaysVideosOnClick() {
    console.log('todaysVideosOnClick, onlyShowToday==' + this.state.onlyShowToday);
    // Toggle state.
    this.onlyShowToday = !this.onlyShowToday;
    // Refresh list.
    this.filterVideos();
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
          this.filterVideos();              
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
    var i = 0;
    const header = this.videoListHeader();

    return (
      <div>
          {header}
          <ul>
              { this.state.videos.map(video => 
                  <li key={(i++).toString()}>
                    <Video video={video} videoKey={(i++).toString()} />
                  </li>
              )}
          </ul>
    </div>);
  }
}