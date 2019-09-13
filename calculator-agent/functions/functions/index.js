const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {

   console.log("request.body.queryResult.parameters",request.body.queryResult.parameters);

   let p = request.body.queryResult.parameters;
   var n1 = p.number;
   var n2 = p.number1;
   var action = p.operation;
   var answer;

   if (n2 != 0){
      if(action == "addition"){
         answer = (n1 + n2).toFixed(2) ;
      }
      else if(action == "divide"){
         answer = (n1 / n2).toFixed(2) ;
      }
      else if(action == "multiply"){
         answer = (n1 * n2).toFixed(2) ;
      }
      else if(action == "subtraction"){
         answer = (n1 - n2).toFixed(2) ;
      }
 response.send({
    fulfillmentText:`Abdur Rehman The answer is ${answer}`
 });
}
else if(n2 == 0 && action == "divide")
response.send({
   fulfillmentText:`Error due to presence of infinity`
});
else if (n2 == 0 && action == "multiply") {
   answer = (n1 * n2).toFixed(2);
   response.send({
      fulfillmentText:` Abdur Rehman The answer is ${answer}`
   });

}

});
