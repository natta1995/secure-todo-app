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


    // Validera lösenordet
  if (
    password.length < 12 ||
    !/[a-z]/.test(password) ||     // Innehåller minst en liten bokstav
    !/[A-Z]/.test(password) ||     // Innehåller minst en stor bokstav
    !/[0-9]/.test(password) ||        // Innehåller siffror
    !/[^a-zA-Z0-9]/.test(password)    // Innehåller specialtecken
  ) {
    res.status(400).json({ error: 'Ogiltigt lösenord' });
    return;
  }

  
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

        // Hämta användaruppgifter från resultatet
        const userData = results[0];

        // Skicka JWT och användaruppgifter som svar
        res.json({ token, user: userData });
      } else {
        // Inloggningen misslyckades
        res.status(401).json({ error: 'Ogiltiga inloggningsuppgifter' });
      }
    }
  });
});


module.exports = router;
