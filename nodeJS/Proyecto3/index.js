var http = require('http');
var querystring = require('querystring');
var mensajes = require('./modulos/mensajes');
var mensajes_lista = new Array();
var data_post_maximo = 8 * 1024 * 1024;
http.createServer(function(peticion, respuesta){
   if(peticion.method == 'POST'){
      var data_post = '';
      peticion.on('data', function(data_cortada){
         data_post += data_cortada;
         console.log(data_post.length)
         console.log(data_post_maximo)
         if(data_post.length > data_post_maximo){
            this.pause();
            respuesta.writeHead(413);
            respuesta.end('Ha surgido un error y no puede continuarse.');
         }
      });
      peticion.on('end', function(){
         var data_post_objecto = querystring.parse(data_post);
         mensajes_lista.push({nombre: data_post_objecto.nombre, mensaje: data_post_objecto.mensaje});
         respuesta.writeHead(200, {'Content-Type': 'text/html'});
         respuesta.end(mensajes.dibujarCodigoHtml(mensajes_lista));
      });
   }else{
      respuesta.writeHead(200, {'Content-Type': 'text/html'});
      respuesta.end(mensajes.dibujarCodigoHtml(mensajes_lista));
   }
}).listen(8080, '127.0.0.1');
console.log('Servidor funcionando.');