import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
      {
        name: 'Well That Looks Weird',
        artist: 'BlagDaggery',
        album: 'The Exposition of Something Strage'
      },
      {
        name: 'Good Morning',
        artist: 'One Lonely Pancake',
        album: 'Short Stack'
      },
      {
        name: 'Flying Kites',
        artist: 'Crystal Skies',
        album: 'Crystal Skies'
      }
    ]};
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
