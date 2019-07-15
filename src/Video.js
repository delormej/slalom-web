import React from 'react';

export default class Video extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        video: this.props.video
      };
  }

  getImageUrl(video) {
    var baseUrl = 'https://ski-app.azurewebsites.net/api/image?jsonUrl='; 
    var imageUrl = baseUrl + video.jsonUrl;
    if (video.ropeLengthM != null && video.ropeLengthM !== "0.0") {
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
    var video = this.state.video;      
    return (
      <div>
          <a href={this.getThumnailUrl(video)} target="_blank">
              <img src={this.getThumnailUrl(video)} width="320" height="240"/>    
          </a><br/>
          <a href={this.getVideoUrl(video)} target="_blank">Video</a><br/>
          <a href={this.getImageUrl(video)} target="_blank">Analysis</a><br/>
          <b>Course Name:</b>{video.courseName}<br/>
          <b>Speed:</b>{video.boatSpeedMph}<br/>
          <b>Skier:</b><input type="text" id="skier"/><br/>
          <b>Rope Length:</b><input type="select" id="ropeLengthM"/><br/>
          <hr/>
      </div>
    );
  }
}
  