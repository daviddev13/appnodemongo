# appnodemongo
Esta es una aplicación web para gestionar una base de datos en MongoDB.  La app utiliza las tecnologías como:  Javascript  Node.js v22.14.0 MongoDB. 

Tambien, es una Aplicación de Múltiples Páginas (MPA) 
por lo que utiliza Handlebars como motor de plantillas.

Esta aplicación puede hacer:

Operaciones CRUD como: crear/leer/actualizar/eliminar datos de la base de datos en MongoDB
 
Default User

Cuando la aplicacion es lanzada, esta asume los siguientes datos para conectarse a la base de datos de Mongo

USER = 'admin';  
PASSWORD = 'secret'; 

Para que funcione la app se deben modificar los datos de Mongo en el archivo conexion.js


Instalacion

Para instalar la aplicacion se debe 

1- Clonar archivos al pc
git clone https://github.com/daviddev13/appnodemongo.git

2- ir a la carpeta donde se clonaron los archivos
cd nodejs-notes-app

3- Instalar los modulos de node.js recomendable tener instalado Node.js v22.14.0
npm i

4- Correr el script start en una terminal ubicada en la carpeta donde se clonaron los archivos
npm run start
