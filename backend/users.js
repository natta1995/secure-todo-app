// routes/users.js

const express = require('express');
const router = express.Router();
const db = require('./db'); 
const { generateJWT } = require('./auth'); 

// API-endpunkt för att hämta användare
router.get('/', (req, res) => {
  db.query('SELECT * FROM Users', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Kunde inte hämta användare' });
    } else {
      res.json(results);
    }
  });
});

// API-endpunkt för användarregistrering
router.post('/register', (req, res) => {
    const { email, username, password, role } = req.body;
  
    // Lägg till användaren i databasen
    const query = 'INSERT INTO Users (email, username, password, role) VALUES (?, ?, ?, ?)';
    db.query(query, [email, username, password, role], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Kunde inte registrera användaren' });
      } else {
        res.json({ message: 'Användaren har registrerats' });
      }
    });
  });

// API-endpunkt för inloggning
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Kontrollera användaruppgifter mot databasen
  const query = 'SELECT * FROM Users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Ett fel uppstod vid inloggning' });
    } else {
      if (results.length > 0) {
        // Användaren hittades, logga in
        const token = generateJWT(email); // Skapa JWT
        console.log("Du är inloggad")
        // Skicka JWT som svar
        res.json({ token });
      } else {
        // Inloggningen misslyckades
        res.status(401).json({ error: 'Ogiltiga inloggningsuppgifter' });
      }
    }
  });
});


module.exports = router;
