var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static('public'));
var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "tec123",
	database: "telemed_chat"
});


var conversacion = [];


io.on('connection', function(socket){
	socket.on('desde_cliente', function(data){
		conversacion.push(data);
		//var sql = "INSERT INTO mensajes(nombre, mensaje) VALUES ('"+data.nom+"','"+data.msj+"')";
		var sql = `INSERT INTO mensajes(nombre, mensaje) VALUES ('${data.nom}','${data.msj}')`;
		con.query(sql, function(err, result){
			if(err) throw err;
			console.log("Guardado con éxito.");
		});
		//console.log(conversacion);
		io.sockets.emit('desde_servidor',conversacion);
	});



	socket.on('consultar_historial', function(){

		console.log("Llegó la petición de consultar el historial.");
		var sql = `SELECT * FROM mensajes`;
		con.query(sql, function(err, result){
			if(err) throw err;

			
			//console.log(result);
			io.sockets.emit('desde_servidor_historial',result);

		});


	});
});


server.listen(5001, function(){
	console.log('Servidor corriendo en el puerto 5001.');
});
