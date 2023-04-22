const express = require('express');
const personsRouter = express.Router();

// Base de datos temporal
let personsData = [
  { 
    id: 1, 
    name: 'Arto Hellas', 
    number: '040-123456' 
  },
  { 
    id: 2, 
    name: 'Ada Lovelace', 
    number: '39-44-5323523' 
  },
  { 
    id: 3, 
    name: 'Dan Abramov', 
    number: '12-43-234345' 
  },
  { 
    id: 4, 
    name: 'Mary Poppendieck', 
    number: '39-23-6423122' 
  },
]

// Obtener todas las entradas
personsRouter.get('/', (req, res) => {
  res.json(personsData);
});

// Obtener una sola entrada
personsRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = personsData.find(person => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

personsRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  personsData = personsData.filter(person => person.id !== id);
  res.status(204).end();
});

// Crear una nueva entrada
personsRouter.post('/', (req, res) => {
  const person = req.body;
  if (!person.name) {
    return res.status(400).json({
      error: 'name is missing'
    });
  }
  if (!person.number) {
    return res.status(400).json({
      error: 'number is missing'
    });
  }
  const existingPerson = personsData.find(p => p.name === person.name);
  if (existingPerson) {
    return res.status(400).json({
      error: 'name must be unique'
    });
  }
  const newPerson = {
    id: Math.max(...personsData.map(p => p.id)) + 1,
    name: person.name,
    number: person.number
  };
  personsData = personsData.concat(newPerson);
  res.json(newPerson);
});


module.exports = personsRouter;
