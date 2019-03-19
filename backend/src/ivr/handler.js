const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.welcome = function welcome() {
    const voiceResponse = new VoiceResponse();

    const gather = voiceResponse.gather({
        action: '/ivr/menu',
        numDigits: '1',
        method: 'POST',
    });

    // TODO: Change this to a custom track using <Play> verb
    // https://www.twilio.com/docs/voice/twiml/play
    gather.say(
        'Thank you for calling the BigLove hotline. ' +
        'We are unable to answer your call at this moment. ' +
        'Press 1 to leave a message.' // max two minutes to use twilio auto transcribe
    );

    gather.pause({
        length: 1
    })

    gather.say({
        voice: 'woman',
        language: 'zh-CN',
    }, '你好！谢谢你称之为大爱。请按1留言。'
    );

    // Workaround to ask for phone number if there is no response
    voiceResponse.redirect('/ivr/noMenuResponse');
    
    return voiceResponse.toString();
}

exports.menu = function menu(digit) {
    const optionActions = {
        '1': recordMessage,
    };

    return (optionActions[digit])
    ? optionActions[digit]()
    : exports.askForNumber(); // End the call if there is no option
}

function recordMessage() {
    const voiceMessage = new VoiceResponse();
    
    voiceMessage.say(
        'Please leave a message after the beep, then press any key when done. The maximum message length is 2 minutes.'
    );
    // voiceMessage.pause({
    //     length: 1
    // })

    // voiceMessage.say({
    //     voice: 'woman',
    //     language: 'zh-CN',
    // }, '请在发出哔哔声后留言，完成后按任意键。最长语音留言长度为2分钟。'
    // );

    voiceMessage.record({
        recordingStatusCallback: '/ivr/storeVoiceMessage',
        timeout: 15,
        transcribe: true,
        finishOnKey: '1234567890*#',
        playBeep: true,
        transcribeCallback: '/ivr/storeVoiceMessageTranscription',
    })

    // Code after record block is executed only if no recording
    voiceMessage.redirect('/ivr/noMenuResponse');

    return voiceMessage.toString();
}

exports.askForNumber = function askForNumber(){
    
    const voiceResponse = new VoiceResponse();
    const gather = voiceResponse.gather({
        action: '/ivr/storeNumber',
        numDigits: '8',
        method: 'POST',
    });

    gather.say(
        'If you would like us to call you back, please enter your 8 digit phone number on the keypad now.'
    );
    
    // Workaround - should be able to call endCall function directly?
    voiceResponse.say('Thank you for calling Big Love. Have a great day!');

    return voiceResponse.toString();
};

exports.endCall = function endCall() {
    const twiml = new VoiceResponse();
  
    twiml.say('Thank you for calling Big Love. Have a great day!', {
      voice: 'alice',
      language: 'en-GB',
    });
  
    twiml.hangup();
  
    return twiml.toString();
  }