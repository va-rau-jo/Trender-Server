let express = require("express");
let request = require("request");

let app = express();

if (!(process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET)) {
  console.log("You have to set the Spotify client id and client secret:")
  console.log("  `export SPOTIFY_CLIENT_ID=XXXX`")
  console.log("  `export SPOTIFY_CLIENT_SECRET=YYYY`")
} else {
  const redirect_uri =
    process.env.REDIRECT_URI || "http://localhost:8888/callback";

  app.get("/", function (_, res) {
    const scopes = [
      'playlist-modify-private',
      'playlist-modify-public',
      'playlist-read-collaborative',
      'playlist-read-private',
      'user-read-email',
      'user-read-private'];
    const scopeString = scopes.join(' ');

    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + process.env.SPOTIFY_CLIENT_ID +
      (scopeString ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(redirect_uri));
  });

  app.get("/callback", function(req, res) {
    const code = req.query.code || null;
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri,
        grant_type: "authorization_code"
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64")
      },
      json: true
    };
    request.post(authOptions, function(_, _, body) {
      const uri = process.env.FRONTEND_URI || "http://localhost:3000";
      res.redirect(uri + "?access_token=" + body.access_token);
    });
  });

  let port = process.env.PORT || 8888;
  app.listen(port);
}
