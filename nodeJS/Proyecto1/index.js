/*var http = require('http');
http.createServer(function(peticion, respuesta){
   respuesta.writeHead(200, 'text/plain');
   respuesta.end('Hola mundo.');
}).listen(8080, '127.0.0.1');
console.log('El servidor esta funcionando correctamente en https://localhost:8080/');*/

/*var http = require('http');
http.createServer(function(peticion, respuesta){
   var codigo_html = '<html> <head> <title> Ejemplo de hola mundo </title> </head> <body> Hola mundo </body> </html>';
   respuesta.writeHead(200, 'text/html');
   respuesta.end(codigo_html);
}).listen(8080, '127.0.0.1');
console.log('El servidor esta funcionando correctamente en https://localhost:8080/');*/

/*var http = require('http');
var url = require('url');
http.createServer(function(peticion, respuesta){
   var path_nombre = url.parse(peticion.url).pathname;
   respuesta.writeHead(200);
   respuesta.end('El path es: ' + path_nombre);
}).listen(8080, '127.0.0.1');
console.log('El servidor esta funcionando correctamente en https://localhost:8080/');*/

/*var http = require('http');
var url = require('url');
var fs = require('fs');
http.createServer(function(peticion, respuesta){
   var path_nombre = (url.parse(peticion.url).pathname == '/') ? '/index.html' : url.parse(peticion.url).pathname;
   var ruta_a_archivo = 'C:/Users/mamurillo/Documents/Programacion/nodeJS/Proyecto1/' + path_nombre;
   fs.exists(ruta_a_archivo, function(existe){
      if(existe){
         fs.readFile(ruta_a_archivo, function(error, contenido_archivo){
            if(error){
               respuesta.writeHead(500, 'text/plain');
               respuesta.end('Error interno.');
            }else{
               respuesta.writeHead(200, {'Content-Type': 'text/html'});
               respuesta.end(contenido_archivo);
            }
         });
      }else{
         respuesta.writeHead(404, 'text/plain');
         respuesta.end('Error 404. El enlace no existe o ha dejado de existir.');
      }
   });
}).listen(8080, '127.0.0.1');
console.log('El servidor esta funcionando correctamente en https://localhost:8080/');*/

/*var http = require('http');
var url = require('url');
var fs = require('fs');
var mime_types = {
   'js' : 'text/javascript',
   'html' : 'text/html',
   'css' : 'text/css',
   'jpg' : 'image/jpg',
   'gif' : 'image/gif',
   'png' : 'image/png'
};
http.createServer(function(peticion, respuesta){
   var path_nombre = (url.parse(peticion.url).pathname == '/') ? '/index.html' : url.parse(peticion.url).pathname;
   var ruta_a_archivo = 'C:/Users/mamurillo/Documents/Programacion/nodeJS/Proyecto1/' + path_nombre;
   fs.exists(ruta_a_archivo, function(existe){
      if(existe){
         fs.readFile(ruta_a_archivo, function(error, contenido_archivo){
            if(error){
               respuesta.writeHead(500, 'text/plain');
               respuesta.end('Error interno.');
            }else{
               var extension = ruta_a_archivo.split('.').pop();
               var mime_type = mime_types[extension];
               respuesta.writeHead(200, {'Content-Type': mime_type});
               respuesta.end(contenido_archivo);
            }
         });
      }else{
         respuesta.writeHead(404, 'text/plain');
         respuesta.end('Error 404. El enlace no existe o ha dejado de existir.');
      }
   });
}).listen(8080, '127.0.0.1');
console.log('El servidor esta funcionando correctamente en https://localhost:8080/');*/

var http = require('http');
var url = require('url');
var fs = require('fs');
var servidor = require('./modulos/servidor');
/*fs.exists('./modulos/servidor.js', function(existe){
    console.log(existe)
});*/
servidor.crear(http, url, fs);
console.log('El servidor esta funcionando correctamente en https://localhost:8080/');