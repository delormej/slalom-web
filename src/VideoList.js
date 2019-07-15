import React from 'react';
import axios from 'axios';
import Video from './Video.js'

export default class VideoList extends React.Component {
  state = {
    videos: []
  }

  componentDidMount() {
    axios.get('http://ski-app.azurewebsites.net/api/list')
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
                { /* <!-- https://ski-app.azurewebsites.net/api/image?jsonUrl=https://skivideostorage.blob.core.windows.net/ski/2019-07-11/GOPR1300_ts.json */ }
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