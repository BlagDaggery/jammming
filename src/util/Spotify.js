const clientID = '810f92f9db924ed1aec2d57589caa38c';
//const redirectURI = 'https://blagdaggery.github.io/jammming/';
const redirectURI = 'http://localhost:3000/';

let accessToken;

var tokenInURL = window.location.href.match(/access_token=([^&]*)/);

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else if (tokenInURL) {
      accessToken = tokenInURL[1];
      let expiration = window.location.href.match(/expires_in=([^&]*)/);
      window.setTimeout(() => accessToken = '', expiration[1] * 1000);
      window.history.pushState('Acess Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(searchTerm) {
    const accessToken = Spotify.getAccessToken();
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: {"Authorization": `Bearer ${accessToken}`}
      }
    ).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }
      });
    });
  },

  async savePlaylist(playlistName, trackURIs) {
    if(!playlistName || !trackURIs.length) {
      if (!playlistName) {
        console.log("No request made. Please give your playlist a name.");
      }
      if (!trackURIs.length) {
        console.log("No request made. Please add tracks to your playlist.");
      }
      return;
    } else {
      const accessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      let userID;
      return fetch(
        `https://api.spotify.com/v1/me`,
        {
          headers: headers
        }
      ).then(response => response.json()).then(jsonResponse => {
        userID = jsonResponse.id;
        return fetch(
          `https://api.spotify.com/v1/users/${userID}/playlists`,
          {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: playlistName})
          }
        ).then(response => response.json()).then(jsonResponse => {
          const playlistID = jsonResponse.id;
          return fetch(
            `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
            {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({"uris": trackURIs})
            }
          );
        });
      });
    }
  } // Closes method
}; // Closes Object

export default Spotify;
