# appnodemongo

Esta es una aplicación web para gestionar una base de datos en MongoDB.  La app utiliza las tecnologías como:  Javascript  Node.js v22.14.0 MongoDB. 

Tambien, es una Aplicación de Múltiples Páginas (MPA) por lo que utiliza Handlebars como motor de plantillas.


Esta aplicación puede hacer Operaciones CRUD como:
  crear/leer/actualizar/eliminar datos de la base de datos en MongoDB
 

#Default User

Cuando la aplicacion es lanzada, esta asume los siguientes datos para conectarse a la base de datos de Mongo

USER = 'admin';
PASSWORD = 'secret'; 

Para que funcione la app se debe tener mongodb en la computadora y  modificar los datos de Mongo en el archivo conexion.js 

Las rutas del servidor de la aplicación se ven en el archivo 
usuarios.js

#Instalacion

Para instalar la aplicacion se debe 

1- Clonar archivos al pc
git clone https://github.com/daviddev13/appnodemongo.git

2- Ir a la carpeta donde se clonaron los archivos con el comando
cd 

3- Instalar los modulos de node.js recomendable tener instalado Node.js v22.14.0
npm i

4- Correr el script start en una terminal ubicada en la carpeta donde se clonaron los archivos
npm run start

#uso 
ver  video tutorial https://www.youtube.com/watch?v=k3gheu3wh2E
