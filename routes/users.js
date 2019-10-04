const express = require('express');
const router = express.Router();
const { User } = require('../database/models');

// FINDS USER BY EMAIL
router.get('/:email', function(req, res, next) {
  User.findOne({
    where: {email: req.params.email},
    attributes: ['id', 'name', 'email']
    })
    .then(user =>
      {
        if(user == null) 
        {
        res.status(404).send("User not found.");
        }
        else 
        {
          res.status(200).json(user);
        }
      })
    .catch(next)
});

// HANDLES LOGIN
router.put('/login', function(req, res, next) {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    },
      attributes: ['id', 'name', 'email'],
    },
    ).then(user =>
      {
        if(user == null) 
        {
        res.status(404).send("Invalid username and/or password");
      }
      else {
        res.status(200).json(user);
      }
      })
      .catch(next)
});

// CREATES A NEW USER
router.post('/', function(req, res, next) {
  const user = req.body;
  User.create(user)
  .then(function(user) {
    res.json(user);
  })
  .catch(function (err) {
    // respond with validation errors
    return res.status(422).send(err.errors[0].message);
  })
  .catch(function (err) {
    // every other error
    return res.status(400).send({
        message: err.message
    })
  })
});


module.exports = router;
