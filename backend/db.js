const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Melker95!',
  database: 'tododatabas'
});

connection.connect((err) => {
  if (err) {
    console.error('Databasanslutningen misslyckades: ' + err.stack);
    return;
  }
  console.log('Ansluten till databasen som ID ' + connection.threadId);
});

module.exports = connection;
