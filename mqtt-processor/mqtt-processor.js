var activeWateringCircuit = 0;

var mqtt = require('mqtt')
var mysql = require('mysql');
var client  = mqtt.connect('mqtt://10.10.1.3')
var connection = mysql.createConnection({
    host: '10.10.1.3',
    user: 'mqtt-processor',
    password: 'tofatofa',	
    insecureAuth: true,
    database: 'watering'
});
connection.connect();  	
 
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
   		var newAmount = parseInt(message)

		//console.log(activeWateringCircuit + " : " + message.toString());
	    connection.query('SELECT * FROM `watering` WHERE DATE(`time`) = CURDATE() AND circuit = ' + activeWateringCircuit  , function(err, rows, fields) {
	    	
	    	// if we have an entry....
	    	if( rows.length > 0 ){
	    		//console.log(rows[0].amount)
	    		var currentValue = rows[0].amount;
	    		console.log( "Current value: " + currentValue + " amount: " + newAmount);
	    		var newValue = currentValue + newAmount;
			    connection.query('UPDATE `watering` SET amount = ' + newValue + ' WHERE DATE(`time`) = CURDATE() AND circuit = ' + activeWateringCircuit  , function(err, rows, fields) {});
	    	}
	    	else {
			    connection.query('INSERT INTO `watering` (`time`,`circuit`,`amount`,`duration`) VALUES( CURDATE(), ' + activeWateringCircuit + ', ' + newAmount + ', -1 )'  , function(err, rows, fields) {});
	    	}
	    });
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
