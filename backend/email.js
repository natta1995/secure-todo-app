/*const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');

// Skapa en OAuth2-client
const oauth2Client = new OAuth2Client({
  clientId: '495009116943-qst5j4oagb7rm7krrc63d2laalc0steu.apps.googleusercontent.com',
  clientSecret: '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',
  redirectUri: 'http://localhost:3001/changepassword'
});

//HÄR !!!
console.log('OAuth2Client created steg 1:', oauth2Client);

// Använd oauth2Client för att hämta ett åtkomsttoken (se tidigare kodexempel).
oauth2Client.getAccessToken((err, token) => {
  if (err) {
    console.error('Fel vid åtkomst av åtkomsttoken:', err);
    return;
  }

  // Skapa en nodemailer-transportör med OAuth 2.0-autentisering
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      type: 'OAuth2',
      user: 'nhallerdal@gmail.com',
      clientId: '495009116943-qst5j4oagb7rm7krrc63d2laalc0steu.apps.googleusercontent.com', // Sätt ditt eget klient-ID här
      clientSecret: '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', // Använd ditt eget klientsecret här
      refreshToken: token.tokens.refresh_token, 
      accessToken: token.tokens.access_token, 
    },
  });

  console.log('Transporter created:', transporter);


  module.exports = transporter;
});
*/