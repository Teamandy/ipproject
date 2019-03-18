const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const formSchema = new mongoose.Schema({
  title: String,
  description: String
});

const Form = mongoose.model('Form', formSchema);

router.get('/', (req, res) => {
  Form.find()
    .then(forms => {
      res.json(forms);
    })
    .catch(err => {
      res.status(422).send({
        error: err.message
      });
    });
});

router.post('/', (req, res) => {
  Form.create(req.body)
    .then(form => {
      res.json(form);
    })
    .catch(err => {
      res.status(422).send({
        error: err.message
      });
    });
});

router.delete('/:id', (req, res) => {
  try {
    Form.findOneAndDelete({
      _id: req.params.id
    }).then(() => res.json({ msg: 'deleted' }));
  } catch (err) {
    res.status(422).send({
      error: err.message
    });
  }
});

module.exports = router;
