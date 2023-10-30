/*const transporter = require('./email'); // Importera din tidigare konfigurerade transporter

function sendPasswordResetEmail(email, resetToken) {
  const mailOptions = {
    from: 'nhallerdal@gmail.com',
    to: email,
    subject: 'Återställ ditt lösenord',
    text: `Klicka på länken för att återställa ditt lösenord: http://localhost:3001/reset-password?token=${resetToken}`
  }; 

  console.log('MailOptions: steg två', mailOptions);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Fel vid sändning av e-post:', error);
    } else {
      console.log('E-post skickad:', info.response);
    }
  });
}

module.exports = sendPasswordResetEmail;*/
