const Router = require('express').Router;
const { welcome, menu, recordMessage, askForNumber, endCall } = require('./handler');
const { sendNotification } = require('./sendNotification');

const moment = require('moment');

const router = new Router();
const admin = require('firebase-admin');
var serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
var tokenList = []

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

    getTokens().then(() => {
        console.log(tokenList)
        tokenList = tokenList.unique();
        for (var i = 0; i < tokenList.length; i++) {
            console.log('Sending notification to: ' + tokenList[i]);
            sendNotification(tokenList[i]);
        }
    }).catch((error) => console.error('Could not send notifications: ' + error))
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

// Function to upload call data which takes call_sid and other_params
async function upload(call_sid, other_params) {

    return await db.collection('calls')
        .doc(call_sid)
        .set(JSON.parse(JSON.stringify(other_params)), { merge: true })
        .then(() => console.log('Successful upload'))
        .catch(() => console.error('Could not write to firestore!'))
        // TODO: Logging if upload fails
}

// Function to look through collection titled 'registration_tokens'
// and add all to an array which will then be read to send notifications to
async function getTokens() {

    return await db.collection('registration_tokens').get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
            }

            snapshot.forEach(doc => {
                //console.log(doc.data()['token']);
                tokenList.push(doc.data()['token']);
            });
        }).catch(() => console.error('Could not get tokens!'))
}

// Define function prototype that returns only unique values
// This is needed because each device stores the same token at multiple documents
// each time it connects
Array.prototype.unique = function() {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        if (!arr.includes(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr;
}

module.exports = router;