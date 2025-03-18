//conexión a MongoDB 

const mongoose = require('mongoose');

const DB_USER = 'admin';  
const DB_PASSWORD = 'secret'; 
const DB_HOST = 'localhost'; 
const DB_NAME = 'prueba_backend'; 

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:27017/${DB_NAME}?authSource=admin`;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error de conexión:', err));

module.exports = mongoose;