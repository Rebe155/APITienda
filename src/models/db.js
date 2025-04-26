const mysql = require('mysql2');
const dbConfig = require('../config/db.config.js');

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.PORT
});

connection.connect(error => {
    if (error) {
        console.error('Error de conexión a la base de datos:', error.message);
        process.exit(1); 
    } else {
        console.log('Conexión exitosa a la base de datos.');
    }
});

module.exports = connection;
