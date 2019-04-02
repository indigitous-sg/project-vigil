## High level outline 

#### Twilio

- Set up webhooks for call that is received
    - After receiving call, play voice recording and take message
    - Store audio recording and transcribe
    - Send transcription and audio URL to backend

#### Backend

- Receive webhook from Twilio with transcription and audio URL
- Store information in firebase
- Receive information from active users on whether they will respond to call
- Handle other webhooks from Twilio, e.g. when calls fail

##### Deployment instructions for backend
- Instructions to deploy from a subfolder on heroku are here: https://stackoverflow.com/questions/39197334/automated-heroku-deploy-from-subfolder
- Manually add firebase json credentials into heroku dyno. Suggest just 'echo'-ing the credentials as using transfer.sh and gpg does not seem to work reliably and heroku dyno does not have a text editor.

Note: webhooks can be tested with ngrok

#### Frontend

- Handle login using firebase authentication
- Allow users to toggle active / inactive status (whether to receive notifications)
- Three tabs to differentiate different call statuses: Assigned to me, Open, Closed
- Ability to play audio given media file url

#### TODO

- Add more tests for nodejs backend call flow
- Add more detailed running instructions


#### Future Features

- Admin console to manage users within specific organisations

#### Running instructions for frontend:

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

#### Notes:

- In case `x86` emulator cannot be found, cd $sdk/emulator and create symlink `ln -s emulator64-x86 emulator-x86` (for Mac OS / Linux)
- Add env variable ANDROID_SDK_ROOT: `export ANDROID_SDK_ROOT=/Users/andrewtan/Library/Android/sdk`
- Add emulator and tools to PATH: `export PATH=$ANDROID_SDK_ROOT/emulator:$ANDROID_SDK_ROOT/tools:$PATH`
- In case of issues with cocoapods: `sudo gem install cocoapods -n /usr/local/bin`
- For ios, if using XCode 10, `cordova run ios --buildFlag='-UseModernBuildSystem=0'`, `cordova build ios --buildFlag='-UseModernBuildSystem=0'`