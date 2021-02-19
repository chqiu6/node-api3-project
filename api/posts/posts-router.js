const express = require('express');
const posts = require("./posts-model");

const router = express.Router();

router.get('/', (req, res,next) => {
  // DO YOUR MAGIC
  posts.get()
  .then(post => {
    res.status(200).json(post);
  })
  .catch(next)
});

router.get('/:id', (req, res,next) => {
  // DO YOUR MAGIC
  posts.getById(req.params.id)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(next)
});

// do not forget to export the router
module.exports = router;
