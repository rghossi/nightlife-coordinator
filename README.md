# nighlife-coordinator

freeCodeCamp back-end challenge

Live demo: https://imgoingto.herokuapp.com/ 

This is a [freeCodeCamp](https://www.freecodecamp.com/challenges/build-a-nightlife-coordination-app) back-end challenge implementation.

It was built using Node, MongoDB, React (+ react-hot-loader), Redux, Express and facebook authentication (amonth other common packages as you can see in the `package.json` file).

## Pre Running Instructions

### Facebook Auth

In order to use facebook authentication, you have to create a new app at [Facebook Developers](https://developers.facebook.com/docs/apps/register).

Then create the following file to store all sensitive data.

```
//src/config/auth.js
module.exports = {

    'facebookAuth' : {
        'clientID'      : 'YOUR_APP_ID',
        'clientSecret'  : 'YOUR_APP_SECRET',
        'callbackURL'   : 'FACEBOOK_CALLBACK_URL'
    }

};
```

An alternative is to set the following environment variables if you are running in production:

```
clientID='YOUR_APP_ID'
clientSecret='YOUR_APP_SECRET'
callbackURL='FACEBOOK_CALLBACK_URL'
```

### Google Search API

This app is using google custom search API to retrieve bars and you should get an API key in order to be able to use it.

Go to [Google Developers Console](https://console.developers.google.com/?pli=1), get a key for your application and enable the place search api in this key. Then create the following file to store you key.

```
//src/config/googleSearchApi.js
module.exports.key = "YOUR_GOOGLE_API_KEY";
```

If you are running in production, use an environment variable instead:

```
GOOGLE_SEARCH_KEY="YOUR_GOOGLE_API_KEY"
```

And that's it! You're all set to run the application.

## Running Instructions

Firsts things first, run `npm install` to get all packages needed (it might take a while).

1nd terminal tab: `sudo mongod` (make sure you already have mongodb installed)

2rd terminal tab: `npm run dev`

Then, just open your browser at `http://localhost:3000`

To simulate a production environment, use `npm start` instead. This will disable react-hot-loader.

## Additional commands

`npm run test` to run all back-end tests

`npm run test:watch` same as before, but it will listen for changes in your code

`npm run build` to bundle everything using webpack

`npm run build:watch` it keeps listening for changes

Note that when using react-hot-loader, you don't have to use npm build to bundle all the code since webpack middleware is already taking care of that. You should only use `npm run build` when running it without react-hot-loader (in your production envionment, for instance).
