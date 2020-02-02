import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cheerio from 'cheerio';
import * as cors from 'cors';
import nodeFetch from 'node-fetch';

admin.initializeApp();

const corsHandler = cors({origin: true});

const loadHtml = async (url: string) => {
  const result = await nodeFetch(url);
  return await result.text();
};

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

export const profile = functions.region('europe-west1').https.onRequest(async (request, response) => {
  return corsHandler(request, response, async () => {
    const url = 'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/playerPortrait?federation=STT&person=1714134&club=33189';
    console.log('url', url);
    const html = await loadHtml(url);
    const $ = cheerio.load(html);
    const content = $('#content').html();
    console.log('content', content);
    response.send(content);
  });
});

export const schedule = functions.pubsub
  .schedule('30 * * * *').timeZone('Europe/Zurich').onRun(context => {
    console.log('schedule function every 30 minutes');
    console.log('time', new Date());
    return null;
  });

export const messaging = functions.region('europe-west1').firestore
  .document('Messages/{messageID}').onCreate(async (snapshot, context) => {
    const data: any = snapshot.data();
    console.log('data', data);

    const payload: any = data.payload;
    const uid = data.uid;
    const userSnap = await admin.firestore().collection('Users').doc(uid).get();
    const user: any = userSnap.data();
    console.log('user', user);
    const fcmTokens = Object.keys(user.fcmTokens);
    console.log('fcmTokens', fcmTokens);
    return admin.messaging().sendToDevice(fcmTokens, payload);
  });