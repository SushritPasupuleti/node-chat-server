const express = require('express');
// controllers
const users = ('../controllers/user.js');

const router = express.Router();

router
  .get('/', user.onGetAllUsers)
  .post('/', user.onCreateUser)
  .get('/:id', user.onGetUserById)
  .delete('/:id', user.onDeleteUserById)

module.exports.UserRouter;