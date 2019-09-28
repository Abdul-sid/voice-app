const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var firestore = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {

    const _agent = new WebhookClient({ request, response });

    // Default Welcome Intent (start)

    function welcome(agent){

        let welcome_rand = Math.floor(Math.random() * 3);

        if (welcome_rand === 0){
            agent.add("Hi I am you hotel booking agent")
        }
        if (welcome_rand === 1){
            agent.add("Hello hotel booking agent here, how can I serve you")
            }
        if (welcome_rand === 2){
            agent.add("hotel booking agent here, wanna book hotel")
            }
            
    }

    // Default Welcome Intent (end)

    // Default booking info (start)

    function info(agent){
       
        let p = agent.parameters;

        return firestore.collection(`orders`).add(p)
        .then(() => {

        return agent.add(`Ok, ${p.givenname} having ${p.email}, your request for booking ${p.roomtype} room for ${p.number} people is forwarded. We will contact you soon , \n would you like to give feedback related to our services ?`);
       })
        .catch(e => {

        console.log("error is", e);

        agent.add(`Something went wrong writing on database`);
 
       })

    }

    // Default booking info (end)

    // Default suggestion (start)

    function sugg(agent){

        agent.add("Your suggestion/complain has been recorded . Thanks for your contribution to improve our services, have a good day")
    }

    // Default suggestion (end)

        // Default show booking (start)


    function bookings(agent){

        return firestore.collection('orders').get(agent.parameters)
            .then((querySnapShot) => {
                var orders = [];
                querySnapShot.forEach((doc) => {
                    orders.push(doc.data())
                });
                return agent.add(`You have ${orders.length} orders; Do you want to see them ? `)
            })

    }

        // Default show booking (end)

     function bookings_yes(agent){

        return firestore.collection('orders').get(agent.parameters)
        .then((querySnapShot) => {
            var showOrders = [];
            querySnapShot.forEach((doc) => {
                showOrders.push(doc.data())
            });
            var followSpeech = [];
            showOrders.forEach((eachOrder, index) => {
                followSpeech += ` Order no ${index + 1} is ${eachOrder.roomtype} room for ${eachOrder.number} person(s) booked by ${eachOrder.givenname} having ${eachOrder.email} \n.`;
            })
            return agent.add(followSpeech)
        })

     }


    // Mapping

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('bookinginfo', info);
    intentMap.set('suggestion/complain', sugg);
    intentMap.set('showBooking', bookings);
    intentMap.set('showBooking - yes', bookings_yes);

    _agent.handleRequest(intentMap);


});
