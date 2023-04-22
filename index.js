const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const infoRouter = require('./controllers/info');
const personsRouter = require('./controllers/persons');

dotenv.config();

const PORT = process.env.PORT || 3001;

morgan.token('body', (req, res) => {return req.body;});
app.use(express.json());
app.use('/', infoRouter);
app.use('/api/persons', personsRouter);
app.use(express.json());

// Endpoint para obtener todas las personas
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
