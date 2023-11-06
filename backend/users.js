// routes/users.js

const express = require('express');
const router = express.Router();
const db = require('./db'); 
const { generateJWT,  generatePasswordResetToken } = require('./auth'); 
const  sendPasswordResetEmail  = require('./email.js');


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

router.get('/users', (req, res) => {
  // Gör en databasfråga för att hämta alla användare med deras roller
  db.query('SELECT id, username, role FROM Users', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Kunde inte hämta användare' });
    } else {
      res.json(results);
    }
  });
});

// API-endpunkt för att ändra användarroll
router.put('/change-role/:id', (req, res) => {
  const userId = req.params.id;
  const newRole = req.body.role; // Skicka den nya rollen i förfråganens kropp

  // Uppdatera användarrollen i databasen baserat på userId
  db.query('UPDATE Users SET role = ? WHERE id = ?', [newRole, userId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Kunde inte uppdatera användarens roll' });
    } else {
      res.json({ message: 'Användarens roll har uppdaterats' });
    }
  });
});



router.get('/:id', (req, res) => {
  const user = req.user; // Antag att användarinformationen finns i req.user efter att ha verifierat JWT-token

  if (user) {
    // Returnera användarinformation som JSON
    res.json({
      username: user.username,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: 'Användaren hittades inte' });
  }
});


// API-endpunkt för användarregistrering
router.post('/register', (req, res) => {
    const { email, username, password } = req.body;


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

  const role = 'user'; // Definiera standardrollen
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


// Begär lösenordsåterställning
router.post('/reset-password-request', (req, res) => {
  const { email } = req.body;

  // Kontrollera om användaren finns i databasen
  db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error("Databasfel är följande:", error)
      return res.status(500).json({ message: 'Database fungerar inte som den skall' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Användaren hittades inte.' });
    }

    const resetToken = generatePasswordResetToken();

    // Spara token i databasen
    db.query('UPDATE users SET reset_token = ? WHERE email = ?', [resetToken, email], (error) => {
      if (error) {
        console.error("Databasfel är följande:", error)
        return res.status(500).json({ message: 'Databasen funkade inte här, steg två' });
      }

      // Skicka e-postmeddelande med återställningslänk
      sendPasswordResetEmail(email, resetToken); // Använd sendPasswordResetEmail-funktionen

      res.json({ message: 'Ett e-postmeddelande med en återställningslänk har skickats.' });
    });
  });
});

// Återställ lösenord
router.post('/reset-password', (req, res) => {
  const { email, token, newPassword } = req.body;

  // Hämta token från databasen
  db.query('SELECT reset_token FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Database error' });
    }

    const savedToken = results[0].reset_token;

    if (!savedToken || savedToken !== token) {
      return res.status(400).json({ message: 'Ogiltigt eller utgånget token.' });
    }

    // Uppdatera användarens lösenord
    db.query('UPDATE users SET password = ? WHERE email = ?', [newPassword, email], (error) => {
      if (error) {
        return res.status(500).json({ message: 'Database error' });
      }

      // Ta bort token från databasen efter användning
      db.query('UPDATE users SET reset_token = NULL WHERE email = ?', [email], (error) => {
        if (error) {
          return res.status(500).json({ message: 'Database error' });
        }

        res.json({ message: 'Lösenordet har återställts.' });
      });
    });
  });
});




module.exports = router;
