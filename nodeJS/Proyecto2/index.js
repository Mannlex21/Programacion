var http = require('http');
var url = require('url');
var animales = require('./modulos/animales');
http.createServer(function(peticion, respuesta){ 
   var query = url.parse(peticion.url,true).query;
   var grupo = (query.grupo != undefined) ? query.grupo : '';
   respuesta.writeHead(200, {'Content-Type': 'text/html'});
   respuesta.end(animales.dibujarCodigoHtml(grupo));
   console.log(animales.lista)
}).listen(8080, '127.0.0.1');
console.log('Servidor iniciado.');