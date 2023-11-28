var admin = require("firebase-admin");
var fcm = require('fcm-notification');
var serviceAccount = require("./configFirebase.json");
const certPath = admin.credential.cert(serviceAccount);
var FCM = new fcm(certPath);



exports.sendPushNotification = (fcm_token, title, body) => {

    try{
        let message = {
            android: {
                notification: {
                    title: title,
                    body: body,
                },
            },
            token: fcm_token
        };

        FCM.send(message, function(err, resp) {
            if(err){
                throw err;
            }else{
                console.log('Successfully sent notification');
            }
        });

    }catch(err){
        throw err;
        }

    }
