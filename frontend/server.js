const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const http = require('http');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const twilio = require('twilio');

const router = new express.Router();

const menu = require('./routes/menu');

app.use('/ivr/menu', menu);

app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });


http.createServer((req, res) => {
    const twiml = new VoiceResponse();

    twiml.say('Hello from your pals at team Vigil! Have fun.');

    res.writeHead(200, { 'Content-Type': 'text/xml'});
    res.end(twiml.toString());
}).listen(1337, '127.0.0.1');


app.use(cors());
app.use(bodyParser.json());
app.use(express.static("www"));
app.listen(process.env.PORT || 1234);
