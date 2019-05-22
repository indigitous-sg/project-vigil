var FCM = require('fcm-node');
var serverKey = process.env.SERVERKEY;
var fcm = new FCM(serverKey);

// This function sends firebase cloud messaging notifications to user devices using the given token
exports.sendNotification = function sendNotification(rcv) {

    var message = {
        to: rcv,
        // collapse_key: 'your_collapse_key',

        notification: {
            title: 'New Call Received!',
            //body: 'Call received from ...' // TODO: Consider adding phone number
        },

        // data: { //you can send only notification or only data(or include both)
        //     my_key: 'my value',
        //     my_another_key: 'my another value'
        // }
    };

    console.log(message);

    fcm.send(message, function(err, response) {
        if (err) {
            console.log("Error: " + err);
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
}