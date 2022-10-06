var socket = io.connect('localhost:5001', {'forceNew':true});

function mi_funcion()
{
	//console.log("Click en OK.")

	var nombre = document.getElementById('txt_nombre').value;
	var mensaje = document.getElementById('txt_mensaje').value;

	var paquete = 	{	nom:nombre, 
						msj:mensaje
					};

	socket.emit('desde_cliente',paquete)

	//console.log(paquete);

}

socket.on('desde_servidor',function(data){
	render_mensaje(data)
});

function render_mensaje(data)
{
	//var cadena = data.nom+": "+data.msj;
	var cadena = data.map( function(elemento,index){
		return "<div> <strong>" + elemento.nom + ": </strong> "  + elemento.msj + "</div>";
	}).join(' ');

	document.getElementById('conversacion').innerHTML = cadena;
}

function consultar_historial()
{
	socket.emit('consultar_historial','');

}

socket.on('desde_servidor_historial',function(data){
	render_historial(data);
});

function render_historial(data)
{
	//console.log(data);

	var encabezado = `<table  class="table"> <thead class="thead-dark"> <tr> <th> ID </th> <th> NOMBRE </th> <th> MENSAJE </th> </tr> </thead> <tbody>`;

	
	var cuerpo = data.map( function(elemento,index){
		return "<tr> <th>"+elemento.id+"</th> <th>" + elemento.nombre + "</th> <th>" + elemento.mensaje + "</th></tr>";
	}).join(' ');

	var pie =  "</tbody></table>";

	var completa = encabezado + cuerpo + pie;

	console.log(completa);


	document.getElementById('historial').innerHTML = completa;

}