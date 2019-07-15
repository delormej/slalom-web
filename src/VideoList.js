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

  getImageUrl(video) {
    var baseUrl = 'https://ski-app.azurewebsites.net/api/image?jsonUrl='; 
    var imageUrl = baseUrl + video.jsonUrl;
    if (video.ropeLengthM != null && video.ropeLengthM != "0.0") {
        imageUrl += '&rope=' + video.ropeLengthM;
    }
    return imageUrl;
  }

  getVideoUrl(video) {
      var baseUrl = './video.html?video=';
      var videoUrl = baseUrl + video.url;
      return videoUrl;
  }

  getThumnailUrl(video) {
      return video.thumbnailUrl;
  }

  render() {
    return (
        <div>Count: { this.state.videos.length }
            <br/>
            <ul>
                { /* <!-- https://ski-app.azurewebsites.net/api/image?jsonUrl=https://skivideostorage.blob.core.windows.net/ski/2019-07-11/GOPR1300_ts.json */ }
                { this.state.videos.map(video => 
                  <Video video={video} />
                )}
            </ul>
        </div>
    )
  }
}