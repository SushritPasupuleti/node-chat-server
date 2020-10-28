const router = require('express').Router();

const user = require('./../handlers/user');

router
    .get('/', user.onGetAllUsers)
    .post('/', user.onCreateUser)
    .get('/:id', user.onGetUserById)
    .delete('/:id', user.onDeleteUserById)

module.exports = router;
