const express = require('express');
const users = require("./users-model");
const posts = require("../posts/posts-model");
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

const router = express.Router();

router.get('/', (req, res,next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  users.get()
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    next(err);
  });
});

router.get('/:id', validateUserId(), (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user);
});

router.post('/', validateUser(), (req, res,next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  users.insert(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  //short verison of .catch 
  //.catch(next)
  .catch(err => {
    next(err);
  });
});

router.put('/:id', validateUserId(), validateUser(), (req, res,next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  users.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(next);
});

router.delete('/:id', validateUserId(), (req, res,next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  users.remove(req.params.id)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(next);
});

router.get('/:id/posts', validateUserId(), (req, res,next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  users.getUserPosts(req.params.id)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(next);
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res,next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  posts.insert({ "user_id" : req.params.id, "text": req.body.text})
  .then(postz => {
    res.status(200).json(postz);
  })
  .catch(next)
});

// do not forget to export the router
module.exports = router; 