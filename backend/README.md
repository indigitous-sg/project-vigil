## Backend

The backend is a node.js application that receives webhooks from calls received through the Twilio API.

### Setting up Twilio

- Set up webhooks for call that is received
    - After receiving call, play voice recording and take message
    - Store audio recording and transcribe
    - Send transcription and audio URL to backend

#### Backend

- Receive webhook from Twilio with transcription and audio URL
- Store information in firebase
- Send firebase notification once new call is received.
- Receive information from active users on whether they will respond to call
- Handle other webhooks from Twilio, e.g. when calls fail

#### Deployment instructions for backend
- Instructions to deploy from a subfolder on heroku are here: https://stackoverflow.com/questions/39197334/automated-heroku-deploy-from-subfolder
- Manually add firebase json credentials into heroku 'Settings' -> 'Config Vars'.

#### Local Testing

- `node index.js` to start server on localhost:3000, ensure that `process.env.FIREBASE_CREDENTIALS` has been set
- Use `ngrok` to tcp tunnel out, if testing with Twilio, but the endpoint must be manually changed in the Twilio console
Note: webhooks can be also tested with ngrok

#### TODO

- Add more tests for nodejs backend call flow
- Add more detailed running instructions

#### Future Features

- Admin console to manage users within specific organisations

