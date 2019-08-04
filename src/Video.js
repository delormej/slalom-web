import React from 'react';
import Util from './Util.js';
import axios from 'axios';

export default class Video extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveClick = this.saveClick.bind(this);

    var util = new Util();
    this.baseUrl = util.getBaseUrl();
    this.imageApiUrl = this.baseUrl + '/api/image?jsonUrl=';

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

    if (name === "skier") {
      this.handleSkierChange(value);
    }
    else if (name === "ropeLengthM") {
      this.handleRopeChange(value);
    }

    this.setState({
      [name]: value
    });
  }

  validRopeLength(length) {
    return true;
  }

  handleRopeChange(value) {
    if (this.validRopeLength(value)) {
      this.state.video.ropeLengthM = value;
    }
  }

  handleSkierChange(value) {
    this.state.video.skier = value;
  }

  saveClick(event) {
    var json = JSON.stringify(this.state.video);
    var updateUrl = this.baseUrl + '/api/updatevideo';
    console.log('Saving video' + updateUrl + ':\n' + json);

    axios.post(updateUrl, json)
      .then(res => {
        console.log('Updated? ' + res);        
      })
      .catch((error) => {
        if (this._isMounted) {
          this.setState({ error: 'Unable to update video. ' + error});
        }        
      });
  }

  getImageUrl() {
    var imageUrl = this.imageApiUrl + this.state.video.jsonUrl;
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
        <tbody>
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
            <center>
              <button onClick={this.saveClick}>Save</button><br/>
            </center>
          </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
  