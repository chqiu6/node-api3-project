const users = require("../users/users-model");
const posts = require("../posts/posts-model");

function logger(req, res, next) {
  // DO YOUR MAGIC 
  // req method, url, time stamp 
  const time = new Date().toISOString()
  console.log(` Method : ${req.method}, URL : ${req.url}, Time :  ${time}`);
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  //- if the `id` parameter is valid, store the user object as `req.user` and allow the request to continue
  return (req, res, next) => {
    const id = req.params.id;
    users.getById(id)
    .then(user => {
    if(users){
      req.user = user;
      next();
    } else { 
      res.status(404).json({
         message: "user not found",
        });
    };
  })
  .catch(err => {
    console.log("validate user id ", err );
  });
  };
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  return(req, res, next) => {
    if(!req.body){
      res.status(400).json({
         message: "missing user data" ,
        });
    } else if (!req.body.name) {
      res.status(400).json({
         message: "missing required name field", 
        });
    } else {
      next();
    };
  };
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  return (req, res, next) => { 
    if(!req.body) {
      res.status(400).json({ 
        message: "missing post data" ,
      });
    } else if(!req.body.text){
      res.status(400).json({
         message: "missing required text field", 
        });
    } else {
      next();
    };
  };
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};