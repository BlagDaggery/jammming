const clientID = '810f92f9db924ed1aec2d57589caa38c';
const redirectURI = 'http://localhost:3000/';

var accessToken = '';
var tokenInURL = window.location.href.match(/access_token=([^&]*)/);

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else if (tokenInURL) {
      accessToken = tokenInURL;
      let expiration = window.location.href.match(/expires_in=([^&]*)/);
      window.setTimeout(() => accessToken = '', expiration * 1000);
      window.history.pushState('Acess Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(searchTerm) {
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: {'Authorization': `Bearer ${accessToken}`}
      }
    ).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        })
      }
    });
  }
};

export default Spotify;
