import React from 'react';
import axios from 'axios';
import Video from './Video.js'
import Util from './Util.js'

export default class VideoList extends React.Component {
  state = {
    videos: []
  }

  componentDidMount() {
    var util = new Util();
    var listUrl = util.getBaseUrl() + '/api/list';    

    axios.get(listUrl)
      .then(res => {
        const videos = res.data;
        this.setState({ videos });
      })
  }

  render() {
    var i = 0;
    return (
        <div>Count: { this.state.videos.length }
            <br/>
            <ul>
                { this.state.videos.map(video => 
                    <li key={(i++).toString()}>
                      <Video video={video} videoKey={(i++).toString()} />
                    </li>
                )}
            </ul>
        </div>
    )
  }
}