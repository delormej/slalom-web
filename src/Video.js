import React from 'react';

export default class Video extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
        video: this.props.video,
        ropeLengthM: this.props.video.ropeLengthM || 15,
        skier: this.props.video.skier || ''
      };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
        [name]: value
    });
  }

  getImageUrl() {
    var baseUrl = 'https://ski-app.azurewebsites.net/api/image?jsonUrl='; 
    var imageUrl = baseUrl + this.state.video.jsonUrl;
    if (this.state.video.ropeLengthM != null && this.state.ropeLengthM !== "0.0") {
        imageUrl += '&rope=' + this.state.ropeLengthM;
    }
    return imageUrl;
  }

  getVideoUrl() {
      var baseUrl = './video.html?video=';
      var videoUrl = baseUrl + this.state.video.url;
      return videoUrl;
  }

  getThumnailUrl() {
      return this.state.video.thumbnailUrl;
  }

  render() {
    var video = this.state.video;      
    return (
      <div>
          <a href={this.getThumnailUrl()} target="_blank">
              <img src={this.getThumnailUrl()} width="320" height="240"/>    
          </a><br/>
          <a href={this.getVideoUrl()} target="_blank">Video</a><br/>
          <a href={this.getImageUrl()} target="_blank">Analysis</a><br/>
          <b>Date:</b>{video.partitionKey}<br/>
          <b>Course Name:</b>{video.courseName}<br/>
          <b>Speed:</b>{video.boatSpeedMph}<br/>
          <b>Skier:</b><input type="text" value={this.state.skier} onChange={this.handleInputChange} name="skier"/><br/>
          <b>Rope Length:</b><input type="text" value={this.state.ropeLengthM} onChange={this.handleInputChange} name="ropeLengthM"/><br/>
          <hr/>
      </div>
    );
  }
}
  