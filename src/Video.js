import React from 'react';
import Util from './Util.js'

export default class Video extends React.Component {
  constructor(props) {
    super(props);

    var util = new Util();
    this.baseUrl = util.getBaseUrl() + '/api/image?jsonUrl=';

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
    var imageUrl = this.baseUrl + this.state.video.jsonUrl;
    if (this.state.video.ropeLengthM != null && this.state.ropeLengthM !== "0.0") {
        imageUrl += '&rope=' + this.state.ropeLengthM;
    }
    return imageUrl;
  }

  getVideoUrl() {
      var relativeUrl = './video.html?video=';
      var videoUrl = relativeUrl + this.state.video.url;
      return videoUrl;
  }

  getThumnailUrl() {
      return this.state.video.thumbnailUrl;
  }

  render() {
    var video = this.state.video;      
    return (
      <table>
          <tr>
          <td>
            <a href={this.getThumnailUrl()} target="_blank">
                <img src={this.getThumnailUrl()} width="320" height="240"/>    
            </a>
          </td>
          <td>
            <a href={this.getVideoUrl()} target="_blank">Video</a><br/>
            <a href={this.getImageUrl()} target="_blank">Analysis</a><br/>
            <b>Date:</b>{video.partitionKey}<br/>
            <b>Course Name:</b>{video.courseName}<br/>
            <b>Speed:</b>{video.boatSpeedMph}<br/>
            <b>Skier:</b><input type="text" value={this.state.skier} onChange={this.handleInputChange} name="skier"/><br/>
            <b>Rope Length:</b><input type="text" value={this.state.ropeLengthM} onChange={this.handleInputChange} name="ropeLengthM"/><br/>
          </td>
          </tr>
      </table>
    );
  }
}
  