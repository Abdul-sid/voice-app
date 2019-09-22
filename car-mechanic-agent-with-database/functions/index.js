const functions = require('firebase-functions');
var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var firestore = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {

   let p = request.body.queryResult.parameters;

   firestore.collection(`orders`).add(p)
       .then(() => {

      response.send({
         fulfillmentText:`Ok ${p.givenname} having age ${p.age} holding ${p.phonenumber} phone number, Your order has been placed `
      });
       })
      .catch((e => {
      response.send({
         fulfillmentText:`Something went wrong writing on database`
      });
      }))

});
