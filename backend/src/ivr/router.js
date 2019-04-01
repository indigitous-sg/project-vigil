const Router = require('express').Router;
const { welcome, menu, recordMessage, askForNumber, endCall } = require('./handler');

const moment = require('moment');

const router = new Router();
const admin = require('firebase-admin');
var serviceAccount = require('Project-Vigil-401886995d80.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();



// POST: /ivr/welcome
router.post('/welcome', (req, res) => {
    upload(req.body.CallSid, {
        InitialInfo: req.body,
        // Set Call Status to NEW - users can later change this status once pending / resolved
        // Other statuses could be PENDING and RESOLVED
        CallStatus: 'NEW',
        Assignee: 'NONE',
        Timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
    })
    res.send(welcome());
});

// POST: /ivr/menu
router.post('/menu', (req, res) => {
    const digit = req.body.Digits;
    upload(req.body.CallSid, {
        MenuSelection: req.body.Digits
    })
    return res.send(menu(digit));
});

// POST: /ivr/recordMessage
// router.post('/recordMessage', (req, res) => {
//   res.send(recordMessage());
// });

// POST: /ivr/storeVoiceMessage
// Test curl: curl -d '{"CallSid":"value1", "key3":"value2"}' \
// -H "Content-Type: application/json" -X POST http://localhost:3000/ivr/storeVoiceMessage
router.post('/storeVoiceMessage', (req, res) => {

    //check for property
    upload(req.body.CallSid, {
        VoiceMessage: req.body
    });
    res.send(askForNumber());
});

router.post('/noMenuResponse', (req, res) => {
    res.send(askForNumber());
})

// POST: /ivr/storeNumber
router.post('/storeNumber', (req, res) => {
    const digits = req.body.Digits;
    //console.log(req.body)
    upload(req.body.CallSid, {
        CallerNumProvided: digits,
        StoreNumber: req.body
    })
    res.send(endCall());
});

// POST: /ivr/storeVoiceMessageTranscription
router.post('/storeVoiceMessageTranscription', (req, res) => {
    //console.log(req.body);
    upload(req.body.CallSid, {
        Transcription: req.body
    });
    res.status(200).send("Stored voice message.")
});

async function upload(call_sid, other_params) {

    return await db.collection('calls')
        .doc(call_sid)
        .set(JSON.parse(JSON.stringify(other_params)), { merge: true })
        .then(() => console.log('Successful upload'))
        .catch(() => console.error('Could not write to firestore!'))
    // TODO: Logging if upload fails
}

module.exports = router;