const express = require('express');
const app = express();
const cors = require('cors'); // Lägg till cors
const port = process.env.PORT || 3001; 

app.use(express.json());

app.use(cors());

const usersRouter = require('./users');
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.log(`Servern lyssnar på port ${port}`);
});