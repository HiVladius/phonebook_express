const express = require('express');
const infoRouter = express.Router();

infoRouter.get('/info', function(req, res) {
  const persons = [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
  ];
  const info = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`;
  res.send(info);
});

module.exports = infoRouter;
