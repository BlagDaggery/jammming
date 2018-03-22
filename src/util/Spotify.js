const clientID = '810f92f9db924ed1aec2d57589caa38c';
const redirectURI = 'http://localhost:3000/';

const accessToken = '';
const tokenInURL = window.location.href.match(/access_token=([^&]*)/);

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
  }
};

export default Spotify;
