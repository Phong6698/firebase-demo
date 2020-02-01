import * as functions from 'firebase-functions';
import * as cheerio from 'cheerio';
import * as cors from 'cors';
import nodeFetch from 'node-fetch';

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