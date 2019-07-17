import React from 'react';
import axios from 'axios';
import Video from './Video.js'
import Util from './Util.js'

export default class VideoList extends React.Component {
  _isMounted = false;
  state = {
    videos: [],
    error: ''
  }

  componentDidMount() {
    // Workaround for this: https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component/
    this._isMounted = true;

    var util = new Util();
    var listUrl = util.getBaseUrl() + '/api/list';    

    axios.get(listUrl)
      .then(res => {
        const videos = res.data;
        if (this._isMounted) {
          this.setState({ videos: videos });
        }        
      })
      .catch((error) => {
        if (this._isMounted) {
          this.setState({ error: 'Unable to load videos.'});
        }        
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  
  render() {
    var i = 0;
    var count = this.state.videos.length;
    if (count === 0) {
      return (<div>Loading...{this.state.error}</div>);
    }
    else
    {
      return (
        <div>Count: { count }
            <br/>
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
}