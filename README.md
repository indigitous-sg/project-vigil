## High level outline 

#### Twilio

- Set up webhooks for call that is received
    - After receiving call, play voice recording and take message
    - Store audio recording and transcribe
    - Send transcription and audio URL to backend

#### Backend

- Receive webhook from Twilio with transcription and audio URL
- Store information in firebase, and emit event to users who havbe 'active' status
- Receive information from active users on whether they will respond to
- Handle other webhooks from Twilio, e.g. when calls fail

Note: webhooks can be tested with ngrok

#### Frontend

- Handle login using firebase authentication
- Allow users to toggle active / inactive status
- Three tabs to differentiate different call statuses: Assigned to me, Open, Closed
- Ability to play audio given media file url

#### TODO

- Add tests for nodejs backend call flow
- Rewrite to run backend on Google App Engine so multiple users can test at appspot domain


#### Future Features

- Admin console to manage users within specific organisations

#### Running instructions from a Cordova template:

`cordova platform add ios`
`cordova platform add android`
`cordova platform add browser`

`cordova requirements`

`cordova build`

`cordova emulate android`

#### Other running instructions

- To set up webhooks for testing, run ngrok http 3000 (assuming node app is listening on port 3000) and configure webhooks for voice response manually on twilio console
- 

#### Notes:

- In case `x86` emulator cannot be found, cd $sdk/emulator and create symlink `ln -s emulator64-x86 emulator-x86` (for Mac OS / Linux)
- Add env variable ANDROID_SDK_ROOT: `export ANDROID_SDK_ROOT=/Users/andrewtan/Library/Android/sdk`
- Add emulator and tools to PATH: `export PATH=$ANDROID_SDK_ROOT/emulator:$ANDROID_SDK_ROOT/tools:$PATH`