import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    };
    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  search(searchTerm) {
    this.setState({searchResults: [Spotify.search(searchTerm)]});
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackURIs = [];
    this.state.playlistTracks.map(track => {
      trackURIs.push(track.uri);
    });
    return trackURIs;
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchTerm={this.state.searchTerm} onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              onAdd={this.addTrack}
              searchResults={this.state.searchResults}
            />
            <Playlist
              playlistName={this.state.playlistName}
              onNameChange={this.updatePlaylistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
