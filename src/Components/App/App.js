import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          id: '1',
          name: 'Well That Looks Weird',
          artist: 'BlagDaggery',
          album: 'The Exposition of Something Strage'
        },
        {
          id: '2',
          name: 'Good Morning',
          artist: 'One Lonely Pancake',
          album: 'Short Stack'
        },
        {
          id: '3',
          name: 'Flying Kites',
          artist: 'Crystal Skies',
          album: 'Crystal Skies'
        }
      ],
      playlistName: 'TrackDaggery',
      playlistTracks: [
        {
          id: '1',
          name: 'Well That Looks Weird',
          artist: 'BlagDaggery',
          album: 'The Exposition of Something Strage'
        },
        {
          id: '2',
          name: 'Good Morning',
          artist: 'One Lonely Pancake',
          album: 'Short Stack'
        },
        {
          id: '3',
          name: 'Flying Kites',
          artist: 'Crystal Skies',
          album: 'Crystal Skies'
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    if(!this.state.playlistTracks.contains(track.id)) {
      this.setState({playlistTracks: this.state.playlistTracks.push(track)});
    }
  }

  removeTrack(track) {
    let index = this.state.playlistTracks(track.id);
    this.setState({playlistTracks: this.state.playlistTracks.splice(index)});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
