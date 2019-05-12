## Frontend

The frontend is a vue.js based mobile/web application that displays the latest calls received. It uses framework7 so that the applications have native look and feel. 

#### Running instructions for frontend

- Manually add firebase credentials to `firebaseConfig.js` in the `src/components` folder as `export default _firebase credentails json_;`

```
npm install
```

##### Run the app in the browser / simulator

Run this to start the development webpack server:

```
npm run dev
```

You can then open the app in your browser by visiting [localhost:8080](http://localhost:8080)

Open it in the iOS Simulator by running (in another terminal):

`cordova platform add ios` or `phonegap platform add ios`

then

```
npm run cordova-run-ios
```

Or in the Android emulator with:

`cordova platform add android` or `phonegap platform add android`

then

```
npm run cordova-run-android
```

(both of which are just calling `cordova run ios` and `cordova run android`)


##### Build the app for production

To build the app without the development hot module reloading server:

```
npm run build-prod
```

After that, the normal Cordova / PhoneGap commands can be used such as `phonegap serve`, or `cordova run ios`, etc.


#### Other running instructions

- To set up webhooks for testing, run ngrok http 3000 (assuming node app is listening on port 3000) and configure webhooks for voice response manually on twilio console. Alternatively, develop on a branch in the GitHub repo and use that for testing by deploying the branch in the Heroku dashboard.
