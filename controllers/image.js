const Clarifai = require('clarifai');
const { json } = require('express/lib/response');

const app = new Clarifai.App({
    apiKey: '654dd3343a294e6e83c066ff710cb8c1'
  });

  const handleApiCall = (req, res) => {
      app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
          res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'))
  }

  const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
   handleImage,
   handleApiCall
}