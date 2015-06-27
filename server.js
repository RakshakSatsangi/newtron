var Hapi = require('hapi');
var Joi = require('joi');
var mysql = require('mysql');
// Create a server with a host and port
var server = new Hapi.Server();
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database : 'rak',
  port: 3306
});
 
connection.connect();
console.log(connection.query('SELECT * from shak'));
 //, function(err, rows, fields) {
  //if (err) throw err;

  //console.log('SEL');
//});
//console.log(q.sql.result());
 
connection.end();
/*server.register({
    register: require('hapi-plugin-mysql'),
    options: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "12345",
        database: "rak"
    }
}, function (err) {
    if (err) console.log(err);
    
});*/
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

server.views({
	path: "templates",
	engines: {
		html: require("handlebars")
	}
});

var formGetConfig = {
	handler: function(request, reply){
		reply.view('form.html')
	}
}

// Add the route
server.route([
	{
	    method: 'GET',
	    path:'/hello', 
	    handler: function (request, reply) {
	       reply.view('form.html');
	    }
	},
	{
		method: 'POST',
		path: '/hello',
		config:
		{
			handler : function(request,reply){
				reply('Hello ' + request.payload.username + '!');
				//reply('Login Success'); 
				console.log("name: "+request.payload.username);
				console.log("password: "+request.payload.password);
				//request.app.db.query("insert into shak  values('asdf','1234'	) where userid = '2' ");
			},
			validate:
			{
				payload: 
				{	
					username: Joi.string().alphanum().min(3).max(30).required(),
					password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/)
				}
			}
		}
	}
]);

// Start the server
server.start();
