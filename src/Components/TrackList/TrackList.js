import React, { Component } from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => {
          return <Track onAdd={this.props.onAdd} track={track} />;
        })}
      </div>
    );
  }
}

export default TrackList;
