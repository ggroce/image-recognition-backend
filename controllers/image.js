const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: process.env.CLARIFAIAPIKEY});

const handledClarifaiRequest = (req, res) => {
  app.models.predict(Clarifai.CELEBRITY_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('Error with Clarifai lookup'));
}

const handleImageCountInc = (req, res, db) => {
  const { id } = req.body;

  db('users')
  .where({id})
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('Error updating count.'));
}

module.exports = {
  handleImageCountInc: handleImageCountInc, 
  handledClarifaiRequest: handledClarifaiRequest
}