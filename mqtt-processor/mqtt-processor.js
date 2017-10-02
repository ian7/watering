var activeWateringCircuit = 0;
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://10.10.1.3')
 
client.on('connect', function () {
  client.subscribe('presence')
  client.subscribe('flow')
  client.subscribe('watering')
  client.publish('presence', 'Hello mqtt')
})
 

client.on('message', function (topic, message) {
  // message is Buffer
  switch( topic ){
  	case "flow":
		console.log(activeWateringCircuit + " : " + message.toString());
		break;
	case "/watering":
		if( message.toString() != "0") {
			activeWateringCircuit = message.toString();
		}
		console.log("watering circut: " + message.toString());
		break;
	default:
		console.log("whoops... (t: " + topic.toString() + " m: " + message.toString() + " )");
		break;	
  client.end()
  }
})


var restify = require('restify');
var httpServer = restify.createServer();


// Serve static files
httpServer.get(/^\/.*/, function(req, res, next) {
    file.serve(req, res, next);
});


httpServer.listen(9999);
