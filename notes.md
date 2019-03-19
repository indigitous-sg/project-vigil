## High level outline 

#### Twilio

- Set up interactive voice recording flow to receive call
- After receiving call, play voice recording and take message
- Store audio recording and transcribe
- Send transcription and audio URL to backend

#### Backend

- Receive webhook from Twilio with transcription and audio URL
- Store information in firebase, and emit event to users who havbe 'active' status
- Receive information from active users on whether they will respond to
- Handle user logins and store user details into firebase
- Handle other webhooks from Twilio, e.g. when calls fail

Note: webhooks can be tested with ngrok

#### Frontend

- First user will create organisation and be administrator by default
- Administrator will approve subsequent requests for members of the organisation, and indicate what level of permissions
- Handle login, use google SSO? Or email / password combination
- Allow users to toggle active / inactive status
- Each call should be listed, with different status (new / being handled by other user / resolved)
- There should be filters for different calls

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