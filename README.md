# Trender Server

This service logs in to Spotify and redirects the user to the Trender frontend application with a valid access token as a parameter in the url.

## Development mode

In development mode, it assumes you are running the frontend on localhost:3000, but the server itself will be running on localhost:8888.

Run `npm install` after first cloning or forking the repo, and include the Spotify Client ID and Spotify Secret ID between sessions

```
export SPOTIFY_CLIENT_ID=XXXX
export SPOTIFY_CLIENT_SECRET=YYYY
npm start
```

# Deploying to production

This template is indended to be deployed on Heroku. After installing the heroku CLI tools you can run the below commands in the same directory as server.js(replacing abc123, cba456, mybackend and myfrontend with your actual stuff - the below example assume that you already have your frontend running on http://myfrontend.herokuapp.com.

```
heroku create mybackend
heroku config:set SPOTIFY_CLIENT_ID=abc123
heroku config:set SPOTIFY_CLIENT_SECRET=cba456
heroku config:set REDIRECT_URI=https://mybackend.herokuapp.com/callback
heroku config:set FRONTEND_URI=https://myfrontend.herokuapp.com
git push heroku master
```

You should now be able to go to http://mybackend.herokuapp.com/login and it will eventually redirect to http://myfrontend.herokuapp.com?access_token=ZZZZZwhere ZZZZZ is a valid access token that you can use to do operations in the Spotify API.
