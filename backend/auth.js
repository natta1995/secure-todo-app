const jwt = require('jsonwebtoken');

// Secret key for signing the JWT
const secretKey = 'hemligt'; 

// Function to generate a JWT token for a user
function generateJWT(email) {
  const token = jwt.sign({ email }, secretKey, { expiresIn: '2h' }); 
  return token;
}

module.exports = {
  generateJWT,
};
