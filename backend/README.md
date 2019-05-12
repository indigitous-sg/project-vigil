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
- Receive information from active users on whether they will respond to call
- Handle other webhooks from Twilio, e.g. when calls fail

##### Deployment instructions for backend
- Instructions to deploy from a subfolder on heroku are here: https://stackoverflow.com/questions/39197334/automated-heroku-deploy-from-subfolder
- Manually add firebase json credentials into heroku 'Settings' -> 'Config Vars'.

Note: webhooks can be also tested with ngrok

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

