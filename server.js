const express = require('express');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const app = express();

app.use(bodyParser.json({ extended: true }));

const vapidKeys = Object.freeze({
  'publicKey': 'BG0DMhVn6rpUuLgFPBIeRcTNCgBlUimko5pgzdBPfpVnhbqbCGwkn-D4bJCp0gSMyzMbpRwXu8FheI471If3las',
  'privateKey': '-67dWrVrgRgQA7KXosDw1NZz77yjF6jBRFsycwOP6mU',
});

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.post('/api/notification', (req, res) => {
  const notificationPayload = {
    "notification": {
      "title": "Angular Push Test",
      "body": "Push test is working!",
      "vibrate": [100, 50, 100],
      "data": {
        "dateOfArrival": Date.now(),
        "primaryKey": 1,
      },
      "actions": [{
        "action": "Some action",
        "title": "Open something",
      }]
    }
  };

  const { endpoint, p256dh, auth } = req.body;

  const sub = {
    endpoint,
    expirationTime: null,
    keys: {
      p256dh,
      auth,
    }
  };

  webpush.sendNotification(sub, JSON.stringify(notificationPayload))
    .then(() => res.status(200).json({message: 'Push sent successfully.'}))
    .catch(err => {
      console.error("Error sending notification, reason: ", err);
      res.sendStatus(500);
    });
});

app.listen(8091, () => {
  console.log('Server is started!');
})
