/* eslint-disable object-curly-spacing */
const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  functions.logger.info("Hello logs!", { tructuredData: true});
  response.send("Hello from Firebase!");
});
