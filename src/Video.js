import React from 'react';
import Util from './Util.js';
import axios from 'axios';

export default class Video extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveClick = this.saveClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.DeleteButton = this.DeleteButton.bind(this);
    this.Thumbnail = this.Thumbnail.bind(this);

    var util = new Util();
    this.baseUrl = util.getBaseUrl();
    this.imageApiUrl = this.baseUrl + '/api/image?jsonUrl=';

    // Set defaults for text values if null.
    this.props.video.skier = this.props.video.skier || '';
    this.props.video.notes = this.props.video.notes || '';

    // Using spread operator to promote video object properties to be
    // shallow properties of state.  React doesn't repaint if deep nested
    // properties are changed.
    this.state = { ...this.props.video };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  saveClick(event) {
    this.save();
  }

  deleteClick(event) {
    // this.setState((state) => {
    //   return {markedForDelete: !state.markedForDelete};
    // }, this.save());
    this.setState(
      {markedForDelete: !this.state.markedForDelete},
      this.save
    );
  }

  save() {
    const video = this.state;
    const json = JSON.stringify(video);
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
    var imageUrl = this.imageApiUrl + this.state.jsonUrl;
    if (this.state.ropeLengthM != null && this.state.ropeLengthM !== "0.0") {
        imageUrl += '&rope=' + this.state.ropeLengthM;
    }
    return imageUrl;
  }

  getVideoUrl() {
      var relativeUrl = './video.html?video=';
      var videoUrl = relativeUrl + this.state.url;
      return videoUrl;
  }

  getThumnailUrl() {
      return this.state.thumbnailUrl;
  }

  // Renders a delete button based on current state.
  DeleteButton(props) {
    if (props.markedForDelete)
    return <button onClick={this.deleteClick}>Undo Delete</button>;
    else
      return <button onClick={this.deleteClick}>Delete</button>;
  }

  Thumbnail(props) {
    return (
          <a href={this.getThumnailUrl()} target="_blank">
                <img src={this.getThumnailUrl()} width="320" height="240"/>    
          </a>
      );
  }

  render() {
    const video = this.state;  
    return (
      <table>
        <tbody>
          <tr>
          <td>
            <this.Thumbnail />
          </td>
          <td valign="top">
            <label><b>Notes</b></label><br/>
            <textarea name="notes"
              rows="10" cols="60"
              value={this.state.notes} 
              onChange={this.handleInputChange} />
          </td>          
          <td>
            <b>Date:&nbsp;</b>{video.recordedTime}<br/>
            <b>Course Name:&nbsp;</b>{video.courseName}<br/>
            <b>Speed:&nbsp;</b>{video.boatSpeedMph}<br/>
            <b>Skier:&nbsp;</b><input type="text" value={this.state.skier} onChange={this.handleInputChange} name="skier"/><br/>
            <label>
              <b>Rope Length:&nbsp;</b>
              <select name="ropeLengthM" value={this.state.ropeLengthM} onChange={this.handleInputChange}>
                <option value="15">15' Off</option>
                <option value="22">22' Off</option>
                <option value="28">28' Off</option>
                <option value="32">32' Off</option>
                <option value="35">35' Off</option>
                <option value="0">75' Full Rope</option>
              </select>
            </label>
            <hr/>
            <center>
              <button onClick={this.saveClick}>Save</button>&nbsp;
              <this.DeleteButton markedForDelete={this.state.markedForDelete} />
            </center>
            <hr/>
            <a href={this.getVideoUrl()} target="_blank">Video</a><br/>
            <a href={this.getImageUrl()} target="_blank">Analysis</a><br/>       
          </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
  