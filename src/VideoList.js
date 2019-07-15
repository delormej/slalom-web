import React from 'react';
import axios from 'axios';

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
    var i = 0;
    return (
        <div>Count: { this.state.videos.length }
            <br/>
            <ul>
                { /* <!-- https://ski-app.azurewebsites.net/api/image?jsonUrl=https://skivideostorage.blob.core.windows.net/ski/2019-07-11/GOPR1300_ts.json */ }
                { this.state.videos.map(video => 
                    <li key={(i++).toString()}>
                        <a href={this.getThumnailUrl(video)} target="_blank">
                            <img src={this.getThumnailUrl(video)} width="320" height="240"/>    
                        </a><br/>
                        <a href={this.getVideoUrl(video)} target="_blank">Video</a><br/>
                        <a href={this.getImageUrl(video)}>Analysis</a><br/>
                        <b>Course Name:</b>{video.courseName}<br/>
                        <b>Speed:</b>{video.boatSpeedMph}<br/>
                        <b>Skier:</b><input type="text" id="skier"/><br/>
                        <b>Rope Length:</b><input type="select" id="ropeLengthM"/><br/>
                        <hr/>
                    </li> 
                )}
            </ul>
        </div>
    )
  }
}