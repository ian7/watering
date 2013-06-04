/*global require,static*/

var nodeStatic = require('node-static');

//
// Create a node-static server instance to serve the './public' folder
//
var file = new(nodeStatic.Server)('./public');


var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'pi',
    password: 'aLeks1pi',
    insecureAuth: true,
    database: 'watering'
});

connection.connect();

//connection.end();


var restify = require('restify');
var httpServer = restify.createServer();


// Process GET
httpServer.get('/weather', function(req, res) {
    var values = [];
    connection.query('SELECT * FROM  weather ORDER BY  weather.index DESC LIMIT 0 , 100', function(err, rows, fields) {
        var i = 0;

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        for (i = 0; i < rows.length; i++) {
            values.push(rows[i]);
        }

        res.write(JSON.stringify(values));
        res.end();
    });
});

httpServer.get('/weather/:attribute', function(req, res) {
    var values = [];
    var attr =  req.params.attribute 
    connection.query('SELECT '+ attr +' FROM  weather ORDER BY  weather.index DESC LIMIT 0 , 100', function(err, rows, fields) {
        var i = 0;

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        for (i = 0; i < rows.length; i++) {
            values.push(rows[i][attr]);
        }

        res.write(JSON.stringify(values));
        res.end();
    });
});




// Serve static files
httpServer.get(/^\/.*/, function(req, res, next) {
    file.serve(req, res, next);
});


httpServer.listen(9999);

/*

httpServer.createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(9999);
*/