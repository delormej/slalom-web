import React from 'react';

export default class Video extends React.Component {
    state = {
      video: this.props.video
    }
  
    componentDidMount() {
    }

    render() {
      var i = 0;
      var video = this.state.video;      
      return (
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
      );
    }
}
  