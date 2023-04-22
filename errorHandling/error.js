app.post('/api/persons', (req, res, next) => {
    const body = req.body;
  
    if (!body.name || !body.number) {
      return res.status(400).json({
        error: 'name or number missing'
      });
    }
  
    Person.findOne({ name: body.name }).then(existingPerson => {
      if (existingPerson) {
        return res.status(400).json({
          error: 'name must be unique'
        });
      }
  
      const person = new Person({
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 1000000)
      });
  
      person.save().then(savedPerson => {
        res.json(savedPerson);
      }).catch(error => next(error));
    });
  });

  module.exports = app;