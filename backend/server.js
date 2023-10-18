const express = require('express');
const app = express();
const port = process.env.PORT || 3001; 

app.use(express.json());

const usersRouter = require('./users');
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.log(`Servern lyssnar på port ${port}`);
});